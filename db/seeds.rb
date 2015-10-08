# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# User.create({first_name: 'Chris', last_name:'Smith', email: 'cs@ga.co', password: 'chrs', type: 'Student'});
# User.create({first_name: 'Victoria', last_name:'Donnelly', email: 'vd@ga.co', password: 'vicd', type: 'Student'});
# User.create({first_name: 'Matt', last_name:'Morrisey', email: 'mm@ga.co', password: 'matm', type: 'Student'});
# User.create({first_name: 'Meiji', last_name:'Chen', email: 'mc@ga.co', password: 'meic', type: 'Student'});
# User.create({first_name: 'Jaden', last_name:'Carver', email: 'jc@ga.co', password: 'jadc', type: 'Instructor'});
# User.create({first_name: 'Pan', last_name:'Wangaperwong', email: 'pw@ga.co', password: 'panw', type: 'Instructor'});
# User.create({first_name: 'Dennis', last_name:'Liaw', email: 'dl@ga.co', password: 'denl', type: 'Instructor'});
# User.create({first_name: 'Bobby', last_name:'King', email: 'dl@ga.co', password: 'denl', type: 'Instructor'});


cohorts = Cohort.create([
  {name: 'Pluto', description: FFaker::Lorem.sentence},
  {name: 'Bacon', description: FFaker::Lorem.sentence},
  {name: 'Steak', description: FFaker::Lorem.sentence},
  {name: 'Pizza', description: FFaker::Lorem.sentence},
  ]);

  User.create({first_name: 'Chris', last_name:'Smith', email: 'cs@ga.co', password: 'chrs', type: 'Student', :cohorts => Cohort.where(:name => ['Pluto', 'Bacon'])});
  User.create({first_name: 'Victoria', last_name:'Donnelly', email: 'vd@ga.co', password: 'vicd', type: 'Student', :cohorts => Cohort.where(:name => ['Pluto'])});
  User.create({first_name: 'Matt', last_name:'Morrisey', email: 'mm@ga.co', password: 'matm', type: 'Student', :cohorts => Cohort.where(:name => ['Pluto'])});
  User.create({first_name: 'Meiji', last_name:'Chen', email: 'mc@ga.co', password: 'meic', type: 'Student', :cohorts => Cohort.where(:name => ['Pluto'])});
  User.create({first_name: 'Jaden', last_name:'Carver', email: 'jc@ga.co', password: 'jadc', type: 'Instructor', :cohorts => Cohort.where(:name => ['Pluto', 'Bacon', 'Pizza'])});
  User.create({first_name: 'Pan', last_name:'Wangaperwong', email: 'pw@ga.co', password: 'panw', type: 'Instructor', :cohorts => Cohort.where(:name => ['Pluto', 'Steak', 'Pizza' ])});
  User.create({first_name: 'Dennis', last_name:'Liaw', email: 'dl@ga.co', password: 'denl', type: 'Instructor', :cohorts => Cohort.where(:name => ['Pluto', 'Bacon', 'Pizza' ])});
  User.create({first_name: 'Bobby', last_name:'King', email: 'dl@ga.co', password: 'denl', type: 'Instructor', :cohorts => Cohort.where(:name => ['Pluto', 'Pizza'])});


quizzes = Quiz.create([
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-09-01", :cohorts=>Cohort.where(:id=>['2','4'])},
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-09-01"},
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-09-01"},
  ]);
