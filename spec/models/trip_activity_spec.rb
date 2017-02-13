require 'rails_helper'

RSpec.describe TripActivity, type: :model do

  it 'joins a trip and activity together via id' do
    activity = FactoryGirl.create(:activity)
    trip = FactoryGirl.create(:trip)
    trip_activity = TripActivity.new
    trip_activity.trip_id = trip.id
    trip_activity.activity_id = activity.id
    trip_activity.save!

    expect(trip.activities).to include(activity)
  end

end
