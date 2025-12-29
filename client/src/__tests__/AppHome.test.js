import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AppHomeView } from '../pages/AppHome';

jest.mock('../actions/post', () => ({
  getPosts: jest.fn()
}));

const renderAppHome = (props) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <AppHomeView {...props} />
      </MemoryRouter>,
      container
    );
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('app home renders loading state', () => {
  const container = renderAppHome({
    posts: [],
    loading: true,
    onRefresh: jest.fn(),
    showComposer: false
  });
  expect(container.textContent).toContain('Loading update');
});

test('app home renders empty state', () => {
  const container = renderAppHome({
    posts: [],
    loading: false,
    onRefresh: jest.fn(),
    showComposer: false
  });
  expect(container.textContent).toContain('No updates yet');
});
