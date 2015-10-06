class CreateUserCohortAssociation < ActiveRecord::Migration
  def change
    create_table :users_cohorts, id: false do |t|
    	t.belongs_to :user, index: true
      t.belongs_to :cohort, index: true
    end
  end
end
