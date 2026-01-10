# Testing Font Color Feature

Follow these steps to test if the font color customization is working correctly.

## Quick Test

1. **Open Extension Development Host**
   - Press `F5` in VS Code (with the extension project open)
   - A new VS Code window will open with the extension loaded

2. **Open Test File**
   - In the new window, open `examples/test-example.js`

3. **Modify Settings**
   - In the Extension Development Host, press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Click the `{}` icon (top-right) to open `settings.json`
   - Add this configuration:

```json
{
  "customCommentHighlighter.keywords": [
    {
      "keyword": "// TODO:",
      "color": "#FFA240",
      "fontColor": "#000000"
    },
    {
      "keyword": "// FIX:",
      "color": "#DC0000",
      "fontColor": "#FFFF00"
    },
    {
      "keyword": "// [SamChen]",
      "color": "#1A3D64",
      "fontColor": "#00FF00"
    }
  ]
}
```

4. **Verify Results**
   - `// TODO:` should have orange background with **black text**
   - `// FIX:` should have red background with **yellow text**
   - `// [SamChen]` should have blue background with **green text**

5. **Test Without fontColor**
   - Remove `fontColor` from one keyword
   - That keyword should default to **white text** (#FFFFFF)

## Expected Behavior

- ✅ Font color changes based on `fontColor` setting
- ✅ Defaults to white (#FFFFFF) if `fontColor` not specified
- ✅ Changes apply immediately when settings are saved
- ✅ Bold text always applied regardless of color

## Troubleshooting

### Font color not changing?

1. **Check spelling**: Make sure `fontColor` is spelled exactly (camelCase)
2. **Reload window**: Press `Cmd+R` or `Ctrl+R` to reload
3. **Check console**: Open Developer Tools (`Help > Toggle Developer Tools`) and check for errors
4. **Verify hex format**: Font color must be valid hex (e.g., `#FF0000`, not `red`)

### Colors look wrong?

- Make sure you're in the Extension Development Host (title bar says "[Extension Development Host]")
- Check if your color theme is interfering with text colors
- Try high-contrast colors first: `#FFFFFF` (white), `#000000` (black), `#FF0000` (red)

## Production Test (VSIX)

To test the packaged extension:

1. **Install VSIX**
   ```bash
   code --install-extension custom-comment-highlighter-0.0.3.vsix
   ```

2. **Reload VS Code**: Press `Cmd+Shift+P` → "Developer: Reload Window"

3. **Open settings.json** and add custom `fontColor` values

4. **Create a test file** with your keywords and verify colors

5. **Test toggle**: Click status bar button to ensure colors enable/disable properly

## Debug Mode

If you need to debug:

1. Set breakpoints in `src/extension.ts` at line 104 (fontColor assignment)
2. Press `F5` to launch debugger
3. Open test file and watch variables in Debug panel
4. Verify `fontColor` value is being read from configuration

## Report Issues

If font colors still don't work after following these steps:

1. Note your VS Code version: `Help > About`
2. Note your OS: macOS/Windows/Linux
3. Copy your exact `settings.json` configuration
4. Take a screenshot of the result
5. Report on GitHub: https://github.com/sc0210/vscode-comment-spotlight/issues
