# Big Surveillance

Because everyone really _is_ out to get your data with no pesky responsibilities
like having reliable security, as long as they’re willing to share it with the
federal government. Who, you know, are totally trustworthy to use that data in a
way that doesn't endanger your first amendment rights.

## Development

### Frameworks and libraries

* [React On Rails][02]
* [Ruby on Rails 5.2.1][03]

### Set up

* Ruby 2.5.3 and PostgreSQL required
* `gem install bundler` (if it’s not already installed)
* `gem install foreman` (optional)
* `git clone git@github.com:RT4National/DecideTheFuture.git`
* `bundle install`
* `rails db:create`
* `rails db:migrate`
* `yarn install`

### Run

* `rails s` or `foreman start -f Procfile.dev`

### Deploy code changes

* `heroku login`
* `heroku git:remote -a stark-inlet-79454`
* Commit changes i.e. (`git add .` `git commit -am "code change"`)
* `git push heroku master`

[02]: https://github.com/shakacode/react_on_rails
[03]: https://rubyonrails.org/
