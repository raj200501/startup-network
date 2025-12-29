import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Badge, Button, Card, Container, Input } from '../../ui';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div className="auth-layout">
        <Card className="auth-panel" title="Welcome back">
          <Badge variant="info">Founder login</Badge>
          <p className="lead">Sign in to continue coordinating your launch plan.</p>
          <form className="auth-panel__stack" onSubmit={onSubmit}>
            <Input
              type="email"
              label="Email address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </form>
          <p className="auth-panel__helper">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </Card>
        <div className="auth-illustration">
          <div className="auth-illustration__card">
            <h3>Mission briefing</h3>
            <p className="lead">Today&apos;s priority: finalize the investor update and review launch KPIs.</p>
          </div>
          <div className="auth-illustration__card">
            <h3>Next steps</h3>
            <p className="lead">Invite teammates, link your product metrics, and track momentum in real time.</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
