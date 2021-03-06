class Api::V1::NotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    user = User.find(current_user.id)
    activity = Activity.find(params[:activity_id])
    note = user.notes.find_by(activity_id: activity.id)
    if note
      render json: note
    else
      render json: {body: ""}
    end
  end

  def create
    data = JSON.parse(request.body.read)
    note = Note.new
    note.body = data["note"]["body"]
    note.activity_id = data["note"]["activity_id"]
    note.user_id = data["note"]["user_id"]
    if note.save!
      render json: note
    end
  end

  def update
    note = Note.find(params[:id])
    data = JSON.parse(request.body.read)
    note.body = data["body"]
    if note.save!
      render json: note
    end
  end

  def destroy
    note = Note.find(params[:id])
    if note.delete
      render json: note
    end
  end
end
