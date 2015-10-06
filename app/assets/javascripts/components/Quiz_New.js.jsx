var Quiz_New = React.createClass({
  var questions = []
  getInitialState: function(){

  };

  render: function() {
    return (
      <form className="quiz-new">
        <input type="text" ref="question-text"></input>
        <input type="text" ref="question-answer"></input>
        <select>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="text">Multiple Choice</option>
        </select>
        <input type="submit" value="submit"></input>
        <input type="submit" className="btn btn-default" value="add a question?"></input>
      </form>
    );
  }
});

// push.question.array
refs in each input
