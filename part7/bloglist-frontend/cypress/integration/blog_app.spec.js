describe('Blog app', function () {
  beforeEach(function () {
    cy.request('post', 'http://localhost:3000/api/testing/reset')
    // create a user to backend
    const newUser = {
      username: 'test',
      password: 'test',
      name: 'Test User'
    }
    cy.request('post', 'http://localhost:3000/api/users', newUser)
    const anotherUser = {
      username: 'test2',
      password: 'test2',
      name: 'Test User2'
    }
    cy.request('post', 'http://localhost:3000/api/users', anotherUser)
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })

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
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function () {
      cy.get('.blog').should('have.length', 0)
      cy.contains('create new note').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://example.com')
      cy.get('#createBtn').click()
      cy.get('.blog', { timeout: 5000 }).should('have.length', 1)
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'Test Author',
          url: 'http://example.com'
        })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.likes').should('contain', '1')
      })

      it('A blog can be deleted', function () {
        cy.get('.blog').should('have.length', 1)
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog').should('have.length', 0)
      })

      it('A blog can not be deleted others', function () {
        cy.contains('logout').click()
        cy.login({ username: 'test2', password: 'test2' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      describe('add several blogs', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'test title2',
            author: 'Test Author2',
            url: 'http://example2.com',
            likes: 2
          })
          cy.createBlog({
            title: 'test title3',
            author: 'Test Author3',
            url: 'http://example3.com',
            likes: 3
          })
        })

        it('Blogs should be sorted by likes', function () {
          cy.get('.showDetail').click({ multiple: true })
          cy.get('.blog').then($blogs => {
            cy.wrap($blogs[0]).get('.likes').contains(3)
            cy.wrap($blogs[1]).get('.likes').contains(2)
            cy.wrap($blogs[2]).get('.likes').contains(0)
          })
        })
      })
    })
  })
})
