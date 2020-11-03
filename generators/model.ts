import { PlopGenerator } from 'plop';
import { extractModelAttributes } from './utils/model-attributes';
import prettierTransform from './utils/prettier-tranform';

const modelGenerator: Omit<PlopGenerator, 'runActions' | 'runPrompts'> = {
  description: 'Generate a MST model',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of this model?",
    },
    {
      type: 'input',
      name: 'type',
      message: "What's the TYPE of this model? (req or res)",
      default: null,
    },
    {
      type: 'input',
      name: 'attributes',
      message: 'Models attributes e.g. name:string username:string',
      default: '',
    },
  ],
  actions: (data) => {
    const fileType = data?.type ? (data?.type === 'res' ? '-res' : '-req') : '';
    const importType = data?.type ? (data?.type === 'res' ? 'Res' : 'Req') : '';
    const { attributes, types } = extractModelAttributes(data?.attributes);
    return [
      {
        type: 'add',
        path: `src/models/{{kebabCase name}}${fileType}.ts`,
        templateFile: `generators/templates/model/model${fileType}.ts.hbs`,
        data: { fields: attributes, types },
        transform: prettierTransform,
      },
      {
        type: 'add',
        path: `test/models/{{kebabCase name}}${fileType}.test.ts`,
        templateFile: `generators/templates/model/model${fileType}.test.ts.hbs`,
        transform: prettierTransform,
      },
      {
        type: 'add',
        path: 'src/models/index.ts',
        templateFile: 'generators/templates/index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        pattern: '/* PLOP_INJECT_EXPORT */',
        path: 'src/models/index.ts',
        template: `export { default as {{pascalCase name}}${importType} } from './{{kebabCase name}}${fileType}';`,
      },
    ];
  },
};

export default modelGenerator;
