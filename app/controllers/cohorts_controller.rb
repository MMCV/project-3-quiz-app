class CohortsController < ApplicationController


	def show
		@cohort = Cohort.find(params[:id])
		render component: 'ShowCohort', props: { cohort: @cohort }
	end

	def new
		render component: 'NewCohort'
	end

	def create
		@cohort = Cohort.new(name: params[:cohortName], description: params[:cohortDescription], cohort_emails: params[:cohort_emails])
		@cohortmembers = @cohort.cohort_emails
		if @cohort.save
			current_user.cohorts << @cohort
			UserMailer.welcome_email(@cohort).deliver_now
			redirect_to cohort_path(@cohort)
		end
	end

	def index
		@cohorts = Cohort.all
		render component: 'CohortIndex', props: { cohorts: @cohorts}
	end

	def student_signup
		@cohorts = Cohort.all
		render component: 'CohortStudentSignup', props: { cohorts: @cohorts }
	end

	def student_signuppost
		@cohort = Cohort.find_by(name: params[:cohort])
		current_user.cohorts << @cohort
		redirect_to cohort_path(@cohort)
	end

	def instructor_signup
		@cohorts = Cohort.all
		render component: 'CohortInstructorSignup', props: { cohorts: @cohorts }
	end

	def instructor_signuppost
		@cohort = Cohort.find_by(name: params[:cohort])
		current_user.cohorts << @cohort
		redirect_to cohort_path(@cohort)
	end
end
