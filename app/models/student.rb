class Student < User
  has_many :grades
  has_many :quizzes, :through => :grades
end
