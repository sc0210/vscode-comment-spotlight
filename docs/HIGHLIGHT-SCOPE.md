# Highlight Scope Configuration

## Overview

The extension now supports two highlighting scope modes that control where keywords are highlighted in your code files.

## Configuration Options

### `customCommentHighlighter.highlightScope`

This setting determines the scope of keyword highlighting:

- **`commentsOnly`** (default): Highlights keywords only when they appear in comments
- **`everywhere`**: Highlights keywords anywhere in the code (variables, strings, function names, comments, etc.)

## How to Configure

### Using VS Code Settings UI

1. Open Settings (`Cmd+,` on macOS or `Ctrl+,` on Windows/Linux)
2. Search for "Custom Comment Highlighter"
3. Find "Highlight Scope" setting
4. Choose between:
   - **Comments Only** - Highlight keywords only in comments
   - **Everywhere** - Highlight keywords throughout entire file

### Using settings.json

```json
{
  "customCommentHighlighter.highlightScope": "everywhere"
}
```

or

```json
{
  "customCommentHighlighter.highlightScope": "commentsOnly"
}
```

## Examples

### Comments Only Mode (`commentsOnly`)

With keywords `TODO` and `important`:

```javascript
const TODO = "task";           // ❌ Not highlighted
// TODO: Fix this              // ✅ Highlighted
let important = 123;           // ❌ Not highlighted
// important: Check this       // ✅ Highlighted
```

### Everywhere Mode (`everywhere`)

With keywords `TODO` and `important`:

```javascript
const TODO = "task";           // ✅ Highlighted
// TODO: Fix this              // ✅ Highlighted
let important = 123;           // ✅ Highlighted
// important: Check this       // ✅ Highlighted
function TODO() {}             // ✅ Highlighted
let data = { important: 1 };   // ✅ Highlighted
```

## Supported Comment Types

When using `commentsOnly` mode, the extension recognizes these comment patterns:

- `//` - JavaScript, TypeScript, C++, Java, C#, etc.
- `#` - Python, Ruby, Shell scripts, YAML, etc.
- `/*` and `*/` - Multi-line comments (C-style)
- `*` - Multi-line comment continuation
- `<!--` - HTML/XML comments
- `--` - SQL, Lua comments

## Use Cases

### Comments Only Mode

Best for:
- Traditional comment highlighting (TODO, FIXME, NOTE, etc.)
- When keywords might conflict with code syntax
- Keeping highlights focused on developer notes

### Everywhere Mode

Best for:
- Tracking specific variable or function names across files
- Highlighting important identifiers or patterns
- Code review and debugging
- Finding all occurrences of specific terms

## Combining with Other Settings

The `highlightScope` setting works seamlessly with other extension settings:

```json
{
  "customCommentHighlighter.highlightScope": "everywhere",
  "customCommentHighlighter.highlightMode": "keywordOnly",
  "customCommentHighlighter.keywords": [
    {
      "keyword": "important",
      "color": "#FF6B6B",
      "fontColor": "#FFFFFF"
    }
  ]
}
```

## Performance Considerations

- **Comments Only Mode**: Faster, as it skips non-comment lines
- **Everywhere Mode**: Slightly slower for large files, but still optimized

Both modes are efficient and should not noticeably impact editor performance.
