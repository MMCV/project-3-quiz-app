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
    var quizz = this.props.quizzes.map(function(quiz) {
      return (
        <div>
          <Quiz name={quiz.name} description={quiz.description} adate={quiz.assigned_date} />
        </div>
      )
    })
    return (
      <div>{quizz}</div>
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
    return {name: '', description: '', assigned_date: '', submit: 'false',  data: {}};
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
          <Question_New quiz={this.state.data} />
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

var List = React.createClass({
  render: function() {
    return React.DOM.ul(null,
      this.props.children.map(function(child, index){
        return React.DOM.li(null,
          "Question: ", child, " ",
          "Answer: ", this.props.answer[index], " ",
          "Type: ",this.props.type[index],
          React.DOM.button({onClick: this.props.onDeleteItem.bind(null, index)}, "X")
        );
      }, this)
    );
  }
});

var Question_New = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      answers: [],
      types: [],
      question_text: '',
      question_answer: '',
      question_type: ''
    };
  },

  handleQuestionTextChange: function(e) {
    this.setState({question_text:e.target.value})
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var that = this
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: {
        question_text: that.state.question_text
      },
      success: function(results, success) {
        that.setState({data:results})
        console.log(that.state.question_text)
      },
      error: function(xhr, error, status) {
        console.log('error: '+ error)
      }
    })
  },

  render: function() {
     return (
       <div>
       <h3> {this.props.quiz.name} </h3>
         <List onDeleteItem={this.onDeleteItem} answer={this.state.answers} type={this.state.types}>
            {this.state.items}
         </List>
         <input ref='new_item' value={this.state.question_text}  onChange={this.handleQuestionTextChange} placeholder="Enter Question Here" />
         <input ref='new_item_answer' placeholder="Enter Answer Here"/>
         <select defaultValue="text" ref='new_item_type'>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="text">Short Answer</option>
          </select>
         <button onClick={this.onAddClicked}>Add</button>
       </div>
     );
   },

  onAddClicked: function() {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    var newTypes = this.state.types;
    newAnswers.push(this.refs.new_item_answer.getDOMNode().value);
    newItems.push(this.refs.new_item.getDOMNode().value);
    newTypes.push(this.refs.new_item_type.getDOMNode().value);
    this.setState({items: newItems, answers: newAnswers, types: newTypes});
  },

  onDeleteItem: function(index) {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    var newTypes = this.state.types;
    newItems.splice(index, 1);
    newAnswers.splice(index, 1);
    newTypes.splice(index, 1);
    this.setState({items: newItems, answers: newAnswers, types: newTypes});
  }
});

var ListItem = React.createClass({
  render: function() {
     return (
       <p> {this.props.question} </p>
     );
  }
});
