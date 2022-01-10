class Review < ApplicationRecord
  belongs_to :reservation
  belongs_to :user


  def review_with_user_info
    {
      user_info: self.user,
      user_profile_picture: self.user.image.url,
      rating: self.rating,
      message: self.message
    }
  end
end