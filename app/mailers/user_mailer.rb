class UserMailer < ApplicationMailer

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
   :address => "smtp.gmail.com",
   :port => 587,
   :domain => "gmail.com",
   :user_name => ENV['GMAIL_USERNAME'],
   :password =>  ENV['GMAIL_PASSWORD'],
   :authentication => "plain",
   :enable_starttls_auto => true
}

 def welcome_email(cohort)
   @cohort = cohort
   emails = @cohort.cohort_emails.split(" ");
   mail(to: emails, subject: 'Welcome to My Awesome Site')
 end

end
