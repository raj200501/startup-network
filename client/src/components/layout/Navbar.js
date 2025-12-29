import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Badge, Button, Container, useTheme } from '../../ui';

export const NavbarBase = ({ auth: { isAuthenticated, loading }, logout }) => {
  const { theme, toggleTheme } = useTheme();
  const authLinks = (
    <div className="ui-nav__links">
      <Link to="/app">Dashboard</Link>
      <Link to="/insights">Insights</Link>
      <Link to="/launch-plan">Launch plan</Link>
      <Link to="/knowledge">Playbooks</Link>
      <Link to="/posts">Updates</Link>
      <Link to="/styleguide">Styleguide</Link>
      <Button variant="ghost" size="sm" onClick={logout}>
        Logout
      </Button>
    </div>
  );

  const guestLinks = (
    <div className="ui-nav__links">
      <Link to="/">Product</Link>
      <Link to="/knowledge">Playbooks</Link>
      <Link to="/styleguide">Styleguide</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Get started</Link>
    </div>
  );

  return (
    <nav className="ui-nav">
      <Container>
        <div className="ui-nav__inner">
          <div className="ui-nav__logo">
            <Link to="/">Startup Network</Link>
            <Badge variant="info">v2.0</Badge>
          </div>
          {!loading && (isAuthenticated ? authLinks : guestLinks)}
          <div className="ui-nav__actions">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

NavbarBase.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarBase);
