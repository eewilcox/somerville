class ZonesController < ApplicationController

  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all
  end

  def show
    @zone = Zone.find(params[:zone][:id])
    @activity = Activity.where('zone_id=?', @zone.id).sample
  end

end
