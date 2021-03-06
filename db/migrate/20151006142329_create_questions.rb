class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question_text
      t.string :question_answer
      t.string :question_type
      t.references :quiz, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
