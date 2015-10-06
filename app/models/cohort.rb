class Cohort < ActiveRecord::Base
	has_and_belongs_to_many :quizzes, :users
	validates :name, :description, presence: true
	validates :name, uniqueness: true
end
