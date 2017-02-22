class Api::Alexa::HandlersController < ActionController::Base
  def show
    activities = Activity.all
    activity= activities.sample

    render json: activity
  end
end
