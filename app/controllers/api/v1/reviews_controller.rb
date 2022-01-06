class Api::V1::ReviewsController < ApplicationController
  
  def create
    review = Review.create(review_params)
    if review.valid?
      message = "review has been successfully created"
      render json: {
        resp: message, 
        review: review}, 
        except: [:created_at, :updated_at]
    end
  end

  private

  def review_params
    params.require(:review).permit(
      :user_id,
      :reservation_id,
      :message,
      :rating,
    )
  end
end