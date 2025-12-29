import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../ui';

const Footer = () => (
  <footer className="ui-footer">
    <Container>
      <div className="ui-footer__grid">
        <div>
          <div className="ui-footer__title">Startup Network</div>
          <p className="lead">
            A premium operating system for founder momentum, investor relations, and launch
            execution.
          </p>
        </div>
        <div>
          <div className="ui-footer__title">Product</div>
          <Link className="ui-footer__link" to="/app">
            Mission control
          </Link>
          <Link className="ui-footer__link" to="/styleguide">
            UI system
          </Link>
          <Link className="ui-footer__link" to="/register">
            Start free
          </Link>
        </div>
        <div>
          <div className="ui-footer__title">Resources</div>
          <a className="ui-footer__link" href="/docs">
            Docs
          </a>
          <a className="ui-footer__link" href="/api/meta">
            API status
          </a>
        </div>
        <div>
          <div className="ui-footer__title">Company</div>
          <a className="ui-footer__link" href="/roadmap">
            Roadmap
          </a>
          <a className="ui-footer__link" href="/security">
            Security
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
