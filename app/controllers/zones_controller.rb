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
    @activity = @activities.sample

    @client = GooglePlaces::Client.new(ENV['API_KEY'])
    @google_info = @client.spots_by_query("#{@activity.name}")
  end

end
