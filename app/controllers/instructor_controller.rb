require 'pry'

class InstructorController < ApplicationController

  def show

    if @current_user
      @user_id = @current_user.id
      @instructor = User.find(@user_id)
      @instructor_cohort = @instructor.cohorts
    else
      redirect_to '/'
    end


  end

  def studentlist

    @cohort = Cohort.find_by(name: params[:name])
    @student_list = @cohort.users.where(:type=>'Student')

    render json: @student_list
  end

  def quizlist
    @cohort = Cohort.find_by(name: params[:name])
    @quiz_list = @cohort.quizzes

    render json: @quiz_list

  end

end
