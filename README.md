lucybain.com is my personal website. The domain is registered with [iwantmyname](http://iwantmyname.com/), and hosting is with [netlify](https://netlify.app/).

## How to run it locally

The website is statically generated with [Middleman](https://middlemanapp.com/), which uses Ruby.

Things you'll need:

* Ruby - check the `.ruby-version` file for which version.
* Bundler to get the rest of the gems
* Node

Recommended install:

1. Get your [`.bash_profile`](https://github.com/lbain/settings/blob/master/.bash_profile) setup and working. It should be in your Dropbox already. You might need to add this to `~/.zshrc` (should probably look into this a bit more...)

	```bash
	if [ -f ~/.bash_profile ]; then
	  . ~/.bash_profile
	fi%   
	```
1. Install Xcode command line tools: `xcode-select --install`
1. Install [Homebrew](https://brew.sh/)
	* Make sure you're on a recent version
	* Run `brew doctor` to fix up any problems
1. Install [rbenv](https://github.com/rbenv/rbenv)
	* Check your rbenv installed correctly with `rbenv-doctor`. Note that this exact command might be out of date, but searching on `rbenv-doctor` will likely be successful.
	```bash
	curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
	```
1. Install relevant ruby version - `rbenv install {info from .ruby-version}`
1. Use that ruby version - `rbenv local {info from .ruby-version}`
	* I'm not sure why, but I also needed to set this for the global version with `rbenv global {info from .ruby-version}`
1. Check gems will install with rbenv - `gem env home`
	* It should start with something like `/Users/lucybain/.rbenv/versions`
1. Update all gems - `bundle update`
	* Yes, I can just do `bundle install` but since I probably haven't run this in a while I should do an update.
1. Install [nvm](https://github.com/nvm-sh/nvm)
1. Install node with `nvm install node`

## Usage

```ruby
middleman server # runs the server
middleman s # runs the server

middleman build # builds the static files
middleman b # builds the static files
```

* Make changes to the files in `source`; all the `build` files are thrown away after each build.
* Commit all changes, but particularly those in `build` since this is the rendered site.
* When you're ready to deploy, `git push` and netlify will automatically pick up the changes in a few minutes.

## Contributing
Pull requests fixing typos or other errors are welcome! Please update the file in the `source` directory, and optionally include the change to the `build` file as well - not reqiured, I can easily update these files locally :)