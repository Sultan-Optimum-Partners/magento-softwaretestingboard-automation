import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env`
});

export default defineConfig({
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    headless: false,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
      
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: process.env.BASE_URL,
         ...devices['Desktop Chrome']
      },
    },
    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: process.env.BASE_URL,
         ...devices['Desktop Firefox']
      },
    },
    {
      name: 'local',
      use: { 
        baseURL: process.env.BASE_URL,
      },
    },

  ],

});
