FactoryGirl.define do
  factory :activity do
    sequence(:name) { |n| "name#{n}" }
    sequence(:address) { |n| "address#{n}" }
    sequence(:description) { |n| "description#{n}" }
  end
end
