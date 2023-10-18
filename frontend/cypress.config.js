import { defineConfig } from 'cypress'

/* eslint-disable */
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:5173',
    },
    env: {
        screen_sizes: [
            [901, 1000, 'Large'],
            [899, 1000, 'Small'],
        ],
    },
})
/* eslint-enable */
