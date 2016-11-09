'use strict';
import * as vscode from 'vscode';

class BlockJump {
    editor: vscode.TextEditor;
    doc: vscode.TextDocument;
    LinesInDoc: number;
    constructor() {
        this.editor = vscode.window.activeTextEditor;
        this.doc = this.editor.document;
        this.LinesInDoc = this.doc.lineCount;
    }

    jumpUp() {
        var blankLineNumber = 0;
        var currentLine = this.editor.selection.active.line;

        for(var line = currentLine - 1; line >= 0; line--) {
            let thisLine = this.doc.lineAt(line);
            if(thisLine.isEmptyOrWhitespace) {
                blankLineNumber = line;
                this.jumpToLine(line);
                break;
            }
        }
    }

    jumpDown() {
        var blankLineNumber = 0;
        var currentLine = this.editor.selection.active.line;
        
        for(var line = currentLine + 1; line < this.LinesInDoc; line++) {
            let thisLine = this.doc.lineAt(line);
            if(thisLine.isEmptyOrWhitespace) {
                blankLineNumber = line;
                this.jumpToLine(line);
                break;
            }
        }
    }

    jumpToLine(lineNumber: number) {
        var newPosition = this.editor.selection.active.with(lineNumber, 0);
        this.editor.revealRange(new vscode.Range(newPosition, newPosition),vscode.TextEditorRevealType.Default);
        this.editor.selection = new vscode.Selection(newPosition, newPosition);
    }
}

export function activate(context: vscode.ExtensionContext) {

    var blockJump: BlockJump;
    let disposableUp = vscode.commands.registerCommand('extension.blockJumpUp', () => {
        blockJump = new BlockJump();
        blockJump.jumpUp();
    });

    let disposableDown = vscode.commands.registerCommand('extension.blockJumpDown', () => {
        blockJump = new BlockJump();
        blockJump.jumpDown();        
    });
    context.subscriptions.push(disposableUp);
    context.subscriptions.push(disposableDown);
}

export function deactivate() {
}