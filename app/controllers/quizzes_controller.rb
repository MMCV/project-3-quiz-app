class QuizzesController < ApplicationController

  def index
    @quizzes = Quiz.all
    render component: 'QuizIndex', props: {quizzes: @quizzes}
  end

  def new
    render component: 'App'
  end

end
