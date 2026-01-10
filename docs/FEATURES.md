# Feature Documentation

## Core Features

### 1. Keyword Highlighting
- Highlight custom keywords in comments
- Case-sensitive matching
- Supports any programming language
- Real-time updates as you type

### 2. Customizable Colors
- Set background color for each keyword
- Set font color for each keyword (optional, defaults to white)
- Supports hex color codes (e.g., `#FF6B6B`)

### 3. Bold Text
- Keywords are always displayed in bold
- Bold persists even when background colors are toggled off

### 4. Toggle Functionality
- **Status Bar Button**: Click the eye icon in the bottom-right
- **Command Palette**: "Custom Comment Highlighter: Toggle Highlighting"
- **Toggle States**:
  - ON: Background colors + white/custom text + bold
  - OFF: No background + original text color + bold only

### 5. Highlight Modes

#### Whole Line Mode (Default)
- Highlights the entire line including all whitespace
- Background spans from start to end of line

#### Keyword Only Mode
- Highlights only the text content (excluding indentation)
- Background applied only to actual text

**Switch modes in Settings:**
```json
{
  "customCommentHighlighter.highlightMode": "wholeLine"  // or "keywordOnly"
}
```

### 6. Live Updates
- Changes apply immediately as you type
- No need to reload or restart VS Code
- Configuration changes take effect instantly

### 7. Status Bar Integration
- Visual indicator of highlight state
- One-click toggle
- Shows eye icon when enabled, eye-closed when disabled

## Advanced Features

### Multiple Keywords per File
The extension finds all keywords in a file and applies appropriate styling to each.

### Overview Ruler Markers
Keywords are marked in the editor's overview ruler (scrollbar area) for quick navigation.

### Hover Messages
Hover over highlighted lines to see which keyword triggered the highlight.

## Performance

- Lightweight: Only 240KB package size
- Efficient: Updates only affected lines
- No overhead when disabled

## Compatibility

- Works with all VS Code themes (light and dark)
- Supports all file types and languages
- Compatible with other extensions

## Limitations

- Keywords must be exact matches (case-sensitive)
- Only highlights lines containing keywords, not partial matches within words
- Maximum recommended keywords: 20 (for performance)
