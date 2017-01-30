class ZonesController < ApplicationController

  def new
    @zone = Zone.new
  end

  def create
    @zone = Zone.find_by(params[:zone_id])
  end

end
