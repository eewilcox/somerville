Rails.application.routes.draw do
  devise_for :users
  # root "home#index"

  root "zones#new"

  resources :zones, only: [:create, :new] do
    resources :activites
  end

end
