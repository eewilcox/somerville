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

ActiveRecord::Schema.define(version: 2017_03_01_173857) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.text "description"
    t.integer "zone_id", null: false
    t.string "picture"
    t.string "reference"
    t.index ["zone_id"], name: "index_activities_on_zone_id"
  end

  create_table "notes", id: :serial, force: :cascade do |t|
    t.text "body", null: false
    t.integer "user_id"
    t.integer "activity_id"
    t.index ["activity_id"], name: "index_notes_on_activity_id"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "trip_activities", id: :serial, force: :cascade do |t|
    t.integer "trip_id", null: false
    t.integer "activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_trip_activities_on_activity_id"
    t.index ["trip_id"], name: "index_trip_activities_on_trip_id"
  end

  create_table "trips", id: :serial, force: :cascade do |t|
    t.string "trip_name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "current", default: false, null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "username", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "member", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "zones", id: :serial, force: :cascade do |t|
    t.string "name", null: false
  end

  add_foreign_key "notes", "activities"
  add_foreign_key "notes", "users"
end
