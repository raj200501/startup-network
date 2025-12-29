import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Container, Input } from '../../ui';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div className="auth-layout">
        <Card className="auth-panel" title="Create your workspace">
          <Badge variant="success">Founder onboarding</Badge>
          <p className="lead">Start your launch plan with a personalized cockpit.</p>
          <form className="auth-panel__stack" onSubmit={onSubmit}>
            <Input
              type="text"
              label="Full name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
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
              helper="Must be at least 6 characters."
              required
            />
            <Input
              type="password"
              label="Confirm password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
            <Button type="submit" fullWidth>
              Create account
            </Button>
          </form>
          <p className="auth-panel__helper">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </Card>
        <div className="auth-illustration">
          <div className="auth-illustration__card">
            <h3>What you get</h3>
            <p className="lead">
              A unified dashboard for fundraising, product, and community health signals.
            </p>
          </div>
          <div className="auth-illustration__card">
            <h3>Team visibility</h3>
            <p className="lead">
              Keep every stakeholder aligned with a shared launch timeline and KPI snapshots.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
