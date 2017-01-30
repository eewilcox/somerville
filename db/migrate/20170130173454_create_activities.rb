class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.text :description
      t.belongs_to :zone, null: false
    end
  end
end
