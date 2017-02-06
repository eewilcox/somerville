class ZonesController < ApplicationController

  def index
    @zone = Zone.find_by(params[:id])
    @zones = Zone.all

    # if current_user
    #   key = ENV["APP_TOKEN"]
    #   @year2015 = HTTParty.get("https://data.somervillema.gov/resource/gx6r-bw3n.json?year=2015")
    #   @year2013 = HTTParty.get("https://data.somervillema.gov/resource/gx6r-bw3n.json?year=2013")
    #
    #   @column1 = "how_happy_do_you_feel_right_now"
    #   @column2 = "how_would_you_rate_the_following_the_cost_of_housing"
    #   @column3 = "how_would_you_rate_the_following_the_availability_of_social_community_events"
    #
    #   @happy = stat(@year2015, @column1)
    #   @happy2 = stat(@year2013, @column1)
    #
    #   @cost = stat(@year2015, @column2)
    #   @cost2 = stat(@year2013, @column2)
    #
    #   @community = stat(@year2015, @column3)
    #   @community2 = stat(@year2013, @column3)
    # end
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

  private

  def stat(year, column)
    happy = 0.0
    count = 0.0
    happy2 = 0.0
    count2 = 0.0
    happy3 = 0.0
    count3 = 0.0

    year.each do |resident|
      if resident["precinct"] == "1"
        count += 1
        happy += resident[column].to_f
      elsif resident["precinct"] == "2"
        count2 += 1
        happy2 += resident[column].to_f
      elsif resident["precinct"] == "3"
        count3 += 1
        happy3 += resident[column].to_f
      end
    end
    total = {"Precinct One" => happy/count, "Precinct Two" => happy2/count2, "Precinct Three" => happy3/count3}
  end

end
