class ListingsController < ApplicationController
  
  def index
    listings = Listing.all
    render json: {
      listings: listings}, except: [:created_at, :updated_at]
  end

  def create
    listing = Listing.create(user_params)
    if listing.valid?
      message = "Listing has been successfully created"
      render json: {message: message, listing: listing}, except: [:created_at, :updated_at]
    end
  end

  private

  def listing_params
    params.require(:listing).permit(
      :title,
      :description,
      :mate_id,
    )
  end
end