# Mongo API 

## Usage

To use Mongo API, use the official container or install NodeJs and run Mongo DB with the `initial.sh` script.

## Structure

The Mongo API use one table named `povajs-api` where is the Mongo all databases administrator that is used by the API. Inside this database are two tables: `users` and `databases`. One store all the users with their permissions for databases and other one store the databases created or added by Mongo API because those are only accessible for security.

## API

### Users

⚠ To use with the Mongo API default main admin user, it cannot be deleted, or updated from the API for security.

| Entrypoint | Headers data | Description |
| - | - | - |
| ***/users/add*** | **X-name**: name, **X-password**: hashed password, **X-permissions**: json object with permissions | add a user to the database |
| ***/users/remove*** | **X-name**: name | remove a user from the database |
| ***/users/update*** | **X-name**: name, (**X-password**: hashed password), (**X-permissions**: json object with permissions) | update a user in the database |

### Databases

| Entrypoint | Headers data | Description |
| - | - | - |
| ***/databases/add*** | **X-name**: name | add a database to API use |
| ***/databases/create*** | **X-name**: name | add a new database to API use |
| ***/databases/rename*** | **X-name**: name, **X-newname**: new name | rename the database |
| ***/databases/remove*** | **X-name**: name | remove the database from API use |
| ***/databases/drop*** | **X-name**: name | delete the database |
| ***/databases/copy*** | **X-name**: name, **X-copyname**: new name | create a database copy |
| ***/databases/&lt;database>/add*** | **X-name**: name | add a collection to API use |
| ***/databases/&lt;database>/create*** | **X-name**: name | add a new collection to API use |
| ***/databases/&lt;database>/rename*** | **X-name**: name, **X-newname**: new name | rename the collection |
| ***/databases/&lt;database>/remove*** | **X-name**: name | remove the collection from API use |
| ***/databases/&lt;database>/drop*** | **X-name**: name | delete the collection |
| ***/databases/&lt;database>/&lt;collection>/create*** | **X-name**: name, **X-value**: value | create a new value |
| ***/databases/&lt;database>/&lt;collection>/update*** | **X-name**: name, **X-value**: value | update a value |
| ***/databases/&lt;database>/&lt;collection>/delete*** | **X-name**: name | delete the value |
| ***/databases/&lt;database>/&lt;collection>/get*** | **X-name**: name, **X-request**: request | return the value |
