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
    await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'New User',
          username: 'User2',
          password: 'password123'
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
  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await page.getByLabel('username').fill('Arma')
      await page.getByLabel('password').fill('Reforger123')
      await page.getByRole('button', { name: 'login'}).click()
    })
    test('a new blog can be created', async ({page}) => {
      await page.getByRole('button', { name: 'create new blog'}).click()
      await page.getByLabel('title:').fill('a blog created by playwright')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://blogbyplaywright.com')
      await page.getByRole('button', { name: 'create'}).click()
      await expect(page.locator('.blog-short', { hasText: 'a blog created by playwright' })).toBeVisible()
    })
    test('a blog can be liked', async ({page}) => {
      await page.getByRole('button', { name: 'create new blog'}).click()
      await page.getByLabel('title:').fill('a blog to like')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://likedblog.com')
      await page.getByRole('button', { name: 'create'}).click()

      await page.getByRole('button', { name: 'view'}).click()
      await page.getByRole('button', { name: 'like'}).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })
    test('only the user who added the blog sees the blogs delete button', async ({page, request}) => {

      await page.getByRole('button', { name: 'create new blog'}).click()
      await page.getByLabel('title:').fill('a blog i can delete')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://deleteblog.com')
      await page.getByRole('button', { name: 'create'}).click()

      const blogElement = page.locator('.blog-short', { hasText: 'a blog i can delete'})
      await expect(blogElement).toBeVisible()
      await blogElement.getByRole('button', { name: 'view'}).click()

      const blogExtended = page.locator('.blog-extended', { hasText: 'a blog i can delete'})
      await expect(blogExtended.getByRole('button', { name: 'remove'})).toBeVisible()
      

      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('log in to application')).toBeVisible()


      await page.getByLabel('username').fill('User2')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('New User logged in')).toBeVisible()

      const sameBlogElement = page.locator('.blog-short', { hasText: 'a blog i can delete'})
      await expect(sameBlogElement).toBeVisible()
      await sameBlogElement.getByRole('button', { name: 'view'}).click()

      await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
    })
    test('blogs are arranged in order of most likes first', async ({page}) => {
      await page.getByRole('button', { name: 'create new blog'}).click()
      await page.getByLabel('title:').fill('Blog with 3 likes')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://blog1.com')
      await page.getByRole('button', { name: 'create'}).click()

      await expect(page.locator('.blog-short', { hasText: 'Blog with 3 likes' })).toBeVisible()

      await page.getByLabel('title:').fill('Blog with 5 likes')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://blog2.com')
      await page.getByRole('button', { name: 'create'}).click()
      
      await expect(page.locator('.blog-short', { hasText: 'Blog with 5 likes' })).toBeVisible()

      await page.getByLabel('title:').fill('Blog with 1 likes')
      await page.getByLabel('author:').fill('Arma')
      await page.getByLabel('url:').fill('http://blog3.com')
      await page.getByRole('button', { name: 'create'}).click()

      await expect(page.locator('.blog-short', { hasText: 'Blog with 1 likes' })).toBeVisible()

      const blogElements1 = page.locator('.blog-short', { hasText: 'Blog with 5 likes'})
      await blogElements1.getByRole('button', { name: 'view'}).click()
      for(let i = 0; i < 5; i++) {
        await page.getByRole('button', { name: 'like'}).click()
        await page.waitForTimeout(300)
      }
      await expect(page.getByText('likes: 5')).toBeVisible()
      await page.getByRole('button', { name: 'hide'}).click()

      const blogElements2 = page.locator('.blog-short', { hasText: 'Blog with 3 likes'})
      await blogElements2.getByRole('button', { name: 'view'}).click()
      for(let i = 0; i < 3; i++) {
        await page.getByRole('button', { name: 'like'}).click()
        await page.waitForTimeout(300)
      }
      await expect(page.getByText('likes: 3')).toBeVisible()
      await page.getByRole('button', { name: 'hide'}).click()

      const blogElements3 = page.locator('.blog-short', { hasText: 'Blog with 1 likes'})
      await blogElements3.getByRole('button', { name: 'view'}).click()

      await page.getByRole('button', { name: 'like'}).click()

      await expect(page.getByText('likes: 1')).toBeVisible()
      await page.getByRole('button', { name: 'hide'}).click()

      const blogElements = await page.locator('.blog-short').all()
      
      await expect(blogElements[0]).toContainText('Blog with 5 likes')
      await expect(blogElements[1]).toContainText('Blog with 3 likes')
      await expect(blogElements[2]).toContainText('Blog with 1 like')
    })
  })
})