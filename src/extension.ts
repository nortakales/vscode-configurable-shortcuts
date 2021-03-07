import * as vscode from 'vscode';
import ConfigurableShortcuts from './ConfigurableShortcuts';

export function activate(context: vscode.ExtensionContext) {

	// List of commands: https://gist.github.com/skfarhat/4e88ef386c93b9dceb98121d9457edbf
	// Codicons: https://microsoft.github.io/vscode-codicons/dist/codicon.html

	const shortcuts = new ConfigurableShortcuts(context);

	vscode.workspace.onDidChangeConfiguration(() => {
		shortcuts.updateView();
	});
}

export function deactivate() { }
