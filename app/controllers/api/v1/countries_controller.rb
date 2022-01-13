class Api::V1::CountriesController < ApplicationController
  def index
    countries = Country.all
    render json: {
      countries: countries
      }, except: [:created_at, :updated_at]
  end
end