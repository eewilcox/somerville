require 'rails_helper'

feature "User creates an account" do

  # Acceptance Criteria
    # * Valid email address
    # * Specify and confirm password
    # * Error if above not completed
    # * If all required feilds are specified, become an authenticated user

  scenario 'specifying valid and required information' do
    user = FactoryGirl.build(:user)
    zone = FactoryGirl.create(:zone)

    visit root_path
    click_link 'Sign Up'
    fill_in 'First Name', with: user.first_name
    fill_in 'Last Name', with: user.last_name
    fill_in 'Username', with: user.username
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    fill_in 'Password Confirmation', with: user.password

    click_button 'Sign up'

    expect(page).to have_content("Enjoy your trip!")
    expect(page).to have_content('Sign Out')
  end

  scenario 'required information is not supplied' do
    zone = FactoryGirl.create(:zone)

    visit root_path
    click_link 'Sign Up'
    click_button 'Sign up'

    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'password confirmation does not match confirmation' do
    zone = FactoryGirl.create(:zone)

    visit root_path
    click_link 'Sign Up'

    fill_in 'user_password', with: 'password'
    fill_in 'Password Confirmation', with: 'somethingDifferent'

    click_button 'Sign up'

    expect(page).to have_content("doesn't match")
    expect(page).to_not have_content('Sign Out')
  end
end
