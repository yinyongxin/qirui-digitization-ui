import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path';
// https://vitejs.dev/config/
/**
 * @types UserConfigExport
 */

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const modeConfig: Record<any, UserConfigExport> = {
    comp: {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/index.tsx'),
          name: 'magic-ui-react',
          fileName: 'magic-ui-react',
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['react', 'react-dom', 'react-router-dom', 'less'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              'react': 'react',
              'react-dom': 'react-dom',
              'react-router-dom': 'react-router-dom',
            }
          },
        },
      }
    },
    docu: {
      base: './',
      build: {
        outDir: 'docu'
      }
    }
  }

  return {
    resolve: {
      alias: [
        { find: '@', replacement: path.join(__dirname, '/src') },
        { find: '#', replacement: path.join(__dirname, '/src/components') }
      ],
    },
    plugins: [
      react()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'public/globalLess/index.less')}";`
        },
      }
    },
    ...(env.VITE_MODE_NAME && modeConfig[env.VITE_MODE_NAME])
  }
})
