class AddColumnsToActivities < ActiveRecord::Migration[5.0]
  def change
    add_column :activities, :picture, :string
    add_column :activities, :reference, :string
  end
end
