class QuizzesController < ApplicationController

  def index
    @quiz = Quiz.all
    render component: 'Quiz', props: {name: @quiz.first["name"], assignedDate: @quiz.first["assigned_date"]}
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
end
