Rails.application.routes.draw do
  devise_for :users

  root "zones#index"

  resources :trips, only: [:index, :destroy]
  resources :activities, only: [:show, :destroy, :create, :new]
  resources :zones, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :trips, only: [:index, :create, :show, :update]
      resources :activities, only: [] do
        resources :notes, only: [:index, :create, :update, :destroy]
      end
    end
  end

  namespace :api do
    namespace :alexa do
      resource :handler, only: [:show]
    end
  end

end
