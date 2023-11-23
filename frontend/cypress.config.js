import { defineConfig } from 'cypress'

/* eslint-disable */
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {},
        baseUrl: 'http://localhost:5173',
        supportFile: './cypress/support/e2e.js',
    },
    env: {
        mobileViewportWidthBreakpoint: 414,
        viewports: [
            [375, 667, 'iPhone SE 2'],
            [1920, 1080, '1920x1080'],
        ],
    },
})
