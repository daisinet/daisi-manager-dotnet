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
};

if (isWatch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('Watching...');
} else {
  await build(buildOptions);
  console.log('Built browser-host.js');
}
