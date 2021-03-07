import * as vscode from 'vscode';

class ConfigurableShortcuts {

    public constructor(context: vscode.ExtensionContext) {
        this.init(context);
    }

    getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration("shortcut");
    }

    init(context: vscode.ExtensionContext) {
        this.createStatusBarIcons(context);
        this.registerCommands(context);
        this.updateView();
    }

    private panelItem!: Pair<vscode.StatusBarItem>;
    private outputItem!: Pair<vscode.StatusBarItem>; // not true toggle when in status bar only
    private debugConsoleItem!: Pair<vscode.StatusBarItem>; // not true toggle
    private terminalItem!: Pair<vscode.StatusBarItem>; // not true toggle

    private devToolsItem!: Pair<vscode.StatusBarItem>;

    private formatItem!: Pair<vscode.StatusBarItem>;
    private wordWrapItem!: Pair<vscode.StatusBarItem>;
    private toggleWhitespaceCharactersItem!: Pair<vscode.StatusBarItem>;

    private saveItem!: Pair<vscode.StatusBarItem>;
    private saveAllItem!: Pair<vscode.StatusBarItem>;

    private backItem!: Pair<vscode.StatusBarItem>;
    private forwardItem!: Pair<vscode.StatusBarItem>;
    
    private undoItem!: Pair<vscode.StatusBarItem>;
    private redoItem!: Pair<vscode.StatusBarItem>;

    private splitEditorDownItem!: Pair<vscode.StatusBarItem>;

    private addCursorsToLineEndsItem!: Pair<vscode.StatusBarItem>;
    private toggleColumnSelectionModeItem!: Pair<vscode.StatusBarItem>;

    private runItem!: Pair<vscode.StatusBarItem>;
    private runWithDebugItem!: Pair<vscode.StatusBarItem>;

    private createStatusBarIcons(context: vscode.ExtensionContext) {

        this.panelItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.togglePanel",
            `$(window)`,
            "Toggle Panel");

        this.outputItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleOutput",
            `$(output)`,
            "Toggle Output");

        this.debugConsoleItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleDebugConsole",
            `$(debug-console)`,
            "Toggle Debug Console");

        this.terminalItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleTerminal",
            `$(terminal)`,
            "Toggle Terminal"
        );

        this.devToolsItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleDevTools",
            `$(circuit-board)`,
            "Toggle Dev Tools"
        );
        
        this.formatItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.format",
            `$(json)`,
            "Format File"
        );

        this.wordWrapItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleWordWrap",
            `$(word-wrap)`,
            "Toggle Word Wrap"
        );

        this.toggleWhitespaceCharactersItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleWhitespaceCharacters",
            `$(whitespace)`,
            "Toggle Whitespace Characters"
        );

        this.saveItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.save",
            `$(save)`,
            "Save"
        );
        
        this.saveAllItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.saveAll",
            `$(save-all)`,
            "Save All"
        );

        this.backItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.back",
            `$(chevron-left)`,
            "Back"
        );
        
        this.forwardItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.forward",
            `$(chevron-right)`,
            "Forward"
        );
        
        this.undoItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.undo",
            `$(discard)`,
            "Undo"
        );
        
        this.redoItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.redo",
            `$(redo)`,
            "Redo"
        );
        
        this.splitEditorDownItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.splitEditorDown",
            `$(split-vertical)`,
            "Split Editor Down"
        );

        this.addCursorsToLineEndsItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.addCursorsToLineEnds",
            `$(export)`,
            "Add Cursors To Line Ends"
        );
        
        this.toggleColumnSelectionModeItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.toggleColumnSelectionMode",
            `$(move)`,
            "Toggle Column Selection Mode"
        );

        this.runItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.run",
            `$(play)`,
            "Run"
        );

        this.runWithDebugItem = this.createStatusBarItemPair(
            context,
            1,
            "shortcut.runWithDebug",
            `$(debug-alt)`,
            "Run With Debug"
        );
    }

    private registerCommands(context: vscode.ExtensionContext) {
        this.registerCommand(context, "shortcut.togglePanel", "workbench.action.togglePanel");
        this.registerCommand(context, "shortcut.toggleOutput", "workbench.action.output.toggleOutput");
        this.registerCommand(context, "shortcut.toggleDebugConsole", "workbench.debug.action.toggleRepl");
        this.registerCommand(context, "shortcut.toggleTerminal", "workbench.action.terminal.toggleTerminal");

        this.registerCommand(context, "shortcut.toggleDevTools", "workbench.action.toggleDevTools");
        
        this.registerCommand(context, "shortcut.format", "editor.action.formatDocument");
        this.registerCommand(context, "shortcut.toggleWordWrap", "editor.action.toggleWordWrap");
        this.registerCommand(context, "shortcut.toggleWhitespaceCharacters", "editor.action.toggleRenderWhitespace");
        
        this.registerCommand(context, "shortcut.save", "workbench.action.files.save");
        this.registerCommand(context, "shortcut.saveAll", "workbench.action.files.saveAll");
        
        this.registerCommand(context, "shortcut.back", "workbench.action.navigateBack");
        this.registerCommand(context, "shortcut.forward", "workbench.action.navigateForward");
        
        this.registerCommand(context, "shortcut.undo", "undo");
        this.registerCommand(context, "shortcut.redo", "redo");

        this.registerCommand(context, "shortcut.splitEditorDown", "workbench.action.splitEditorDown");
        
        this.registerCommand(context, "shortcut.addCursorsToLineEnds", "editor.action.insertCursorAtEndOfEachLineSelected");
        this.registerCommand(context, "shortcut.toggleColumnSelectionMode", "editor.action.toggleColumnSelection");
        
        this.registerCommand(context, "shortcut.run", "workbench.action.debug.run");
        this.registerCommand(context, "shortcut.runWithDebug", "workbench.action.debug.start");
    }

    updateView() {
        this.updateStatusBarItemPair("togglePanel", this.panelItem);
        this.updateStatusBarItemPair("toggleOutput", this.outputItem); // not true toggle in status bar
        this.updateStatusBarItemPair("toggleDebugConsole", this.debugConsoleItem); // not true toggle in status bar
        this.updateStatusBarItemPair("toggleTerminal", this.terminalItem); // not true toggle in status bar
        
        this.updateStatusBarItemPair("toggleDevTools", this.devToolsItem);
        
        this.updateStatusBarItemPair("format", this.formatItem);
        this.updateStatusBarItemPair("toggleWordWrap", this.wordWrapItem);
        this.updateStatusBarItemPair("toggleWhitespaceCharacters", this.toggleWhitespaceCharactersItem);
        
        this.updateStatusBarItemPair("save", this.saveItem);
        this.updateStatusBarItemPair("saveAll", this.saveAllItem);
        
        this.updateStatusBarItemPair("back", this.backItem);
        this.updateStatusBarItemPair("forward", this.forwardItem);
        
        this.updateStatusBarItemPair("undo", this.undoItem);
        this.updateStatusBarItemPair("redo", this.redoItem);
        
        this.updateStatusBarItemPair("splitEditorDown", this.splitEditorDownItem);
        
        this.updateStatusBarItemPair("addCursorsToLineEnds", this.addCursorsToLineEndsItem);
        this.updateStatusBarItemPair("toggleColumnSelectionMode", this.toggleColumnSelectionModeItem);
        
        this.updateStatusBarItemPair("run", this.runItem);
        this.updateStatusBarItemPair("runWithDebug", this.runWithDebugItem);
    }


    // testing
    private toggleTerminalFunction = function() {
        "workbench.action.terminal.focus"
    }

    

    private updateStatusBarItemPair(configKey: string, pair: Pair<vscode.StatusBarItem>) {
        this.updateStatusBarItem(configKey, pair.left);
        this.updateStatusBarItem(configKey, pair.right);
    }

    private updateStatusBarItem(configKey: string, statusBarItem: vscode.StatusBarItem) {
        const configValue: string = this.getConfiguration().get(configKey, "Hide");

        if (configValue.startsWith("Status Bar: Left") && statusBarItem.alignment == vscode.StatusBarAlignment.Left) {
            statusBarItem.show();
        } else if (configValue.startsWith("Status Bar: Right") && statusBarItem.alignment == vscode.StatusBarAlignment.Right) {
            statusBarItem.show();
        } else {
            statusBarItem.hide();
        }
    }

    private registerCommand(
        context: vscode.ExtensionContext,
        commandName: string,
        command: string | ((...args: any[]) => any)
    ) {

        let commandToExecute: ((...args: any[]) => any);
        if(typeof command == "string") {
            commandToExecute = () => {
                vscode.commands.executeCommand(command);
            }
        } else {
            commandToExecute = command;
        }

        const disposable = vscode.commands.registerCommand(commandName, commandToExecute);

        context.subscriptions.push(disposable);
    }

    private createStatusBarItemPair(
        context: vscode.ExtensionContext,
        priority: number,
        command: string,
        label: string,
        tooltip: string): Pair<vscode.StatusBarItem> {
        return {
            left: this.createStatusBarItem(
                context,
                vscode.StatusBarAlignment.Left,
                priority,
                command,
                label,
                tooltip),
            right: this.createStatusBarItem(
                context,
                vscode.StatusBarAlignment.Right,
                priority,
                command,
                label,
                tooltip)
        };
    }

    private createStatusBarItem(
        context: vscode.ExtensionContext,
        alignment: vscode.StatusBarAlignment,
        priority: number,
        command: string,
        label: string,
        tooltip: string): vscode.StatusBarItem {

        const statusBarItem = vscode.window.createStatusBarItem(alignment, priority);
        statusBarItem.command = command;
        statusBarItem.text = label;
        statusBarItem.tooltip = tooltip;

        context.subscriptions.push(statusBarItem);

        return statusBarItem;
    }
}

export default ConfigurableShortcuts;