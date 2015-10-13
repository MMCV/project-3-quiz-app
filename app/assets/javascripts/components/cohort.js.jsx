var CohortIndex = React.createClass ({
	render: function() {
		var cohorts = this.props.cohorts.map(function(cohort) {
			return (
					<ShowCohort cohort={cohort} />
			)
		})
		return (
			<div className="container">
				<h3>Cohorts</h3>
				{cohorts}
			</div>
		)
	}
})

var ShowCohort = React.createClass ({
	render: function() {
		var cohortLink = "/cohorts/"+(this.props.cohort.id)
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<a href={cohortLink}><h4>{this.props.cohort.name}</h4></a>
				</div>
				<div className="panel-body"><strong>Cohort Description: </strong>{this.props.cohort.description}</div>
				<div className="panel-body"><strong>Cohort Members: </strong> {this.props.cohort.cohort_emails}</div>
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
					<input className="btn btn-default" type="submit"/>

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
				<form method="post" action="/student_signuppost">
				  <input name="authenticity_token" type="hidden" value="token_value" />
					<div className="form-group">
						<input list="cohorts" name="cohort" className="form-control"/>
						<datalist id="cohorts">
							{cohort_dropdown}
					  </datalist>
					</div>
	  			<input className="btn-primary btn-lg btn-block" type="submit" value="Join Cohort" />
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
				<form method="post" action="/instructor_signuppost">
					<input name="authenticity_token" type="hidden" value="token_value" />
					<div className="form-group">
						<input list="cohorts" name="cohort" className="form-control"/>
						<datalist id="cohorts">
							{cohort_dropdown}
						</datalist>
					</div>
					<input className="btn-primary btn-lg btn-block" type="submit" value="Join Cohort" />
				</form>
			</div>
		)
	}
})
