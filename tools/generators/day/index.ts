import {
  Tree,
  formatFiles,
  installPackagesTask,
  updateProjectConfiguration,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { join } from 'path';

export default async function (tree: Tree, schema: any) {
  const projectName = `day-${schema.day}`;
  await libraryGenerator(tree, { name: projectName, tags: 'type:day' });
  const projectConfig = readProjectConfiguration(tree, projectName);

  updateProjectConfiguration(tree, projectName, {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      'run-puzzle': {
        executor: './tools/executors/run-puzzle:run-puzzle',
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
      day: `day 0${schema.day}`,
      tmpl: '',
    } // config object to replace variable in file templates
  );

  tree.delete(joinPathFragments(srcRoot,`${projectName}.ts`))
  tree.delete(joinPathFragments(srcRoot,`${projectName}.spec.ts`))

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
