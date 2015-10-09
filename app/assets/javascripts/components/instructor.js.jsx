var ShowInstructor = React.createClass({
  render: function(){

    if(this.props.cohorts){
      var cohortlistNodes = this.props.cohorts.map(function(cohort){
        return(
          <div className="container">
            <h2>{cohort.name} Students: </h2>
            <StudentBox cohort={cohort.name}/>
            <h2>{cohort.name} Quizzes: </h2>
            <InstructorQuizBox cohort={cohort.name}/>
          </div>
        );
      });
    }else{
      cohortlistNodes=[]
    }
    return (
      <div className='cohort'>
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
      <div>
        {StudentNodes}
      </div>
    )
  }

})

var Student = React.createClass({
  render:function(){
    return(
      <div><a href="#">{this.props.student.first_name} {this.props.student.last_name} </a></div>
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
          <InstructorQuiz quiz={quiz.name}/>
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
    console.log(this.props.quiz.name)
    return(
      <div><a href="#">{this.props.quiz}</a></div>
    )
  }
})
