class Api::V1::TripsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Trip.all
  end

  def create
    data = JSON.parse(request.body.read)

    trip = Trip.new
    trip.trip_name = data["trip"]["trip_name"]
    trip.user_id = data["trip"]["user_id"]
    if trip.save!
      render json: trip
    end
  end

  def update
    data = JSON.parse(request.body.read)
    trip = Trip.find(data["trip_id"])
    activity = Activity.find(data["activity_id"])
    trip_activity = TripActivity.new
    trip_activity.trip_id = trip.id
    trip_activity.activity_id = activity.id
    if trip_activity.save!
      render json: trip
    end
  end

  def destroy
    data = JSON.parse(request.body.read)
    trip = Trip.find(data["id"])
    if trip.delete
      @trips = Trip.all
      render json: @trips
    end
  end
end
