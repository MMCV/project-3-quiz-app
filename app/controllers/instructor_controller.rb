class InstructorController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def show
    @user_id = current_user.id
    @instructor = User.find(@user_id)
    @instructor_cohort = @instructor.cohorts
    render component: 'InstructorBox', props: { cohorts: @instructor_cohort }
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
