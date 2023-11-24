declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Type into DOM element if the input is not empty
       * @example
       * cy.getByTestId('group-token').typeIfNotEmpty(tokenValue)
       */
      typeIfNotEmpty(textToType: string): Chainable<any>
      /**
       * Creates one group using the API
       * @example
       * cy.createGroupWithApi('HELLU2')
       */
      createGroupWithApi(groupToken: string): Chainable<any>
      /**
       * Checks whether the group exists before setting the group token in the local storage
       * @example
       * cy.joinGroup('HELLU2')
       */
      joinGroup(groupToken: string): Chainable<any>
      /**
       * Navigates to a page using the navigation bar
       * @example
       * cy.navigateToPageWithNavBar('survey')
       */
      navigateToPageWithNavBar(pageId: string): Chainable<any>
    }
  }