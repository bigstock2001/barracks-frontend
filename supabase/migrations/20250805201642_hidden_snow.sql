/*
  # Create messaging system with mutual matching

  1. New Tables
    - `show_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `show_name` (text)
      - `show_description` (text)
      - `host_name` (text)
      - `audience_size` (text)
      - `show_format` (text)
      - `topics` (text array)
      - `booking_email` (text)
      - `website` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `guest_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `public_display_name` (text)
      - `headline` (text)
      - `bio` (text)
      - `speaking_topics` (text array)
      - `location` (text)
      - `profile_picture_url` (text)
      - `website` (text)
      - `social_links` (jsonb)
      - `availability_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `connection_requests`
      - `id` (uuid, primary key)
      - `requester_id` (uuid, references auth.users)
      - `recipient_id` (uuid, references auth.users)
      - `requester_type` (text) -- 'guest' or 'podcaster'
      - `status` (text) -- 'pending', 'matched', 'declined'
      - `initial_message` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `connection_id` (uuid, references connection_requests)
      - `sender_id` (uuid, references auth.users)
      - `message_content` (text)
      - `sent_at` (timestamp)
      - `read_at` (timestamp, nullable)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Add policies for matched connections to message
*/

-- Create show profiles table
CREATE TABLE IF NOT EXISTS show_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  show_name text NOT NULL,
  show_description text,
  host_name text NOT NULL,
  audience_size text,
  show_format text,
  topics text[] DEFAULT '{}',
  booking_email text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create guest profiles table
CREATE TABLE IF NOT EXISTS guest_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  public_display_name text,
  headline text,
  bio text,
  speaking_topics text[] DEFAULT '{}',
  location text,
  profile_picture_url text,
  website text,
  social_links jsonb DEFAULT '{}',
  availability_status text DEFAULT 'available' CHECK (availability_status IN ('available', 'limited', 'unavailable')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create connection requests table
CREATE TABLE IF NOT EXISTS connection_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  requester_type text NOT NULL CHECK (requester_type IN ('guest', 'podcaster')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'declined')),
  initial_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, recipient_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid REFERENCES connection_requests(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_content text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Enable RLS
ALTER TABLE show_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Show profiles policies
CREATE POLICY "Users can read all show profiles"
  ON show_profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can manage own show profile"
  ON show_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Guest profiles policies
CREATE POLICY "Users can read all guest profiles"
  ON guest_profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can manage own guest profile"
  ON guest_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Connection requests policies
CREATE POLICY "Users can read own connection requests"
  ON connection_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create connection requests"
  ON connection_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Recipients can update connection requests"
  ON connection_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Messages policies
CREATE POLICY "Users can read messages in matched connections"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM connection_requests cr
      WHERE cr.id = connection_id
      AND cr.status = 'matched'
      AND (cr.requester_id = auth.uid() OR cr.recipient_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in matched connections"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM connection_requests cr
      WHERE cr.id = connection_id
      AND cr.status = 'matched'
      AND (cr.requester_id = auth.uid() OR cr.recipient_id = auth.uid())
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at
CREATE TRIGGER update_show_profiles_updated_at
  BEFORE UPDATE ON show_profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_guest_profiles_updated_at
  BEFORE UPDATE ON guest_profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_connection_requests_updated_at
  BEFORE UPDATE ON connection_requests
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();