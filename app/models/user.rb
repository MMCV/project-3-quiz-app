class User < ActiveRecord::Base
  self.inheritance_column = :type
  has_and_belongs_to_many :cohorts
  has_secure_password
  validates :email, presence: true
  validates :password, presence: true

  def self.types
    ['Instructor', 'Student']
  end

end
