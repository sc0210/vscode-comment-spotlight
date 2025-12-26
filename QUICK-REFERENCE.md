# Quick Reference Card

## 🎯 Quick Start (3 Steps)

1. **Test the Extension Now**
   - Press `F5` in VS Code
   - Open `test-example.js` in the new window
   - See the highlights in action!

2. **Install Permanently**
   - Open Command Palette: `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Win/Linux)
   - Type: "Extensions: Install from VSIX"
   - Select: `custom-comment-highlighter-0.0.1.vsix`

3. **Customize Your Keywords**
   - Settings → Search "Custom Comment Highlighter"
   - Edit the keywords array

## ⌨️ Essential Commands

| Action | Command |
|--------|---------|
| Toggle Highlighting | `Cmd+Shift+P` → "Custom Comment Highlighter: Toggle" |
| Open Settings | `Cmd+,` (Mac) or `Ctrl+,` (Win/Linux) |
| Install Extension | `Cmd+Shift+P` → "Extensions: Install from VSIX" |
| Test Extension | Press `F5` |

## 🏷️ Default Keywords

| Keyword | Color | Use Case |
|---------|-------|----------|
| `//[SamChen]` | Dark Red | Personal notes/reviews |
| `// TODO:` | Dark Teal | Tasks to complete |
| `//FIX:` | Dark Gold | Bugs to fix |
| `// NOTE:` | Dark Blue | Important notes |
| `// HACK:` | Dark Brown | Temporary solutions |

**All keywords display with white text on dark background for maximum contrast!**

## 📝 Example Usage

```javascript
// TODO: Implement error handling      ← Highlighted in teal
function process() {
    //FIX: Memory leak here             ← Highlighted in yellow
    // NOTE: Uses async pattern          ← Highlighted in light blue
    //[SamChen] Check this logic        ← Highlighted in red
}
```

## ⚙️ Settings Template

Copy this to your `settings.json`:

```json
{
  "customCommentHighlighter.enabled": true,
  "customCommentHighlighter.keywords": [
    {"keyword": "//[YourName]", "color": "#FF6B6B"},
    {"keyword": "// TODO:", "color": "#4ECDC4"},
    {"keyword": "//FIX:", "color": "#FFE66D"},
    {"keyword": "// IMPORTANT:", "color": "#E94560"}
  ]
}
```

## 🎨 Color Palette

Vivid colors for best visibility:
- Red: `#FF6B6B`, `#E94560`, `#FF5252`
- Blue: `#4ECDC4`, `#3498DB`, `#5DADE2`
- Yellow: `#FFE66D`, `#F4A261`, `#FFA500`
- Purple: `#9D4EDD`, `#A78BFA`
- Green: `#2ECC71`, `#4ADE80`

## 📦 Sharing the Extension

1. Send the file: `custom-comment-highlighter-0.0.1.vsix`
2. Recipient installs via: "Extensions: Install from VSIX"
3. Works offline, no marketplace needed!

## 🔄 Toggle States

| State | Effect |
|-------|--------|
| Enabled | All keywords highlighted with dark backgrounds + white text + bold |
| Disabled | All highlights removed, text appears normal |

## 💡 Pro Tips

1. **Case Matters**: `// TODO:` ≠ `// todo:`
2. **Whole Line**: Entire line gets highlighted, not just keyword
3. **Live Update**: Changes appear instantly as you type
4. **Persistent**: Toggle state saves across sessions
5. **Universal**: Works in all file types (.js, .py, .md, etc.)

## 🚀 Ready to Go!

Press **F5** now to see it in action! 🎉
