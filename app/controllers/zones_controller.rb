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

    # @client = GooglePlaces::Client.new(ENV['API_KEY'])
    # @google_info = @client.spots_by_query("#{@activity.name}")
  end

end
