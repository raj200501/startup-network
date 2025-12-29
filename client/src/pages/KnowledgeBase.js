import React, { useMemo, useState } from 'react';
import { Badge, Button, Card, Container, Input, SectionHeader, Tabs } from '../ui';
import { knowledgeBase } from '../data/knowledgeBase';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'Fundraising', label: 'Fundraising' },
  { id: 'Growth', label: 'Growth' },
  { id: 'Product', label: 'Product' },
  { id: 'Operations', label: 'Operations' }
];

const KnowledgeBase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const entries = useMemo(() => {
    return knowledgeBase.filter((entry) => {
      const matchesCategory =
        activeCategory === 'all' || entry.category === activeCategory;
      const matchesQuery =
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <Container>
      <SectionHeader
        eyebrow="Knowledge base"
        title="Founder playbooks and proven rituals"
        subtitle="Browse the internal library of investor updates, growth loops, and launch checklists."
        action={<Button variant="secondary">Request a new playbook</Button>}
      />
      <div className="auth-panel__stack">
        <Input
          label="Search playbooks"
          placeholder="Search by keyword or summary"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Tabs tabs={categories} active={activeCategory} onChange={setActiveCategory} />
      </div>
      <div className="ui-grid ui-grid--two" style={{ marginTop: '24px' }}>
        {entries.slice(0, 18).map((entry) => (
          <Card
            key={entry.id}
            title={entry.title}
            subtitle={entry.summary}
            actions={<Badge variant="info">{entry.category}</Badge>}
          >
            <div className="ui-grid ui-grid--three">
              <div>
                <p className="text-muted">Owner</p>
                <strong>{entry.owner}</strong>
              </div>
              <div>
                <p className="text-muted">Updated</p>
                <strong>{entry.updatedAt}</strong>
              </div>
              <div>
                <p className="text-muted">Tags</p>
                <strong>{entry.tags.join(', ')}</strong>
              </div>
            </div>
            <Button variant="outline">Open playbook</Button>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default KnowledgeBase;
