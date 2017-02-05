class TripsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  def index
    @trips = Trip.where(user_id: current_user)
  end
end
