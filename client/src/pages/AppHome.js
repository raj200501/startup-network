import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/post';
import PostItem from '../components/posts/PostItem';
import PostForm from '../components/posts/PostForm';
import { Badge, Button, Card, Container, SectionHeader, Skeleton, Tabs } from '../ui';

const tabs = [
  { id: 'feed', label: 'Team feed' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'signals', label: 'Signals' }
];

export const AppHomeView = ({ posts, loading, onRefresh, showComposer }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const hasPosts = posts && posts.length > 0;

  const feedContent = useMemo(() => {
    if (loading) {
      return (
        <div className="posts-grid">
          {[1, 2, 3].map((item) => (
            <Card key={item} title="Loading update">
              <Skeleton height="16px" />
              <Skeleton height="12px" width="70%" />
              <Skeleton height="12px" width="90%" />
            </Card>
          ))}
        </div>
      );
    }

    if (!hasPosts) {
      return (
        <div className="empty-state">
          <h3>No updates yet</h3>
          <p className="lead">
            Share a launch milestone or a customer insight to kick-start the feed.
          </p>
          <Button onClick={onRefresh}>Refresh feed</Button>
        </div>
      );
    }

    return (
      <div className="posts-grid">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    );
  }, [loading, hasPosts, posts, onRefresh]);

  return (
    <Container>
      <div className="page-header">
        <div>
          <Badge variant="success">Live workspace</Badge>
          <h1 className="page-header__title">Founder mission control</h1>
          <p className="page-header__subtitle">
            Keep your weekly momentum visible, rally the team around launch milestones, and
            deliver updates that impress investors.
          </p>
        </div>
        <div className="page-header__actions">
          <Button variant="secondary">Invite teammates</Button>
          <Button>New update</Button>
        </div>
      </div>

      <SectionHeader
        eyebrow="Live feed"
        title="Updates from your team"
        subtitle="Share product progress, fundraising momentum, and key metrics."
        action={<Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />}
      />

      {feedContent}

      <section className="ui-section">
        <Card
          title="Launch checklist"
          subtitle="Next release scheduled for Friday, 10:00 AM PST"
          actions={<Button variant="outline">Open tracker</Button>}
        >
          <p className="lead">Align product, growth, and community teams with one checklist.</p>
          <div className="ui-grid ui-grid--three">
            {['QA sign-off', 'Investor update', 'Launch email'].map((item) => (
              <div key={item} className="landing-feature">
                <Badge variant="info">In progress</Badge>
                <h4>{item}</h4>
                <p className="lead">Owner assigned · due in 3 days</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {showComposer && activeTab === 'feed' && <PostForm />}
    </Container>
  );
};

AppHomeView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
  showComposer: PropTypes.bool
};

AppHomeView.defaultProps = {
  posts: [],
  loading: false,
  onRefresh: () => {},
  showComposer: true
};

const AppHome = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return <AppHomeView posts={posts} loading={loading} onRefresh={getPosts} />;
};

AppHome.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(AppHome);
