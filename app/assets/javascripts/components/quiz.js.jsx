var Quiz = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.node,
    assignedDate: React.PropTypes.node
  },

  render: function() {
    return (
      <div>
        <div>"Hello!"</div>
        <div>Name: {this.props.name}</div>
        <div>Description: {this.props.description}</div>
        <div>Assigned Date: {this.props.assignedDate}</div>
      </div>
    );
  }
});
