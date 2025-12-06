import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const CommunitySupport = () => {
  const categories = [
    'General Discussion',
    'Success Stories',
    'Questions',
    'Networking'
  ];

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Load posts from session storage and merge with mock data
  useEffect(() => {
    const mockPosts = [
        {
          id: 'mock-1',
          title: 'Got accepted to my dream program! 🎉',
          content: 'After months of hard work on my applications, I finally got the acceptance email from Stanford CS! I want to thank everyone in this community for the support and advice. Special thanks to those who reviewed my SOP drafts. Don\'t give up on your dreams!',
          category: 'Success Stories',
          tags: ['stanford', 'computer-science', 'acceptance'],
          author: 'Alex Thompson',
          authorEmail: 'alex@example.com',
          createdAt: new Date('2024-12-05').toISOString(),
          likes: 12,
          comments: [
            {
              id: '1-1',
              text: 'Congratulations! That\'s amazing news! 🎊',
              author: 'Emma Wilson',
              createdAt: new Date('2024-12-05T10:30:00').toISOString()
            },
            {
              id: '1-2',
              text: 'Well deserved! Your dedication really paid off.',
              author: 'James Lee',
              createdAt: new Date('2024-12-05T14:20:00').toISOString()
            }
          ]
        },
        {
          id: 'mock-2',
          title: 'How important are recommendation letters?',
          content: 'I\'m starting my application process and wondering how much weight recommendation letters carry in the admissions decision. Should I prioritize getting letters from famous professors even if they don\'t know me well, or from professors who know me better but are less well-known?',
          category: 'Questions',
          tags: ['recommendations', 'letters', 'advice'],
          author: 'Rachel Green',
          authorEmail: 'rachel@example.com',
          createdAt: new Date('2024-12-04').toISOString(),
          likes: 8,
          comments: [
            {
              id: '2-1',
              text: 'Quality over quantity! A detailed letter from someone who knows your work is much better than a generic one from a famous name.',
              author: 'Prof. Anderson',
              createdAt: new Date('2024-12-04T09:15:00').toISOString()
            }
          ]
        },
        {
          id: 'mock-3',
          title: 'Virtual vs. In-person Interviews',
          content: 'My program is offering both virtual and in-person interview options. I\'m international and it would be easier to do virtual, but I\'m worried it might hurt my chances. What are your thoughts? Has anyone had experience with both formats?',
          category: 'General Discussion',
          tags: ['interviews', 'virtual', 'advice'],
          author: 'Priya Patel',
          authorEmail: 'priya@example.com',
          createdAt: new Date('2024-12-03').toISOString(),
          likes: 15,
          comments: [
            {
              id: '3-1',
              text: 'I did virtual interviews last year and got accepted! Don\'t worry, they understand international students\' constraints.',
              author: 'Carlos Santos',
              createdAt: new Date('2024-12-03T16:45:00').toISOString()
            },
            {
              id: '3-2',
              text: 'Save your money for relocation! Virtual interviews are just as effective.',
              author: 'Sarah Kim',
              createdAt: new Date('2024-12-03T18:20:00').toISOString()
            }
          ]
        },
        {
          id: 'mock-4',
          title: 'Looking for study buddies for GRE prep',
          content: 'Hi everyone! I\'m planning to take the GRE in February and looking for study partners. I\'m aiming for 330+ and would love to form a study group that meets 2-3 times a week (virtual). Anyone interested? We can share resources and keep each other accountable!',
          category: 'Networking',
          tags: ['gre', 'study-group', 'networking'],
          author: 'Kevin Zhang',
          authorEmail: 'kevin@example.com',
          createdAt: new Date('2024-12-02').toISOString(),
          likes: 6,
          comments: [
            {
              id: '4-1',
              text: 'I\'m interested! Taking GRE in March. Can we connect?',
              author: 'Lisa Brown',
              createdAt: new Date('2024-12-02T11:30:00').toISOString()
            }
          ]
        },
        {
          id: 'mock-5',
          title: 'Dealing with application anxiety',
          content: 'Is anyone else feeling overwhelmed by the application process? I keep second-guessing everything I write and worrying about rejection. How do you all cope with the stress? Any tips for staying mentally healthy during this time?',
          category: 'General Discussion',
          tags: ['mental-health', 'anxiety', 'support'],
          author: 'Maya Johnson',
          authorEmail: 'maya@example.com',
          createdAt: new Date('2024-12-01').toISOString(),
          likes: 23,
          comments: [
            {
              id: '5-1',
              text: 'You\'re not alone! Remember to take breaks and practice self-care. This process is marathon, not a sprint.',
              author: 'Dr. Williams',
              createdAt: new Date('2024-12-01T13:15:00').toISOString()
            },
            {
              id: '5-2',
              text: 'Exercise really helps me! Even a 20-minute walk can clear your head.',
              author: 'Tom Anderson',
              createdAt: new Date('2024-12-01T15:40:00').toISOString()
            },
            {
              id: '5-3',
              text: 'I set specific "application hours" each day and then completely disconnect. Helps maintain balance!',
              author: 'Nina Rodriguez',
              createdAt: new Date('2024-12-01T17:25:00').toISOString()
            }
          ]
        }
      ];

    const storedPosts = sessionStorage.getItem('community_posts');
    const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Merge mock data with user-created posts (user posts appear first)
    const allPosts = [...userPosts, ...mockPosts];
    setPosts(allPosts);
  }, []);

  // Update session storage when user creates new posts
  const updateUserPosts = (newPost) => {
    const storedPosts = sessionStorage.getItem('community_posts');
    const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
    const updatedUserPosts = [newPost, ...userPosts];
    sessionStorage.setItem('community_posts', JSON.stringify(updatedUserPosts));
  };

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortBy === 'discussed') {
      filtered.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const handleCreatePost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    updateUserPosts(postWithId);
    const updatedPosts = [postWithId, ...posts];
    setPosts(updatedPosts);
  };

  const handleLike = (postId) => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please login to like posts');
      return;
    }

    const user = JSON.parse(currentUser);
    const likeKey = `like_comm_${postId}_${user.email}`;
    const hasLiked = sessionStorage.getItem(likeKey);

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    
    // Update session storage only for user-created posts (not mock data)
    if (!postId.startsWith('mock-')) {
      const storedPosts = sessionStorage.getItem('community_posts');
      const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
      const updatedUserPosts = userPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      });
      sessionStorage.setItem('community_posts', JSON.stringify(updatedUserPosts));
    }

    if (hasLiked) {
      sessionStorage.removeItem(likeKey);
    } else {
      sessionStorage.setItem(likeKey, 'true');
    }
  };

  return (
    <div className="w-100 min-vh-100">
      {/* Header */}
      <div className="bg-danger text-white py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Community Support</h1>
              <p className="display-6 mb-0">Connect, share experiences, and support each other</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            {/* Create Post */}
            <CreatePost onSubmit={handleCreatePost} categories={categories} />

            {/* Filters */}
            <div className="mb-4 p-3 bg-light rounded">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label htmlFor="communitySearchInput" className="small text-muted mb-1">Search</Form.Label>
                  <Form.Control
                    id="communitySearchInput"
                    type="text"
                    placeholder="Search posts by title, content, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label htmlFor="communityCategorySelect" className="small text-muted mb-1">Category</Form.Label>
                  <Form.Select
                    id="communityCategorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label htmlFor="communitySortSelect" className="small text-muted mb-1">Sort By</Form.Label>
                  <Form.Select
                    id="communitySortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Liked</option>
                    <option value="discussed">Most Discussed</option>
                  </Form.Select>
                </Col>
              </Row>
            </div>

            {/* Posts */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="text-muted">No posts yet</h4>
                <p className="text-muted">Start a conversation or share your story with the community!</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  category="community"
                />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CommunitySupport;
