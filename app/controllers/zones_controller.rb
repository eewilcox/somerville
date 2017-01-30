class ZonesController < ApplicationController

  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all
  end

  def show
    @zone = Zone.find(params[:zone][:id])
    array = Activity.where('zone_id=?', @zone.id)
    @activity = array.sample
  end

end
