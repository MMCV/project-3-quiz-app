class SessionsController < ApplicationController

	def new
		render component: 'UserLogin'
	end

	def create
		user = User.find_by_email(params[:email])
    # If the user exists AND the password entered is correct.
    if user && user.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user 
      # logged in when they navigate around our website.
      session[:user_id] = user.id
	  	render json: user
	  end
	end

	def destroy
		session[:user_id] = nil
    render component: 'UserLogin'
	end

end