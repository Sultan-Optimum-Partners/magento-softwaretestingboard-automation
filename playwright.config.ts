import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env`
});

export default defineConfig({
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    headless: true,
    trace: 'on-first-retry',
    baseURL: "https://magento.softwaretestingboard.com/", // Global baseURL for all projects

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
        baseURL: "https://magento.softwaretestingboard.com/",
         ...devices['Desktop Chrome']
      },
    },
    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: "https://magento.softwaretestingboard.com/",
         ...devices['Desktop Firefox']
      },
    },
    {
      name: 'local',
      use: { 
        baseURL: "https://magento.softwaretestingboard.com/",
      },
    },

  ],

});
