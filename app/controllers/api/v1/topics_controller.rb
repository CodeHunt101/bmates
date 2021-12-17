class Api::V1::TopicsController < ApplicationController
  def index
    topics = Topic.all
    render json: {
      topics: topics
      }, except: [:created_at, :updated_at]
  end
end