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
    return {first_name: '', last_name: '', email: '', password: '', password_confirmation: '', type: '', submit: 'false', data: {}}
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
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.first_name} onChange={this.handleFnameChange}/>
            <input type="text" value={this.state.last_name} onChange={this.handleLnameChange}/>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
            <input type="text" value={this.state.password} onChange={this.handlePwordChange}/>
            <input type="text" value={this.state.password_confirmation} onChange={this.handleCPwordChange}/>
            <select>
              <option onSelect={this.handleTypeChange} value="Student">Student</option>
              <option onSelect={this.handleTypeChange} value="Instructor">Instructor</option>
            </select>
            <input type="submit"/>
          </form>
        </div>
      )
    }
  }
})

var ShowUser = React.createClass ({
  render: function() {
    return (
      <div className="container">
        <h3>Hello {this.props.user.first_name} {this.props.user.last_name}</h3>
      </div>
    )
  }
})

var UserLogin = React.createClass({
  getInitialState: function() {
    return {email:'', password: '', submit: 'false', data:{}}
  },
  handleLoginChange: function(e) {
    this.setState({email: e.target.value})
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var that = this
    $.ajax({
      url: '/login_attempt',
      method: 'POST',
      data: {
        email: that.state.email,
        password: that.state.password
      },
      success: function(results, success, xhr) {
        that.setState({data:results})
        that.setState({submit:'true'})
      },
      error: function(xhr, error, status) {
        console.log("error: " + error)
        console.log("status " + status)
      }
    })    
  },
  render: function() {
    if (this.state.submit == "false") {
      return (
        <div>
          <h2>Log in please</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.email} onChange={this.handleLoginChange}/>
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
            <input type="submit"/>
          </form>
        </div>
      )
    } else {
      console.log(this.state.data)
      return (
        <div>
          <ShowUser user={this.state.data} />
        </div>
      )
    }
  }
})