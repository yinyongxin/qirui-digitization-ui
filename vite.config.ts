import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.tsx'),
      name: 'QiruiDigitizationUI',
      fileName: 'qirui-digitization-ui',
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
})
