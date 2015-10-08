class QuestionsController < ApplicationController

def new
	render component: 'CreateQuizTemplate'
end

def create
  question = Question.new(question_text: params[:question_text])
  if question.save
    render json: question
  end
end

end
