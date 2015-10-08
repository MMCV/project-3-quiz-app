var QuizIndex = React.createClass({
  render: function() {
    console.log('test')
    return (
      <div>
        <div>"Hello!"</div>
        <div><QuizList quizzes={this.props.quizzes} /></div>
      </div>
    );
  }
});

var QuizList = React.createClass({
  render: function() {
    var quiz = this.props.quizzes.map(function(quiz) {
      return (
        <div>
          <Quiz name={quiz.name} description={quiz.description} adate={quiz.assigned_date} />
        </div>
      )
    })
    return (
      <div>{quiz}</div>
    )
  }
})

var Quiz = React.createClass({
  render: function() {
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>Description: {this.props.description}</div>
        <div>Assigned Date: {this.props.adate}</div>
      </div>
    )
  }
})

var NewQuiz = React.createClass({
  getInitialState: function(){
    return {name: '', description: '', assigned_date: '', submit: 'false',  data: {}, quiz_id:0};
  },

  handleNameChange: function(event) {
    this.setState({name:event.target.value})
  },

  handleDescriptionChange: function(event) {
    this.setState({description:event.target.value})
  },

  handleDateChange: function(event) {
    this.setState({assigned_date:event.target.value})
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var that = this;
    var date = new Date(this.state.assigned_date);
    $.ajax({
      url: '/quizzes',
      method: 'POST',
      data: {
        name: that.state.name,
        description: that.state.description,
        assigned_date: date
      },
      success: function(results, success) {
        that.setState({data:results})
        that.setState({submit:'true'})
        that.setState({quiz_id: results.id})
      },
      error: function(xhr, error, status) {
        console.log(that.state)
        console.log('error : '+ error)
      }
    })
  },

  render: function() {
    if (this.state.submit == "true") {
      return(
        <div className="container">
          <CreateQuestionTemplate quiz_id={this.state.quiz_id} />
        </div>
      )
    } else {
      return (
        <div className="container">
          <h2> Create a Quiz </h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Quiz Name"/>
            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Quiz Description"/>
            <input type="text" value={this.state.assigned_date} onChange={this.handleDateChange} placeholder="YYYY-MM-DD"/>

            <input type="submit" value="Create Quiz"/>
          </form>
        </div>
      )
    }
  }
});

var ShowQuiz = React.createClass ({
  render: function() {
    return (
      <div className="container">
        <h3> {this.props.quiz.name} </h3>
        <p> {this.props.quiz.description} </p>
        <p> {this.props.quiz.assigned_date} </p>
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
          <CreateTextQuestion type={that.props.type} />
        )
      } else {
        return (
          <CreateMultipleChoiceQuestion type={that.props.type} />
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
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: {
        question_text: that.state.question_value,
        question_answer: '',
        question_type: that.props.type,
        quiz_id: 1
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
          <h4>{that.state.question_value}</h4>
          <button onClick={that.handleEdit}>Edit</button>
        </div>
      )
    } else {
      return (
        <div>
          <br/>
          <h4>Create short answer question</h4>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleTextChange} value={this.state.question_value} />
            <br/>
            <input type="submit" />
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
    console.log(that.props.type)
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: {
        question_text: that.state.question_value,
        question_answer: that.state.answer,
        quiz_id: 1,
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
        <div>
          <h4>{that.state.question_value}</h4>
          <ul>
            <li>{that.state.answer_1}</li>
            <li>{that.state.answer_2}</li>
            <li>{that.state.answer_3}</li>
            <li>{that.state.answer_4}</li>
          </ul>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      )
    } else {
      return (
        <div>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleTextChange} value={this.state.question_value} /> <br/>
            <input type="checkbox">A</input>
            <input type="text" onChange={this.handleAnswer1Change} value={this.state.answer_1}></input>
            <br/>
            <input type="checkbox">B</input>
            <input type="text" onChange={this.handleAnswer2Change} value={this.state.answer_2}></input>
            <br/>
            <input type="checkbox">C</input>
            <input type="text" onChange={this.handleAnswer3Change} value={this.state.answer_3}></input>
            <br/>
            <input type="checkbox">D</input>
            <input type="text" onChange={this.handleAnswer4Change} value={this.state.answer_4}></input>
            <br/>
            <input type="submit" />
          </form>
        </div>
      )
    }
  }
})
