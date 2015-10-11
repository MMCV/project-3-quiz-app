require 'pry'
class UsersController < ApplicationController
  def index
    @students = Student.all
    @instructors = Instructor.all
    render component: 'User', props: {:students => @students, instructors: @instructors}
  end

  def new
  	render component: 'UserNew'
  end

  def create
    if params[:type]=="Student"
    	@student = Student.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
      if @student.save
        session[:user_id] = @student.id
        redirect_to student_path(@student)
      end
    else
      @instructor = Instructor.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
      if @instructor.save
        session[:user_id] = @instructor.id
        redirect_to instructor_path(@instructor)
      end
    end
  end

  def show
  	@user = User.find(params[:id])
		render component: 'ShowUser', props: { user: @user }
  end

end
