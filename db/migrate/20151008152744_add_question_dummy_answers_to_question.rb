class AddQuestionDummyAnswersToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :answer_1, :string
    add_column :questions, :answer_2, :string
    add_column :questions, :answer_3, :string
    add_column :questions, :answer_4, :string
  end
end
