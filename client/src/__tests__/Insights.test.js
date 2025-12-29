import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Insights from '../pages/Insights';

const renderPage = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <Insights />
      </MemoryRouter>,
      container
    );
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('insights renders weekly insights header', () => {
  const container = renderPage();
  expect(container.textContent).toContain('Weekly insights');
});
