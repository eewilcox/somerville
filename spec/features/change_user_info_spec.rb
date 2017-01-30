require 'rails_helper'

feature 'user updates user info' do

# Acceptance Criteria
  # * If I update my email I should be told the change was successful
  # * If I update my password I should be told the change was successful

  scenario 'an unauthenticated user cannot navigate to user edit page' do
    user = FactoryGirl.create(:user)

    visit edit_user_registration_path

    expect(page).to have_content('You need to sign in or sign up before continuing.')
    expect(page).to_not have_content('Update')
    expect(page).to_not have_content('Cancel my account')
  end

  scenario 'an already authenticated user can change their email' do
    user = FactoryGirl.create(:user)
    zone = FactoryGirl.create(:zone)

    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    click_link 'Change My User Info'

    fill_in 'Email', with: "new@email.com"
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content('Your account has been updated successfully.')
  end

  scenario 'an already authenticated user can change their password' do
    user = FactoryGirl.create(:user)
    zone = FactoryGirl.create(:zone)
    activity = FactoryGirl.create(:activity, zone: zone)

    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    click_link 'Change My User Info'

    fill_in 'Password', with: 'newpassword'
    fill_in 'Password confirmation', with: 'newpassword'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content('Your account has been updated successfully.')
  end

end
