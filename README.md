# Population Management System
Population Management System API was built using Node, Express JS, PostgreSQL and Sequelize

This system allows a user to create locations, update locations, fetch locations and delete locations.

## Getting Started
 - Clone this repo by running `git clone https://github.com/Dammyy/population-management-system.git`
 - Install dependencies by running `npm install`
 - Create a development database and also a test database in PostgreSQL and put the details in your .env file. See .env sample for details

## Starting the application
 - Start the app by running command `npm run start:dev`

## Run tests
 - Run tests using command `npm test`
 
## API DOCUMENTATION
 - Add a new location `POST /api/location` - privde the following details in the body `name`, `femalePopulation`, `malePopulation` and an optional `parentLocationId` if you want the new location to be nested under the parent.
 - Fetch all locations `GET /location` - Retrieve all locations
 - Fetch one location `GET /location/:id` - Retrieve a location

 - Update a location `PUT /location/:id` - The :id to be provided here is the id of the location to be update, Also proceed to provide new values for `name`, `femalePopulation`, `malePopulation`. If no new value is provide for any of them, the value does not change.

 - Delete a location `DELETE /location/:id` - The :id of the location to be deleted 