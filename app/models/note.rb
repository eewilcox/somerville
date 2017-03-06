class Note < ApplicationRecord
  belongs_to :user
  belongs_to :activity

  validates :user, presence: true
  validates :activity, presence: true
  validates :user, uniqueness: { scope: :activity }
end
