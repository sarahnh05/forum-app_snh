// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress';
import daStyle from 'eslint-config-dicodingacademy';

const compat = new FlatCompat();

export default [{
  files: ['**/*.{js,mjs,cjs,jsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
}, {
  files: ['**/*.{test,spec}.{js,jsx}'],
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
}, {
  settings: {
    react: {
      version: '19.3',
    },
  },
},
{
  files: ['cypress/**/*.{js,jsx}'],
  plugins: {
    cypress: pluginCypress,
  },
  languageOptions: {
    globals: {
      ...pluginCypress.environments.globals.globals,
    },
  },
},
js.configs.recommended,
react.configs.flat.recommended,
...compat.config(daStyle),
...storybook.configs['flat/recommended']];
