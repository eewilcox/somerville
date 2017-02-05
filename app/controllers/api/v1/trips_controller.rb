class Api::V1::TripsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    user_trips = Trip.where(user_id: current_user)
    id = nil
    trip_name = nil
    activities = []
    user_trips.each do |trip|
      if trip.current == true
        id = trip.id
        trip_name = trip.trip_name
        activities << trip.activities
      end
    end
    render json: [trips: user_trips, currentTripId: id, message: activities, tripName: trip_name]
  end

  def create
    data = JSON.parse(request.body.read)

    if data["trip"]["activeTrip"]
      former_trip = Trip.find(data["trip"]["activeTrip"])
      former_trip.current = false
      former_trip.save!
    end

    trip = Trip.new
    trip.trip_name = data["trip"]["trip_name"]
    trip.user_id = data["trip"]["user_id"]
    trip.current = true
    if trip.save!
      render json: trip
    end
  end

  def show
    trips = Trip.where(user_id: current_user)
    trips.each do |trip|
      if trip.current == true
        trip.current = false
        trip.save!
      end
    end

    selected_trip = Trip.find(params[:id])
    selected_trip.current = true
    if selected_trip.save!
      render json: selected_trip
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
