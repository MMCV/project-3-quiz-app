class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.integer :student_id
      t.integer :quiz_id
      t.float :grade

      t.timestamps null: false
    end
  end
end
