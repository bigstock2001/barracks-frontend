/*
  # Create review and reporting system

  1. New Tables
    - `content_reviews`
      - `id` (uuid, primary key)
      - `content_id` (text) - References uploaded content
      - `reviewer_id` (uuid, references auth.users)
      - `rating` (integer, 1-5 stars)
      - `review_text` (text)
      - `is_verified_listener` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_reviews`
      - `id` (uuid, primary key)
      - `reviewed_user_id` (uuid, references auth.users)
      - `reviewer_id` (uuid, references auth.users)
      - `review_type` (text) - 'guest_experience', 'podcaster_experience'
      - `rating` (integer, 1-5 stars)
      - `review_text` (text)
      - `connection_id` (uuid, references connection_requests)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reports`
      - `id` (uuid, primary key)
      - `reporter_id` (uuid, references auth.users)
      - `reported_user_id` (uuid, references auth.users, nullable)
      - `reported_content_id` (text, nullable)
      - `report_type` (text) - 'harassment', 'inappropriate_content', 'spam', 'fake_profile', 'other'
      - `report_reason` (text)
      - `status` (text) - 'pending', 'reviewed', 'resolved', 'dismissed'
      - `admin_notes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own reviews
    - Add policies for reporting system
*/

-- Create content reviews table
CREATE TABLE IF NOT EXISTS content_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id text NOT NULL,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  is_verified_listener boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(content_id, reviewer_id)
);

-- Create user reviews table
CREATE TABLE IF NOT EXISTS user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewed_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  review_type text NOT NULL CHECK (review_type IN ('guest_experience', 'podcaster_experience')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  connection_id uuid REFERENCES connection_requests(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(reviewed_user_id, reviewer_id, connection_id)
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reported_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_content_id text,
  report_type text NOT NULL CHECK (report_type IN ('harassment', 'inappropriate_content', 'spam', 'fake_profile', 'copyright', 'other')),
  report_reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Content reviews policies
CREATE POLICY "Anyone can read content reviews"
  ON content_reviews
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create content reviews"
  ON content_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own content reviews"
  ON content_reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = reviewer_id)
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete own content reviews"
  ON content_reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = reviewer_id);

-- User reviews policies
CREATE POLICY "Anyone can read user reviews"
  ON user_reviews
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create user reviews"
  ON user_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own user reviews"
  ON user_reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = reviewer_id)
  WITH CHECK (auth.uid() = reviewer_id);

-- Reports policies
CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can read own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_id);

-- Function to calculate average ratings
CREATE OR REPLACE FUNCTION get_content_rating(content_id_param text)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'average_rating', COALESCE(AVG(rating), 0),
    'total_reviews', COUNT(*),
    'rating_breakdown', json_build_object(
      '5_star', COUNT(*) FILTER (WHERE rating = 5),
      '4_star', COUNT(*) FILTER (WHERE rating = 4),
      '3_star', COUNT(*) FILTER (WHERE rating = 3),
      '2_star', COUNT(*) FILTER (WHERE rating = 2),
      '1_star', COUNT(*) FILTER (WHERE rating = 1)
    )
  ) INTO result
  FROM content_reviews
  WHERE content_id = content_id_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user ratings
CREATE OR REPLACE FUNCTION get_user_rating(user_id_param uuid, review_type_param text)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'average_rating', COALESCE(AVG(rating), 0),
    'total_reviews', COUNT(*),
    'rating_breakdown', json_build_object(
      '5_star', COUNT(*) FILTER (WHERE rating = 5),
      '4_star', COUNT(*) FILTER (WHERE rating = 4),
      '3_star', COUNT(*) FILTER (WHERE rating = 3),
      '2_star', COUNT(*) FILTER (WHERE rating = 2),
      '1_star', COUNT(*) FILTER (WHERE rating = 1)
    )
  ) INTO result
  FROM user_reviews
  WHERE reviewed_user_id = user_id_param 
  AND (review_type_param IS NULL OR review_type = review_type_param);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers to update updated_at
CREATE TRIGGER update_content_reviews_updated_at
  BEFORE UPDATE ON content_reviews
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_reviews_updated_at
  BEFORE UPDATE ON user_reviews
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();