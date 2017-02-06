class ActivitiesController < ApplicationController
  def show
    @trips = Trip.where(user_id: current_user)
    @activity = Activity.find(params[:id])
    @all_trips = Trip.all
  end

  def destroy
    @trips = Trip.where(user_id: current_user)
    @activity = Activity.find(params[:id])
    @the_trip = nil
    @trips.each do |trip|
      if trip.current == true
        @the_trip = trip
      end
    end
    @trip_activity = TripActivity.where("trip_id=? and activity_id=?", @the_trip.id, @activity.id)
    if @trip_activity[0]
      @trip_activity[0].destroy
      redirect_to @activity
    else
      flash[:notice] =  "You already deleted that activity!"
      redirect_to @activity
    end
  end
end
