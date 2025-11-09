const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Arma Reforger',
        username: 'Arma',
        password: 'Reforger123'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      
      await page.getByLabel('username').fill('Arma')
      await page.getByLabel('password').fill('Reforger123')
      
      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('Arma Reforger logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByLabel('username').fill('NonExistant')
        await page.getByLabel('password').fill('NonExistantPassword')
        await page.getByRole('button', { name: 'login'}).click()
        await expect(page.getByText('wrong username or password')).toBeVisible()
        await expect(page.getByText('Arma Reforger logged in')).not.toBeVisible()
    })
  })
})