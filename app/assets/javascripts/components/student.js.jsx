var StudentQuizIndex = React.createClass({
  render: function() {
    return (
      <div className=" container studentContainer">
        <StudentName student={this.props.student}/>
        <a href="/quiz">{this.props.message}</a>
        <StudentQuizList quizzes={this.props.quizzes}/>
        <a href="/studentsignup">Sign up for a cohort</a>
      </div>
    );
  }
});

var StudentName = React.createClass({
  render: function() {
    return (
      <div className="studentNameContainer">
        <h2 className="studentName">Welcome, {this.props.student.first_name}!</h2>
      </div>
    );
  }
});

var StudentQuizList = React.createClass({
  render: function() {
    var studentQuizNodes = this.props.quizzes.map(function(quiz){
      return(
        <StudentQuiz quizName={quiz.quiz.name} gradeValue={quiz.grade}/>
      );
    });
    return (
      <div className="quizList">
        <div>Here are the quizzes you have taken:</div>
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

var UnauthorizedStudentAccess = React.createClass({
  render: function() {
    return (
      <h1>You are not authorized to view this page!</h1>
    );
  }
});

var InstructorStudentQuizIndex = React.createClass({
  render: function() {
    return (
      <div className="studentContainer">
        <h2>Quizzes {this.props.student.first_name} {this.props.student.last_name} has taken:</h2>
        <InstructorStudentQuizList quizzes={this.props.quizzes}/>
      </div>
    );
  }
});


var InstructorStudentQuizList = React.createClass({
  render: function() {
    var studentQuizNodes = this.props.quizzes.map(function(quiz){
      return(
        <InstructorStudentQuiz quizName = {quiz.quiz.name} gradeValue = {quiz.grade}/>
      );
    });
    return (
      <div className="quizList">
        {studentQuizNodes}
      </div>
    );
  }
});

var InstructorStudentQuiz = React.createClass({
  render: function() {
    return (
      <div className="studentQuiz">
        Quiz: {this.props.quizName} Score :{this.props.gradeValue}%
      </div>
    );
  }
});
