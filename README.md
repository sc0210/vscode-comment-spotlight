# Custom Comment Highlighter

Highlight custom keywords anywhere in your code with bold text and configurable colors. Perfect for tracking TODOs, FIXMEs, personal notes, important variables, and more.

## Demo Screenshots
- **Mode:** Whole Line Highlighting
  ![Extension Demo-1](https://raw.githubusercontent.com/sc0210/vscode-comment-spotlight/main/images/demo-screenshot-wholeline.png)
- **Mode:** Keyword Highlighting
  ![Extension Demo-2](https://raw.githubusercontent.com/sc0210/vscode-comment-spotlight/main/images/demo-screenshot-keyword.png)

## ✨ Key Features

- 🎨 **Custom Colors** - Set background and font colors for each keyword
- 🔤 **Bold Text** - Keywords always displayed in bold
- 👁️ **Quick Toggle** - Status bar button to enable/disable highlighting
- ⚡ **Live Updates** - Changes apply instantly as you type
- 🎯 **Case Sensitive** - Precise keyword matching
- 🌈 **Multiple Keywords** - Support unlimited custom keywords
- 🔍 **Flexible Scope** - Highlight in comments only or throughout entire code
- 📐 **Multiple Modes** - Highlight whole line or just the keyword

## 🚀 Quick Start

### 1. Install
- Open VS Code Extensions (`Cmd+Shift+X` or `Ctrl+Shift+X`)
- Search for "Custom Comment Highlighter"
- Click **Install**

### 2. Use Default Keywords
The extension comes with 5 pre-configured keywords:
- `// [SamChen]` - Dark Blue
- `// TODO:` - Orange
- `// FIX:` - Red
- `// NOTE:` - Green
- `// LOG:` - Gray-Blue

Just type them in your comments and they'll be highlighted!

### 3. Toggle Highlighting
Click the **👁 Comments** button in the bottom-right status bar to toggle on/off.

## ⚙️ Customize Keywords

1. Open Settings: `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
2. Search for **"Custom Comment Highlighter"**
3. Click **"Edit in settings.json"**

### Basic Example
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#FFA240"
    },
    {
      "keyword": "// URGENT:",
      "color": "#DC0000"
    }
  ]
}
```

### With Custom Font Color
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// IMPORTANT:",
      "color": "#DC0000",
      "fontColor": "#FFFF00"
    }
  ]
}
```

**Configuration Options:**
- `keyword` - The text to match (case-sensitive) **[required]**
- `color` - Background color in hex (e.g., `#FFA240`) **[required]**
- `fontColor` - Text color in hex (e.g., `#FFFFFF`) **[optional, defaults to white]**

## 🎨 Change Colors

Pick colors that work well with your theme:

| Color | Hex Code | Best For |
|-------|----------|----------|
| Red | `#DC0000` | Critical/Urgent |
| Orange | `#FFA240` | Warning/TODO |
| Blue | `#1A3D64` | Info/Notes |
| Green | `#41644A` | Success/Done |
| Purple | `#4B0082` | Review/Question |

**Pro Tip:** Use darker backgrounds with light text for best readability!

## 🔍 Highlight Scope Modes

Choose where keywords should be highlighted:

### Comments Only Mode (Default)
Keywords are highlighted **only in comments**:
```javascript
const TODO = "task";         // Not highlighted
// TODO: Fix this            // ✅ Highlighted
```

**Best for:** Traditional comment highlighting (TODO, FIXME, NOTE)

### Everywhere Mode
Keywords are highlighted **anywhere in code**:
```javascript
const TODO = "task";         // ✅ Highlighted
// TODO: Fix this            // ✅ Highlighted
function important() {}      // ✅ Highlighted
let data = "NOTE: check";    // ✅ Highlighted
```

**Best for:** Tracking specific variables, functions, or patterns across files

**To change scope:**
```json
{
  "customCommentHighlighter.highlightScope": "everywhere"
}
```

## 🎨 Highlight Display Modes

Choose how to display highlighted keywords:

### Whole Line Mode (Default)
Highlights the **entire line content** (excluding leading/trailing spaces):
```javascript
    TODO: fix this issue    // Highlights "TODO: fix this issue"
```

### Keyword Only Mode
Highlights **only the keyword itself**:
```javascript
    TODO: fix this issue    // Highlights only "TODO:"
```

**To change display mode:**
```json
{
  "customCommentHighlighter.highlightMode": "keywordOnly"
}
```

See [Highlight Scope Guide](docs/HIGHLIGHT-SCOPE.md) for detailed examples.

## 📖 Documentation
- ✨ [Features](docs/FEATURES.md) - Complete feature list
- ⚙️ [Advanced Configuration](docs/ADVANCED-CONFIG.md) - Detailed settings and examples
- 🚀 [Quick Reference](docs/QUICK-REFERENCE.md) - Fast lookup guide
- 💡 [Examples](examples/) - Sample files

## 🐛 Troubleshooting

**Highlighting not working?**
1. Check if toggle is enabled (status bar button)
2. Verify keyword spelling (case-sensitive!)
3. Reload VS Code: `Cmd+R` or `Ctrl+R`

**Font color not changing?**
1. Make sure you've rebuilt the extension: `npm run compile`
2. Reload VS Code window
3. Check `fontColor` is spelled correctly in settings

**Images not showing on marketplace?**
- Images are hosted on GitHub and may take time to load
- Make sure your repository is public

## 📋 Requirements

- Visual Studio Code v1.107.0 or higher

## 📄 License

MIT License - Free for personal and commercial use

## 🤝 Contributing

Issues and pull requests welcome! Visit our [GitHub repository](https://github.com/sc0210/vscode-comment-spotlight)

---

**Enjoy your highlighted comments!** 🎨

