import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../pages/Landing';

const renderWithRouter = (ui) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(<MemoryRouter>{ui}</MemoryRouter>, container);
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('landing renders hero and CTA', () => {
  const container = renderWithRouter(<Landing />);
  expect(container.textContent).toContain('Startup Network keeps your runway visible');
  expect(container.textContent).toContain('Create workspace');
});
