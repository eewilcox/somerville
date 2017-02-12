class ActivitiesController < ApplicationController
  before_action :authorize_user, except: [:destroy, :show]

  def show
    @trips = Trip.where(user_id: current_user)
    @activity = Activity.find(params[:id])
    @map = @activity.address.split.join("+")
    key = ENV["API_KEY"]
    if @activity.reference
      @place = HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{@activity.reference}&key=#{key}")
    end

    if !@place['result'].nil?
      @rating = @place['result']['rating']
      @price = @place['result']['price_level']
      @website = @place['result']['website']
    end
  end

  def destroy
    @trips = Trip.where(user_id: current_user)
    @activity = Activity.find(params[:id])
    @the_trip = nil
    @trips.each do |trip|
      if trip.current == true
        @the_trip = trip
      end
    end
    @trip_activity = TripActivity.where("trip_id=? and activity_id=?", @the_trip.id, @activity.id)
    if @trip_activity[0]
      @trip_activity[0].destroy
      redirect_to zone_path(@activity.zone_id)
    else
      flash[:notice] = "This activity is not in your current trip!"
      redirect_to @activity
    end
  end

  def new
    @activity = Activity.new

    key = ENV["API_KEY"]
    @options = HTTParty.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=bakery+Somerville+02145&key=#{key}")
  end

  def create
    @activity = Activity.new(activity_params)
    @activity.save!
    if @activity.save
      redirect_to @activity
    else
      render :new
    end
  end

  protected

  def activity_params
    params.require(:activity).permit(:name, :address, :description, :reference, :picture, :zone_id)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
