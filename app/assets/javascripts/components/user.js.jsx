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
