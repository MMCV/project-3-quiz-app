class QuestionsController < ApplicationController
  before_filter :authorize


def new
	render component: 'CreateQuizTemplate'
end


def create
  question = Question.new(question_text: params[:question_text], question_answer: params[:question_answer], quiz_id: params[:quiz_id], answer_1: params[:answer_1], answer_2: params[:answer_2], answer_3: params[:answer_3], answer_4: params[:answer_4], question_type: params[:question_type])
  if question.save
    render json: question
  end
end

end
