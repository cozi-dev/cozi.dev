# Cozi-Modern

A modern, minimal, responsive theme for Hugo featuring:

- Clean and modern design
- Responsive layout
- Dark mode support (with system preference detection)
- Syntax highlighting
- Customizable
- Fast loading
- SEO optimized
- Social sharing
- Comments support via Disqus
- Tag pages
- Hugo's internal templates for Google Analytics, Disqus, Open Graph and Twitter Cards

## Installation

1. In your Hugo site directory, run:
```bash
git submodule add https://github.com/cozidev/cozi-modern.git themes/cozi-modern
```

2. In your `config.toml` file, set the theme:
```toml
theme = "cozi-modern"
```

## Configuration

Example configuration in `config.toml`:

```toml
baseURL = "https://yourblog.com/"
languageCode = "en-us"
title = "Your Blog Title"
theme = "cozi-modern"
enableRobotsTXT = true
paginate = 10
summaryLength = 10

# Google Analytics
googleAnalytics = "UA-XXXXXXXX-X"

# Disqus Comments
disqusShortname = "your-disqus-shortname"

# Enable Emoji
enableEmoji = true

[taxonomies]
  tag = "tags"

[author]
  name = "Your Name"

[markup.goldmark.renderer]
  unsafe = true

[params]
  # Blog description
  description = "A place where I share my thoughts and ideas."
  
  # Main sections (used for the recent posts in the sidebar)
  mainSections = ["posts"]
  
  # Dark mode as default
  # defaultTheme = "dark"
```

## License

This theme is released under the MIT license. See [LICENSE](LICENSE) for details. 