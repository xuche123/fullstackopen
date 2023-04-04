describe('Bloglist App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', function () {
    cy.contains('blogs')
    cy.get('h2').should('contain', 'Log in to application')
    cy.get('form').should('contain', 'username')
    cy.get('form').should('contain', 'password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.should('not.contain', 'Test User logged in')
      cy.get('.notification').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it.only('A blog can be created', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 0
      })
      cy.contains('Test Blog Test Author')
    })
  })
})

