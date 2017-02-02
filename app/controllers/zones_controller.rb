class ZonesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all
  end

  def show
    if params[:zone]
      @zone = Zone.find(params[:zone][:name])
    else
      @zone = Zone.find(params[:id])
    end
    @activities = @zone.activities
  end

end
