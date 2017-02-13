FactoryGirl.define do
  factory :trip do
    sequence(:trip_name) { |n| "#{n}" }
    user
    current false
  end
end
