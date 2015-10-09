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
    return {first_name: '', last_name: '', email: '', password: '', password_confirmation: '', type: 'Student', submit: 'false', data: {}}
  },
  handleFnameChange: function(e) {
    this.setState({first_name:e.target.value})
  },
  handleLnameChange: function(e) {
    this.setState({last_name:e.target.value})
  },
  handleEmailChange: function(e) {
    this.setState({email:e.target.value})
  },
  handlePwordChange: function(e) {
    this.setState({password:e.target.value})
  },
  handleCPwordChange: function(e) {
    this.setState({password_confirmation:e.target.value})
  },
  handleTypeChange: function(e) {
    console.log(this.state.type)
    this.setState({type:e.target.value})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.state.type)
    var that = this
    $.ajax({
      url: '/users',
      method: 'POST',
      data: {
        first_name: that.state.first_name,
        last_name: that.state.last_name,
        email: that.state.email,
        password: that.state.password,
        password_confirmation: that.state.password_confirmation,
        type: that.state.type
      },
      success: function(results, success, xhr) {
        that.setState({data:results})
        that.setState({submit:'true'})
      },
      error: function(xhr, error, status) {
        console.log(that.state)
        console.log('error: ' + error)
        console.log(': ' + status)
      }
    })
  },
  render: function() {
    if ( this.state.submit == "true") {
      console.log(this.state.data)
      return (
        <div className="container">
          <ShowUser user={this.state.data} />
        </div>
      )
    } else {
      return (
        <div className="container">
          <h3>Create a new user</h3>
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="firstname">First Name</label>
              <input type="text" name="firstname" className="form-control" value={this.state.first_name} onChange={this.handleFnameChange}/>
            </div>

            <div className="form-group">
              <label for="lastname">Last Name</label>
              <input type="text" name="lastname" className="form-control" value={this.state.last_name} onChange={this.handleLnameChange}/>
            </div>

            <div className="form-group">
              <label for="email">Email</label>
              <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>

            <div className="form-group">
              <label for="password">Password</label>
              <input type="text" name="password" className="form-control" value={this.state.password} onChange={this.handlePwordChange}/>
            </div>

            <div className="form-group">
              <label for="passconfirm">Password Confirm</label>
              <input type="text" name="passconfirm" className="form-control" value={this.state.password_confirmation} onChange={this.handleCPwordChange}/>
            </div>

            <div className="form-group">
              <label for="usertype">Instructor or Student? </label>
              <select name="usertype" className="form-control" defaultValue="Student" onChange={this.handleTypeChange}>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            <div className="form-group">
              <input type="submit" value="Sign Up"/>
            </div>

          </form>
        </div>
      )
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
  render: function() {
    return (
      <div>
        <h2>Log in please</h2>
        <form method="post" action="/login_attempt">
          <input name="authenticity_token" type="hidden" value="token_value" />
          <input type="text" name="email" />
          <input type="text" name="password" />
          <input className="btn-default" type="submit" />
        </form>
      </div>
    )
  }
})
