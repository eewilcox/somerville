class TripActivity < ApplicationRecord
  belongs_to :trips
  belongs_to :activities

  validates :trip, presence: true
  validates :activity, presenece: true
end
