var QuizIndex = React.createClass({
  render: function() {
    console.log('test')
    return (
      <div className="container">
        <h3>Quizzes</h3>
        <QuizList quizzes={this.props.quizzes} />
      </div>
    );
  }
});

var QuizList = React.createClass({
  render: function() {
    var quizz = this.props.quizzes.map(function(quiz) {
      return (
          <Quiz id={quiz.id} name={quiz.name} description={quiz.description} adate={quiz.assigned_date} />
      )
    })
    return (
      <div>{quizz}</div>
    )
  }
})

var Quiz = React.createClass({
  render: function() {
    var quizLink = "/quizzes/"+(this.props.id)
    return (
      <div className ="panel panel-default">
        <div className="panel-heading">
          <h4><a href={quizLink}> {this.props.name}</a></h4>
        </div>
        <div className="panel-body">Description: {this.props.description}</div>
        <div className="panel-body">Assigned Date: {this.props.adate}</div>
      </div>
    )
  }
})

var NewQuiz = React.createClass({
  render: function() {
    var cohort_select = this.props.cohorts.map(function(cohort) {
      return (
        <option name="cohort" value={cohort.id}>{cohort.name}</option>
      )
    })
    return (
      <div className="container">
        <h2> Create a Quiz </h2>
        <form role ='form' method="post" action="/quizzes">
          <input className="form-control" name="authenticity_token" type="hidden" value="token_value" />
          <select name="cohort">
            {cohort_select}
          </select>
          <div className ="form-group">
            <label for="name">Quiz Name</label>
            <input className="form-control" type="text" name="name" placeholder="Quiz Name"/>
          </div>
          <div className = "form-group">
            <label for="description">Description</label>
            <input className="form-control" type="text" name="description" placeholder="Quiz Description"/>
          </div>
          <div className = "form-group">
            <label for="assigned_deat">Assigned Date</label>
            <input className="form-control" type="text" name="assigned_date" placeholder="YYYY-MM-DD"/>
          </div>
          <div className = "form-group">
            <input className="form-control" type="submit" value="Create Quiz"/>
          </div>
        </form>
      </div>
    )
  }
});

// <div className ="panel panel-default">
//   <div className="panel-heading">
//     <h4><a href={quizLink}> {this.props.name}</a></h4>
//   </div>
//   <div className="panel-body">Description: {this.props.description}</div>
//   <div className="panel-body">Assigned Date: {this.props.adate}</div>
// </div>

var ShowQuiz = React.createClass ({
  render: function() {
    var questions = this.props.questions.map(function(question) {
      return (
        <h4>{question.question_text}</h4>
      )
    })
    return (
      <div className = "container">
        <div className="panel panel-default">
          <div className='panel-heading'>
            <h3> {this.props.quiz.name} </h3>
          </div>
          <div className = 'panel-body'> {this.props.quiz.description} </div>
          <div className = 'panel-body'> assigned: {this.props.quiz.assigned_date} </div>
          <div className='panel-heading'>
            <h5>Questions</h5>
          </div>
          <div className = 'panel-body'>
            {questions}
          </div>
        </div>
      </div>
    )
  }
})

var CreateQuestionTemplate = React.createClass({
  getInitialState: function() {
    return {questions: [], type:''}
  },
  onAddClicked: function(e) {
    this.state.questions.push(this.state.type)
    this.setState({type: this.state.type})
  },
  handleQuestionType: function(e) {
    this.setState({type: e.target.value})
  },
  render: function() {
    console.log("load template: " + this.props.quiz_id)
    return (
      <div>
        <select defaultValue="" onChange={this.handleQuestionType}>
          <option value=""></option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="text">Short Answer</option>
        </select>
        <button onClick={this.onAddClicked}>Add</button>
        <AddQuestionField questions={this.state.questions} type={this.state.type} quiz_id={this.props.quiz_id} />
      </div>
    )
  }
})

var AddQuestionField = React.createClass({
  render: function() {
    var that=this
    var questionmap = this.props.questions.map(function(question) {
      console.log(that.props.type)
      if (question == "text") {
        return (
          <CreateTextQuestion type={that.props.type} quiz_id={that.props.quiz_id} />
        )
      } else {
        return (
          <CreateMultipleChoiceQuestion type={that.props.type} quiz_id={that.props.quiz_id} />
        )
      }
    })
    return (
      <div>
        {questionmap}
      </div>
    )
  }
})

var CreateTextQuestion = React.createClass ({
  getInitialState: function() {
    return {
      question_value:'',
      status: ''
    };
  },
  handleTextChange: function(e) {
    this.setState({question_value:e.target.value})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var that = this
    console.log(that.props.quiz_id)
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: {
        question_text: that.state.question_value,
        question_answer: '',
        question_type: that.props.type,
        quiz_id: that.props.quiz_id
      },
      success: function(data) {
        that.setState({status:'submitted'})
      },
      error: function(xhr, error, status) {
        console.log('error: ' + error)
        console.log('status: ' + status)
      }
    })
  },
  render: function() {
    var that = this
    if (this.state.status == "submitted") {
      return (
        <div>
          <h6>{that.state.question_value}</h6>
          <button onClick={that.handleEdit}>Edit</button>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <br/>
          <h4>Create short answer question</h4>
          <form role='form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label for="question"></label>
              <input name='question' className='form-control' type="text" onChange={this.handleTextChange} value={this.state.question_value}></input>
            </div>
            <div className="form-group">
              <br/>
              <input type="submit" />
            </div>
          </form>
        </div>
      )
    }
  }
})

var CreateMultipleChoiceQuestion = React.createClass ({
  getInitialState: function() {
    return {
      question_value:'',
      answer:'',
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      status: ''
    };
  },
  handleTextChange: function(e) {
    this.setState({question_value:e.target.value})
  },
  handleAnswer1Change: function(e) {
    this.setState({answer_1: e.target.value})
  },
  handleAnswer2Change: function(e) {
    this.setState({answer_2: e.target.value})
  },
  handleAnswer3Change: function(e) {
    this.setState({answer_3: e.target.value})
  },
  handleAnswer4Change: function(e) {
    this.setState({answer_4: e.target.value})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var that = this
    console.log(that.props.quiz_id)
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: {
        question_text: that.state.question_value,
        question_answer: that.state.answer,
        quiz_id: that.props.quiz_id,
        answer_1: that.state.answer_1,
        answer_2: that.state.answer_2,
        answer_3: that.state.answer_3,
        answer_4: that.state.answer_4,
        question_type: that.props.type
      },
      success: function(data) {
        that.setState({status:'submitted'})
      },
      error: function(xrh, error, status) {
        console.log('error: ' + error)
        console.log('status: ' + status)
      }
    })
  },
  handleEdit: function() {
    return
  },
  render: function() {
    var that = this
    if (this.state.status == "submitted") {
      return (
        <div className='dropdown'>
          <h6 className="dropdown-toggle" type="button" id="multiple-choice" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {that.state.question_value}
            <span className="caret"></span>
          </h6>
          <ul className="dropdown-menu" aria-labelledby="multiple-choice">
            <li className='drop-header'>answers:</li>
            <li>{that.state.answer_1}</li>
            <li>{that.state.answer_2}</li>
            <li>{that.state.answer_3}</li>
            <li>{that.state.answer_4}</li>
          </ul>
          <div>
            <button onClick={this.handleEdit}>Edit</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <br/>
          <form role='form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label for='question'>Question</label>
              <input name='question' className= 'form-control' type="text" onChange={this.handleTextChange} value={this.state.question_value} /> <br/>
            </div>
            <div className='form-group'>
              <input type="checkbox">A</input>
              <input type="text" onChange={this.handleAnswer1Change} value={this.state.answer_1}></input>
              <br/>
            </div>
            <div className='form-group'>
              <input type="checkbox">B</input>
              <input type="text" onChange={this.handleAnswer2Change} value={this.state.answer_2}></input>
              <br/>
            </div>
            <div className='form-group'>
              <input type="checkbox">C</input>
              <input type="text" onChange={this.handleAnswer3Change} value={this.state.answer_3}></input>
              <br/>
            </div>
            <div className='form-group'>
              <input type="checkbox">D</input>
              <input type="text" onChange={this.handleAnswer4Change} value={this.state.answer_4}></input>
              <br/>
            </div>
            <div className='form-group'>
              <input type="submit" />
            </div>
          </form>
        </div>
      )
    }
  }
})

var CurrentQuiz = React.createClass({
  render: function() {
    var quizId = this.props.quiz.id;
    var quizLink = '/lets_take_a_quiz/'+quizId;
    return (
      <div className="currentQuiz">
        <a href={quizLink}>{this.props.name}</a>
      </div>
    );
  }
});

var NoCurrentQuiz = React.createClass({
  render: function() {
    return (
      <div>
        You do not have any quizzes to take at the moment.
      </div>
    );
  }
});


var TakeAQuizTemplate = React.createClass ({
  render: function() {
    var questions = this.props.questions.map(function(question) {
      if (question.question_type == "text") {
        return (
          <ShortAnswerQuestion question={question} />
        )
      } else {
        return (
          <MultipleChoiceQuestion question={question} />
        )
      }
    })
    return (
      <div className="container">
        <form action="/lets_take_a_quiz_submit" method="post">
          <input name="authenticity_token" type="hidden" value="token_value" />
          {questions}
          <input type="submit" />
        </form>
      </div>
    )
  }
})


var ShortAnswerQuestion = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <label>{this.props.question.question_text}</label>
        <input type="textarea" name={this.props.question.id} className="form-control" />
      </div>
    )
  }
})

var MultipleChoiceQuestion = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.question.question_text}</div>
        <div className="form-group">
          <input type="radio" name={this.props.question.id} value="A"/>
          <label>{this.props.question.answer_1}</label>
        </div>
        <div className="form-group">
          <input type="radio" name={this.props.question.id} value="B"/>
          <label>{this.props.question.answer_2}</label>
        </div>
        <div className="form-group">
          <input type="radio" name={this.props.question.id} value="C"/>
          <label>{this.props.question.answer_3}</label>
        </div>
        <div className="form-group">
          <input type="radio" name={this.props.question.id} value="D"/>
          <label>{this.props.question.answer_4}</label>
        </div>
      </div>
    )
  }
})
