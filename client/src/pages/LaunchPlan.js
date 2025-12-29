import React, { useMemo } from 'react';
import { Badge, Card, Container, SectionHeader } from '../ui';
import { launchPlan } from '../data/launchPlan';

const phases = ['Discovery', 'Build', 'Launch', 'Scale'];

const LaunchPlan = () => {
  const grouped = useMemo(() => {
    return phases.map((phase) => ({
      phase,
      items: launchPlan.filter((item) => item.phase === phase).slice(0, 10)
    }));
  }, []);

  return (
    <Container>
      <SectionHeader
        eyebrow="Launch tracker"
        title="Every milestone, one timeline"
        subtitle="Coordinate product, growth, and fundraising milestones with a unified launch plan."
      />
      <div className="ui-grid ui-grid--two">
        {grouped.map((group) => (
          <Card key={group.phase} title={group.phase} subtitle="Top milestones">
            {group.items.map((item) => (
              <div key={item.id} className="post-card">
                <div className="post-card__meta">
                  <strong>{item.title}</strong>
                  <span>{item.due}</span>
                </div>
                <p className="lead">{item.summary}</p>
                <div className="post-actions">
                  <Badge variant="info">{item.owner}</Badge>
                  <Badge
                    variant={
                      item.status === 'complete'
                        ? 'success'
                        : item.status === 'in-progress'
                        ? 'warning'
                        : 'neutral'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default LaunchPlan;
