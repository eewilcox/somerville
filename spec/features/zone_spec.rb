require 'rails_helper'

# Visiting the home page, a visitor should see and utilize a drop down selection

# feature "visitor can select a zone from a drop down menu" do
#   scenario "selects a location and selects the go button" do
#     user = FactoryGirl.create(:user)
#     zone = FactoryGirl.create(:zone)
#     activity = FactoryGirl.create(:activity, zone: zone)
#
#     visit root_path
#     click_link 'Sign In'
#     fill_in 'Email', with: user.email
#     fill_in 'user_password', with: user.password
#     click_button 'Log in'
#
#     select zone.name, from: 'zone_name'
#
#     click_button 'Go!'
#
#     expect(page).to have_content "#{activity.name}"
#   end
# end
