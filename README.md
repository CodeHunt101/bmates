# README

Welcome to ***Bmates***, a place that helps you meet new people!

This is the production mode, deployed in heroku:

https://bmates.herokuapp.com/


To get the application up and running, please make do the following:

1. Install **Postgresql** as this is the database this app is configured to use. If you already have it, please go to the next step. 

In order to install Postgresql, you will need **Homebrew** prevously installed. If you do not have it, please run:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```
And then run the following to install **Postgresql**:

```
brew install postgresql
```

2. Please make sure you are using **Ruby 2.7.4**, otherwise go to the Gemfile and change it to the version you currently have. Then please run:

```
bundle install
```
3. This app uses **Active Storage**. Please run the following to install it:

```
bin/rails active_storage:install
```

4. To migrate and seed the database with mock data, please run:

```
rake db:create db:migrate db:seed
```

5. This app uses <a src="https://aws.amazon.com/s3/">Amazon S3 bucket</a> to store images. You'll need to have an *access_key_id* and a *secret_access_key*. Store them by deleting */config/credentials.yml.enc* and then executing the following:

```
EDITOR="code --wait" rails credentials:edit
```
Uncomment the *aws* snippet and add the *access_key_id* and the *secret_access_key*

6. Install the **React** library and its dependencies by running:

```
npm install
```

7. To call the server run:

```
rails server
```

8. Finally, to start Bmates on your browser run:

```
npm start
```

Enjoy!
