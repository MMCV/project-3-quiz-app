class CreateSolutions < ActiveRecord::Migration
  def change
    create_table :solutions do |t|
      t.text :student_answer
      t.integer :student_answer_score
      t.references :user, index: true, foreign_key: true
      t.references :question, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
