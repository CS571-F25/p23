import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ResourceCard from './ResourceCard';
import ResourceDetail from './ResourceDetail';
import CreateResource from './CreateResource';

const ApplicationResources = () => {
  const categories = [
    'Application Tips',
    'SOP Advice',
    'Interview Prep',
    'Funding & Scholarships',
    'Test Prep',
    'Documents'
  ];

  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  // Load resources from session storage and merge with mock data
  useEffect(() => {
    const mockResources = [
        {
          id: 'mock-1',
          title: 'Complete Statement of Purpose Guide',
          description: 'A comprehensive guide to writing compelling SOPs that stand out to admissions committees.',
          content: 'Writing a strong Statement of Purpose is crucial for graduate school applications. Start by introducing yourself and your academic background. Clearly state your research interests and why you are interested in this specific program. Discuss relevant experiences and how they have prepared you for graduate study. Conclude with your future goals and how this program will help you achieve them.',
          category: 'SOP Advice',
          type: 'Guide',
          tags: ['writing', 'sop', 'application'],
          links: [
            { title: 'MIT SOP Guidelines', url: 'https://mitcommlab.mit.edu/broad/commkit/statement-of-purpose/' },
            { title: 'Sample SOPs', url: 'https://grad.berkeley.edu/admissions/apply/statement-purpose/' }
          ],
          author: 'Sarah Johnson',
          authorEmail: 'sarah@example.com',
          createdAt: new Date('2024-12-01').toISOString(),
          comments: []
        },
        {
          id: 'mock-2',
          title: 'GRE Preparation Timeline',
          description: '3-month study plan to ace the GRE with recommended resources and daily schedules.',
          content: 'Month 1: Focus on vocabulary building (30 minutes daily) and basic quantitative concepts. Take a diagnostic test.\n\nMonth 2: Practice full-length sections. Review mistakes thoroughly. Join a study group.\n\nMonth 3: Take weekly full-length practice tests. Focus on time management and test-taking strategies.',
          category: 'Test Prep',
          type: 'Checklist',
          tags: ['gre', 'test-prep', 'timeline', 'study-plan'],
          links: [
            { title: 'Official GRE Practice', url: 'https://www.ets.org/gre' },
            { title: 'Manhattan Prep Resources', url: 'https://www.manhattanprep.com/gre/' }
          ],
          author: 'Michael Chen',
          authorEmail: 'michael@example.com',
          createdAt: new Date('2024-11-28').toISOString(),
          comments: []
        },
        {
          id: 'mock-3',
          title: 'Interview Preparation Checklist',
          description: 'Essential tips and questions to prepare for graduate school interviews.',
          content: 'Before the Interview:\n- Research the program and faculty thoroughly\n- Prepare questions about research opportunities\n- Practice common interview questions\n- Test your video setup if virtual\n\nDuring the Interview:\n- Dress professionally\n- Speak clearly about your research interests\n- Ask thoughtful questions\n- Take notes\n\nAfter the Interview:\n- Send thank-you emails within 24 hours\n- Follow up on any promised materials',
          category: 'Interview Prep',
          type: 'Checklist',
          tags: ['interview', 'preparation', 'tips'],
          links: [
            { title: 'Common Interview Questions', url: 'https://www.gradschoolhub.com/interview-questions/' }
          ],
          author: 'Emily Rodriguez',
          authorEmail: 'emily@example.com',
          createdAt: new Date('2024-11-25').toISOString(),
          comments: []
        },
        {
          id: 'mock-4',
          title: 'Funding Opportunities Database',
          description: 'Comprehensive list of scholarships, fellowships, and grants for graduate students.',
          content: 'Federal Funding:\n- NSF Graduate Research Fellowship\n- NIH F31 Predoctoral Fellowship\n- Fulbright Program\n\nPrivate Fellowships:\n- Ford Foundation Fellowship\n- Hertz Fellowship\n- Google PhD Fellowship\n\nUniversity-Specific:\n- Check your program\'s funding page\n- Contact department administrators\n- Ask current students about funding opportunities',
          category: 'Funding & Scholarships',
          type: 'Guide',
          tags: ['funding', 'scholarships', 'fellowships', 'grants'],
          links: [
            { title: 'NSF GRFP', url: 'https://www.nsfgrfp.org/' },
            { title: 'Fulbright Program', url: 'https://us.fulbrightonline.org/' }
          ],
          author: 'David Kim',
          authorEmail: 'david@example.com',
          createdAt: new Date('2024-11-20').toISOString(),
          comments: []
        },
        {
          id: 'mock-5',
          title: 'Application Document Checklist',
          description: 'Complete checklist of all documents needed for graduate school applications.',
          content: 'Required Documents:\n□ Transcripts (official and unofficial)\n□ Statement of Purpose\n□ Personal Statement (if required)\n□ Letters of Recommendation (2-3)\n□ CV/Resume\n□ Test Scores (GRE, TOEFL, etc.)\n□ Writing Samples (for some programs)\n□ Application Fee Payment\n\nOptional but Helpful:\n□ Portfolio (for design/art programs)\n□ Publications list\n□ Conference presentations',
          category: 'Application Tips',
          type: 'Checklist',
          tags: ['documents', 'checklist', 'requirements'],
          links: [],
          author: 'Jessica Martinez',
          authorEmail: 'jessica@example.com',
          createdAt: new Date('2024-11-15').toISOString(),
          comments: []
        }
      ];

    const storedResources = sessionStorage.getItem('application_resources');
    const userResources = storedResources ? JSON.parse(storedResources) : [];
    
    // Merge mock data with user-created resources (user resources appear first)
    const allResources = [...userResources, ...mockResources];
    setResources(allResources);
  }, []);

  // Update session storage when user creates new resources
  const updateUserResources = (newResource) => {
    const storedResources = sessionStorage.getItem('application_resources');
    const userResources = storedResources ? JSON.parse(storedResources) : [];
    const updatedUserResources = [newResource, ...userResources];
    sessionStorage.setItem('application_resources', JSON.stringify(updatedUserResources));
  };

  // Filter and sort resources
  useEffect(() => {
    let filtered = [...resources];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort resources
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    }

    setFilteredResources(filtered);
  }, [resources, selectedCategory, selectedType, searchQuery, sortBy]);

  const handleCreateResource = (newResource) => {
    const updatedResources = [newResource, ...resources];
    setResources(updatedResources);
    sessionStorage.setItem('application_resources', JSON.stringify(updatedResources));
  };

  const handleCardClick = (resource) => {
    setSelectedResource(resource);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    // Refresh resources to show updated comments
    const mockResources = [
      {
        id: 'mock-1',
        title: 'Complete Statement of Purpose Guide',
        description: 'A comprehensive guide to writing compelling SOPs that stand out to admissions committees.',
        content: 'Writing a strong Statement of Purpose is crucial for graduate school applications. Start by introducing yourself and your academic background. Clearly state your research interests and why you are interested in this specific program. Discuss relevant experiences and how they have prepared you for graduate study. Conclude with your future goals and how this program will help you achieve them.',
        category: 'SOP Advice',
        type: 'Guide',
        tags: ['writing', 'sop', 'application'],
        links: [
          { title: 'MIT SOP Guidelines', url: 'https://mitcommlab.mit.edu/broad/commkit/statement-of-purpose/' },
          { title: 'Sample SOPs', url: 'https://grad.berkeley.edu/admissions/apply/statement-purpose/' }
        ],
        author: 'Sarah Johnson',
        authorEmail: 'sarah@example.com',
        createdAt: new Date('2024-12-01').toISOString(),
        comments: []
      },
      {
        id: 'mock-2',
        title: 'GRE Preparation Timeline',
        description: '3-month study plan to ace the GRE with recommended resources and daily schedules.',
        content: 'Month 1: Focus on vocabulary building (30 minutes daily) and basic quantitative concepts. Take a diagnostic test.\n\nMonth 2: Practice full-length sections. Review mistakes thoroughly. Join a study group.\n\nMonth 3: Take weekly full-length practice tests. Focus on time management and test-taking strategies.',
        category: 'Test Prep',
        type: 'Checklist',
        tags: ['gre', 'test-prep', 'timeline', 'study-plan'],
        links: [
          { title: 'Official GRE Practice', url: 'https://www.ets.org/gre' },
          { title: 'Manhattan Prep Resources', url: 'https://www.manhattanprep.com/gre/' }
        ],
        author: 'Michael Chen',
        authorEmail: 'michael@example.com',
        createdAt: new Date('2024-11-28').toISOString(),
        comments: []
      },
      {
        id: 'mock-3',
        title: 'Interview Preparation Checklist',
        description: 'Essential tips and questions to prepare for graduate school interviews.',
        content: 'Before the Interview:\n- Research the program and faculty thoroughly\n- Prepare questions about research opportunities\n- Practice common interview questions\n- Test your video setup if virtual\n\nDuring the Interview:\n- Dress professionally\n- Speak clearly about your research interests\n- Ask thoughtful questions\n- Take notes\n\nAfter the Interview:\n- Send thank-you emails within 24 hours\n- Follow up on any promised materials',
        category: 'Interview Prep',
        type: 'Checklist',
        tags: ['interview', 'preparation', 'tips'],
        links: [
          { title: 'Common Interview Questions', url: 'https://www.gradschoolhub.com/interview-questions/' }
        ],
        author: 'Emily Rodriguez',
        authorEmail: 'emily@example.com',
        createdAt: new Date('2024-11-25').toISOString(),
        comments: []
      },
      {
        id: 'mock-4',
        title: 'Funding Opportunities Database',
        description: 'Comprehensive list of scholarships, fellowships, and grants for graduate students.',
        content: 'Federal Funding:\n- NSF Graduate Research Fellowship\n- NIH F31 Predoctoral Fellowship\n- Fulbright Program\n\nPrivate Fellowships:\n- Ford Foundation Fellowship\n- Hertz Fellowship\n- Google PhD Fellowship\n\nUniversity-Specific:\n- Check your program\'s funding page\n- Contact department administrators\n- Ask current students about funding opportunities',
        category: 'Funding & Scholarships',
        type: 'Guide',
        tags: ['funding', 'scholarships', 'fellowships', 'grants'],
        links: [
          { title: 'NSF GRFP', url: 'https://www.nsfgrfp.org/' },
          { title: 'Fulbright Program', url: 'https://us.fulbrightonline.org/' }
        ],
        author: 'David Kim',
        authorEmail: 'david@example.com',
        createdAt: new Date('2024-11-20').toISOString(),
        comments: []
      },
      {
        id: 'mock-5',
        title: 'Application Document Checklist',
        description: 'Complete checklist of all documents needed for graduate school applications.',
        content: 'Required Documents:\n□ Transcripts (official and unofficial)\n□ Statement of Purpose\n□ Personal Statement (if required)\n□ Letters of Recommendation (2-3)\n□ CV/Resume\n□ Test Scores (GRE, TOEFL, etc.)\n□ Writing Samples (for some programs)\n□ Application Fee Payment\n\nOptional but Helpful:\n□ Portfolio (for design/art programs)\n□ Publications list\n□ Conference presentations',
        category: 'Application Tips',
        type: 'Checklist',
        tags: ['documents', 'checklist', 'requirements'],
        links: [],
        author: 'Jessica Martinez',
        authorEmail: 'jessica@example.com',
        createdAt: new Date('2024-11-15').toISOString(),
        comments: []
      }
    ];
    
    const storedResources = sessionStorage.getItem('application_resources');
    const userResources = storedResources ? JSON.parse(storedResources) : [];
    const allResources = [...userResources, ...mockResources];
    setResources(allResources);
  };

  return (
    <div className="w-100 min-vh-100">
      {/* Header */}
      <div className="bg-danger text-white py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Application Resources</h1>
              <p className="display-6 mb-3">Curated guides, templates, and tips for your graduate school journey</p>
              <Button 
                variant="light" 
                size="lg"
                onClick={() => setShowCreate(true)}
              >
                ➕ Share a Resource
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={10}>
            {/* Filters */}
            <div className="mb-4 p-3 bg-light rounded">
              <Row className="g-3">
                <Col md={4}>
                  <Form.Label htmlFor="resourceSearchInput" className="small text-muted mb-1">Search</Form.Label>
                  <Form.Control
                    id="resourceSearchInput"
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label htmlFor="resourceCategorySelect" className="small text-muted mb-1">Category</Form.Label>
                  <Form.Select
                    id="resourceCategorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label htmlFor="resourceTypeSelect" className="small text-muted mb-1">Type</Form.Label>
                  <Form.Select
                    id="resourceTypeSelect"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Guide">Guide</option>
                    <option value="Template">Template</option>
                    <option value="Checklist">Checklist</option>
                    <option value="Tips">Tips</option>
                    <option value="Video">Video</option>
                    <option value="Article">Article</option>
                    <option value="Tool">Tool</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label htmlFor="resourceSortSelect" className="small text-muted mb-1">Sort By</Form.Label>
                  <Form.Select
                    id="resourceSortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="alphabetical">A-Z</option>
                    <option value="reviews">Most Reviewed</option>
                  </Form.Select>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button 
                    variant="danger" 
                    className="w-100"
                    aria-label="Reset all filters"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedType('All');
                      setSortBy('recent');
                    }}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="text-muted">No resources found</h4>
                <p className="text-muted">Be the first to share a helpful resource!</p>
                <Button variant="danger" onClick={() => setShowCreate(true)}>
                  Create Resource
                </Button>
              </div>
            ) : (
              <Row className="g-4">
                {filteredResources.map(resource => (
                  <Col key={resource.id} lg={4} md={6}>
                    <ResourceCard 
                      resource={resource} 
                      onClick={() => handleCardClick(resource)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      <CreateResource 
        show={showCreate} 
        onHide={() => setShowCreate(false)} 
        onSubmit={handleCreateResource}
      />
      
      <ResourceDetail 
        resource={selectedResource}
        show={showDetail}
        onHide={handleCloseDetail}
      />
    </div>
  );
};

export default ApplicationResources;
