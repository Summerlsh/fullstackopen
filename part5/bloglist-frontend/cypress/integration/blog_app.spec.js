describe('Blog app', function () {
  beforeEach(function () {
    cy.request('post', 'http://localhost:3000/api/testing/reset')
    // create here a user to backend
    const newUser = {
      username: 'test',
      password: 'test',
      name: 'Test User'
    }
    cy.request('post', 'http://localhost:3000/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeed with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#loginBtn').click()

      cy.contains('logged in')
    })

    it('failed with wrong credentials', function () {
      cy.get('#username').type('test1')
      cy.get('#password').type('test2')
      cy.get('#loginBtn').click()

      cy.contains('Invalid username or password')
      cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#loginBtn').click()
    })

    it('A blog can be created', function () {
      cy.get('.blog').should('have.length', 0)
      cy.contains('create new note').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://example.com')
      cy.get('#createBtn').click()
      cy.get('.blog').should('have.length', 1)
    })
  })
})
