export interface FileTreeData {
  type: 'dir' | 'file';
  size: number;
}

export class FileTree {
  private directories: Map<
    string,
    { parent: string; files: { filename: string; size: number }[] }
  >;
  constructor(lines: string[]) {
    this.directories = parseCommandLineOutput(lines);
  }

  calculateDirectorySize(dir: string) {
    const directory = this.directories.get(dir);
    let size = directory.files.reduce((acc, cur) => (acc += cur.size), 0);

    for (const [key, value] of this.directories) {
      if (value.parent === dir) {
        size += this.calculateDirectorySize(key);
      }
    }

    return size;
  }

  calculateAllDirectorySizes() {
    const result: Record<string, number> = {};

    for (const [key] of this.directories) {
      result[key] = this.calculateDirectorySize(key);
    }

    return result;
  }
}

export function parseCommandLineOutput(
  lines: string[]
): Map<
  string,
  { parent: string; files: { filename: string; size: number }[] }
> {
  let currentCommand: string;
  let cwd = '';
  const directories = new Map<
    string,
    { parent: string; files: { filename: string; size: number }[] }
  >();
  directories.set('/', { parent: null, files: [] });

  lines.forEach((line) => {
    const split = line.split(' ');

    if (split[0] === '$') {
      currentCommand = split[1];
    }

    switch (currentCommand) {
      case 'cd': {
        const newDir = split[2];

        if (newDir === '..') {
          cwd = cwd.split('/').slice(0, -1).join('/');
          cwd = cwd.startsWith('/') ? cwd : `/${cwd}`;
        } else {
          cwd += cwd === '' || cwd.endsWith('/') ? newDir : `/${newDir}`;
        }
        break;
      }
      case 'ls':
        if (split[0] === 'dir') {
          directories.set(
            cwd.endsWith('/') ? `${cwd}${split[1]}` : `${cwd}/${split[1]}`,
            { parent: cwd, files: [] }
          );
        } else if (Number.isInteger(Number.parseInt(split[0]))) {
          directories.get(cwd).files.push({
            filename: split[1],
            size: Number.parseInt(split[0]),
          });
        }
        break;
    }
  });

  return directories;
}
