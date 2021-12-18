class Api::V1::AvailableDatesController < ApplicationController
  def create
    date = AvailableDate.create(available_date_params)
  end

  def available_date_params
    params.require(:available_date).permit(
      :available_date,
      :listing_id,
    )
  end
end