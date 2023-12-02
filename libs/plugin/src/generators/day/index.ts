import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/node';

export default async function (tree: Tree, schema) {
  const { year, day } = schema;
  const dayZeroPad = day.toString().padStart(2, '0');
  const projectName = `day-${dayZeroPad}`;
  const fullProjectName = `year-${year}-day-${dayZeroPad}`;

  const directory = `year-${year.toString()}`;
  const importPath = `@advent-of-code/${year.toString()}/day-${dayZeroPad}`;
  console.log({ projectName, directory, importPath });
  await libraryGenerator(tree, {
    name: projectName,
    tags: 'type:day',
    compiler: 'tsc',
    directory,
    importPath,
  });
  const projectConfig = readProjectConfiguration(tree, fullProjectName);

  updateProjectConfiguration(tree, fullProjectName, {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      'run-puzzle': {
        executor: '@advent-of-code/plugin:run-puzzle',
        options: {},
      },
    },
  });
  const srcRoot = joinPathFragments(projectConfig.sourceRoot, 'lib');

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    srcRoot, // destination path of the files
    {
      day: `day ${dayZeroPad}`,
      tmpl: '',
    } // config object to replace variable in file templates
  );

  tree.delete(joinPathFragments(srcRoot, `${fullProjectName}.ts`));
  tree.delete(joinPathFragments(srcRoot, `${fullProjectName}.spec.ts`));

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
