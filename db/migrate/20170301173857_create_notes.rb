class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.text :body, null: false
      t.belongs_to :user, foreign_key: true
      t.belongs_to :activity, foreign_key: true
    end
  end
end
