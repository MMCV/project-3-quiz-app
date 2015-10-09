class UserMailer < ApplicationMailer

default from: 'vic.n.d1@gmail.com'

 def welcome_email(user)
   @user = user
   @url  = '/login'
   mail(to: @user.email, subject: 'Welcome to My Awesome Site')
 end

end
