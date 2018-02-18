class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people.as_json
  end
end
