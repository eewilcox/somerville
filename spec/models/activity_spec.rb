require 'rails_helper'

RSpec.describe Activity, type: :model do

  it { should have_valid(:name).when('Neighborhood', 'Spot') }
  it { should_not have_valid(:name).when(nil, '') }

  it { should have_valid(:address).when('117 Street', 'MA, 02661') }
  it { should_not have_valid(:address).when(nil, '') }

end
