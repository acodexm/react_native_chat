import { PlopGenerator } from 'plop';
import prettierTransform from './utils/prettier-tranform';

const viewGenerator: Omit<PlopGenerator, 'runActions' | 'runPrompts'> = {
  description: 'Creates a new view (screen)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the screen?",
    },
    {
      type: 'input',
      name: 'sub_directory',
      message: 'What SUB folder should this VIEW stay in?',
    },
  ],
  actions: (data) => {
    const path = (ending: string) => {
      const sub_path = data?.sub_directory ? `/${data.sub_directory}/` : '/';
      return `src/views${sub_path}{{kebabCase name}}/{{kebabCase name}}${ending}`;
    };
    return [
      {
        type: 'add',
        templateFile: 'generators/templates/view/view.tsx.hbs',
        transform: prettierTransform,
        path: path('.tsx'),
      },
      {
        type: 'add',
        templateFile: 'generators/templates/view/view.styled.ts.hbs',
        transform: prettierTransform,
        path: path('.styled.ts'),
      },
      {
        type: 'add',
        templateFile: 'generators/templates/view/view.test.ts.hbs',
        transform: prettierTransform,
        path: 'test/views/{{kebabCase name}}.test.tsx',
      },
    ];
  },
};

export default viewGenerator;
