# encoding: utf-8
#
# Jekyll tipuesearch_content generator.
# check http://www.tipue.com/search for more info
#
# Version: 0.1.1 
#
# Copyright (c) 2014 Nuno Furtado, http://about.me/nuno.furtado
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
#
# A generator that creates tipuesearch_content.js based on your current posts.
#
# To use it, simply drop this script into the _plugins directory of your Jekyll site.
#
# You also need to make sure your posts have a tipue_description element in the YAML, 
# this is used to show the text on the search page
#
# Your posts categories(categories element in the YAML) get loaded into tipue tags, 
# making them searchable.
#
# if you use a tags system (tags element in the YAML), tags are also loaded into 
# tipue tags, making them searchable
#

require 'json'
module Jekyll
	
	#This object represents page information we will be writing to tipuesearch_content.js
	class TipuePage 
			
			# Initializes a new TipuePage.
			#
			#  +title+ Page Title
			#  +tags+  Page Tags
			#  +loc+   Page url
			#  +text+  Page Description
			def initialize(title,tags,loc,text)
				@title  = title
				@tags =tags
				@loc =loc
				@text=text
    		end
			
			def to_json
				hash = {}
				self.instance_variables.each do |var|
					hash[var.to_s.delete "@"] = self.instance_variable_get var
				end
				hash.to_json
			end
	
	
	end
	
	#This is our generator
	# it will recreate js/tipuesearch_content.js everytime jekyll build is run
	class TipueGenerator < Generator
		safe true
		
		def generate(site)
			
			pages=Array.new
			target = File.open('js/tipuesearch_content.js', 'w')
			target.truncate(target.size)
			target.puts('var tipuesearch = {"pages": [')
			
			all_but_last, last = site.posts[0..-2], site.posts.last
			
			#Process all posts but the last one
			all_but_last.each do |page|
				
				tp_page = TipuePage.new(page.data['title'],page.data['tags'].to_s +' '+ page.data['categories'].to_s ,page.url,page.data['tipue_description'].to_s)
				target.puts(tp_page.to_json + ',')
				
			end
			
			#Do the last
			tp_page = TipuePage.new(last.data['title'],last.data['tags'].to_s,last.url,last.data['tipue_description'].to_s)
			target.puts(tp_page.to_json)
			
			target.puts(']};')
			target.close()
		end
  end

end