# Installation Guide

## Method 1: From VS Code Marketplace (Recommended)

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
3. Search for "Custom Comment Highlighter"
4. Click **Install**

## Method 2: From VSIX File (Standalone Installation)

1. Download the `.vsix` file from the releases
2. Open VS Code
3. Go to Extensions view (`Cmd+Shift+X` or `Ctrl+Shift+X`)
4. Click the `...` menu at the top of the Extensions view
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

## Method 3: From Source

1. Clone this repository
   ```bash
   git clone https://github.com/sc0210/vscode-comment-spotlight.git
   cd vscode-comment-spotlight
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Compile the extension
   ```bash
   npm run compile
   ```

4. Press `F5` to launch Extension Development Host, or package it:
   ```bash
   npm install -g @vscode/vsce
   vsce package
   ```

5. Install the generated `.vsix` file using Method 2

## Verification

After installation:
1. Open any code file
2. Add a comment with `// TODO:` 
3. The line should be highlighted
4. Check the status bar for the "👁 Comments" button

## Troubleshooting

- **Extension not activating?** Reload VS Code: `Cmd+R` or `Ctrl+R`
- **No highlighting?** Check if the toggle button is enabled (status bar)
- **Wrong colors?** Check your settings: `Cmd+,` → Search "Custom Comment Highlighter"
