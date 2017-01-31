class CreateTripActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :trip_activities do |t|
      t.belongs_to :trip, null: false
      t.belongs_to :activity, null: false
      t.timestamps
    end
  end
end
