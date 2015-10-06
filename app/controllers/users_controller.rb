class UsersController < ApplicationController

  def index
    @users = User.all
    render component: 'User', props: { data: @users }
  end

end
