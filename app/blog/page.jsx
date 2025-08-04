'use client';

import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: ''
  });

  // Admin email - change this to your email
  const ADMIN_EMAIL = 'ddunn@barracksmedia.com';

  useEffect(() => {
    // Load user data
    const savedUser = localStorage.getItem('barracks_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.email === ADMIN_EMAIL);
    }

    // Load blog posts from localStorage (in real app, this would be from your backend)
    const savedPosts = localStorage.getItem('barracks_blog_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Default demo posts
      const demoPosts = [
        {
          id: 1,
          title: 'Welcome to Barracks Media Blog',
          excerpt: 'Introducing our new creator platform and profit-sharing program.',
          content: `
            <p>Welcome to the official Barracks Media blog! We're excited to share updates about our platform, creator success stories, and industry insights.</p>
            
            <h3>What's New</h3>
            <p>Our creator program is now live with:</p>
            <ul>
              <li>30% profit sharing for paid creators</li>
              <li>Unlimited uploads for premium tiers</li>
              <li>Advanced analytics dashboard</li>
              <li>Priority support for all subscribers</li>
            </ul>
            
            <p>Stay tuned for more updates and creator spotlights!</p>
          `,
          author: 'Barracks Media Team',
          publishDate: '2024-01-20',
          readTime: '3 min read',
          tags: ['announcement', 'platform', 'creators']
        },
        {
          id: 2,
          title: 'Creator Spotlight: Success Stories',
          excerpt: 'Meet some of our top-performing creators and learn about their journey.',
          content: `
            <p>This month we're highlighting some amazing creators who have found success on our platform.</p>
            
            <h3>John Doe - Military Content Creator</h3>
            <p>"Barracks Media's profit sharing has allowed me to turn my passion into a sustainable income. The platform truly supports creators who put in the work."</p>
            
            <h3>Sarah Miller - Veteran Storyteller</h3>
            <p>"The performance-based revenue model motivates me to create better content. My monthly earnings have grown consistently with my audience."</p>
            
            <p>Want to become a featured creator? <a href="/upload">Start your journey today!</a></p>
          `,
          author: 'Barracks Media Team',
          publishDate: '2024-01-15',
          readTime: '5 min read',
          tags: ['creators', 'success-stories', 'community']
        }
      ];
      setPosts(demoPosts);
      localStorage.setItem('barracks_blog_posts', JSON.stringify(demoPosts));
    }
    
    setLoading(false);
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const post = {
      id: Date.now(),
      title: newPost.title,
      excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
      content: newPost.content.replace(/\n/g, '<br>'),
      author: user.name,
      publishDate: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(newPost.content.split(' ').length / 200) + ' min read',
      tags: ['admin-post']
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('barracks_blog_posts', JSON.stringify(updatedPosts));
    
    // Reset form
    setNewPost({ title: '', content: '', excerpt: '' });
    setShowNewPostForm(false);
    
    alert('Post published successfully!');
  };

  const handleDeletePost = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('barracks_blog_posts', JSON.stringify(updatedPosts));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 Barracks Media Blog
          </h1>
          <p className="text-xl text-gray-600">
            Updates, insights, and creator stories from the Barracks Media team
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">👑 Admin Controls</h2>
                <p className="text-blue-700 text-sm">You have admin privileges to create and manage blog posts</p>
              </div>
              <button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {showNewPostForm ? 'Cancel' : '✍️ New Post'}
              </button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <form onSubmit={handleCreatePost} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Brief description (auto-generated if empty)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Write your blog post content here..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    📝 Publish Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Non-admin notice */}
        {user && !isAdmin && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 text-sm">
                This blog is read-only for users. Only administrators can create posts.
              </p>
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Check back later for updates and insights!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    {isAdmin && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div 
                    className="prose prose-lg max-w-none text-gray-800 mb-6"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-blue-100 mb-6">
            Join our creator program and start earning from your content today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              🎬 Start Creating
            </a>
            <a
              href="/content"
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              👀 Browse Content
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}