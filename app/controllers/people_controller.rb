class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people.as_json
  end
  def create
    person = Person.create(
      name: params[:name],
      bio: params[:bio]
    )
    render json: person.as_json
  end
end
