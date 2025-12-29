import React from 'react';
import { Badge, Card, Container, SectionHeader, StatCard } from '../ui';
import { weeklyMetrics } from '../data/metrics';

const Insights = () => (
  <Container>
    <SectionHeader
      eyebrow="Weekly insights"
      title="Metrics that define your investor narrative"
      subtitle="Understand momentum across activation, retention, and revenue."
      action={<Badge variant="success">Updated today</Badge>}
    />
    <div className="ui-grid ui-grid--three">
      {weeklyMetrics.slice(0, 15).map((metric) => (
        <StatCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          trend={metric.trend}
          note={metric.note}
        />
      ))}
    </div>
    <section className="ui-section">
      <Card title="Narrative summary" subtitle="Investor-ready insights">
        <p className="lead">
          Weekly metrics are distilled into investor-ready summaries. The highlights below
          help you craft a compelling update for your advisors and backers.
        </p>
        <ul>
          {weeklyMetrics.slice(15, 25).map((metric) => (
            <li key={metric.id} className="lead">
              {metric.label}: {metric.note}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  </Container>
);

export default Insights;
