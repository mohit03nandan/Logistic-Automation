import LoginPage from '../../pages/LoginPage'

describe('Smoke | Login Flow', () => {
  it('User should login successfully', () => {
    LoginPage.visit()
    cy.wait(5000)
    LoginPage.login('testums11@gmail.com', 'QWERTY!@#$%')

    // DashboardPage.verifyDashboardLoaded()
  })
})
