class AddCurrentToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :current, :boolean, null: false, default: false
  end
end
