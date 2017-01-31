class Activity < ApplicationRecord
  belongs_to :zone
  has_many :trip_activities
  has_many :trips, through: :trip_activities

  validates :name, presence: true
  validates :address, presence: true
  validates :zone, presence: true
end
