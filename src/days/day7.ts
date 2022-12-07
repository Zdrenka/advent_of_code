import { day7 } from "../../data";

type File = {
  size: number;
};

type Directory = {
  parent: Directory | null;
  subDirs: Map<string, Directory>;
  files: Map<string, File>;
};

const sizes: number[] = [];

function changeDir(currDir: Directory, name: string): Directory {
  if (name === "/") {
    let dir = currDir;
    while (dir.parent !== null) dir = dir.parent;
    return dir;
  } else if (name === "..") {
    return currDir.parent!;
  } else {
    return currDir.subDirs.get(name)!;
  }
}

function read() {
  const root = { parent: null, subDirs: new Map(), files: new Map() };
  let currDir: Directory = root;
  const input = day7.split("\n");
  input.forEach((line) => {
    const parts = line.split(" ");
    if (parts[0] === "$") {
      if (parts[1] === "cd") {
        currDir = changeDir(currDir, parts[2]);
      }
    } else {
      if (parts[0] === "dir") {
        const [_, name] = parts;
        currDir.subDirs.set(name, {
          parent: currDir,
          subDirs: new Map(),
          files: new Map(),
        });
      } else {
        const [size, name] = parts;
        currDir.files.set(name, { size: Number(size) });
      }
    }
  });
  return root;
}

function getSize(dir: Directory): number {
  const dirsSize = Array.from(dir.subDirs.values()).reduce(
    (size, dir) => size + getSize(dir),
    0
  );
  const filesSize = Array.from(dir.files.values()).reduce(
    (size, file) => size + file.size,
    0
  );
  const totalSize = dirsSize + filesSize;
  sizes.push(totalSize);
  return totalSize;
}

const root = read();
const rootDirSize = getSize(root);

const sumSmallDirs = sizes
  .filter((s) => s <= 100000)
  .reduce((sum, size) => sum + size, 0);
console.log(`first star: ${sumSmallDirs}`);

const neededSpace = 30000000 + rootDirSize - 70000000;
const smallest = sizes.reduce(
  (smallest, size) => (size > neededSpace && size < smallest ? size : smallest),
  rootDirSize
);
console.log(`second star: ${smallest}`);
