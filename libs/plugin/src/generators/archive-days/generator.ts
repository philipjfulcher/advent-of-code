import {
  getProjects,
  joinPathFragments,
  logger,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { ArchiveDaysGeneratorSchema } from './schema';
import { moveGenerator } from '@nx/workspace';

export default async function (
  tree: Tree,
  options: ArchiveDaysGeneratorSchema
) {
  const { year } = options;
  const projects = getProjects(tree);
  for (const [projectName, project] of projects) {
    logger.log(`Checking project ${projectName}`);

    if (
      !projectName.startsWith('day') ||
      project.tags.filter((tag) => tag.startsWith('year')).length > 0
    )
      return;

    console.log(`Archiving ${projectName}`);
    const destination = joinPathFragments(year.toString(), project.name);
    const importPath = `@advent-of-code/${year}/${project.name}`;

    updateProjectConfiguration(tree, project.name, {
      ...project,
      tags: [`year:${year}`],
    });

    await moveGenerator(tree, {
      projectName: project.name,
      destination,
      updateImportPath: true,
      importPath,
      skipFormat: true,
    });
  }
}
