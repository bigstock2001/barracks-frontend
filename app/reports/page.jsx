'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function ReportsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('report'); // 'report', 'my-reports', 'safety-tips'
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState({
    reportedUserId: '',
    reportedUserName: '',
    reportedContentId: '',
    reportedContentTitle: '',
    reportCategory: '',
    description: '',
    evidence: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [myReports, setMyReports] = useState([]);

  // Mock data for user's previous reports
  const mockReports = [
    {
      id: 1,
      type: 'user',
      reportedItem: 'John Doe (@johndoe)',
      category: 'harassment',
      status: 'under_review',
      submittedAt: '2024-01-20T10:30:00Z',
      description: 'Inappropriate messages in chat'
    },
    {
      id: 2,
      type: 'content',
      reportedItem: 'Military Leadership Podcast Episode 5',
      category: 'inappropriate_content',
      status: 'resolved',
      submittedAt: '2024-01-18T14:15:00Z',
      description: 'Contains misleading information about military protocols'
    }
  ];

  useEffect(() => {
    loadUser();
    setMyReports(mockReports);
  }, []);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a report');
      return;
    }

    if (!reportData.reportCategory || !reportData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Mock API call - in real app, this would go to your backend
      console.log('Submitting report:', {
        reportType,
        reportData,
        reporterId: user.id
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add to user's reports list
      const newReport = {
        id: Date.now(),
        type: reportType,
        reportedItem: reportType === 'user' 
          ? reportData.reportedUserName 
          : reportData.reportedContentTitle,
        category: reportData.reportCategory,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        description: reportData.description
      };

      setMyReports(prev => [newReport, ...prev]);

      // Reset form
      setReportData({
        reportedUserId: '',
        reportedUserName: '',
        reportedContentId: '',
        reportedContentTitle: '',
        reportCategory: '',
        description: '',
        evidence: null
      });
      setReportType('');

      alert('🛡️ Report submitted successfully!\n\nOur safety team will review your report within 24 hours. You can check the status in the "My Reports" tab.');
      setActiveTab('my-reports');

    } catch (error) {
      console.error('Error submitting report:', error);
      alert('❌ Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
      case 'under_review':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'resolved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'dismissed':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'under_review':
        return 'Under Review';
      case 'resolved':
        return 'Resolved';
      case 'dismissed':
        return 'Dismissed';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading safety center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🛡️ Safety Center & Reports
          </h1>
          <p className="text-gray-600">
            Report inappropriate content or behavior to keep our community safe
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">🚨 Emergency Situations</h3>
              <p className="text-red-800 mb-3">
                If you're experiencing immediate danger or threats, contact local emergency services immediately:
              </p>
              <div className="space-y-1 text-red-700">
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('report')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'report'
                    ? 'border-b-2 border-red-500 text-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🚨 Submit Report
              </button>
              <button
                onClick={() => setActiveTab('my-reports')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'my-reports'
                    ? 'border-b-2 border-red-500 text-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 My Reports ({myReports.length})
              </button>
              <button
                onClick={() => setActiveTab('safety-tips')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'safety-tips'
                    ? 'border-b-2 border-red-500 text-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                💡 Safety Tips
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Submit Report Tab */}
            {activeTab === 'report' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit a Report</h2>
                
                {!user ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Login Required</h3>
                    <p className="text-yellow-700 mb-4">You must be logged in to submit reports.</p>
                    <a
                      href="/"
                      className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                    >
                      Go to Login
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReport} className="space-y-6">
                    {/* Report Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        What are you reporting? *
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            reportType === 'user'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                          onClick={() => setReportType('user')}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">👤</div>
                            <h3 className="font-semibold text-gray-900">Report a User</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Inappropriate behavior, harassment, fake profile
                            </p>
                          </div>
                        </div>

                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            reportType === 'content'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                          onClick={() => setReportType('content')}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">📄</div>
                            <h3 className="font-semibold text-gray-900">Report Content</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Inappropriate content, spam, copyright violation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {reportType && (
                      <>
                        {/* User Report Fields */}
                        {reportType === 'user' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                User's Name or Username *
                              </label>
                              <input
                                type="text"
                                value={reportData.reportedUserName}
                                onChange={(e) => handleInputChange('reportedUserName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Enter the user's name or username"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {/* Content Report Fields */}
                        {reportType === 'content' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content Title or Description *
                              </label>
                              <input
                                type="text"
                                value={reportData.reportedContentTitle}
                                onChange={(e) => handleInputChange('reportedContentTitle', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                placeholder="Enter the content title or brief description"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {/* Report Category */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Report Category *
                          </label>
                          <select
                            value={reportData.reportCategory}
                            onChange={(e) => handleInputChange('reportCategory', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                            required
                          >
                            <option value="">Select a category</option>
                            <option value="harassment">Harassment or Bullying</option>
                            <option value="inappropriate_content">Inappropriate Content</option>
                            <option value="spam">Spam or Misleading Information</option>
                            <option value="fake_profile">Fake Profile or Impersonation</option>
                            <option value="copyright">Copyright Violation</option>
                            <option value="privacy">Privacy Violation</option>
                            <option value="threats">Threats or Violence</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Detailed Description *
                          </label>
                          <textarea
                            value={reportData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                            placeholder="Please provide specific details about the issue, including when it occurred, what happened, and any other relevant information..."
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Be as specific as possible. This helps our team investigate more effectively.
                          </p>
                        </div>

                        {/* Evidence Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Evidence (Optional)
                          </label>
                          <input
                            type="file"
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={(e) => handleInputChange('evidence', e.target.files[0])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Screenshots, documents, or other evidence (Max 10MB)
                          </p>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start mb-4">
                            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-gray-700">
                              <p className="font-medium mb-1">Before submitting:</p>
                              <ul className="space-y-1">
                                <li>• Make sure all information is accurate</li>
                                <li>• False reports may result in account restrictions</li>
                                <li>• Our team reviews all reports within 24 hours</li>
                                <li>• You'll receive updates on your report status</li>
                              </ul>
                            </div>
                          </div>
                          
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                          >
                            {submitting ? '📤 Submitting Report...' : '🚨 Submit Report'}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                )}
              </div>
            )}

            {/* My Reports Tab */}
            {activeTab === 'my-reports' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Reports</h2>
                
                {!user ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Please log in to view your reports.</p>
                  </div>
                ) : myReports.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports submitted</h3>
                    <p className="text-gray-600">You haven't submitted any reports yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myReports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="text-lg mr-2">
                                {report.type === 'user' ? '👤' : '📄'}
                              </span>
                              <h3 className="font-semibold text-gray-900">{report.reportedItem}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Category: <span className="font-medium capitalize">{report.category.replace('_', ' ')}</span>
                            </p>
                            <p className="text-gray-700">{report.description}</p>
                          </div>
                          
                          <div className="ml-4 text-right">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                              {getStatusText(report.status)}
                            </span>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(report.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {report.status === 'resolved' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                            <p className="text-sm text-green-800">
                              <strong>Resolution:</strong> Thank you for your report. We've taken appropriate action based on our community guidelines.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Safety Tips Tab */}
            {activeTab === 'safety-tips' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Safety Tips & Guidelines</h2>
                
                <div className="space-y-8">
                  {/* Community Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Community Guidelines</h3>
                    <div className="space-y-3 text-blue-800">
                      <p><strong>Respect:</strong> Treat all community members with respect and professionalism.</p>
                      <p><strong>Authenticity:</strong> Use your real name and accurate information in your profile.</p>
                      <p><strong>No Harassment:</strong> Harassment, bullying, or threatening behavior is not tolerated.</p>
                      <p><strong>Appropriate Content:</strong> Keep all content professional and appropriate for a military/veteran community.</p>
                      <p><strong>Privacy:</strong> Respect others' privacy and don't share personal information without permission.</p>
                    </div>
                  </div>

                  {/* Safety Tips */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">🛡️ Staying Safe Online</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Profile Safety</h4>
                        <ul className="space-y-1 text-green-700 text-sm">
                          <li>• Don't share personal contact information publicly</li>
                          <li>• Use platform messaging instead of personal email/phone</li>
                          <li>• Be cautious about sharing location details</li>
                          <li>• Report suspicious or fake profiles</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Meeting Safety</h4>
                        <ul className="space-y-1 text-green-700 text-sm">
                          <li>• Start with video calls before in-person meetings</li>
                          <li>• Meet in public places for initial meetings</li>
                          <li>• Let someone know about your meeting plans</li>
                          <li>• Trust your instincts - if something feels wrong, leave</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Reporting Guidelines */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-4">🚨 When to Report</h3>
                    <div className="space-y-3 text-yellow-800">
                      <p><strong>Immediate Threats:</strong> Any threats of violence or harm should be reported immediately.</p>
                      <p><strong>Harassment:</strong> Repeated unwanted contact, bullying, or inappropriate messages.</p>
                      <p><strong>Fake Profiles:</strong> Profiles using stolen photos or false military credentials.</p>
                      <p><strong>Inappropriate Content:</strong> Content that violates community standards or contains misinformation.</p>
                      <p><strong>Spam:</strong> Repeated promotional messages or irrelevant content.</p>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">📞 Additional Resources</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Crisis Support</h4>
                        <ul className="space-y-1 text-purple-700 text-sm">
                          <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                          <li>• <strong>National Suicide Prevention Lifeline:</strong> 988</li>
                          <li>• <strong>Veterans Crisis Line:</strong> 1-800-273-8255</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">Military Resources</h4>
                        <ul className="space-y-1 text-purple-700 text-sm">
                          <li>• <strong>Military Family Life Counselors:</strong> On-base support</li>
                          <li>• <strong>Chaplain Services:</strong> Spiritual and emotional support</li>
                          <li>• <strong>Military OneSource:</strong> 1-800-342-9647</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Contact Our Safety Team</h3>
                    <div className="text-gray-700">
                      <p className="mb-2">For urgent safety concerns or questions about our policies:</p>
                      <p><strong>Email:</strong> safety@barracksmedia.com</p>
                      <p><strong>Response Time:</strong> Within 24 hours for safety reports</p>
                      <p className="text-sm text-gray-600 mt-3">
                        Our safety team includes military veterans and trained professionals who understand the unique needs of our community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}