import { PlopGenerator } from 'plop';
import prettierTransform from './utils/prettier-tranform';

const storeGenerator: Omit<PlopGenerator, 'runActions' | 'runPrompts'> = {
  description: 'Creates a new store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'The name of this store',
    },
  ],
  actions: [
    {
      type: 'add',
      templateFile: 'generators/templates/store/store.ts.hbs',
      path: 'src/store/{{kebabCase name}}.ts',
      transform: prettierTransform,
    },
    {
      type: 'add',
      templateFile: 'generators/templates/store/store.test.ts.hbs',
      path: 'test/store/{{kebabCase name}}.test.ts',
      transform: prettierTransform,
    },
    {
      type: 'add',
      path: 'src/store/index.ts',
      templateFile: 'generators/templates/index.ts.hbs',
      skipIfExists: true,
    },
    {
      type: 'append',
      pattern: '/* PLOP_INJECT_EXPORT */',
      path: 'src/store/index.ts',
      template: `export { default as {{camelCase name}}Store } from './{{kebabCase name}}';`,
    },
  ],
};

export default storeGenerator;
