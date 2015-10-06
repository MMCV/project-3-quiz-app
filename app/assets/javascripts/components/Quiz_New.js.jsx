var Quiz_New = React.createClass({
  render: function() {
    return (
      <form className="quiz-new">
        <input type="text"></input>
        <input type="text"></input>
        <input type="submit" value="submit"></input>
        <button className="btn btn-default">Add a question?</button>
      </form>
    );
  }
});
