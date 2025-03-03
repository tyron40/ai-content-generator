/*
  # Create contents table and security policies

  1. New Tables
    - `contents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `content` (text)
      - `type` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `contents` table
    - Add policies for authenticated users to:
      - Select their own content
      - Insert their own content
      - Update their own content
      - Delete their own content
*/

CREATE TABLE IF NOT EXISTS contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own content
CREATE POLICY "Users can read own content"
  ON contents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own content
CREATE POLICY "Users can insert own content"
  ON contents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own content
CREATE POLICY "Users can update own content"
  ON contents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to delete their own content
CREATE POLICY "Users can delete own content"
  ON contents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);