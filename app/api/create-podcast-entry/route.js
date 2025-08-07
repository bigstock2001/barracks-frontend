import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = ['applicantName', 'podcastTitle', 'genre', 'rssOption', 'applicantEmail'];
    for (const field of requiredFields) {
      if (!formData[field] || !formData[field].toString().trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Additional validation for RSS URL if transferring
    if (formData.rssOption === 'transfer' && (!formData.rssUrl || !formData.rssUrl.trim())) {
      return NextResponse.json(
        { error: 'RSS URL is required when transferring feed' },
        { status: 400 }
      );
    }
    
    // Prepare WordPress credentials
    const wpUsername = process.env.WORDPRESS_USERNAME || 'admin';
    const wpPassword = process.env.WORDPRESS_APP_PASSWORD;
    
    if (!wpPassword) {
      console.error('WordPress app password not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Create podcast content description
    const podcastDescription = `
Podcast Application Details:

Host Name: ${formData.applicantName}
Selected Plan: ${formData.selectedPlan || 'Not specified'}
Genre: ${formData.genre}
RSS Feed Option: ${formData.rssOption === 'transfer' ? 'Transferring existing feed' : 'Creating new feed'}
${formData.rssUrl ? `Current RSS URL: ${formData.rssUrl}` : ''}
Contact Email: ${formData.applicantEmail}

Application submitted: ${new Date().toLocaleString()}
Payment Status: Completed
    `.trim();
    
    // Prepare WordPress post data
    const postData = {
      title: formData.podcastTitle,
      content: podcastDescription,
      status: 'publish', // Publish immediately since payment is completed
      meta: {
        // Common meta fields that might be used by Seriously Simple Podcasting
        podcast_host: formData.applicantName,
        podcast_genre: formData.genre,
        podcast_email: formData.applicantEmail,
        rss_option: formData.rssOption,
        selected_plan: formData.selectedPlan,
        ...(formData.rssUrl && { current_rss_url: formData.rssUrl })
      }
    };
    
    console.log('Creating podcast entry:', {
      title: postData.title,
      status: postData.status,
      meta: postData.meta
    });
    
    // Make request to WordPress REST API
    const wpResponse = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/podcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${wpUsername}:${wpPassword}`).toString('base64'),
      },
      body: JSON.stringify(postData),
    });
    
    console.log('WordPress API response status:', wpResponse.status);
    
    if (!wpResponse.ok) {
      const errorText = await wpResponse.text();
      console.error('WordPress API error:', errorText);
      
      // Try to parse error message
      let errorMessage = 'Failed to create podcast entry';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.code || errorMessage;
      } catch (e) {
        // If parsing fails, use the raw text
        errorMessage = errorText.substring(0, 200);
      }
      
      return NextResponse.json(
        { error: `WordPress API error: ${errorMessage}` },
        { status: wpResponse.status }
      );
    }
    
    const wpData = await wpResponse.json();
    console.log('Podcast created successfully:', wpData.id);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Podcast application submitted successfully!',
      podcastId: wpData.id,
      podcastTitle: wpData.title.rendered,
      status: wpData.status
    });
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}