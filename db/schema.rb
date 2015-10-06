# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151006144414) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cohorts", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string   "question_text"
    t.string   "question_answer"
    t.integer  "quiz_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "questions", ["quiz_id"], name: "index_questions_on_quiz_id", using: :btree

  create_table "quizzes", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.date     "assigned_date"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "solutions", force: :cascade do |t|
    t.text     "student_answer"
    t.integer  "student_answer_score"
    t.integer  "user_id"
    t.integer  "question_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "solutions", ["question_id"], name: "index_solutions_on_question_id", using: :btree
  add_index "solutions", ["user_id"], name: "index_solutions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password"
    t.string   "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users_cohorts", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "cohort_id"
  end

  add_index "users_cohorts", ["cohort_id"], name: "index_users_cohorts_on_cohort_id", using: :btree
  add_index "users_cohorts", ["user_id"], name: "index_users_cohorts_on_user_id", using: :btree

  add_foreign_key "questions", "quizzes"
  add_foreign_key "solutions", "questions"
  add_foreign_key "solutions", "users"
end
