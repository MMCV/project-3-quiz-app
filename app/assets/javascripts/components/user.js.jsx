var User = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user) {
    return (
      <div className='user'>
        <h3>{user.first_name} {user.last_name}</h3>
        <div>{user.email}</div>
      </div>
    );
  });
  return (
    <div className='userListing'>
      <h1 className='users'>Users:</h1>
        {userNodes}
    </div>
    );
  }
});
