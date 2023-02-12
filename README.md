# README

This app is a boilerplate designed to get you up and going with development in a few easy steps.
Utilizing Ruby on Rails in the backend and React in the frontend.
Communication between the two will be Graphql.

### Ruby Installation
Use `rbenv` to install the Ruby version specified in `.ruby-version`

```sh
rbenv install 2.7.6
```

Run bundler to install all the dependencies.
```sh
bundle
```

### Postgresql
Use homebrew to install postgresql 12
```sh
brew install postgresql@12
```
Add the path to Postgres
```sh
export PATH="/opt/homebrew/opt/postgresql@12/bin:$PATH"
```
Start psql using
```sh
brew services restart postgresql@12
```
Create your app user
* Note: If changing the name, please ensure to change the name wherever 'authentication_app' can be found in VSCode's search
```sh
createuser -s authentication_app
```
If postgres was installed correctly, you should be able to run the seed file
```sh
bin/rails db:seed
```

### Javascript dependencies
Install NVM
```shell
brew install nvm
```
Installing Node using nvm
```shell
nvm install 18.9.0
node -v
```
Install Yarn
```shell
nvm install --global yarn
```
CD into the frontend directory and install dependencies
```shell
cd frontend
yarn install
```

### Starting the server
Backend server
```shell
rails s
# served at localhost:3000
```
Frontend server
```shell
cd frontend
nvm start
# served at localhost:3001
```
