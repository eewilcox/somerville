class TripsController < ApplicationController
  before_action :authenticate_user!

  def index
    @trips = Trip.where(user_id: current_user)
  end

  def destroy
    @trip = Trip.find(params[:id])
    if @trip.destroy
      redirect_to trips_path
    end
  end
end
