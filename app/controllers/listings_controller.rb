class ListingsController < ApplicationController
  
  def index
    listings = Listing.listings_with_user_provider_details
    render json: {
      listings: listings
      }, except: [:created_at, :updated_at, :password_digest, :user_provider]
  end

  def create
    listing = Listing.create(user_params)
    if listing.valid?
      message = "Listing has been successfully created"
      render json: {
        message: message, 
        listing: listing}, 
        except: [:created_at, :updated_at]
    end
  end

  private

  def listing_params
    params.require(:listing).permit(
      :title,
      :description,
      :user_provider_id,
    )
  end
end