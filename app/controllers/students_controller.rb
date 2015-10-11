class StudentsController < ApplicationController
  before_filter :authorize
  def index
    @student = Student.find(params[:id])
    @grades = @student.grades
    @grades_display = @grades.map{|e| e.grade * 100}
    @quizzes = Quiz.where(:id => @grades.map{|e| e.quiz_id})
    @quiz_grades = []

    for x in 0 .. @quizzes.length-1
      @quiz_grades << {quiz: @quizzes[x], grade: @grades_display[x]}
    end

    if current_user.type == 'Student'
      if current_user.id == params[:id].to_i
        render component: 'StudentQuizIndex', props: {student: @student, quizzes: @quiz_grades}
      else
        render component: 'UnauthorizedStudentAccess'
      end
    elsif current_user.type == 'Instructor'
      render component: 'InstructorStudentQuizIndex', props: {student: @student, quizzes: @quiz_grades}
    end

  end

  def student_take_quiz

  end
end
