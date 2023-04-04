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

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
      })
      cy.contains('Test Blog Test Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'Test Author',
          url: 'https://test.com',
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })


      it('it can be deleted by the user who created it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Test Blog Test Author')
      })

      it('it cannot be deleted by a different user', function () {

        cy.contains('logout').click()

        const user = {
          name: 'Test User 2',
          username: 'testuser2',
          password: 'testpassword2'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.login({ username: 'testuser2', password: 'testpassword2' })
        cy.contains('view').click()
        cy.get('div').should('not.contain', 'remove')
      })

      it('blogs are ordered by likes', function () {
        cy.createBlog({
          title: 'Test Blog 2',
          author: 'Test Author 2',
          url: 'https://test2.com',
        })

        cy.contains('Test Blog 2').parent().find('button').click()
        cy.get('#like-btn').click().wait(500).click().wait(500)

        cy.get('.blog').eq(0).should('contain', 'Test Blog 2')
        cy.get('.blog').eq(1).should('contain', 'Test Blog')
      })
    })
  })
})

