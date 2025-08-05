import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const { videoId, userId } = await request.json();
    
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Check if this IP has already viewed this video recently (within 24 hours) 
    const now = Date.now();
    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    const { data: recentView } = await supabase
      .from('video_views')
      .select('viewed_at')
      .eq('video_id', videoId)
      .eq('ip_address', ip)
      .gte('viewed_at', new Date(now - cooldownPeriod).toISOString())
      .single();
    
    if (recentView) {
      const lastViewTime = new Date(recentView.viewed_at).getTime();
      return NextResponse.json({ 
        success: false, 
        message: 'View already counted for this IP within 24 hours',
        timeUntilNextView: Math.ceil((cooldownPeriod - (now - lastViewTime)) / (60 * 1000)) // minutes
      });
    }
    
    // Record the view in Supabase
    const { error: insertError } = await supabase
      .from('video_views')
      .insert({
        video_id: videoId,
        user_id: userId,
        ip_address: ip
      });
    
    if (insertError) {
      throw insertError;
    }
    
    // Get total view count for this video
    const { data: viewCount, error: countError } = await supabase
      .from('video_views')
      .select('id', { count: 'exact' })
      .eq('video_id', videoId);
    
    if (countError) {
      throw countError;
    }
    
    // Get unique view count (distinct IP addresses)
    const { data: uniqueViews, error: uniqueError } = await supabase
      .rpc('count_unique_views', { video_id_param: videoId });
    
    if (uniqueError) {
      console.warn('Could not get unique view count:', uniqueError);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'View counted successfully',
      totalViews: viewCount?.length || 0,
      uniqueViews: uniqueViews || 0
    });
    
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');
    
    if (videoId) {
      // Get total views for specific video
      const { data: totalViews, error: totalError } = await supabase
        .from('video_views')
        .select('id', { count: 'exact' })
        .eq('video_id', videoId);
      
      if (totalError) throw totalError;
      
      // Get unique views for specific video
      const { data: uniqueViews, error: uniqueError } = await supabase
        .rpc('count_unique_views', { video_id_param: videoId });
      
      return NextResponse.json({
        totalViews: totalViews?.length || 0,
        uniqueViews: uniqueViews || 0
      });
    } else {
      // Get overall stats from Supabase
      const { data: allViews, error: allError } = await supabase
        .from('video_views')
        .select('video_id');
      
      if (allError) throw allError;
      
      // Group by video_id to get stats per video
      const videoStats = {};
      allViews?.forEach(view => {
        if (!videoStats[view.video_id]) {
          videoStats[view.video_id] = 0;
        }
        videoStats[view.video_id]++;
      });
      
      return NextResponse.json({
        totalViews: allViews?.length || 0,
        videoCount: Object.keys(videoStats).length,
        videoStats: Object.entries(videoStats).map(([videoId, views]) => ({
          videoId,
          totalViews: views
        })).sort((a, b) => b.totalViews - a.totalViews)
      });
    }
    
  } catch (error) {
    console.error('Error getting view stats:', error);
    return NextResponse.json(
      { error: 'Failed to get view stats' },
      { status: 500 }
    );
  }
}