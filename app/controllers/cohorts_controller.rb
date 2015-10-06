class CohortsController < ApplicationController

	def show
		@cohort = Cohort.find(params[:id])
		render component: 'ShowCohort', props: { cohort: @cohort }
	end

	def new
		render component: 'NewCohort'
	end

	def create
		@cohort = Cohort.find(1)
		render component: 'ShowCohort', props: { cohort: @cohort }
	end
end