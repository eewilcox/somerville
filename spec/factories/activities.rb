FactoryGirl.define do
  factory :activity do
    zone
    sequence(:name) { |n| "name#{n}" }
    sequence(:address) { |n| "address#{n}" }
  end
end
