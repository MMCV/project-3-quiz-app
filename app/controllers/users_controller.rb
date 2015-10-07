class UsersController < ApplicationController

  def index
    @students = Student.all
    @instructors = Instructor.all
    render component: 'User', props: {:students => @students, instructors: @instructors}
  end

end
