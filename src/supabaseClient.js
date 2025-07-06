import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whhdbxofmgurlcorzspp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoaGRieG9mbWd1cmxjb3J6c3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjE5NjAsImV4cCI6MjA2NzIzNzk2MH0.XUZzSkUdhAdUEvpwaJ71iBW39RRokdFLcAz4845subI'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
