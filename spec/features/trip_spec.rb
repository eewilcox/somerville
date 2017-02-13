require 'spec_helper'

feature "User views the trips index page" do

  scenario "user sees a list of trips" do
    user = FactoryGirl.create(:user)
    zone = FactoryGirl.create(:zone)
    trip_1 = FactoryGirl.create(:trip, user: user)
    trip_2 = FactoryGirl.create(:trip, user: user)

    visit root_path

    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    click_link 'Manage Trips'
    expect(page).to have_content user.username
    expect(page).to have_content trip_1.trip_name
    expect(page).to have_content trip_2.trip_name
  end
end
