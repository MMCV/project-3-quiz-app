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
  	user = User.create(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation], type: params[:type])
  	render json: user
  end

  def show
  	user = User.find(params[:id])
		render component: 'ShowUser', props: { user: user }
  end

  def login
  	render component: 'UserLogin'
  end

  def login_attempt
  	user = User.find_by_email(params[:email])
    # If the user exists AND the password entered is correct.
    if user && user.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user 
      # logged in when they navigate around our website.
	  	render json: user
	  end
  end

end