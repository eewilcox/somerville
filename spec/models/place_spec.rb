require 'rails_helper'

describe Place do
  describe "#get_info" do
    it "returns HTTParty::Response" do
      VCR.use_cassette('place_info') do
        data = Place.get_info("ChIJ8SoeadRw44kRGpGNkai2vPY")

        expect(data.class).to eq HTTParty::Response
        expect(data.code).to eq 200

        expect(data["result"]["rating"]).to eq 4.7
      end
    end
  end
end
