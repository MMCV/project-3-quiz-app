var InstructorBox = React.createClass({
  render: function(){
    return (
      <div className = "container">
        <a href="/instructorsignup">Sign up for a cohort</a>
        <button><a href= "/cohorts/new">New Cohort</a></button>
        <h3> Your cohorts: </h3>
        <ShowInstructor cohorts={this.props.cohorts}/>
        <button><a href="/quizzes/new">New Quiz</a></button>
        <button><a href='/quizzes'>All Quizzes</a></button>
      </div>
    )
  }
})
var ShowInstructor = React.createClass({
  render: function(){

    if(this.props.cohorts){
      var cohortlistNodes = this.props.cohorts.map(function(cohort){
        return(
          <div className="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <h5>{cohort.name}</h5>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li className = "dropdown-header ">Students: </li>
              <StudentBox cohort={cohort.name}/>
              <li className = "dropdown-header"> Quizzes: </li>
              <InstructorQuizBox cohort={cohort.name}/>
            </ul>
          </div>
        );
      });
    }else{
      cohortlistNodes=[]
    }
    return (
      <div className='dropdown'>
        {cohortlistNodes}
      </div>
    );
  }
});

var StudentBox = React.createClass({
  getInitialState: function(){


    return{student: [], cohort: ''};
  },

  componentDidMount: function(){
    this.loadStudents(this.props.cohort)
  },

  loadStudents: function(cohort){

     console.log(this.props.cohort)
    $.ajax({
      url: '/studentlists',
      method: 'get',
      dataType: "json",
      data: {name: this.props.cohort},
      success: function(result,status){
        console.log('help');
        console.log("result:", result);
        this.setState({student: result})
      }.bind(this),
      error: function(xhr,status,error){
        console.log(status, error)
      }
    });
  },

    render:function(){
      return(
        <StudentList data={this.state.student}/>
      )
    }
});


var StudentList = React.createClass({
  render:function(){
    if (this.props.data){
      var StudentNodes = this.props.data.map(function(student){
        return(
          <Student student={student}/>
        )
      });
    }else{
      StudentNodes =[]
    }
    return(
      <li>
        {StudentNodes}
      </li>
    )
  }

})

var Student = React.createClass({
  render:function(){
    var studentId = this.props.student.id;
    var studentLink = '/students/'+studentId;

    return(
      <li><a href={studentLink}>{this.props.student.first_name} {this.props.student.last_name} </a></li>
    )
  }
})

var InstructorQuizBox = React.createClass({
  getInitialState: function(){
    return{quiz: [], cohort: ''};
  },

  componentDidMount: function(){
    this.loadQuizzes(this.props.cohort)
  },


  loadQuizzes: function(cohort){
    $.ajax({
      url: '/quizlist',
      method: 'get',
      dataType: "json",
      data: {name: this.props.cohort},
      success: function(result,status){
        console.log('help');
        console.log("result:", result);
        this.setState({quiz: result})
      }.bind(this),
      error: function(xhr,status,error){
        console.log(status, error)
      }
    });
  },
    render:function(){
      console.log(this.state.quiz)
      return(
        <InstructorQuizList data={this.state.quiz}/>
      )
    }
});

var InstructorQuizList = React.createClass({
  render:function(){
    if (this.props.data){
      var QuizNodes = this.props.data.map(function(quiz){
        return(
          <InstructorQuiz quiz={quiz}/>
        )
      });
    }else{
      QuizNodes=[]
    }
    return(
      <div>
        {QuizNodes}
      </div>
    )
  }
})

var InstructorQuiz = React.createClass({
  render:function(){
    console.log(this.props.quiz.id);
    var quizLink = "/quizzes/"+(this.props.quiz.id)
    return(
      <li><a href={quizLink}>{this.props.quiz.name}</a></li>
    )
  }
})
