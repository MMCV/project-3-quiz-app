class SessionsController < ApplicationController
	def new
		if current_user
			if current_user.type == "Student"
				redirect_to "/students/#{current_user.id}"
			elsif current_user.type == "Instructor"
				redirect_to "/instructors/#{current_user.id}"
			end
		else
		render component: 'UserLogin'
		end
	end

	def create
		@user = User.find_by(email: params[:email])
    # If the user exists AND the password entered is correct.
    if @user && @user.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user
      # logged in when they navigate around our website.
      session[:user_id] = @user.id
	  	if @user.type == 'Student'
				redirect_to student_path(@user.id)
			elsif @user.type == 'Instructor'
				redirect_to instructor_path(@user.id)
			end
	  else
	  	redirect_to login_path
	  end
	end

	def destroy
		session[:user_id] = nil
    redirect_to login_path
	end

end
