require 'rails_helper'

feature "User deletes account" do

  # Acceptance Criteria
    # * I can delete my account

  scenario 'an already authenticated user can delete their account' do
    user = FactoryGirl.create(:user)
    zone = FactoryGirl.create(:zone)
    activity = FactoryGirl.create(:activity, zone: zone)
    
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    click_link 'Change My User Info'
    click_button 'Cancel my account'

    expect(page).to have_content('Bye! Your account has been successfully cancelled. We hope to see you again soon.')
  end
end
