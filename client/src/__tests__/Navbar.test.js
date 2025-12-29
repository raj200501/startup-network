import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { NavbarBase } from '../components/layout/Navbar';

jest.mock('../actions/auth', () => ({
  logout: jest.fn()
}));

const renderNavbar = (props) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <NavbarBase {...props} />
      </MemoryRouter>,
      container
    );
  });
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

test('navbar shows guest links when logged out', () => {
  const container = renderNavbar({
    auth: { isAuthenticated: false, loading: false },
    logout: jest.fn()
  });
  expect(container.textContent).toContain('Login');
  expect(container.textContent).toContain('Get started');
});

test('navbar shows auth links when logged in', () => {
  const container = renderNavbar({
    auth: { isAuthenticated: true, loading: false },
    logout: jest.fn()
  });
  expect(container.textContent).toContain('Dashboard');
  expect(container.textContent).toContain('Logout');
});
