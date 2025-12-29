import React, { useState } from 'react';
import { Badge, Button, Card, Container, Drawer, Input, Modal, SectionHeader, Skeleton, StatCard, Tabs } from '../ui';

const tabs = [
  { id: 'components', label: 'Components' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'feedback', label: 'Feedback' }
];

const Styleguide = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Container>
      <SectionHeader
        eyebrow="Design system"
        title="Startup Network UI kit"
        subtitle="Reusable components that power every premium screen."
        action={<Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />}
      />

      <div className="styleguide-grid">
        <div className="styleguide-panel">
          <h3>Buttons</h3>
          <div className="auth-panel__stack">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div className="styleguide-panel">
          <h3>Inputs</h3>
          <div className="auth-panel__stack">
            <Input label="Workspace name" placeholder="Nova AI" />
            <Input label="Investor update" placeholder="Weekly KPI summary" helper="Visible to your team only." />
          </div>
        </div>

        <div className="styleguide-panel">
          <h3>Badges</h3>
          <div className="auth-panel__stack">
            <Badge variant="success">Shipped</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Blocked</Badge>
            <Badge variant="info">In review</Badge>
          </div>
        </div>

        <div className="styleguide-panel">
          <h3>Card + skeleton</h3>
          <Card title="Investor summary" subtitle="Next sync in 2 days">
            <Skeleton height="16px" />
            <Skeleton height="16px" width="80%" />
            <Skeleton height="16px" width="60%" />
          </Card>
        </div>

        <div className="styleguide-panel">
          <h3>Stat cards</h3>
          <div className="auth-panel__stack">
            <StatCard label="Activation lift" value="22%" trend="up" note="Week-over-week growth" />
            <StatCard label="Retention risk" value="4%" trend="down" note="Improving churn trend" />
          </div>
        </div>

        <div className="styleguide-panel">
          <h3>Modal & Drawer</h3>
          <div className="auth-panel__stack">
            <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
            <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
              Open drawer
            </Button>
          </div>
        </div>

        <div className="styleguide-panel">
          <h3>Tabs</h3>
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <p className="lead">Active tab: {activeTab}</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Launch recap ready"
        actions={<Button onClick={() => setIsModalOpen(false)}>Confirm</Button>}
      >
        Your latest launch recap is ready to share with investors and advisors.
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Quick actions"
      >
        <p className="lead">Choose a workflow to keep momentum high.</p>
        <div className="auth-panel__stack">
          <Button variant="secondary">Log weekly update</Button>
          <Button variant="outline">Add investor</Button>
        </div>
      </Drawer>
    </Container>
  );
};

export default Styleguide;
