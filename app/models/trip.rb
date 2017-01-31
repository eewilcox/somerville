class Trip < ApplicationRecord
  belongs_to :users
  has_many :trip_activities
  has_many :activities, through: :trip_activities

  validates :trip_name, presence: true
  validates :user, presenece: true
end
