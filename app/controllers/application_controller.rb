class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    if session[:user_id]
    @current_user ||= User.find(session[:user_id])
    end
  end

  helper_method :current_user

  def authorize
    if !current_user
      render component: 'UserLogin'
    elsif current_user.type == "Student"
        redirect_to '/student'
    elsif current_user.type =='Instructor'
        redirect_to '/instructors'
    end
  end

end
