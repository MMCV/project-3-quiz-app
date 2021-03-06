var User = React.createClass({
  render: function() {
    var studentNodes = this.props.students.map(function(student) {
    return (
      <div className='student'>
        <h3>{student.first_name} {student.last_name}</h3>
        <div>{student.email}</div>
      </div>
    );
  });
  var instructorNodes = this.props.instructors.map(function(instructor) {
    return (
      <div className='instructor'>
        <h3>{instructor.first_name} {instructor.last_name}</h3>
        <div>{instructor.email}</div>
      </div>
    );
  });
  return (
    <div className='userListing'>
      <div className='instructorListing'>
        <h1 className='instructors'>Instructors:</h1>
          {instructorNodes}
      </div>
      <div className='studentListing'>
        <h1 className='students'>Students:</h1>
          {studentNodes}
      </div>
    </div>
    );
  }
});


var UserNew = React.createClass({
  getInitialState: function() {
    return {usertype: "Student", token: ''}
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  handleTypeChange: function(e) {
    this.setState({usertype: e.target.value})
  },
  render: function() {

    return (
      <div className="container">
        <h3>Create a new user</h3>
        <form role="form" method="post" action="/users">
          <input name="authenticity_token" type="hidden" value={this.state.token} />
          <div className="form-group">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" className="form-control" />
          </div>

          <div className="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" className="form-control" />
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" className="form-control" />
          </div>

          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" className="form-control" />
          </div>

          <div className="form-group">
            <label for="password_confirmation">Password Confirm</label>
            <input type="password" name="password_confirmation" className="form-control" />
          </div>

          <div className="form-group">
            <label>Instructor or Student? </label>
            <select name="type" className="form-control" defaultValue="Student" onChange={this.handleTypeChange} >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          <div className="form-group">
            <CohortSelectOption className="form-control" usertype={this.state.usertype} cohorts={this.props.cohorts} />
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Sign Up"/>
          </div>

        </form>
      </div>
    )
  }
})

var CohortSelectOption = React.createClass({
  render: function() {
    var cohort_select = this.props.cohorts.map(function(cohort) {
      return (
        <option name="cohort" value={cohort.id}>{cohort.name}</option>
      )
    })
    if (this.props.usertype == "Student"){
      return (
        <div className="form-group">
          <label>Select a cohort to join</label>
          <div className="form-group">
            <select name="cohort" className="form-control">

              {cohort_select}
            </select>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
})

var ShowUser = React.createClass ({
  render: function() {
    var divStyle = {width: '40%'};
    return (
      <div>
      <div className="jumbotron">
        <div className="container">
          <h1>Hello {this.props.user.first_name} {this.props.user.last_name}</h1>
        </div>
      </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={divStyle}>
          <span className="sr-only">60% Complete</span>
          </div>
        </div>
      </div>
    )
  }
})

var UserLogin = React.createClass({
  getInitialState: function() {
    return {token: ''}
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  render: function() {
    return (
      <div className = 'container'>
        <h2>Please Log In</h2>
        <form role='form' method="post" action="/login_attempt">
          <input name="authenticity_token" type="hidden" value={this.state.token} />
            <div className="form-group">
              <label for="email">Email:</label>
              <input type="text" name="email" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="password">Password:</label>
              <input type="password" name="password" className='form-control'/>
            </div>
            <div className='form-group'>
              <input className="btn btn-default" type="submit" />
            </div>
        </form>
      </div>
    )
  }
})
