import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://utyofopybhppcsfbgcmz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eW9mb3B5YmhwcGNzZmJnY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTg2NjAsImV4cCI6MjA1OTA5NDY2MH0.45AlFbu-SWREMAX1o3ysE9oxWYBHV4OzURskHXzIDqQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
