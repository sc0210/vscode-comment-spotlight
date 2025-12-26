# Configuration Guide

## How to Customize Keywords and Colors

### Step-by-Step Instructions

1. **Open VS Code Settings**
   - Mac: Press `Cmd+,`
   - Windows/Linux: Press `Ctrl+,`

2. **Search for the Extension**
   - Type: `Custom Comment Highlighter`

3. **Edit Keywords**
   - Click "Edit in settings.json" under the Keywords setting
   - Or modify directly in the UI

### Settings Structure

```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "//[SamChen]",      // ← Your keyword (case-sensitive)
      "color": "#FF6B6B"              // ← Background color (hex format)
    },
    {
      "keyword": "// TODO:",
      "color": "#4ECDC4"
    }
  ],
  "customCommentHighlighter.enabled": true  // ← Toggle on/off
}
```

### Adding a New Keyword

**Before:**
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#4ECDC4"
    }
  ]
}
```

**After:**
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#4ECDC4"
    },
    {
      "keyword": "// IMPORTANT:",     // ← New keyword added
      "color": "#E94560"              // ← With new color
    }
  ]
}
```

### Changing a Color

**Before:**
```json
{
  "keyword": "// TODO:",
  "color": "#4ECDC4"    // ← Teal color
}
```

**After:**
```json
{
  "keyword": "// TODO:",
  "color": "#9D4EDD"    // ← Changed to purple
}
```

### Removing a Keyword

Simply delete the entire object from the array:

**Before:**
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#4ECDC4"
    },
    {
      "keyword": "// HACK:",         // ← Remove this
      "color": "#F4A261"
    },
    {
      "keyword": "//FIX:",
      "color": "#FFE66D"
    }
  ]
}
```

**After:**
```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#4ECDC4"
    },
    {
      "keyword": "//FIX:",
      "color": "#FFE66D"
    }
  ]
}
```

## Color Reference

### Recommended Colors (Vivid & High Contrast)

#### Red/Pink Tones
```json
{"keyword": "// URGENT:", "color": "#8B2635"}    // Dark Red
{"keyword": "// ERROR:", "color": "#8B0000"}     // Deep Red
{"keyword": "// DANGER:", "color": "#800020"}    // Burgundy
```

#### Blue/Teal Tones
```json
{"keyword": "// TODO:", "color": "#1B5E63"}      // Dark Teal
{"keyword": "// INFO:", "color": "#2C5F6F"}      // Dark Blue
{"keyword": "// DEBUG:", "color": "#003366"}     // Navy Blue
```

#### Yellow/Orange Tones
```json
{"keyword": "// WARNING:", "color": "#8B6F00"}   // Dark Gold
{"keyword": "// REVIEW:", "color": "#B8860B"}    // Dark Goldenrod
{"keyword": "// TEMP:", "color": "#8B5A2B"}      // Dark Orange
```

#### Purple Tones
```json
{"keyword": "// IDEA:", "color": "#4B0082"}      // Indigo
{"keyword": "// MAGIC:", "color": "#663399"}     // Rebecca Purple
{"keyword": "// SPECIAL:", "color": "#483D8B"}   // Dark Slate Blue
```

#### Green Tones
```json
{"keyword": "// DONE:", "color": "#2F4F2F"}      // Dark Green
{"keyword": "// SUCCESS:", "color": "#0B6623"}   // Forest Green
{"keyword": "// PASS:", "color": "#355E3B"}      // Hunter Green
```

## Common Patterns

### For Teams
```json
{
  "customCommentHighlighter.keywords": [
    {"keyword": "//[Alice]", "color": "#8B2635"},
    {"keyword": "//[Bob]", "color": "#1B5E63"},
    {"keyword": "//[Charlie]", "color": "#8B6F00"},
    {"keyword": "//[Diana]", "color": "#4B0082"}
  ]
}
```

### For Task Management
```json
{
  "customCommentHighlighter.keywords": [
    {"keyword": "// TODO:", "color": "#1B5E63"},
    {"keyword": "// IN PROGRESS:", "color": "#8B6F00"},
    {"keyword": "// DONE:", "color": "#2F4F2F"},
    {"keyword": "// BLOCKED:", "color": "#8B0000"}
  ]
}
```

### For Code Quality
```json
{
  "customCommentHighlighter.keywords": [
    {"keyword": "// FIX:", "color": "#8B0000"},
    {"keyword": "// OPTIMIZE:", "color": "#8B6F00"},
    {"keyword": "// REFACTOR:", "color": "#4B0082"},
    {"keyword": "// TEST:", "color": "#1B5E63"}
  ]
}
```

### For Different Languages
```json
{
  "customCommentHighlighter.keywords": [
    {"keyword": "// TODO:", "color": "#4ECDC4"},      // JavaScript
    {"keyword": "# TODO:", "color": "#4ECDC4"},       // Python
    {"keyword": "<!-- TODO:", "color": "#4ECDC4"},    // HTML
    {"keyword": "/* TODO:", "color": "#4ECDC4"}       // CSS
  ]
}
```

## Testing Your Configuration

1. **Save your settings**
2. **Open any file** (or create a test file)
3. **Type your keyword** in a comment
4. **See it highlight immediately**!

### Test Example
```javascript
// TODO: Test this configuration
// IMPORTANT: Check if the color is right
//[YourName] Review this section
```

## Troubleshooting

### Keyword Not Highlighting?
- ✅ Check spelling (case-sensitive!)
- ✅ Ensure keyword is in a comment line
- ✅ Verify color is valid hex format (#RRGGBB)
- ✅ Check if extension is enabled (toggle command)

### Color Not Showing?
- ✅ Must start with `#` (e.g., `#FF6B6B`)
- ✅ Must be 6 characters after `#`
- ✅ Use valid hex digits (0-9, A-F)

### Settings Not Applying?
- ✅ Save the settings file
- ✅ Try reloading VS Code (`Cmd+R` or `Ctrl+R`)
- ✅ Check for JSON syntax errors

## Tips

1. **Preview Colors**: Use online tools like colorpicker.com
2. **Consistency**: Use same color for similar keywords
3. **Contrast**: Choose colors that work in both light/dark themes
4. **Don't Overdo**: 5-10 keywords is usually enough
5. **Team Sync**: Share settings.json with your team

---

**Happy Customizing!** 🎨
