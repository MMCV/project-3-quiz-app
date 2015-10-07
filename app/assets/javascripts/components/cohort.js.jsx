var CohortIndex = React.createClass ({
	render: function() {
		var cohorts = this.props.cohorts.map(function(cohort) {
			return (
				<div>
					<ShowCohort cohort={cohort} />
				</div>
			)
		})
		return (
			<div>
				{cohorts}
			</div>
		)
	}
})

var ShowCohort = React.createClass ({
	render: function() {
		return (
			<div className="container">
				<h3>Hello {this.props.cohort.name}</h3>
				<p>{this.props.cohort.description}</p>
			</div>
		)
	}
})


var NewCohort = React.createClass ({
	getInitialState: function() {
		return {name:'', description:'', submit: 'false', data:{}}
	},
	handleNameChange: function(e) {
		this.setState({name:e.target.value})
	},
	handleDescriptionChange: function(e) {
		this.setState({description:e.target.value})
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var that = this
		$.ajax({
			url: '/cohorts',
			method: 'POST',
			data: {
				name: that.state.name,
				description: that.state.description
			},
			success: function(results, success, xhr) {
				that.setState({data:results})
				that.setState({submit:'true'})
			}
		})
	},
	render: function() {
		if ( this.state.submit == "true") {
			console.log(this.state.data)
			return (
				<div className="container">
					<ShowCohort cohort={this.state.data} />
				</div>
			)
		} else {
			return (
				<div className="container">
					<h3>Create a new cohort</h3>
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.name} onChange={this.handleNameChange}/>
						<input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
						<input type="submit"/>
					</form>
				</div>
			)
		}
	}
})