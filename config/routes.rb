AppStore::Application.routes.draw do

  get '/' => 'main#index'
  get '/android_review/:app' => 'main#android_review', format: false, app: /.*/ 

end
