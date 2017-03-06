class Activity < ApplicationRecord
  belongs_to :zone
  has_many :trip_activities
  has_many :trips, through: :trip_activities
  has_many :notes
  has_many :users, through: :notes

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :address, presence: true
  validates :address, uniqueness: true
  validates :zone, presence: true
  validates :reference, length: { maximum: 45}
end
