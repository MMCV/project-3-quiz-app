var StudentQuizIndex = React.createClass({
  render: function() {
    return (
      <div className="studentContainer">
        <StudentName student={this.props.student}/>
        <StudentQuizList quizzes={this.props.quizzes}/>
      </div>
    );
  }
});

var StudentName = React.createClass({
  render: function() {
    return (
      <div className="studentNameContainer">
        <h2 className="studentName">Welcome, {this.props.student.first_name}!</h2>
        <div>Here are the quizzes you have taken:</div>
        <a href="/studentsignup">Sign up for a cohort</a>
      </div>
    );
  }
});

var StudentQuizList = React.createClass({
  render: function() {
    var studentQuizNodes = this.props.quizzes.map(function(quiz){
      return(
        <StudentQuiz quizName = {quiz.quiz.name} gradeValue = {quiz.grade}/>
      );
    });
    return (
      <div className="quizList">
        {studentQuizNodes}
      </div>
    );
  }
});

var StudentQuiz = React.createClass({
  render: function() {
    return (
      <div className="studentQuiz">
        {this.props.quizName}. Your grade: {this.props.gradeValue}%
      </div>
    );
  }
});
