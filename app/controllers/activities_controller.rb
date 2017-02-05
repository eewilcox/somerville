class ActivitiesController < ApplicationController
  def show
    @trips = Trip.where(user_id: current_user)
    @activity = Activity.find(params[:id])
  end
end
