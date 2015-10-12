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
    # Get the quiz they click on
    @quiz = Quiz.find(params[:id])
    # Grab the questions for that quiz to pass to the component
    @questions = @quiz.questions
    render component: 'TakeAQuizTemplate', props: {quiz: @quiz, questions: @questions}
  end

  def submit_the_quiz
    @student = Student.find(session[:user_id])
    params.each do |q_id, answer|
      @solution = Solution.create(student_answer: answer, user_id: @student.id, question_id: q_id)
    end
    redirect_to student_path(@student.id)
  end
end
