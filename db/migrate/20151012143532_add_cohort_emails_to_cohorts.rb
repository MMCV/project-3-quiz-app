class AddCohortEmailsToCohorts < ActiveRecord::Migration
  def change
    add_column :cohorts, :cohort_emails, :text
  end
end
