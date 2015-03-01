---
layout: post
title:  "FSTF: GitHub Pages with Jekyll and Plugins"
date:   2014-04-27 12:12:00
categories: jekyll fstf series github guide
---

__From Start to Finish (FSTF)__, a series of guides for going from nothing to something with a particular technology. The majority of these guides will be for setting up the software that I use on my custom domain, but I will probably branch out as we go along.

### FSTF: GitHub Pages With Jekyll And Plugins

The site that you are at right now is using [Jekyll][jekyll-main]. I have found it pretty easy to get started with, but it is definitely more for the "hacker-type" than the general population of users on the Internet. If you are not comfortable with [Github][github-main] or [git][git-main] you may have difficulty with this guide. In order to maintain the site created from this guide, you will need to know [markdown][markdown-main] at the very least, although I recommend knowing basic HTML and CSS.

### What Are The Prerequisites?

- Windows machine; That is what I performed these tasks on, so it will make your life easier to do the same.
- GitHub account
- [git client][git-clients]; I can usually get by with using the [official GitHub client][github-client-windows], but for some parts we will use the git CLI
- registered domain name; This will only be necessary if you want your GitHub page to point to a custom domain name.
- Some time and patience

### Environment Setup

__GitHub__: First, let's get a repo created on GitHub. Follow GitHub's [guide on setting up GitHub pages][github-pages-setup-guide].

__Ruby__: We can't do much without Ruby installed, so let's do that now. Follow [this guide][ruby-setup-guide] with Ruby v1.9.3 and 32-bit Windows dev-kit.  Stop after you have finished step 4.

__Jekyll__: Run run the following from a command prompt

{% highlight bash %}
gem install jekyll
{% endhighlight %}

__Pygments__: You only need to do this section if you want code highlighting in your posts. I assume you probably do. You will need

- [Python Installer v2.7.3][python-2-7-3-download]

Run the installer. Now for Pygments itself, you can use Ruby Gems for that as well. We need a specific version, so run the following in a command prompt

{% highlight bash %}
gem install pygments.rb --verbose "=0.5.0"
{% endhighlight %}

### Jekyll Template and Serving

Find yourself a Jekyll template. You could start from scratch, but since you are already reading this guide I am going to guess you would rather have a good starting point. :)

Look for a template [here][jekyll-templates-list] or use [mine][my-jekyll-source]. You will want to clone locally whichever repo you choose. 

For the rest of the guide, it will be easiest if you chose my template since all templates are not created equal and thus will require different setups.

At this point you should have 2 local repos, one for your GitHub Page and another for the template you chose. What you will want to do is manually copy the files from the template repo to your main repo __except__ for  the following files/directories:

- _site/*
- .git/*

There are a few files that we will need to alter in order to make it work.

- __config.yml__: This file needs to be updated to reflect your name, url, and description.
- __CNAME__: If you are going to have your GitHub Page forward to a custom domain, then [follow this guide][custom-domain-guide]; otherwise, just delete the file.
- __README.md__: Update this to reflect that this is your repo, not the repo of whomever's template you copied.
- __a lot of of other random files__ (optional): mostly just HTML files, but there are other files that reference me or other template creators.  I figure you aren't creating this site for them.

Now we need to make sure we have all of the necessary Ruby Gems in order to build this Jekyll project. Take a look at the __Gemfile__ located at the root of your repo. We need to install each of these gems. For my repo, the install command will look something like this

{% highlight bash %}
gem install sass bourbon jekyll-assets
{% endhighlight %}

We should be able to build our Jekyll site now. Navigate to your GitHub Page repo:

{% highlight bash %}
cd .../workspace/ingshtrom.github.io
jekyll serve
{% endhighlight %}

Navigate to http://localhost:4000 and see how it looks!

### Deployment

It's fantastic that we have this static website build using Jekyll, but it is pretty useless right now. Let's deploy our site to GitHub. There are two main obstacles in our way: 

+ Jekyll Plugins can't be run in safe mode, which is how GitHub runs all GitHub pages
  * We will build and publish the static files for GitHub Pages.
+ It is a pain to manually push changes to our website to GitHub every time.
  * We will use [rake][rake] to automate this process

By reading around and looking at other users' repos (mainly [Rich Grundy's][rich-grundy-jekyll-template]), I have found out how to publish our files in such a way as to keep both the source and built files easily accessible. This way includes keeping two branches active at all times on our repo:

- __master__: The master branch holds the pre-built, static files. GitHub will use these files for your GitHub Page directly. You can think of the master branch as being the root of your web server. These files will be served __as is__. You should __NOT__ edit this branch. It should only be updated by rake, which we will talk about soon
- __source__ (not created yet): The source branch holds all...erm, source files. This is what your Jekyll site looks like before being built. Here is where you will write posts, edit styles, and make any other changes to your site.

Ok, we know what we want, but it would sure suck to manually set that up every time we want to make a change to our site! Luckily, I have found a guide on how to automate it. Thank you to [Nitrous.io][nitrous-main] for the [blog post][nitrous-jekyll-guide]. I recommend reading that post in order to get an idea of what we are doing. We will be changing the rakefile a little bit because our repo is laid out a bit differently. Nitrous.io uses the "gh-pages" way of deploying GitHub Pages for projects, but we want to deploy our site as a user page. 

First, lets get our master branch committed and the __source__ branch created. Run the following:

{% highlight bash %}
cd .../workspace/ingshtrom.github.io
git commit -m "initial commit"
git push origin master
git checkout -B source
git push origin
{% endhighlight %}

Now we are ready for the rake bit. In the root of our repo, there is a file named "rakefile". Rake uses that file as directions on how to build our project. Here is the rakefile from [Nitrous.io][nitrous-jekyll-guide] with a few modifications to commit/publish to __master__ instead of __gh-pages__.

[https://github.com/ingshtrom/ingshtrom.github.io/blob/source/rakefile](https://github.com/ingshtrom/ingshtrom.github.io/blob/source/rakefile)

Before we go running it, we need to commit the rakefile changes:

{% highlight bash %}
cd .../workspace/ingshtrom.github.io
git commit -m "udpated rakefile because Ingshtrom said so..."
git push origin
{% endhighlight %}

Oh! And one more thing, the following line needs to be changed from

{% highlight bash %}
system "git commit -am \"#{message.shellescape}\""
{% endhighlight %}

to

{% highlight bash %}
system "git commit -m \"#{message.shellescape}\""
{% endhighlight %}
(Notice the removal of the "a" flag).

Now just run the following in a Git Bash prompt at the root of your repo

{% highlight bash %}
rake
{% endhighlight %}

You will be prompted for your GitHub credentials, and the last message you _should_ see is

{% highlight bash %}
yolo
{% endhighlight %}

To double-check if it worked, go the repo on GitHub. If you switch to the __master__ branch, you should __not__ see any of the following files/directories:

- "rakefile"
- "_config.yml"
- any directories starting with an underscore

If you switch to the __source__ branch, you will see the files/directories listed above.

Congrats! You should be able to see your GitHub Page site at __username__.github.io. It can take up to 10 minutes to appear. Enjoy!

[jekyll-main]: http://jekyllrb.com/
[jekyll-templates-list]: https://github.com/jekyll/jekyll/wiki/Sites
[git-main]: http://git-scm.com/
[github-main]: https://github.com/
[github-pages-setup-guide]: https://pages.github.com/
[ruby-setup-guide]: http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html
[python-2-7-3-download]: https://www.python.org/ftp/python/2.7.6/python-2.7.6.msi
[rich-grundy-jekyll-template]: https://github.com/richguk/richguk.github.io
[my-jekyll-source]: https://github.com/ingshtrom/ingshtrom.github.io
[markdown-main]: http://daringfireball.net/projects/markdown/
[git-clients]: http://git-scm.com/downloads/guis
[github-client-windows]: https://windows.github.com/
[custom-domain-guide]: https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages
[nitrous-main]: https://www.nitrous.io/
[nitrous-jekyll-guide]: http://blog.nitrous.io/2013/08/30/using-jekyll-plugins-on-github-pages.html
[rake]: http://rake.rubyforge.org/