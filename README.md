# Mongo API 

## Usage

To use Mongo API, use the official container or install NodeJs and run Mongo DB with the `initial.sh` script.

## Structure

The Mongo API use one table named `povajs-api` where is the Mongo all databases administrator that is used by the API. Inside this database are two tables: `users` and `databases`. One store all the users with their permissions for databases and other one store the databases created or added by Mongo API because those are only accessible for security.

## API

In each of your API request you need to add a `x-token` header with the token build like `user.name`.`user.pwd`.

### Users

⚠ To use with the Mongo API default main admin user, it cannot be deleted, or updated from the API for security.

| Entrypoint | Headers data | Description |
| - | - | - |
| ***POST /users*** | **X-name**: name, **X-pwd**: hashed password, **X-perm**: json object with permissions | add a user to the database |
| ***DELETE /users*** | **X-name**: name | remove a user from the database |
| ***PATCH /users*** | **X-name**: name, (**X-pwd**: hashed password), (**X-perm**: json object with permissions) | update a user in the database |

### Databases

| Entrypoint | Headers data | Description |
| - | - | - |
| ***POST /databases/add*** | **X-name**: name | add a database to API use |
| ***POST /databases/remove*** | **X-name**: name | remove the database from API use |
| ***POST /databases/copy*** | **X-name**: name, **X-copyname**: new name | create a database copy |
| ***POST /databases*** | **X-name**: name | add a new database to API use |
| ***PATCH /databases*** | **X-name**: name, **X-newname**: new name | rename the database |
| ***DELETE /databases*** | **X-name**: name | delete the database |
| ***POST /databases/&lt;database>/add*** | **X-name**: name | add a collection to API use |
| ***POST /databases/&lt;database>/remove*** | **X-name**: name | remove the collection from API use |
| ***POST /databases/&lt;database>*** | **X-name**: name | add a new collection to API use |
| ***PATCH /databases/&lt;database>*** | **X-name**: name, **X-newname**: new name | rename the collection |
| ***DELETE /databases/&lt;database>*** | **X-name**: name | delete the collection |
| ***POST /databases/&lt;database>/&lt;collection>*** | **X-name**: name, **X-value**: value | create a new value |
| ***PATCH /databases/&lt;database>/&lt;collection>*** | **X-name**: name, **X-value**: value | update a value |
| ***DELETE /databases/&lt;database>/&lt;collection>*** | **X-name**: name | delete the value |
| ***GET /databases/&lt;database>/&lt;collection>*** | **X-name**: name, **X-request**: request | return the value |
