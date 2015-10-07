// var Quiz_New = React.createClass({
//   var questions = []
//   getInitialState: function(){
//
//   };
//
//   render: function() {
//     return (
//       <form className="quiz-new">
//         <input type="text" ref="question-text"></input>
//         <input type="text" ref="question-answer"></input>
//         <select>
//           <option value="multiple-choice">Multiple Choice</option>
//           <option value="text">Multiple Choice</option>
//         </select>
//         <input type="submit" value="submit"></input>
//         <input type="submit" className="btn btn-default" value="add a question?"></input>
//       </form>
//     );
//   }
// });
//
// // push.question.array
// refs in each input
//
// the input stacks down...on click pushes each

var List = React.createClass({
  render: function() {
    return React.DOM.ul(null,
      this.props.children.map(function(child, index){
        return React.DOM.li(null,
          child,
          this.props.answer,
          React.DOM.button({onClick: this.props.onDeleteItem.bind(null, index)}, "X")
        );
      }, this)
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      answers: []
    };
  },

  render: function() {
     return (
       <div>
         <List onDeleteItem={this.onDeleteItem} answer={this.state.answers}>
             {this.state.items}
         </List>
         <input ref='new_item' placeholder="Enter Question Here" />
         <input ref='new_item_answer' placeholder="Enter Answer Here"/>
         <button onClick={this.onAddClicked}>Add</button>
       </div>
     );
   },

  onAddClicked: function() {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    newAnswers.push(this.refs.new_item_answer.getDOMNode().value);
    newItems.push(this.refs.new_item.getDOMNode().value);
    this.setState({items: newItems, answers: newAnswers});
  },

  onDeleteItem: function(index) {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    newItems.splice(index, 1);
    newAnswers.splice(index, 1);
    this.setState({items: newItems, answers: newAnswers});
  }
});
