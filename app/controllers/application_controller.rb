class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :user_is_authenticated
  # helper_method :current_user

  # private

  def verified_user
    redirect_to '/' unless user_is_authenticated
  end

  def user_is_authenticated
    !!current_user
  end

  def current_user
    user = User.find_by(id: session[:user_id])
  end
end
