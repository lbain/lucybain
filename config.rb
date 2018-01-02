
###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  blog.permalink = "{year}/{title}.html"
  # Matcher for blog source files
  # blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.sources = "{year}/{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "layouts/blog"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  blog.tag_template = "blog/tag.html"
  # blog.calendar_template = "blog/calendar.html"

  # Enable pagination
  blog.paginate = false
end

page "/feed.xml", layout: false
ignore 'blog/reference/*'

{
  "udacity/index.html" => "/resources/udacity-python-study-group/",
  "python/index.html" => "/resources/udacity-python-study-group/",
  "cv/index.html" => "/resume/",
  "odin/index.html" => "/resources/js-jquery-study-group/",
  "js/index.html" => "/resources/js-jquery-study-group/",
  "blog/2014/anonymous-functions/index.html" => "/blog/2014/js-anonymous-referenced-declared-functions/",
  "blog/2015/js-ways-to-call-functions/" => "/blog/2015/js-new-keyword-and-functions/",
  "feed/index.html" => "feed.xml",
  "rss/index.html" => "feed.xml"
}.each do |from, to|
  redirect from, to: to
end

set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :fenced_code_blocks => true
set :markdown_engine, :redcarpet

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :blog do
#   page "/blog/*"
# end


# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

# Tell Middleman to create a folder for each .html file
activate :directory_indexes

# Use middleman-syntax gem to color syntax
activate :syntax, line_numbers: true

# Use middleman-alias gem to keep trak of renames
# activate :alias

require 'uri'

# Methods defined in the helpers block are available in templates
helpers do
  def nav_link(link_text, url, options = {})
    options[:class] ||= ""
    options[:class] << " active" if active_url?(current_page.url, url)
    link_to(link_text, url, options)
  end

  def active_url?(current_url, nav_url)
    return current_url.start_with? nav_url unless nav_url == '/'
    current_url == nav_url
  end

  def from_url(link_name)
    link_name.sub('-', ' ').titleize
  end

  def path_to_file_name(path)
    path.split('/').last.sub('.html', '')
  end

  def page_title(page)
    page.data.title || path_to_title(page.path)
  end

  def path_to_title(path)
    path_to_file_name(path).sub('-', ' ').titleize
  end

  def path_to_link(path)
    '/' << path.sub('.html', '/')
  end

  def keywords(page_data)
    @words = page_data.keywords || page_data.tags || false
  end

  def popular_blog_posts
    blog.articles.select do |item|
      item.metadata[:page]["featured"] rescue false
    end
  end

  def random_popular_post(current_page)
    resonable_posts = popular_blog_posts.delete_if do |item|
      item == current_page
    end
    resonable_posts.sample
  end

  def web_page_title
    if current_page.data.title
      "Lucy | #{current_page.data.title}"
    else
      "Lucy Bain"
    end
  end

  def page_description
    description = current_page.data.description
    if description
      raise "description must be less than 160 characters" if description.length > 160
      description
    else
      "Blog posts about programming, mostly JS and frontend, but a few other topics as well."
    end
  end

  def url_friendly(string)
    URI.escape(string)
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end