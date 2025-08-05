/*
  # Add helper functions for video view analytics

  1. Functions
    - `count_unique_views` - Count unique IP addresses for a video
    - `get_video_stats` - Get comprehensive stats for a video
*/

-- Function to count unique views (distinct IP addresses) for a video
CREATE OR REPLACE FUNCTION count_unique_views(video_id_param text)
RETURNS bigint AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT ip_address)
    FROM video_views
    WHERE video_id = video_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get comprehensive video statistics
CREATE OR REPLACE FUNCTION get_video_stats(video_id_param text)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'video_id', video_id_param,
    'total_views', COUNT(*),
    'unique_views', COUNT(DISTINCT ip_address),
    'authenticated_views', COUNT(*) FILTER (WHERE user_id IS NOT NULL),
    'anonymous_views', COUNT(*) FILTER (WHERE user_id IS NULL),
    'first_view', MIN(viewed_at),
    'latest_view', MAX(viewed_at),
    'views_today', COUNT(*) FILTER (WHERE viewed_at >= CURRENT_DATE),
    'views_this_week', COUNT(*) FILTER (WHERE viewed_at >= CURRENT_DATE - INTERVAL '7 days'),
    'views_this_month', COUNT(*) FILTER (WHERE viewed_at >= CURRENT_DATE - INTERVAL '30 days')
  ) INTO result
  FROM video_views
  WHERE video_id = video_id_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;