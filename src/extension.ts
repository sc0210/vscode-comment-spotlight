// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

interface KeywordConfig {
	keyword: string;
	color: string;
	fontColor?: string;
}

let decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
let isEnabled: boolean = true;
let highlightMode: string = 'wholeLine';
let highlightScope: string = 'commentsOnly';
let statusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Custom Comment Highlighter is now active!');

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'customCommentHighlighter.toggleHighlight';
	statusBarItem.tooltip = 'Click to toggle comment highlighting';
	context.subscriptions.push(statusBarItem);

	// Load initial settings
	loadConfiguration();

	// Show status bar immediately
	statusBarItem.show();

	// Register toggle command
	const toggleCommand = vscode.commands.registerCommand('customCommentHighlighter.toggleHighlight', () => {
		isEnabled = !isEnabled;
		const config = vscode.workspace.getConfiguration('customCommentHighlighter');
		config.update('enabled', isEnabled, vscode.ConfigurationTarget.Global);

		updateStatusBar();

		// Reload decorations with new style
		loadConfiguration();

		if (isEnabled) {
			vscode.window.showInformationMessage('Custom Comment Highlighter: Background colors enabled');
			updateAllEditors();
		} else {
			vscode.window.showInformationMessage('Custom Comment Highlighter: Background colors disabled (bold text only)');
			updateAllEditors();
		}
	});

	// Listen for active editor changes
	const activeEditorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDecorations(editor);
		}
	});

	// Listen for document changes
	const documentChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.document === editor.document) {
			updateDecorations(editor);
		}
	});

	// Listen for configuration changes
	const configChangeDisposable = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('customCommentHighlighter')) {
			loadConfiguration();
			updateAllEditors();
		}
	});

	// Initial decoration for active editor
	if (vscode.window.activeTextEditor) {
		updateDecorations(vscode.window.activeTextEditor);
	}

	context.subscriptions.push(
		toggleCommand,
		activeEditorChangeDisposable,
		documentChangeDisposable,
		configChangeDisposable
	);
}

function loadConfiguration() {
	const config = vscode.workspace.getConfiguration('customCommentHighlighter');
	isEnabled = config.get('enabled', true);
	highlightMode = config.get('highlightMode', 'wholeLine');
	highlightScope = config.get('highlightScope', 'commentsOnly');

	// Clear existing decoration types
	decorationTypes.forEach(decorationType => decorationType.dispose());
	decorationTypes.clear();

	// Create decoration types for each keyword
	const keywords: KeywordConfig[] = config.get('keywords', []);
	keywords.forEach(({ keyword, color, fontColor }) => {
		const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: isEnabled ? color : undefined,
			color: isEnabled ? (fontColor || '#FFFFFF') : undefined,
			fontWeight: 'bold',
			overviewRulerColor: color,
			overviewRulerLane: vscode.OverviewRulerLane.Right
		});
		decorationTypes.set(keyword, decorationType);
	});

	// Update status bar when config changes
	updateStatusBar();
}

function updateAllEditors() {
	vscode.window.visibleTextEditors.forEach(editor => {
		updateDecorations(editor);
	});
}

function clearAllDecorations() {
	vscode.window.visibleTextEditors.forEach(editor => {
		decorationTypes.forEach(decorationType => {
			// Force refresh after clearing
			updateAllEditors();
			editor.setDecorations(decorationType, []);
		});
	});
}

function updateDecorations(editor: vscode.TextEditor) {
	const document = editor.document;
	const text = document.getText();

	// Map to store decorations for each keyword
	const decorationsMap: Map<string, vscode.DecorationOptions[]> = new Map();

	// Initialize decoration arrays for each keyword
	decorationTypes.forEach((_, keyword) => {
		decorationsMap.set(keyword, []);
	});

	// Process document line by line
	for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
		const line = document.lineAt(lineNum);
		const lineText = line.text;

		// Skip non-comment lines if highlightScope is 'commentsOnly'
		if (highlightScope === 'commentsOnly' && !isCommentLine(lineText)) {
			continue;
		}

		// Check each keyword
		decorationTypes.forEach((decorationType, keyword) => {
			let match: RegExpExecArray | null;
			// Use global regex to find all matches in the line
			const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
			while ((match = regex.exec(lineText)) !== null) {
				let decoration: vscode.DecorationOptions;
				if (highlightMode === 'wholeLine') {
					// Highlight entire line content (from first non-whitespace to end, trimmed)
					const trimmedStart = lineText.search(/\S/);
					const trimmedEnd = lineText.trimEnd().length;
					const startPos = new vscode.Position(lineNum, trimmedStart >= 0 ? trimmedStart : 0);
					const endPos = new vscode.Position(lineNum, trimmedEnd);
					decoration = {
						range: new vscode.Range(startPos, endPos),
						hoverMessage: `Highlighted: ${keyword}`
					};
				} else {
					// Highlight only the matched keyword
					const startPos = new vscode.Position(lineNum, match.index);
					const endPos = new vscode.Position(lineNum, match.index + match[0].length);
					decoration = {
						range: new vscode.Range(startPos, endPos),
						hoverMessage: `Highlighted: ${keyword}`
					};
				}
				decorationsMap.get(keyword)?.push(decoration);
			}
		});
	}

	// Apply all decorations
	decorationTypes.forEach((decorationType, keyword) => {
		const decorations = decorationsMap.get(keyword) || [];
		editor.setDecorations(decorationType, decorations);
	});
}

function isCommentLine(lineText: string): boolean {
	const trimmed = lineText.trim();
	// Check for common comment patterns
	return trimmed.startsWith('//') ||      // JavaScript, TypeScript, C++, etc.
		trimmed.startsWith('#') ||       // Python, Ruby, Shell, etc.
		trimmed.startsWith('/*') ||      // Multi-line comment start
		trimmed.startsWith('*') ||       // Multi-line comment continuation
		trimmed.startsWith('<!--') ||    // HTML/XML comments
		trimmed.startsWith('--') ||      // SQL, Lua comments
		trimmed.endsWith('*/');
}

function updateStatusBar() {
	if (isEnabled) {
		statusBarItem.text = "$(eye) Comments";
		statusBarItem.backgroundColor = undefined;
	} else {
		statusBarItem.text = "$(eye-closed) Comments";
		statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
	}
	statusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Dispose all decoration types
	decorationTypes.forEach(decorationType => decorationType.dispose());
	decorationTypes.clear();

	// Dispose status bar item
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}

