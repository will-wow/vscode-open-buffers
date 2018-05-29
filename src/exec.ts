const cp = require("child_process");

export const execWithStdio = (
  stdin: string,
  command: string,
  args?: any[],
  options?: any
): Promise<any> =>
  new Promise((resolve, reject) => {
    const fzf = cp.spawn(command, args, options);
    fzf.stdout.on("data", resolve);
    fzf.stderr.on("data", reject);
    fzf.on("close", reject);

    fzf.stdin.write(stdin);
    fzf.stdin.end();
  });
