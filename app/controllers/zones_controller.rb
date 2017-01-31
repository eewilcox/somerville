class ZonesController < ApplicationController

  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all
  end

  def show
    if params[:zone] == nil
      @zone = Zone.find(params[:id])
    else
      @zone = Zone.find(params[:zone][:name])
    end
    @activities = @zone.activities
  end

end
