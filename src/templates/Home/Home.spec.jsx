import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          userId: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img.img1.png',
        },
        {
          id: 2,
          userId: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img.img2.png',
        },
        {
          id: 3,
          userId: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img.img3.png',
        },
        {
          id: 4,
          userId: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img.img4.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.listen();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts!');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts!');

    expect.assertions(11);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 4' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Value: title 1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();

    userEvent.type(search, 'title 112312');
    expect(screen.getByText('Não existem posts!')).toBeInTheDocument();
  });

  it('should render more posts when load more points', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts!');

    expect.assertions(2);

    await waitForElementToBeRemoved(noMorePosts);
    var images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);
    // const search = screen.getByPlaceholderText(/type your search/i);
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);

    var images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(4);
  });
});
