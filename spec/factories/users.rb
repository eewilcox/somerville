FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "emails#{n}@example.com" }
    first_name 'User'
    last_name 'Account'
    sequence(:username) { |n| "usernames#{n}"}
    password 'password'
    password_confirmation 'password'
  end
end
