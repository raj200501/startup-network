import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import KnowledgeBase from '../pages/KnowledgeBase';

const renderPage = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <KnowledgeBase />
      </MemoryRouter>,
      container
    );
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('knowledge base renders search prompt', () => {
  const container = renderPage();
  expect(container.textContent).toContain('Search playbooks');
});
