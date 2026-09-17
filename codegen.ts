import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    'src/graphql/anilist/generated/': {
      schema: 'https://graphql.anilist.co',
      documents: 'src/graphql/anilist/*.graphql',
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
      },
    },
    'src/graphql/allanime/generated/': {
      schema: 'src/graphql/allanime/schema.graphql',
      documents: 'src/graphql/allanime/*.graphql',
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
