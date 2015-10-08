class CohortsController < ApplicationController


	def show
		cohort = Cohort.find(params[:id])
		render component: 'ShowCohort', props: { cohort: cohort }
	end

	def new
		render component: 'NewCohort'
	end

	def create
		cohort = Cohort.new(name: params[:name], description: params[:description])
		if cohort.save
			render json: cohort
		end
	end

	def index
		cohorts = Cohort.all
		render component: 'CohortIndex', props: { cohorts: cohorts}
	end
end