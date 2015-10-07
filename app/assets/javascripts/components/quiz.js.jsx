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
