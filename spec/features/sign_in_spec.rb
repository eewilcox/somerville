require 'rails_helper'

feature "User signs in" do

# Acceptance Criteria
# * If I specify valid info I am autenticated and gain access to system
# * If I specify invalid info, I remain unauthenticated
# * If I am already signed in, I can't sign in again

  scenario 'an existing user signs in and gains access' do
    user = FactoryGirl.create(:user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Welcome Back')
    expect(page).to have_content('Sign Out')
  end

  scenario 'a nonexistent email and password are supplied' do
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: 'anyone@aol.com'
    fill_in 'user_password', with: 'password'
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password.')
    expect(page).to_not have_content('Welcome Back')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'an existing email with the wrong password is denied access' do
    user = FactoryGirl.create(:user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: 'incorrectPassword'
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password.')
    expect(page).to_not have_content('Welcome Back')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'an already authenticated user cannot re-sign in' do
    user = FactoryGirl.create(:user)
    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Sign Out')
    expect(page).to_not have_content('Sign In')

    visit new_user_session_path

    expect(page).to have_content('You are already signed in.')
  end

end
