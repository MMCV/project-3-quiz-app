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
    @user = User.find(current_user.id)
    @cohorts = @user.cohorts
    @cohort_quizzes = @cohorts.map{|e| e.quizzes}
    @date = Time.new
    @current_date = "#{@date.year}-#{@date.month}-#{@date.day}"
    @active_quiz = Quiz.find_by(:assigned_date => @current_date)
    @quiz = @cohort_quizzes.map{|e| e.where(:id => @active_quiz.id)}[0][0]
    @name = @quiz.name.capitalize
    render component: 'CurrentQuiz', props: {quiz: @quiz, name: @name}
  end
end
