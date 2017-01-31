class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :trip_name, null: false
      t.belongs_to :user, null: false
      t.timestamps
    end
  end
end
