// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

interface KeywordConfig {
	keyword: string;
	color: string;
}

let decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
let isEnabled: boolean = true;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Custom Comment Highlighter is now active!');

	// Load initial settings
	loadConfiguration();

	// Register toggle command
	const toggleCommand = vscode.commands.registerCommand('customCommentHighlighter.toggleHighlight', () => {
		isEnabled = !isEnabled;
		const config = vscode.workspace.getConfiguration('customCommentHighlighter');
		config.update('enabled', isEnabled, vscode.ConfigurationTarget.Global);

		if (isEnabled) {
			vscode.window.showInformationMessage('Custom Comment Highlighter: Highlighting enabled');
			updateAllEditors();
		} else {
			vscode.window.showInformationMessage('Custom Comment Highlighter: Highlighting disabled');
			clearAllDecorations();
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

	// Clear existing decoration types
	decorationTypes.forEach(decorationType => decorationType.dispose());
	decorationTypes.clear();

	// Create decoration types for each keyword
	const keywords: KeywordConfig[] = config.get('keywords', []);
	keywords.forEach(({ keyword, color }) => {
		const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: color,
			color: '#FFFFFF',
			fontWeight: 'bold',
			isWholeLine: true,
			overviewRulerColor: color,
			overviewRulerLane: vscode.OverviewRulerLane.Right
		});
		decorationTypes.set(keyword, decorationType);
	});
}

function updateAllEditors() {
	vscode.window.visibleTextEditors.forEach(editor => {
		updateDecorations(editor);
	});
}

function clearAllDecorations() {
	vscode.window.visibleTextEditors.forEach(editor => {
		decorationTypes.forEach(decorationType => {
			editor.setDecorations(decorationType, []);
		});
	});
}

function updateDecorations(editor: vscode.TextEditor) {
	if (!isEnabled) {
		clearAllDecorations();
		return;
	}

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

		// Check each keyword
		decorationTypes.forEach((decorationType, keyword) => {
			// Case-sensitive search
			const index = lineText.indexOf(keyword);
			if (index !== -1) {
				const startPos = new vscode.Position(lineNum, 0);
				const endPos = new vscode.Position(lineNum, lineText.length);
				const decoration: vscode.DecorationOptions = {
					range: new vscode.Range(startPos, endPos),
					hoverMessage: `Highlighted: ${keyword}`
				};
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

// This method is called when your extension is deactivated
export function deactivate() {
	// Dispose all decoration types
	decorationTypes.forEach(decorationType => decorationType.dispose());
	decorationTypes.clear();
}

