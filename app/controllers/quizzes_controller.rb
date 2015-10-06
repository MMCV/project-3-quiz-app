class QuizzesController < ApplicationController

  def index
    @quiz = Quiz.all
    render component: 'Quiz', props: {name: @quiz.first["name"], assignedDate: @quiz.first["assigned_date"]}
  end

  def new
    render component: 'Quiz_New'
  end

end
