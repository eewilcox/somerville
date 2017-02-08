class ZonesController < ApplicationController

  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all
  end

  def show
    @trips = Trip.where(user_id: current_user)
    if params[:zone]
      @zone = Zone.find(params[:zone][:name])
    else
      @zone = Zone.find(params[:id])
    end
    @activities = @zone.activities
    @activity = @activities.sample

    key = ENV["API_KEY"]
    if @activity.reference
      @place = HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{@activity.reference}&key=#{key}")
    end

  end
end
