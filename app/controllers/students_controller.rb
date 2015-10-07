class StudentsController < ApplicationController

  def index
    @student_id = current_user.id
    @student = Student.find(@student_id)
    @quizzes = Quiz.Question.Solution.Student.find(@student_id)
    render component: 'StudentQuizIndex', props: {student: @student, quizzes: @quizzes}
  end

end
