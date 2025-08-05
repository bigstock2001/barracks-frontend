'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function DirectoryPage() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('guest'); // 'guest' or 'podcaster'
  const [showSignup, setShowSignup] = useState(false);
  const [isFoundingMember, setIsFoundingMember] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    topic: '',
    location: '',
    availability: 'any'
  });

  // Mock data for demonstration
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: 'John "Tank" Rodriguez',
      title: 'Former Navy SEAL & Leadership Coach',
      topics: ['Military Leadership', 'Team Building', 'Mental Resilience'],
      location: 'San Diego, CA',
      availability: 'available',
      bio: 'Former Navy SEAL with 15 years of service. Now helps corporate teams build resilience and leadership skills.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tier: 'founding',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      title: 'Combat Veteran & Entrepreneur',
      topics: ['Veteran Transition', 'Entrepreneurship', 'Women in Military'],
      location: 'Austin, TX',
      availability: 'limited',
      bio: 'Army veteran turned successful tech entrepreneur. Passionate about helping veterans transition to civilian careers.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tier: 'standard',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Mike "Gunny" Thompson',
      title: 'Marine Corps Veteran & Author',
      topics: ['Military History', 'Leadership', 'Book Writing'],
      location: 'Virginia Beach, VA',
      availability: 'available',
      bio: 'Retired Marine Gunnery Sergeant and bestselling author of military memoirs.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tier: 'founding',
      joinDate: '2024-01-08'
    }
  ]);

  useEffect(() => {
    loadUser();
    
    // Simulate founding member counter updates
    const updateCounter = () => {
      const counter = document.getElementById('foundingCounter');
      if (counter) {
        // Mock: Show random number between 20-40 for demo
        const currentCount = Math.floor(Math.random() * 20) + 20;
        counter.textContent = currentCount;
        
        // Update progress bar
        const progressBar = document.querySelector('.bg-white.h-3.rounded-full');
        if (progressBar) {
          progressBar.style.width = `${(currentCount / 150) * 100}%`;
        }
      }
      clearInterval(interval);
    };
    
    updateCounter();
    const interval = setInterval(updateCounter, 30000); // Update every 30 seconds for demo
  }, []);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Check if user joined within first 60 days (mock logic)
      const joinDate = new Date(currentUser.created_at);
      const launchDate = new Date('2024-01-01'); // Mock launch date
      const daysSinceLaunch = Math.floor((joinDate - launchDate) / (1000 * 60 * 60 * 24));
      setIsFoundingMember(daysSinceLaunch <= 60);
    }
  };

  const filteredGuests = guests.filter(guest => {
    if (searchFilters.topic && !guest.topics.some(topic => 
      topic.toLowerCase().includes(searchFilters.topic.toLowerCase())
    )) return false;
    
    if (searchFilters.location && !guest.location.toLowerCase().includes(searchFilters.location.toLowerCase())) return false;
    
    if (searchFilters.availability !== 'any' && guest.availability !== searchFilters.availability) return false;
    
    return true;
  });

  const handleSubscribeGuest = () => {
    if (isFoundingMember) {
      alert('🎉 Congratulations! As a founding member, you have lifetime free access to the Guest Directory!');
    } else {
      alert('Guest Directory Subscription: $34.99/month\n\nThis is 50% less than PodMatch ($69/month)!\n\nPayment integration coming soon - contact support to get started.');
    }
  };

  const handleSubscribePodcaster = () => {
    alert('Podcaster Directory Access: $6.00/month\n\nOr upgrade to Tier 2+ hosting ($19.99+) for free directory access!\n\nPayment integration coming soon - contact support to get started.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎙️ Podcast Guest Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect high-quality guests with podcasters. Build your network, grow your show, and share your expertise.
          </p>
        </div>

        {/* Founding Member Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">🚀 Founding Member Special!</h2>
          <p className="text-white text-lg">
            The first <strong>150 guests</strong> to sign up get <strong>LIFETIME FREE ACCESS</strong> to the Guest Directory!
          </p>
          <p className="text-yellow-100 text-sm mt-2">
            After 150 founding members: Guests pay $34.99/month • Podcasters pay $6.00/month (or get free access with Tier 2+ hosting)
          </p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-white font-bold text-lg">
              🎯 <span id="foundingCounter">23</span> of 150 Founding Guest Spots Taken
            </p>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-2">
              <div className="bg-white h-3 rounded-full transition-all duration-500" style={{width: '15.3%'}}></div>
            </div>
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose Your Role</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Guest Option */}
            <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              userType === 'guest' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`} onClick={() => setUserType('guest')}>
              <div className="text-center">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Guest</h3>
                <p className="text-gray-600 mb-4">
                  I want to be featured on podcasts and share my expertise
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Founding Members (First 60 Days):</span>
                    <span className="font-bold text-green-600">FREE Forever</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Guest Listing:</span>
                    <span className="font-bold">$34.99/month</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    50% less than PodMatch ($69/month)
                  </div>
                </div>
              </div>
            </div>

            {/* Podcaster Option */}
            <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              userType === 'podcaster' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
            }`} onClick={() => setUserType('podcaster')}>
              <div className="text-center">
                <div className="text-4xl mb-4">🎙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Podcaster</h3>
                <p className="text-gray-600 mb-4">
                  I want to find and book quality guests for my show
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Founding Members (First 60 Days):</span>
                    <span className="font-bold text-green-600">FREE Forever</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tier 2+ Hosting Customers:</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Non-hosted Podcasters:</span>
                    <span className="font-bold">$6.00/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-6">
            {user ? (
              <div className="space-y-4">
                {isFoundingMember && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-medium">
                        🎉 You're a Founding Member! You have lifetime free access to the directory.
                      </p>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={userType === 'guest' ? handleSubscribeGuest : handleSubscribePodcaster}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4"
                >
                  {userType === 'guest' ? 'Create Guest Profile' : 'Access Guest Directory'}
                </button>
                
                {userType === 'guest' && (
                  <a
                    href="/directory/setup"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    📝 Setup Guest Profile
                  </a>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 mb-4">Please log in to access the Guest Directory</p>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Guest Directory Preview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Featured Guests</h2>
            <div className="text-sm text-gray-500">
              {filteredGuests.length} of {guests.length} guests
            </div>
          </div>

          {/* Search Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                value={searchFilters.topic}
                onChange={(e) => setSearchFilters({ ...searchFilters, topic: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="e.g., Leadership, Military"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="e.g., California, Remote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={searchFilters.availability}
                onChange={(e) => setSearchFilters({ ...searchFilters, availability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="any">Any</option>
                <option value="available">Available Now</option>
                <option value="limited">Limited Availability</option>
              </select>
            </div>
          </div>

          {/* Guest Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuests.map((guest) => (
              <div key={guest.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{guest.name}</h3>
                    <p className="text-sm text-gray-600">{guest.title}</p>
                    {guest.tier === 'founding' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                        🏆 Founding Member
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{guest.bio}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {guest.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`${guest.availability === 'available' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {guest.availability === 'available' ? 'Available Now' : 'Limited Availability'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {guest.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  Send Connection Request
                </button>
                
                {/* Guest Rating Display */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-gray-600">4.8 (12 reviews)</span>
                    </div>
                    <button className="text-red-600 hover:text-red-800 text-xs">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Choose Barracks Media Directory?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 For Guests</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">$34.99/month</div>
                  <div className="text-sm text-green-800">vs PodMatch at $69/month</div>
                  <div className="text-lg font-semibold text-green-700 mt-2">Save 50%!</div>
                </div>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Professional profile listing</li>
                  <li>• Appear in podcaster searches</li>
                  <li>• Direct contact from shows</li>
                  <li>• Military-focused network</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎙️ For Podcasters</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">$6.00/month</div>
                  <div className="text-sm text-blue-800">or FREE with Tier 2+ hosting</div>
                  <div className="text-lg font-semibold text-blue-700 mt-2">Best Value!</div>
                </div>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>• Browse verified guest profiles</li>
                  <li>• Advanced search filters</li>
                  <li>• Direct guest contact</li>
                  <li>• Quality military/veteran guests</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">🚀 Limited Time: Founding Member Benefits</h3>
              <p className="text-yellow-700">
                Be one of the first <strong>150 guests</strong> to sign up and get <strong>lifetime free access</strong> to the entire Guest Directory!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}