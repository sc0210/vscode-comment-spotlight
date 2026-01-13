# Change Log

All notable changes to the Custom Comment Highlighter extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.8] - 2026-01-13

### Added
- Per-keyword `highlightMode` and `highlightScope` settings
  - Each keyword can now have its own individual `highlightMode` (`wholeLine` or `keywordOnly`)
  - Each keyword can now have its own individual `highlightScope` (`commentsOnly` or `everywhere`)
  - Both settings are optional and fall back to global settings if not specified
  - Enables fine-grained control: mix whole-line and keyword-only highlighting, or highlight some keywords only in comments while others everywhere

### Documentation
- Added comprehensive examples for per-keyword settings in README.md
- Created new "Per-Keyword Settings (Advanced)" section with use cases
- Updated configuration options to include new optional properties

## [0.0.7] - Previous Release

- Initial release