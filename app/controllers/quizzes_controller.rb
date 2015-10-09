class QuizzesController < ApplicationController

  def index
    @quizzes = Quiz.all
    render component: 'QuizIndex', props: {quizzes: @quizzes}
  end

  def new
    # render component: 'Question_New' <-- Question New component
    render component: 'NewQuiz'
  end

  def create
    quiz = Quiz.create(name: params[:name], description: params[:description], assigned_date: params[:assigned_date])
    render json: quiz
  end

  def show
    quiz = Quiz.find(params[:id])
    render component: 'ShowQuiz', props: { quiz: quiz}
  end

  def current
    @user = User.find(1)
    @cohort = @user.cohorts
    @time = Time.new
    @active_quizzes = Quiz.where(:assigned_date => "#{@time.year}-#{@time.month}-#{@time.day}")
    @quizzes = @active_quizzes.map{|e| e.name}
  
    render component: 'CurrentQuiz', props: {name: @quiz}
  end

end
