import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not URL or likes by default', () => {
  const blog = {
    title: 'Arma Reforger',  // Changed to match what you're testing for
    author: 'Arma',
    url: 'armareforger.com',
    likes: 201
  }




  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog-short')
  screen.debug(div)
  expect(div).toHaveTextContent('Arma Reforger')
  expect(div).toHaveTextContent('Arma')

  expect(div).not.toHaveTextContent('armareforger.com')
  expect(div).not.toHaveTextContent('201')
})

test('clicking the button shows URL and number of likes', async () => {
    const blog = {
        title: 'Arma Reforger',
        author: 'Arma',
        url: 'armareforger.com',
        likes: 201
    }

    const mockLikeBlog = vi.fn()
    const mockDeleteBlog = vi.fn()

    const { container } = render(
        <Blog blog={blog} likeBlog={mockLikeBlog} deleteBlog={mockDeleteBlog} />
    )


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-extended')
    screen.debug(div)
    expect(div).toHaveTextContent('armareforger.com')
    expect(div).toHaveTextContent('likes: 201')
})