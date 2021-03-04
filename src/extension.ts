import * as vscode from 'vscode';
import ConfigurableShortcuts from './ConfigurableShortcuts';

export function activate(context: vscode.ExtensionContext) {

	// List of commands: https://gist.github.com/skfarhat/4e88ef386c93b9dceb98121d9457edbf
	// Codicons: https://microsoft.github.io/vscode-codicons/dist/codicon.html
	// https://github.com/SpartanX1/vscode-quick-panel
	// https://github.com/yasukotelin/toggle-panel
	// https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension
	// https://github.com/sabitovvt/vscode-favorites-panel
	// https://github.com/Motivesoft/vscode-uuid-generator

	/**
	 * Ideas
	 * word wrap
	 * save
	 * save all
	 * back
	 * forward
	 * undo redo
	 * show/hide whitespace
	 * find/replace
	 */



	const shortcuts = new ConfigurableShortcuts(context);

	vscode.workspace.onDidChangeConfiguration(() => {
		shortcuts.updateView();
	});
}



export function deactivate() { }
