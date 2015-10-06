class CreateCohortQuiz < ActiveRecord::Migration
  def change
    create_table :cohorts_quizzes, id: false do |t|
    	t.belongs_to :cohort, index: true
      t.belongs_to :quiz, index: true
    end
  end
end
