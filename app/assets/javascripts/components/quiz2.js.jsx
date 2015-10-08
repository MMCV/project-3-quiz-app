var CreateQuizTemplate = React.createClass({
	getInitialState: function() {
		return {questions: [], type:''}
	},
	onAddClicked: function(e) {
		this.state.questions.push(this.state.type)
		console.log(this.state.questions)
		this.setState({type: this.state.type})
	},
	handleQuestionType: function(e) {
		this.setState({type: e.target.value})
	},
	render: function() {
		return (
			<div>
				<select defaultValue="" onChange={this.handleQuestionType}>
					<option value=""></option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="text">Short Answer</option>
        </select>
        <button onClick={this.onAddClicked}>Add</button>
				<AddQuestionField questions={this.state.questions} quiz_id={this.props.quiz_id} />
			</div>
		)
	}
})

var AddQuestionField = React.createClass({
	getInitialState: function() {
    return {
      question_value:'',
      answer:'',
      mChoiceAnswers:[],
      status: ''
    };
	},
	handleTextChange: function(e) {
		this.setState({question_value:e.target.value})
		console.log(this.state.question_value)
	},
	handleSubmit: function(e) {
		if (this.props.question == 'text' ) {
			e.preventDefault();
			var that = this
			$.ajax({
				url: '/questions',
				method: 'POST',
				data: {
					question_text: that.state.question_value,
					question_answer: that.state.answer,
					multiple_choice_questions: that.state.mChoiceAnswers,
					quiz_id: 1
				},
				success: function() {
					console.log('fu')
					that.setState({status:'submitted'})
				},
				error: function(xrh, error, status) {
					console.log('error: ' + error)
					console.log('status: ' + status)
				}
			})
		} else {
			e.preventDefault();
			var that = this
			$.ajax({
				url: '/questions',
				method: 'POST',
				data: {
					question_text: that.state.question_value,
					quiz_id: 1
				},
				success: function() {
					console.log('fu')
					that.setState({status:'submitted'})
				},
				error: function(xhr, error, status) {
					console.log('error: ' + error)
					console.log('status: ' + status)
				}
			})
		}
	},
	render: function() {
		var that=this
		var questionmap = this.props.questions.map(function(question) {
			if (question == "text") {
				return (
					<div>
					<br/>
						<h4>Create short answer question</h4>
						<form onSubmit={that.handleSubmit}>
							<input type="text" onChange={that.handleTextChange} value={that.state.question_value} />
							<br/>
							<input type="submit" />
						</form>
					</div>
				)
			} else {
				return (
					<div>
						<br/>
						<form onSubmit={that.handleSubmit}>
							<input type="text" onChange={that.handleTextChange} value={that.state.question_value} /> <br/>
							<input type="checkbox">A</input>
							<input type="text"></input>
							<br/>
							<input type="checkbox">B</input>
							<input type="text"></input>
							<br/>
							<input type="checkbox">C</input>
							<input type="text"></input>
							<br/>
							<input type="checkbox">D</input>
							<input type="text"></input>
							<br/>
							<input type="submit" />
						</form>
					</div>
				)
			}
		})
		return (
			<div>
				{questionmap}
			</div>
		)
	}
})


var QuestionList = React.createClass({
	render: function() {
		if (this.props.questions.length > 0){
			var questions = this.props.questions.map(function(question) {
				return (
					<div>
						<QuestionNode question={question} />
					</div>
				)
				return (
					<div>
						{questions}
					</div>
				)
			})
		} else {
			return (
				<div>No questions to display</div>
			)
		}
	}
})


var QuestionNode = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.question}
			</div>
		)
	}
})