class Quiz < ActiveRecord::Base
  has_many :questions
  belongs_to :user
  has_and_belongs_to_many :cohorts
  has_many :grades
  has_many :students, :through => :grades

end
