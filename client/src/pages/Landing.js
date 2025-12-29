import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Container, SectionHeader } from '../ui';

const features = [
  {
    title: 'Founder Command Center',
    description:
      'Track investor momentum, product milestones, and community growth from one operating system.',
    badge: 'Strategy'
  },
  {
    title: 'Weekly Momentum Score',
    description:
      'Score your execution velocity, celebrate wins, and surface blockers before they impact runway.',
    badge: 'Analytics'
  },
  {
    title: 'Shared Launch Playbooks',
    description:
      'Coordinate product drops, partner announcements, and community releases with real-time checklists.',
    badge: 'Operations'
  }
];

const metrics = [
  { label: 'Founders onboarded', value: '2,600+' },
  { label: 'Avg. investor response', value: '38 hrs' },
  { label: 'Launches coordinated', value: '780' }
];

const playbooks = [
  {
    title: 'Fundraising pulse',
    summary: 'Real-time pipeline stages with warm intro tracking.',
    detail: 'Sync notes, follow-ups, and next steps with your core team.'
  },
  {
    title: 'Growth loops',
    summary: 'Ship experiments weekly and measure revenue lift.',
    detail: 'Connect acquisition, activation, and retention milestones.'
  },
  {
    title: 'Customer stories',
    summary: 'Capture wins from early adopters and highlight feedback.',
    detail: 'Turn conversations into assets for sales and marketing.'
  }
];

const testimonials = [
  {
    name: 'Riya Patel',
    role: 'CEO, Alchemy Flow',
    quote:
      'Startup Network replaced four separate tools. Our investor updates are now two clicks and our launches ship on time.'
  },
  {
    name: 'Luis Gomez',
    role: 'Founder, Brightline AI',
    quote:
      'The momentum score kept us focused during fundraising. We doubled our warm intro response rate.'
  },
  {
    name: 'Amelia Nguyen',
    role: 'COO, Orbital Labs',
    quote:
      'Finally, a dashboard that helps operators and founders speak the same language every week.'
  }
];

const timeline = [
  {
    week: 'Week 1',
    title: 'Launch plan',
    description: 'Define milestones, sync investor goals, and invite your core team.'
  },
  {
    week: 'Week 2',
    title: 'Momentum tracking',
    description: 'Track weekly KPIs, demo pipeline, and roadmap blockers.'
  },
  {
    week: 'Week 3',
    title: 'Investor readiness',
    description: 'Publish updates, share metrics, and schedule follow-ups automatically.'
  },
  {
    week: 'Week 4',
    title: 'Go-to-market',
    description: 'Coordinate launch communications and community rollout.'
  }
];

const Landing = () => (
  <div className="ui-hero">
    <Container>
      <div className="page-header">
        <div>
          <Badge variant="info">Premium founder platform</Badge>
          <h1 className="page-header__title">Startup Network keeps your runway visible</h1>
          <p className="page-header__subtitle">
            Align your team around execution, spotlight investor conversations, and ship every
            launch with precision. Built for fast-moving founders who need clarity in every step.
          </p>
        </div>
        <div className="page-header__actions">
          <Button as={Link} to="/register">
            Create workspace
          </Button>
          <Button variant="secondary" as={Link} to="/styleguide">
            Explore UI
          </Button>
        </div>
      </div>

      <div className="ui-hero__grid">
        {features.map((feature) => (
          <Card
            key={feature.title}
            title={feature.title}
            subtitle={feature.description}
            actions={<Badge variant="neutral">{feature.badge}</Badge>}
          >
            <p className="lead">
              Every workspace includes guided templates, automated follow-ups, and a
              runway-safe calendar.
            </p>
          </Card>
        ))}
      </div>
    </Container>

    <section className="ui-section">
      <Container>
        <SectionHeader
          eyebrow="Momentum snapshot"
          title="Proof you can feel every week"
          subtitle="From investor follow-ups to product sprints, Startup Network tells you what to focus on next."
          action={<Button variant="secondary">Download metrics</Button>}
        />
        <div className="ui-grid ui-grid--three">
          {metrics.map((metric) => (
            <div key={metric.label} className="landing-feature">
              <p className="landing-metric">{metric.value}</p>
              <p className="lead">{metric.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>

    <section className="ui-section">
      <Container>
        <SectionHeader
          eyebrow="Launch playbooks"
          title="Every department ships in sync"
          subtitle="We built smart workflows for fundraising, growth, and customer development."
        />
        <div className="ui-grid ui-grid--two">
          {playbooks.map((item) => (
            <Card key={item.title} title={item.title} subtitle={item.summary}>
              <p className="lead">{item.detail}</p>
              <Button variant="outline">See workflow</Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>

    <section className="ui-section">
      <Container>
        <SectionHeader
          eyebrow="Founder stories"
          title="Teams that ship with confidence"
          subtitle="Operators and founders collaborate in one narrative every week."
        />
        <div className="ui-grid ui-grid--three">
          {testimonials.map((item) => (
            <Card key={item.name} title={item.name} subtitle={item.role}>
              <p className="lead">“{item.quote}”</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>

    <section className="ui-section">
      <Container>
        <SectionHeader
          eyebrow="Launch timeline"
          title="Your first 30 days in Startup Network"
          subtitle="Structured weekly wins to keep momentum high."
        />
        <div className="ui-grid ui-grid--two">
          {timeline.map((item) => (
            <div key={item.week} className="landing-feature">
              <Badge variant="info">{item.week}</Badge>
              <h4>{item.title}</h4>
              <p className="lead">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  </div>
);

export default Landing;
