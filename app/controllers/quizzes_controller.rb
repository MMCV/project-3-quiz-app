require 'pry'
class QuizzesController < ApplicationController

  def index
    @quizzes = Quiz.all
    render component: 'QuizIndex', props: {quizzes: @quizzes}
  end

  def new
    # render component: 'Question_New' <-- Question New component
    @cohorts = current_user.cohorts
    render component: 'NewQuiz', props: { cohorts: @cohorts }
  end

  def create
    @quiz = Quiz.new(name: params[:name], description: params[:description], assigned_date: params[:assigned_date])
    @cohort = Cohort.find(params[:cohort].to_i)
    if @quiz.save
      @quiz.cohorts << @cohort
      render component: 'CreateQuestionTemplate', props: {quiz_id: @quiz.id }
    end
  end

  def show
    @quiz = Quiz.find(params[:id])
    @questions = @quiz.questions.order(:id)
    render component: 'ShowQuiz', props: { quiz: @quiz, questions: @questions }
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
