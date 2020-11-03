import { PlopGenerator, ActionType } from 'plop';
import prettierTransform from './utils/prettier-tranform';

const componentGenerator: Omit<PlopGenerator, 'runActions' | 'runPrompts'> = {
  description: 'Creates a new component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the component?",
    },
    {
      type: 'confirm',
      name: 'generate_story',
      message: 'Do you want to generate a story?',
      default: true,
    },
    {
      type: 'input',
      name: 'sub_directory',
      message: 'What sub folder should this component stay in?',
    },
  ],
  actions: (data) => {
    const sub_path = data?.sub_directory ? `/${data.sub_directory}/` : '/';
    const path = (ending: string) => {
      return `src/components${sub_path}{{kebabCase name}}/{{kebabCase name}}${ending}`;
    };

    const actions: ActionType[] = [
      {
        type: 'add',
        path: path('.tsx'),
        templateFile: 'generators/templates/functional-component/component.tsx.hbs',
        transform: prettierTransform,
      },
      {
        type: 'add',
        path: path('.styled.ts'),
        templateFile: 'generators/templates/functional-component/component.styled.ts.hbs',
        transform: prettierTransform,
      },
      {
        type: 'add',
        path: path('.test.tsx'),
        templateFile: 'generators/templates/functional-component/component.test.tsx.hbs',
        transform: prettierTransform,
      },
      {
        type: 'add',
        path: `src/components${sub_path}index.ts`,
        templateFile: 'generators/templates/index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        pattern: '/* PLOP_INJECT_EXPORT */',
        path: `src/components${sub_path}index.ts`,
        template: `export { default as {{pascalCase name}} } from './{{kebabCase name}}/{{kebabCase name}}';`,
      },
    ];

    if (data?.generate_story ?? false) {
      actions.push({
        type: 'add',
        path: path('.story.tsx'),
        templateFile: 'generators/templates/functional-component/component.story.tsx.hbs',
        transform: prettierTransform,
      });

      actions.push({
        type: 'append',
        pattern: '/* PLOP_INJECT_IMPORT */',
        path: 'storybook/stories.ts',
        template: `require('../${path('.story.tsx')}')`,
        transform: prettierTransform,
      });
    }

    return actions;
  },
};

export default componentGenerator;
