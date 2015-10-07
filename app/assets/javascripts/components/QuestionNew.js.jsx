var List = React.createClass({
  render: function() {
    return React.DOM.ul(null,
      this.props.children.map(function(child, index){
        return React.DOM.li(null,
          "Question: ", child, " ",
          "Answer: ", this.props.answer[index], " ",
          "Type: ",this.props.type[index],
          React.DOM.button({onClick: this.props.onDeleteItem.bind(null, index)}, "X")
        );
      }, this)
    );
  }
});

var Question_New = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      answers: [],
      types: []
    };
  },

  render: function() {
     return (
       <div>
         <List onDeleteItem={this.onDeleteItem} answer={this.state.answers} type={this.state.types}>
            {this.state.items}
         </List>
         <input ref='new_item' placeholder="Enter Question Here" />
         <input ref='new_item_answer' placeholder="Enter Answer Here"/>
         <select defaultValue="text" ref='new_item_type'>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="text">Short Answer</option>
          </select>
         <button onClick={this.onAddClicked}>Add</button>
       </div>
     );
   },

  onAddClicked: function() {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    var newTypes = this.state.types;
    newAnswers.push(this.refs.new_item_answer.getDOMNode().value);
    newItems.push(this.refs.new_item.getDOMNode().value);
    newTypes.push(this.refs.new_item_type.getDOMNode().value);
    this.setState({items: newItems, answers: newAnswers, types: newTypes});
  },

  onDeleteItem: function(index) {
    var newItems = this.state.items.slice();
    var newAnswers = this.state.answers.slice();
    var newTypes = this.state.types;
    newItems.splice(index, 1);
    newAnswers.splice(index, 1);
    newTypes.splice(index, 1);
    this.setState({items: newItems, answers: newAnswers, types: newTypes});
  }
});

var ListItem = React.createClass({
  render: function() {
     return (
       <p> {this.props.question} </p>
     );
  }
});
