class QuizzesController < ApplicationController
  def index
    render component: 'Quiz'
  end
end
