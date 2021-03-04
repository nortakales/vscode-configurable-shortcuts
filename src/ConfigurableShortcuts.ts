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
    private outputItem!: Pair<vscode.StatusBarItem>; // not true toggle
    private debugConsoleItem!: Pair<vscode.StatusBarItem>; // not true toggle
    private terminalItem!: Pair<vscode.StatusBarItem>; // not true toggle

    private devToolsItem!: Pair<vscode.StatusBarItem>;

    private formatItem!: Pair<vscode.StatusBarItem>;

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
    }

    private registerCommands(context: vscode.ExtensionContext) {
        this.registerCommand(context, "shortcut.togglePanel", "workbench.action.togglePanel");
        this.registerCommand(context, "shortcut.toggleOutput", "workbench.action.output.toggleOutput");
        this.registerCommand(context, "shortcut.toggleDebugConsole", "workbench.debug.action.toggleRepl");
        this.registerCommand(context, "shortcut.toggleTerminal", "workbench.action.terminal.toggleTerminal");

        this.registerCommand(context, "shortcut.toggleDevTools", "workbench.action.toggleDevTools");
        
        this.registerCommand(context, "shortcut.format", "editor.action.formatDocument");

        
    }

    updateView() {
        this.updateStatusBarItemPair("togglePanel", this.panelItem);
        this.updateStatusBarItemPair("toggleOutput", this.outputItem); // not true toggle in status bar
        this.updateStatusBarItemPair("toggleDebugConsole", this.debugConsoleItem); // not true toggle in status bar
        this.updateStatusBarItemPair("toggleTerminal", this.terminalItem); // not true toggle in status bar
        
        this.updateStatusBarItemPair("toggleDevTools", this.devToolsItem);
        
        this.updateStatusBarItemPair("format", this.formatItem);
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
                vscode.window.showWarningMessage(command);
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