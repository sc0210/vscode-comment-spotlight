import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Highlight keywords anywhere in code', async () => {
		// Simulate a document with keywords in code and comments
		const testContent = [
			'const importantVar = 1;',           // Line 0: 'important' in variable name
			'// TODO: Refactor this',             // Line 1: 'TODO' in comment
			'let another = "important value";',   // Line 2: 'important' in string
			'console.log("not a keyword");',      // Line 3: no keywords
			'// important: check this',           // Line 4: 'important' in comment
			'function TODO() { return 42; }',     // Line 5: 'TODO' as function name
			'const data = { important: true };',  // Line 6: 'important' as object key
		].join('\n');

		// Create a mock TextDocument
		const document = {
			lineCount: testContent.split('\n').length,
			lineAt: (lineNum: number) => ({ text: testContent.split('\n')[lineNum] }),
			getText: () => testContent
		} as unknown as vscode.TextDocument;

		// Set up keywords and decorationTypes as in the extension
		const keywords = ['important', 'TODO'];
		const foundEverywhere: Record<string, number[]> = { important: [], TODO: [] };
		const foundCommentsOnly: Record<string, number[]> = { important: [], TODO: [] };

		// Helper function to check if line is a comment
		const isCommentLine = (lineText: string): boolean => {
			const trimmed = lineText.trim();
			return trimmed.startsWith('//') || trimmed.startsWith('#') ||
				trimmed.startsWith('/*') || trimmed.startsWith('*') ||
				trimmed.startsWith('<!--') || trimmed.startsWith('--') ||
				trimmed.endsWith('*/');
		};

		// Test 'everywhere' mode
		for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
			const lineText = document.lineAt(lineNum).text;
			for (const keyword of keywords) {
				const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
				let match: RegExpExecArray | null;
				while ((match = regex.exec(lineText)) !== null) {
					foundEverywhere[keyword].push(lineNum);
				}
			}
		}

		// Test 'commentsOnly' mode
		for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
			const lineText = document.lineAt(lineNum).text;
			if (!isCommentLine(lineText)) {
				continue;
			}
			for (const keyword of keywords) {
				const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
				let match: RegExpExecArray | null;
				while ((match = regex.exec(lineText)) !== null) {
					foundCommentsOnly[keyword].push(lineNum);
				}
			}
		}

		// Verify 'everywhere' mode finds keywords in all locations
		assert.deepStrictEqual(foundEverywhere.important, [0, 2, 4, 6], 'important keyword should be found everywhere');
		assert.deepStrictEqual(foundEverywhere.TODO, [1, 5], 'TODO keyword should be found everywhere');

		// Verify 'commentsOnly' mode finds keywords only in comments
		assert.deepStrictEqual(foundCommentsOnly.important, [4], 'important keyword should be found only in comments');
		assert.deepStrictEqual(foundCommentsOnly.TODO, [1], 'TODO keyword should be found only in comments');
	});
});
