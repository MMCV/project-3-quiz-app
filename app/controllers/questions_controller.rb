class QuestionsController < ApplicationController

def new
end

def Create
  question = Question.new(question_text: params[:question_text])
    if question.save
      render json: question
    end
end

end
