require 'pry'

class CohortsController < ApplicationController

	def show
		@cohort = Cohort.find(params[:id])
		render component: 'ShowCohort', props: { cohort: @cohort }
	end

	def new
		render component: 'NewCohort'
	end

	def create
		@cohort = Cohort.create(name: params[:name], description: params[:description])
		render json: @cohort
	end

	def index

	end
end