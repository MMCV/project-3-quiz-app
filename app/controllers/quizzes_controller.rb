class QuizzesController < ApplicationController
  before_filter :authorize
  def index
    @quizzes = Quiz.all
    render component: 'QuizIndex', props: {quizzes: @quizzes}
  end

  def new
    # render component: 'Question_New' <-- Question New component
    cohorts = current_user.cohorts
    render component: 'NewQuiz', props: { cohorts: cohorts }
  end

  def create
    quiz = Quiz.create(name: params[:name], description: params[:description], assigned_date: params[:assigned_date])
    quiz.cohorts << params[:cohort]
    render json: quiz
  end

  def show
    quiz = Quiz.find(params[:id])
    render component: 'ShowQuiz', props: { quiz: quiz}
  end


end
