Rails.application.routes.draw do
  get '/people' => 'people#index'
  post '/people' => 'people#create'
  delete '/people/:id' => 'people#destroy'
end
