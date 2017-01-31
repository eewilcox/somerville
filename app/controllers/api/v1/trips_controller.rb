class Api::V1::TripsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Trip.all
  end

  def create
    trip = Trip.new(trip_params)
    trip.user = current_user
    if trip.save!
      render json: trip
    end
  end

  def update
    trip = Trip.find(params[:id])
    activity = Activity.find(params[:activity_id])
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

  private

  def trip_params
    params.require(:trip).permit(:trip_name)
  end
end
