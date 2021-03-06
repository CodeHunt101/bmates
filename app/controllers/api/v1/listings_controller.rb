class Api::V1::ListingsController < ApplicationController
  
  def index
    listings = Listing.listings_with_user_provider_details_topics_available_dates_and_reservations
    render json: {
      listings: listings
      }, except: [:password_digest, :user_provider]
  end

  def create
    listing = Listing.create(listing_params)
    if listing.valid?
      render_valid_listing(listing)
    else
      render_errors(listing)
    end
  end

  def show
    listing = Listing.find(params[:id])
    render json: {
      listing: listing.listing_with_user_provider_details_topics_available_dates_and_reservations
    }, except: [:created_at, :updated_at, :user_provider_id]
  end

  def update
    listing = Listing.find(params[:id])
    listing.assign_attributes(listing_params)
    
    if listing.valid?
      listing.available_dates.destroy_all
      listing.update(listing_params)
      render_valid_listing(listing)
    else
      render_errors(listing)
    end
  end

  def update_image
    listing = Listing.find(params[:id])
    listing.update(listing_params)
    if listing.valid?
      message = "Listing has been successfully updated"
      render json: {
        message: message, 
        listing: listing}, 
        except: [:created_at, :updated_at]
    end
  end

  private

  def listing_params
    params.require(:listing).permit(
      :listing_type,
      :title,
      :description,
      :user_provider_id,
      :is_active,
      :image,
      topic_ids: [],
      date_ids: []
    )
  end

  def render_errors(record)
    errors_count = record.errors.count
    error_messages = record.errors
    render json: {errors_count: errors_count, error_messages: error_messages}
  end

  def render_valid_listing(listing)
    message = "Listing has been successfully created"
    render json: {message: message, listing: listing}, except: [:created_at, :updated_at]
  end
end