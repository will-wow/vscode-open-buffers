import * as vscode from "vscode";

import { execWithStdio } from "./exec";

export async function fzfAllFiles() {
  console.log("starting");

  const workspaceFiles = await vscode.workspace.findFiles("**/*");
  const workspaceFileNames = workspaceFiles.map(file => file.fsPath).join("\n");

  const stdout = await execWithStdio(workspaceFileNames, "fzf", [
    "-f",
    "model"
  ]);

  const filenames = stdout
    .toString()
    .trim()
    .split(/\r?\n/);

  const file = await vscode.window.showQuickPick(filenames);

  if (file) {
    const doc = await vscode.workspace.openTextDocument(file);

    vscode.window.showTextDocument(doc);
  }
}
