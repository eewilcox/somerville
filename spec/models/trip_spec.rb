require 'rails_helper'

RSpec.describe Trip, type: :model do

  it { should have_valid(:trip_name).when('Neighborhood', 'Spot') }
  it { should_not have_valid(:trip_name).when(nil, '') }

end
