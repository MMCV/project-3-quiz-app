class Question < ActiveRecord::Base
  has_many :solution
  belongs_to :quiz
end
