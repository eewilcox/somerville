class TripsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  def index
    @trips = Trip.where(user_id: current_user)
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user
    if @trip.save
      flash[:notice] =  'Trip Created - Enjoy Your Journey!'
      redirect_to root_path
    else
      flash.now[:notice] = @trip.errors.full_messages
      render :new
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:trip_name)
  end
end
