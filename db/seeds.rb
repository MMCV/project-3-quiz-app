# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([{first_name: 'Chris', last_name:'Smith', email: 'cs@ga.co', password: 'chrs', type: 'student', :cohort => Cohort.where(:name => ['Pluto', 'Bacon']},
  {first_name: 'Victoria', last_name:'Donnelly', email: 'vd@ga.co', password: 'vicd', type: 'student', :cohort => Cohort.where(:name => ['Pluto']},
  {first_name: 'Matt', last_name:'Morrisey', email: 'mm@ga.co', password: 'matm', type: 'student', :cohort => Cohort.where(:name => ['Pluto']},
  {first_name: 'Meiji', last_name:'Chen', email: 'mc@ga.co', password: 'meic', type: 'student', :cohort => Cohort.where(:name => ['Pluto']},
  {first_name: 'Jaden', last_name:'Carver', email: 'jc@ga.co', password: 'jadc', type: 'instructor', :cohort => Cohort.where(:name => ['Pluto', 'Bacon', 'Pizza' ]},
  {first_name: 'Pan', last_name:'Wangaperwong', email: 'pw@ga.co', password: 'panw', type: 'instructor', :cohort => Cohort.where(:name => ['Pluto', 'Steak', 'Pizza' ]},
  {first_name: 'Dennis', last_name:'Liaw', email: 'dl@ga.co', password: 'denl', type: 'instructor', :cohort => Cohort.where(:name => ['Pluto', 'Bacon', 'Pizza' ]}
  {first_name: 'Bobby', last_name:'King', email: 'dl@ga.co', password: 'denl', type: 'instructor', :cohort => Cohort.where(:name => ['Pluto', 'Pizza' ]}
  ])

cohorts = Cohort.create([{name: 'Pluto', description: FFaker::BaconIpsum.sentence, :user => User.where(:id => ['1', '2', '3', '4', '5', '6']},
  {name: 'Bacon', description: FFaker::BaconIpsum.sentence, :user => User.where(:id => ['1', '2', '3', '6']},
  {name: 'Steak', description: FFaker::BaconIpsum.sentence},
  {name: 'Pizza', description: FFaker::BaconIpsum.sentence}
  ])

quizzes = Quiz.create([
  {name: FFaker::Lorem.words, description:FFaker::Lorem.sentence, assigned_date: strptime("09/01/2015", "%m/%d/%Y"), :cohort=>Cohort.where(id=>['2','4'])},
  {name: FFaker::Lorem.words, description:FFaker::Lorem.sentence, assigned_date: strptime("09/01/2015", "%m/%d/%Y")},
  {name: FFaker::Lorem.words, description:FFaker::Lorem.sentence, assigned_date: strptime("09/01/2015", "%m/%d/%Y")}
  ])
