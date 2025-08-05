'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function MessagesPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('connections'); // 'connections', 'requests', 'chat'
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data - in real app, this would come from Supabase
  const [connectionRequests, setConnectionRequests] = useState([
    {
      id: 1,
      requester: {
        name: 'John "Tank" Rodriguez',
        type: 'guest',
        title: 'Former Navy SEAL & Leadership Coach',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      recipient: {
        name: 'Military Mindset Podcast',
        type: 'podcaster',
        host: 'Sarah Johnson'
      },
      status: 'pending',
      initialMessage: 'Hi! I\'d love to share my leadership experience on your show. I have 15 years of Navy SEAL experience and now coach corporate teams.',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      requester: {
        name: 'Veteran Stories Podcast',
        type: 'podcaster',
        host: 'Mike Thompson',
        audienceSize: '50K+ monthly listeners'
      },
      recipient: {
        name: 'Sarah Mitchell',
        type: 'guest',
        title: 'Combat Veteran & Entrepreneur'
      },
      status: 'pending',
      initialMessage: 'We\'d love to have you on our show to discuss veteran entrepreneurship. Your story would inspire our audience!',
      createdAt: '2024-01-19T14:15:00Z'
    }
  ]);

  const [matchedConnections, setMatchedConnections] = useState([
    {
      id: 3,
      participants: [
        {
          name: 'Mike "Gunny" Thompson',
          type: 'guest',
          title: 'Marine Corps Veteran & Author',
          image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
          name: 'Leadership Lessons Podcast',
          type: 'podcaster',
          host: 'Jennifer Davis',
          audienceSize: '25K+ listeners'
        }
      ],
      lastMessage: 'Perfect! Let\'s schedule for next Tuesday at 2 PM EST.',
      lastMessageTime: '2024-01-20T16:45:00Z',
      unreadCount: 2
    }
  ]);

  const [messages, setMessages] = useState({
    3: [
      {
        id: 1,
        senderId: 'guest',
        senderName: 'Mike Thompson',
        content: 'Thanks for accepting my request! I\'m excited to share my military leadership experience.',
        timestamp: '2024-01-20T15:30:00Z',
        read: true
      },
      {
        id: 2,
        senderId: 'podcaster',
        senderName: 'Jennifer Davis',
        content: 'We\'re thrilled to have you! What days work best for you this week?',
        timestamp: '2024-01-20T16:15:00Z',
        read: true
      },
      {
        id: 3,
        senderId: 'guest',
        senderName: 'Mike Thompson',
        content: 'Perfect! Let\'s schedule for next Tuesday at 2 PM EST.',
        timestamp: '2024-01-20T16:45:00Z',
        read: false
      }
    ]
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  };

  const handleAcceptRequest = (requestId) => {
    setConnectionRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'matched' }
          : req
      )
    );
    
    // Move to matched connections
    const acceptedRequest = connectionRequests.find(req => req.id === requestId);
    if (acceptedRequest) {
      const newConnection = {
        id: requestId,
        participants: [acceptedRequest.requester, acceptedRequest.recipient],
        lastMessage: 'Connection established! You can now message each other.',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      };
      setMatchedConnections(prev => [newConnection, ...prev]);
    }
    
    alert('✅ Connection request accepted! You can now message each other.');
  };

  const handleDeclineRequest = (requestId) => {
    setConnectionRequests(prev => 
      prev.filter(req => req.id !== requestId)
    );
    alert('❌ Connection request declined.');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConnection) return;

    const message = {
      id: Date.now(),
      senderId: 'current_user',
      senderName: user?.user_metadata?.name || 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => ({
      ...prev,
      [selectedConnection.id]: [...(prev[selectedConnection.id] || []), message]
    }));

    setNewMessage('');
  };

  const openChat = (connection) => {
    setSelectedConnection(connection);
    setActiveTab('chat');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access messages.</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💬 Messages & Connections
          </h1>
          <p className="text-gray-600">
            Manage your podcast guest and host connections
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('connections')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'connections'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Matched Connections ({matchedConnections.length})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'requests'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending Requests ({connectionRequests.filter(r => r.status === 'pending').length})
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Matched Connections Tab */}
            {activeTab === 'connections' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Connections</h2>
                
                {matchedConnections.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No connections yet</h3>
                    <p className="text-gray-600">Accept connection requests to start messaging!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matchedConnections.map((connection) => (
                      <div key={connection.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                              {connection.participants.map((participant, index) => (
                                <div key={index} className="relative">
                                  {participant.image ? (
                                    <img
                                      src={participant.image}
                                      alt={participant.name}
                                      className="w-10 h-10 rounded-full border-2 border-white"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                                      <span className="text-white text-sm font-bold">
                                        {participant.name.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {connection.participants.map(p => p.name).join(' ↔ ')}
                              </h3>
                              <p className="text-sm text-gray-600">{connection.lastMessage}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(connection.lastMessageTime).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {connection.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {connection.unreadCount}
                              </span>
                            )}
                            <button
                              onClick={() => openChat(connection)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              Open Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Pending Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Connection Requests</h2>
                
                {connectionRequests.filter(r => r.status === 'pending').length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-gray-600">New connection requests will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {connectionRequests.filter(r => r.status === 'pending').map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {request.requester.image && (
                              <img
                                src={request.requester.image}
                                alt={request.requester.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.requester.name}</h3>
                              <p className="text-sm text-gray-600">{request.requester.title}</p>
                              <p className="text-xs text-gray-400">
                                {request.requester.type === 'guest' ? '🎤 Guest' : '🎙️ Podcaster'}
                                {request.requester.audienceSize && ` • ${request.requester.audienceSize}`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="text-gray-700">{request.initialMessage}</p>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            ✅ Accept & Match
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            ❌ Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Chat Interface */}
            {activeTab === 'chat' && selectedConnection && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setActiveTab('connections')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ← Back to Connections
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Chat with {selectedConnection.participants.map(p => p.name).join(' & ')}
                    </h2>
                  </div>
                </div>

                {/* Messages */}
                <div className="border border-gray-200 rounded-lg mb-4">
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {(messages[selectedConnection.id] || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === 'current_user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'current_user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Type your message..."
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🛡️ How Matching Works</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>1. Initial Contact:</strong> Guests or podcasters can send connection requests with an introductory message.</p>
            <p><strong>2. Mutual Agreement:</strong> The recipient must accept the request to establish a connection.</p>
            <p><strong>3. Safe Messaging:</strong> Only matched connections can exchange messages - no spam or unwanted contact.</p>
            <p><strong>4. Professional Environment:</strong> Declined connections cannot message each other, maintaining a respectful platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}