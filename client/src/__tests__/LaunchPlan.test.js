import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import LaunchPlan from '../pages/LaunchPlan';

const renderPage = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <LaunchPlan />
      </MemoryRouter>,
      container
    );
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('launch plan renders tracker title', () => {
  const container = renderPage();
  expect(container.textContent).toContain('Launch tracker');
});
