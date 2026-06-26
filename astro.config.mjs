// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://drawingpromptgenerator.com',
  integrations: [sitemap()],
  vite: {
    build: {
      cssTarget: 'chrome80'
    }
  }
});

