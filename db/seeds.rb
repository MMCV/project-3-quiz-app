cohorts = Cohort.create([
  {name: 'Pluto', description: FFaker::Lorem.sentence},
  {name: 'Bacon', description: FFaker::Lorem.sentence},
  {name: 'Steak', description: FFaker::Lorem.sentence},
  {name: 'Pizza', description: FFaker::Lorem.sentence},
  ]);

  User.create({first_name: 'Chris', last_name:'Smith', email: 'cs@ga.co', password: 'chrs', type: 'Student', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Victoria', last_name:'Donnelly', email: 'vd@ga.co', password: 'vicd', type: 'Student', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Matt', last_name:'Morrisey', email: 'mm@ga.co', password: 'matm', type: 'Student', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Meiji', last_name:'Chen', email: 'mc@ga.co', password: 'meic', type: 'Student', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Jaden', last_name:'Carver', email: 'jc@ga.co', password: 'jadc', type: 'Instructor', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Pan', last_name:'Wangaperwong', email: 'pw@ga.co', password: 'panw', type: 'Instructor', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Dennis', last_name:'Liaw', email: 'dl@ga.co', password: 'denl', type: 'Instructor', :cohorts => Cohort.where(:id=>['1','2','3','4'])});
  User.create({first_name: 'Bobby', last_name:'King', email: 'dl@ga.co', password: 'denl', type: 'Instructor', :cohorts => Cohort.where(:id=>['1','2','3','4'])});


quizzes = Quiz.create([
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-09-01", :cohorts=>Cohort.where(:id=>['2','4'])},
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-10-13", :cohorts=>Cohort.where(:id=>['1','2','3','4'])},
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-09-01", :cohorts=>Cohort.where(:id=>['1','2','3','4'])},
  {name: 'Test Pluto', description:FFaker::Lorem.sentence, assigned_date: "2015-10-13", :cohorts=>Cohort.where(:id=>['1','2','3','4'])},
  {name: FFaker::Lorem.word, description:FFaker::Lorem.sentence, assigned_date: "2015-10-13", :cohorts=>Cohort.where(:id=>['1','2','3','4'])},
  ]);

questions = Question.create([
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'4' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'4' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'4' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'4' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'2' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'text', quiz_id:'2' },
  {question_text: FFaker::Lorem.sentence, question_answer: FFaker::Lorem.sentence, question_type: 'multiple-choice', quiz_id:'2', answer_1:FFaker::Lorem.word, answer_2:FFaker::Lorem.word,answer_3:FFaker::Lorem.word, answer_4:FFaker::Lorem.word},
  ]);
