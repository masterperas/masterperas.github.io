---
layout: post
title:  "Setup a search feature in your Jekyll static site"
date:   2014-01-09 
categories: articles webdev
tags: jekyll javascript ruby 
tipue_description: "Article detailing how i setup the search feature in my jekyll site"
---


I found [Jekyll] recently, and decided to give it a go. I already have my blog set up freely at wordpress but i've allways looked for a way to manage the several notes and links and what nots in a way they are easily accessible. 
Jekyll provides me with a simple and accessible way to do so, i can host them up at GitHub pages or just run them locally. 

If you don't know what Jekyll is go check out their website, but i'll pull a simple description from the docs here:
> It takes a template directory containing raw text files in various formats, runs it through Markdown (or Textile) and Liquid converters, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project's page, blog, or website from GitHub's servers for free.

Now for my use, i need to make sure i could search the site. But since Jekyll only serves static pages, there is no way to any server side magic. 

Enter [Tipue Search][tipuesearch] a jquery based search engine. This is pretty cool and it has a bunch of features. 

In Jekyll we will be using Tipue Search in static mode, it basicly reads a javascript file and displays the results based on the JSON object present. 

I won't get into how to set up Tipue Search, read their docs or the bazillion articles written on the web about it. It's pretty straight forward.

After everything was setup there was the problem of feeding the tipue_content.js file (used by the engine to show the results page).

Jekyll is [plugin friendly][jekyllplugins] so we can create plugins to expand Jekyll to our own needs, basicly when you build your site Jekyll automaticly runs all plugins in the _plugins folder. 

This happens before serving the static files. So we can create a plugin to generate our tipue_content.js file based on our _posts folder.

One type of plugins you can create are Generators, these allow us to generate content based on our site structure and information. 

You can find my Tipue Search Generator [here][tpsgen]. To use it just put the file in your _plugins folder and rebuild your site. Notice that GitHub Pages are run in safe mode, so the plugins will not be executed. You need to build the site locally before committing the tipue_content.js file up to GitHub Pages.

To use this make sure to put the following tags in your post YAML:

* tags - space separated list of tags for a given post
* tipue_description - The searchable text for that post. Also shown on the search results page.

This generator does not use the post content itself, it uses the content for the YAML tag tipue_description. It is technicly possible to use your entire post content as a searchable text, i decided agains this since The post it self might be quite big or have a ton of stuff that shouldn't be imported (images, links, etc) that i would need to cut out before generating the text.





I'd like to thank Dave Perrett since his [Category Page Generator][catpage] was really helpful in creating the tipue content generator.






[Jekyll]: http://jekyllrb.com/
[jekyllplugins]: http://jekyllrb.com/docs/plugins
[tipuesearch]: http://www.tipue.com/search/
[catpage]: http://recursive-design.com/projects/jekyll-plugins/
[tpsgen]:https://github.com/masterperas/masterperas.github.io/blob/master/_plugins/generate_tipue.rb