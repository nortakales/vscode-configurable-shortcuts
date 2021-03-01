import * as vscode from 'vscode';

class ConfigurableShortcuts {

    public constructor(context: vscode.ExtensionContext) {
        this.init(context);
    }

    getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration("configurable-shortcuts");
    }

    init(context: vscode.ExtensionContext) {
        this.createStatusBarIcons(context);
        this.registerCommands(context);
        this.updateView();
    }

    private terminalItem!: Pair<vscode.StatusBarItem>;
    private terminalItemLeft!: vscode.StatusBarItem;
    private terminalItemRight!: vscode.StatusBarItem;
    private outputItem!: vscode.StatusBarItem;
    private debugOutputItem!: vscode.StatusBarItem;
    private panelItem!: vscode.StatusBarItem;

    private createStatusBarIcons(context: vscode.ExtensionContext) {

        this.terminalItem = this.createStatusBarItemPair(
            context,
            1,
            "workbench.action.terminal.focus",
            `$(terminal)`,
            "Show Terminal"
        );

        this.outputItem = this.createStatusBarItem(context,
            vscode.StatusBarAlignment.Left,
            1,
            "workbench.action.output.toggleOutput",
            `$(output)`,
            "Toggle Output Panel");

        this.debugOutputItem = this.createStatusBarItem(context,
            vscode.StatusBarAlignment.Left,
            1,
            "workbench.debug.action.toggleRepl",
            `$(debug-console)`,
            "Toggle Debug Output Panel");

        this.panelItem = this.createStatusBarItem(context,
            vscode.StatusBarAlignment.Left,
            1,
            "workbench.action.togglePanel",
            `$(window)`,
            "Toggle Panel");
    }

    private registerCommands(context: vscode.ExtensionContext) {
        this.registerCommand(context, "configurable-shortcuts.toggleTerminal", "workbench.action.terminal.focus");
    }

    updateView() {
        this.updateStatusBarItemPair("toggleTerminal", this.terminalItem);
    }

    private updateStatusBarItemPair(configKey: string, pair: Pair<vscode.StatusBarItem>) {
        this.updateStatusBarItem(configKey, pair.left);
        this.updateStatusBarItem(configKey, pair.right);
    }

    private updateStatusBarItem(configKey: string, statusBarItem: vscode.StatusBarItem) {
        const configValue: string = this.getConfiguration().get(configKey, "Hide");

        if(configValue.startsWith("Status Bar: Left") && statusBarItem.alignment == vscode.StatusBarAlignment.Left) {
            statusBarItem.show();
        } else if(configValue.startsWith("Status Bar: Right") && statusBarItem.alignment == vscode.StatusBarAlignment.Right) {
            statusBarItem.show();
        } else {
            statusBarItem.hide();
        }
    }

    private registerCommand(
        context: vscode.ExtensionContext,
        commandName: string,
        commandToExecute: string
    ) {
        const command = vscode.commands.registerCommand(commandName,
            () => {
                vscode.commands.executeCommand(commandToExecute);
            }
        );

        context.subscriptions.push(command);
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