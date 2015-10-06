class Question < ActiveRecord::Base
  belongs_to :solution
  belongs_to :quiz
end
