// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for Registration System Tests
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // webServer disabled - run manually: python -m http.server 8000
  // webServer: {
  //   command: 'python -m http.server 8000',
  //   url: 'http://localhost:8000',
  //   reuseExistingServer: true,
  //   timeout: 120 * 1000,
  // },
});
