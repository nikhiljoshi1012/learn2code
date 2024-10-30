import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import astroIcon from 'astro-icon';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [tailwind(), astroIcon()],
  trailingSlash: "never",
  output: 'server',
  adapter: vercel(),
});