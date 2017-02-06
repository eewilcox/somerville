class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_activities, dependent: :destroy
  has_many :activities, through: :trip_activities

  validates :trip_name, presence: true
  validates :trip_name, uniqueness: { scope: :user }
  validates :user, presence: true
end
