# Quick Installation Guide

## Installing the Extension

### Option 1: Install from VSIX (Recommended for Portability)

1. Locate the file: `custom-comment-highlighter-0.0.1.vsix` in the project root
2. Open Visual Studio Code
3. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
4. Type "Extensions: Install from VSIX"
5. Select the `custom-comment-highlighter-0.0.1.vsix` file
6. Reload VS Code when prompted

### Option 2: Install from Source (Development)

1. Open this project folder in VS Code
2. Press `F5` to launch Extension Development Host
3. The extension will be active in the new VS Code window

## Quick Start

1. Open any code file
2. Add a comment with one of these keywords:
   - `//[SamChen]`
   - `// TODO:`
   - `//FIX:`
   - `// NOTE:`
   - `// HACK:`

3. The entire line will be highlighted with a vivid background color and bold text

## Toggle Highlighting

- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Custom Comment Highlighter: Toggle"
- Press Enter

## Customize Keywords

1. Open Settings (`Cmd+,` or `Ctrl+,`)
2. Search for "Custom Comment Highlighter"
3. Edit the keyword array to add your own keywords and colors

## Sharing the Extension

To share this extension with others:
1. Send them the `custom-comment-highlighter-0.0.1.vsix` file
2. They can install it using Option 1 above

The extension works offline and doesn't require any marketplace connection!
