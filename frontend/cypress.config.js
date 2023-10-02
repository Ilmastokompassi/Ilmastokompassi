import { defineConfig } from 'cypress'

/* eslint-disable */
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:5173',
    },
})
/* eslint-enable */
