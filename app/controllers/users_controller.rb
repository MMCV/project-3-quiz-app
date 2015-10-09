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
    	user = Student.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
    else
      user = Instructor.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
    end
    if user.save
      session[:user_id] = user.id
  	  render json: user
      UserMailer.welcome_email(@user).deliver_now
    end
  end

  def show
  	user = User.find(params[:id])
		render component: 'ShowUser', props: { user: user }
  end

end
