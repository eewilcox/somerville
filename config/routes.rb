Rails.application.routes.draw do
  devise_for :users
  # root "home#index"

  root "zones#index"

  resources :zones, only: [:index, :show, :create, :new] do
    resources :activites, only: [:show]
  end

end
