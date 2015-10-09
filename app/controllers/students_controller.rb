class StudentsController < ApplicationController

  def index
    @student_id = current_user.id
    @student = Student.find(@student_id)
    @grades = @student.grades
    @grades_display = @grades.map{|e| e.grade * 100}
    @quizzes = Quiz.where(:id => @grades.map{|e| e.quiz_id})
    @quiz_grades = []

    for x in 0 .. @quizzes.length-1
      @quiz_grades << {quiz: @quizzes[x], grade: @grades_display[x]}
    end

    render component: 'StudentQuizIndex', props: {student: @student, quizzes: @quiz_grades}
  end

end
