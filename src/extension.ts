// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

interface KeywordConfig {
	keyword: string | string[]; // Support both single keyword and array of keywords
	color: string;
	fontColor?: string;
	highlightMode?: 'wholeLine' | 'keywordOnly';
	highlightScope?: 'commentsOnly' | 'everywhere';
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
		// Handle both string and array of keywords
		const keywordArray = Array.isArray(keyword) ? keyword : [keyword];
		keywordArray.forEach(kw => {
			decorationTypes.set(kw, decorationType);
		});
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

	// Map to store decorations for each keyword
	const decorationsMap: Map<string, vscode.DecorationOptions[]> = new Map();

	// Initialize decoration arrays for each keyword
	decorationTypes.forEach((_, keyword) => {
		decorationsMap.set(keyword, []);
	});

	// Get keywords config for per-keyword settings
	const config = vscode.workspace.getConfiguration('customCommentHighlighter');
	const keywords: KeywordConfig[] = config.get('keywords', []);

	// Pre-compile regexes and prepare keyword configs for faster lookup
	const keywordRegexMap = new Map<string, RegExp>();
	const keywordConfigMap = new Map<string, KeywordConfig>();

	keywords.forEach(keywordConfig => {
		// Handle both string and array of keywords
		const keywordArray = Array.isArray(keywordConfig.keyword) ? keywordConfig.keyword : [keywordConfig.keyword];
		keywordArray.forEach(keyword => {
			const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			keywordRegexMap.set(keyword, new RegExp(escapedKeyword, 'g'));
			keywordConfigMap.set(keyword, keywordConfig);
		});
	});

	// Process document line by line
	for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
		const line = document.lineAt(lineNum);
		const lineText = line.text;

		// Check if line is a comment once per line (optimization)
		const isCommentLineFlag = isCommentLine(lineText);

		// Check each keyword
		decorationTypes.forEach((decorationType, keyword) => {
			const keywordConfig = keywordConfigMap.get(keyword);
			if (!keywordConfig) { return; }

			// Use per-keyword settings or fall back to global settings
			const keywordHighlightScope = keywordConfig.highlightScope || highlightScope;
			const keywordHighlightMode = keywordConfig.highlightMode || highlightMode;

			// Skip non-comment lines if this keyword's scope is 'commentsOnly'
			if (keywordHighlightScope === 'commentsOnly' && !isCommentLineFlag) {
				return;
			}

			// Get the pre-compiled regex for this keyword
			const regex = keywordRegexMap.get(keyword);
			if (!regex) { return; }

			// Reset regex state for this line
			regex.lastIndex = 0;

			let match: RegExpExecArray | null;
			// Use global regex to find all matches in the line
			while ((match = regex.exec(lineText)) !== null) {
				let decoration: vscode.DecorationOptions;
				if (keywordHighlightMode === 'wholeLine') {
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
	if (trimmed.length === 0) {
		return false; // Empty lines are not comments
	}

	const firstChar = trimmed.charCodeAt(0);
	const secondChar = trimmed.length > 1 ? trimmed.charCodeAt(1) : 0;

	// Fast check using character codes for common comment patterns
	// 47 = '/', 35 = '#', 42 = '*', 60 = '<', 45 = '-'
	return (firstChar === 47 && (secondChar === 47 || secondChar === 42)) || // //, /*
		firstChar === 35 ||                                                  // #
		firstChar === 42 ||                                                  // *
		(firstChar === 60 && trimmed.startsWith('<!--')) ||                 // <!--
		(firstChar === 45 && secondChar === 45) ||                          // --
		trimmed.endsWith('*/');                                              // */
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

