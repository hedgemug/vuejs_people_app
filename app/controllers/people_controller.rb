class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people.as_json
  end
  def create
    person = Person.new(
      name: params[:name],
      bio: params[:bio]
    )
    if person.save
      render json: person.as_json
    else
      render json: {errors: person.errors.full_messages}, status: 422
    end
  end

  def destroy
    person = Person.find(params[:id])
    person.destroy
    render json: {message: "Person successfully deleted"}
  end
end
