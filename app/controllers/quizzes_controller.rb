class QuizzesController < ApplicationController

  def index
    @name = "Quiz 1"
    render component: 'Quiz', props: { name: @name}
  end

  def new
    render component: 'Quiz_New'
  end

end
