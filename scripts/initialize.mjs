#!/usr/bin/env node

import cp from "child_process";

const options = { shell: true, stdio: "inherit", env: process.env };

cp.execFileSync(process.env.npm_execpath, ["--no-workspaces", "install"], options);
cp.execFileSync(process.env.npm_execpath, ["run", "generate"], options);
cp.execFileSync(process.env.npm_execpath, ["--workspaces", "install"], options);
