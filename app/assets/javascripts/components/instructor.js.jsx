var ShowInstructor = React.createClass({
  render: function(){
    var cohortlistNodes = this.props.cohorts.map(function(cohort){
      var that= this
      return(
        <div className="container">
          <h2>{cohort.name}</h2>
          <StudentBox cohort={cohort.name}/>
        </div>
      );
    });
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
    var StudentNodes = this.props.data.map(function(student){
      return(
        <Student student={student}/>
      )
    });
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
