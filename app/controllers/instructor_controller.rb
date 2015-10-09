require 'pry'

class InstructorController < ApplicationController

  def show
    @user_id = current_user.id
    @instructor = Instructor.find(@user_id)
    @instructor_cohort = @instructor.cohorts
    render component: 'ShowInstructor', props: {instructor: @instructor, cohorts: @instructor_cohort, students: @student_list}
  end

  def studentlist
    # @cohort = Instructor.find(@user_id).cohorts.find(params[:id])
    # @student_list = @cohort.users.where(:type=>'Student')

    @cohort = Cohort.find_by(name: params[:name])
    @student_list = @cohort.users.where(:type=>'Student')

    render json: @student_list
  end







end
