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
				<h3>Cohort Name: {this.props.cohort.name}</h3>
				<p><strong>Cohort Description: </strong>{this.props.cohort.description}</p>
				<p> <strong>Cohort Members: </strong> {this.props.cohort.cohort_emails}</p>
			</div>
		)
	}
})


var NewCohort = React.createClass ({
	render: function() {
			return (
				<div className="container">
					<h3>Create a new cohort</h3>
					<form role="form" method="post" action="/cohorts">
						<input name="authenticity_token" type="hidden" value="token_value" />
						<div className="form-group">
							<label for="cohortName">Cohort Name</label>
							<input type="text" name="cohortName" className="form-control"/>
						</div>
						<div className="form-group">
							<label for="cohortDescription">Cohort Description</label>
							<input type="text" name="cohortDescription" className="form-control"/>
						</div>
						<div className="form-group">
							<label for="cohort_emails">Cohort Students (please enter emails separated by spaces)</label>
							<textarea ref='cohort_emails' name="cohort_emails" className="form-control" />
						</div>
							<input type="submit"/>
					</form>
				</div>
			)
		}
})

var CohortStudentSignup = React.createClass ({
	render: function() {
		console.log(this.props.cohorts)
		var cohort_dropdown = this.props.cohorts.map(function(cohort) {
			return (
				 <option name="cohort">{cohort.name}</option>
			)
		})
		return (
			<div className="container">
				<h3>Sign up for a cohort</h3>
				<form method="post" action="/student_signuppost">
				  <input name="authenticity_token" type="hidden" value="token_value" />
				  <input list="cohorts" name="cohort" />
					<datalist id="cohorts">
						{cohort_dropdown}
				  </datalist>
	  			<input type="submit" />
	  		</form>
  		</div>
		)
	}
})

var CohortInstructorSignup = React.createClass ({
	render: function() {
		console.log(this.props.cohorts)
		var cohort_dropdown = this.props.cohorts.map(function(cohort) {
			return (
				 <option name="cohort">{cohort.name}</option>
			)
		})
		return (
			<div className="container">
				<h3>Sign up for a cohort</h3>
				<form method="post" action="/instructor_signuppost">
				  <input name="authenticity_token" type="hidden" value="token_value" />
				  <input list="cohorts" name="cohort" />
					<datalist id="cohorts">
						{cohort_dropdown}
				  </datalist>
	  			<input type="submit" />
	  		</form>
  		</div>
		)
	}
})
