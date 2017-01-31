class TripActivity < ApplicationRecord
  belongs_to :trip
  belongs_to :activity

  validates :trip, presence: true
  validates :activity, presence: true
end
