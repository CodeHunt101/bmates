class Api::V1::ListingsController < ApplicationController
  
  def index
    listings = Listing.listings_with_user_provider_details_topics_and_available_dates
    render json: {
      listings: listings
      }, except: [:created_at, :updated_at, :password_digest, :user_provider]
  end

  def create
    listing = Listing.create(listing_params)
    if listing.valid?
      message = "Listing has been successfully created"
      render json: {
        message: message, 
        listing: listing}, 
        except: [:created_at, :updated_at]
    end
  end

  def show
    listing = Listing.find(params[:id])
    render json: {
      listing: listing.listing_with_user_provider_details_topics_and_available_dates
    }, except: [:created_at, :updated_at, :user_provider_id]
  end

  private

  def listing_params
    params.require(:listing).permit(
      :listing_type,
      :title,
      :description,
      :user_provider_id,
      topic_ids: [],
      date_ids: []
    )
  end
end