class Activity < ApplicationRecord

  belongs_to :zone

  validates :name, presence: true
  validates :address, presence: true
  validates :zone, presence: true
end
