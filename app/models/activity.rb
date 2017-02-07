class Activity < ApplicationRecord
  belongs_to :zone
  has_many :trip_activities
  has_many :trips, through: :trip_activities

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :address, presence: true
  validates :address, uniqueness: true
  validates :zone, presence: true
end
