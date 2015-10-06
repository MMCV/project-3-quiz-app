class Cohort < ActiveRecord::Base
	has_and_belongs_to_many :quizzes
	has_and_belongs_to_many :users
	validates :name, :description, presence: true
	validates :name, uniqueness: true
end
