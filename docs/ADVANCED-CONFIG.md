# Advanced Configuration

## Keyword Configuration

### Basic Structure
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#FFA240",
      "fontColor": "#FFFFFF"
    }
  ]
}
```

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `keyword` | string | Yes | - | The text to match (case-sensitive) |
| `color` | string | Yes | - | Background color (hex format) |
| `fontColor` | string | No | `#FFFFFF` | Text color (hex format) |

## Configuration Examples

### Personal Tags
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// [Alice]",
      "color": "#1A3D64",
      "fontColor": "#FFFFFF"
    },
    {
      "keyword": "// [Bob]",
      "color": "#FFA240",
      "fontColor": "#000000"
    }
  ]
}
```

### Task Management
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#FFA240"
    },
    {
      "keyword": "// IN PROGRESS:",
      "color": "#4169E1"
    },
    {
      "keyword": "// DONE:",
      "color": "#2F4F4F"
    },
    {
      "keyword": "// BLOCKED:",
      "color": "#DC0000"
    }
  ]
}
```

### Code Quality
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// FIXME:",
      "color": "#DC0000",
      "fontColor": "#FFFF00"
    },
    {
      "keyword": "// OPTIMIZE:",
      "color": "#FFA240"
    },
    {
      "keyword": "// REFACTOR:",
      "color": "#4B0082"
    },
    {
      "keyword": "// TEST:",
      "color": "#2F4F2F"
    }
  ]
}
```

### Multiple Languages
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#FFA240"
    },
    {
      "keyword": "# TODO:",
      "color": "#FFA240"
    },
    {
      "keyword": "/* TODO:",
      "color": "#FFA240"
    },
    {
      "keyword": "<!-- TODO:",
      "color": "#FFA240"
    }
  ]
}
```

## Color Selection Tips

### High Contrast Combinations
| Background | Font Color | Use Case |
|------------|-----------|----------|
| `#DC0000` | `#FFFFFF` | Urgent/Critical |
| `#FFA240` | `#000000` | Warning/Attention |
| `#2F4F2F` | `#FFFFFF` | Success/Complete |
| `#4169E1` | `#FFFFFF` | Information |
| `#4B0082` | `#FFFFFF` | Review/Question |

### Color Palette Suggestions

**Professional:**
- Dark Blue: `#1A3D64`
- Navy: `#003366`
- Forest Green: `#2F4F2F`
- Burgundy: `#800020`

**Bright:**
- Orange: `#FFA240`
- Red: `#DC0000`
- Sky Blue: `#4169E1`
- Purple: `#9D4EDD`

**Muted:**
- Teal: `#41644A`
- Gray-Blue: `#94B4C1`
- Olive: `#6B8E23`
- Mauve: `#9370DB`

## Settings Reference

### All Available Settings

```json
{
  // Enable or disable highlighting
  "customCommentHighlighter.enabled": true,
  
  // Highlight mode
  "customCommentHighlighter.highlightMode": "wholeLine",  // or "keywordOnly"
  
  // Keywords array
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// [SamChen]",
      "color": "#1A3D64",
      "fontColor": "#FFFFFF"
    }
  ]
}
```

## Keyboard Shortcuts

You can set custom keyboard shortcuts:

1. Open Keyboard Shortcuts: `Cmd+K Cmd+S` (Mac) or `Ctrl+K Ctrl+S` (Windows/Linux)
2. Search: "Custom Comment Highlighter"
3. Assign shortcut to `customCommentHighlighter.toggleHighlight`

Example keybinding in `keybindings.json`:
```json
{
  "key": "cmd+shift+h",
  "command": "customCommentHighlighter.toggleHighlight"
}
```

## Workspace vs User Settings

- **User Settings**: Apply to all VS Code workspaces
- **Workspace Settings**: Apply only to current workspace

To use workspace-specific keywords:
1. Open `.vscode/settings.json` in your project
2. Add your custom keywords there

## Troubleshooting Configuration

**Keywords not highlighting?**
- Check spelling (case-sensitive)
- Ensure valid hex colors (must start with `#`)
- Verify JSON syntax is correct

**Font color not showing?**
- Make sure `fontColor` property is spelled correctly
- Reload VS Code after changing settings
- Rebuild VSIX if testing from source: `vsce package`

**Settings not persisting?**
- Check if you're editing User vs Workspace settings
- Look for syntax errors in settings.json
- Try reopening VS Code
