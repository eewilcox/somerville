class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_activities, dependent: :destroy
  has_many :activities, through: :trip_activities

  validates :trip_name, presence: true
  validates :user, presence: true
end
