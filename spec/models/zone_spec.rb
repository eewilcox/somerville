require 'rails_helper'

RSpec.describe Zone, type: :model do

  it { should have_valid(:name).when('Neighborhood', 'Spot') }
  it { should_not have_valid(:name).when(nil, '') }

end
