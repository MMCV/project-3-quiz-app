class Question < ActiveRecord::Base
  has_many :solutions
  belongs_to :quiz
end
