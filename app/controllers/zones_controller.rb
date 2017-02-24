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
    @map = @activity.address.split.join("+")

    if !@activity.reference.nil?
      @place = Place.get_info(@activity.reference)
    end

    if !@place['result'].nil?
      @rating = @place['result']['rating']
      @price = @place['result']['price_level']
      @website = @place['result']['website']
    end

    @new_map = Place.get_map(@map)
    @new_pic = Place.get_pic(@activity.picture)
  end
end
