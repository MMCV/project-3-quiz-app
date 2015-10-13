class QuizzesController < ApplicationController
  skip_before_filter  :verify_authenticity_token
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
    @user = User.find(current_user.id)
    @cohorts = @user.cohorts
    @cohort_quizzes = @cohorts.map{|e| e.quizzes}
    @date = Time.new
    @current_date = "#{@date.year}-#{@date.month}-#{@date.day}"
    @active_quiz = Quiz.find_by(:assigned_date => @current_date)
    @quiz = @cohort_quizzes.map{|e| e.where(:id => @active_quiz.id)}[0]

    if @cohort_quizzes.map{|e| e.where(:id => @active_quiz.id)}[0][0]
      render component: 'CurrentQuiz', props: {quiz: @quiz[0], name: @quiz[0].name.capitalize}
    else
      render component: 'NoCurrentQuiz'
    end

  end

end
