# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_06_10_150034) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.float "price", null: false
    t.bigint "purchase_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["purchase_id"], name: "index_items_on_purchase_id"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "purchases", force: :cascade do |t|
    t.date "purchase_date", null: false
    t.float "total", null: false
    t.bigint "store_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["store_id"], name: "index_purchases_on_store_id"
    t.index ["user_id"], name: "index_purchases_on_user_id"
  end

  create_table "settings", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["var"], name: "index_settings_on_var", unique: true
  end

  create_table "store_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_store_types_on_user_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "store_type_id"
    t.bigint "user_id"
    t.index ["store_type_id"], name: "index_stores_on_store_type_id"
    t.index ["user_id"], name: "index_stores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "weeks_preference"
    t.integer "budget_preference"
  end

  add_foreign_key "items", "purchases"
  add_foreign_key "items", "users"
  add_foreign_key "purchases", "stores"
  add_foreign_key "purchases", "users"
  add_foreign_key "store_types", "users"
  add_foreign_key "stores", "store_types"
  add_foreign_key "stores", "users"
end
