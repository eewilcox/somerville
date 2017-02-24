class Place
  def self.get_info(activity)
    key = ENV["API_KEY"]
    HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{activity}&key=#{key}")
  end

  def self.get_map(map)
    key = ENV["MAP"]
    "https://maps.googleapis.com/maps/api/staticmap?center=#{map}&zoom=13&size=200x150&scale=2&markers=size:small|color:0xA7C5BD|#{map}&key=#{key}"
  end

  def self.get_pic(act_pic)
    key = ENV["API_KEY"]
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1300&photoreference=#{act_pic}&key=#{key}"
  end
end
