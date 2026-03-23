import { build, context } from 'esbuild';
import { readFileSync } from 'fs';

const wgslPlugin = {
  name: 'wgsl-loader',
  setup(build) {
    build.onLoad({ filter: /\.wgsl$/ }, (args) => {
      const contents = readFileSync(args.path, 'utf8');
      return { contents: `export default ${JSON.stringify(contents)};`, loader: 'js' };
    });
  },
};

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  outfile: '../Daisi.Manager.Shared/wwwroot/js/browser-host.js',
  sourcemap: true,
  target: 'es2022',
  platform: 'browser',
  plugins: [wgslPlugin],
  // Stub out Node-only deps that get tree-shaken but still referenced
  alias: {
    'nice-grpc': './src/empty.js',
    '@grpc/grpc-js': './src/empty.js',
    '@grpc/proto-loader': './src/empty.js',
    '@daisi/sdk-web': '../../daisi-sdk-typescript/dist/web.js',
    '@daisi/sdk-generated-commands': '../../daisi-sdk-typescript/src/generated/Protos/V1/Commands.ts',
    '@daisi/sdk-generated-command-models': '../../daisi-sdk-typescript/src/generated/Protos/V1/Models/CommandModels.ts',
    '@daisi/sdk-generated-inference-models': '../../daisi-sdk-typescript/src/generated/Protos/V1/Models/InferenceModels.ts',
    '@daisi/sdk-generated-settings-models': '../../daisi-sdk-typescript/src/generated/Protos/V1/Models/SettingsModels.ts',
    '@daisi/sdk-protobuf-any': '../../daisi-sdk-typescript/src/generated/google/protobuf/any.ts',
    '@daisi/sdk-generated-sessions': '../../daisi-sdk-typescript/src/generated/Protos/V1/Sessions.ts',
    '@daisi/sdk-generated-inferences': '../../daisi-sdk-typescript/src/generated/Protos/V1/Inferences.ts',
    '@daisi/sdk-generated-session-models': '../../daisi-sdk-typescript/src/generated/Protos/V1/Models/SessionModels.ts',
  },
};

if (isWatch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('Watching...');
} else {
  await build(buildOptions);
  console.log('Built browser-host.js');
}
