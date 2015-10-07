var StudentQuizIndex = React.createClass({
  render: function() {
    return (
      <div className="student-container">
        <StudentName student={this.props.student}/>
        <StudentQuizList quizzes={this.props.quizzes}/>
      </div>
    );
  }
});

var StudentName = React.createClass({
  render: function() {
    return (
      <h2 className="student-name">Welcome, {this.props.student.first_name}!</h2>
    );
  }
});

var StudentQuizList = React.createClass({
  render: function() {
    var studentQuizNodes = this.props.quizzes.map(function(quiz){
      return (
        <StudentQuiz quizName={quiz}/>
      );
    });
    return (
      <div className="quiz-list">
        {studentQuizNodes}
      </div>
    );
  }
});

var StudentQuiz = React.createClass({
  render: function() {
    return (
      <div className="studentQuiz">
        {this.props.quizName}
      </div>
    );
  }
});
