const SUPABASE_URL = 'https://idwgqfdixjfssloonyii.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FShlMYhEQFhtseSO7Eroew_2dXcp9Bp';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to generate a SHA-256 hash using native browser APIs
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Gathers visitor details and generates a unique fingerprint
async function getVisitorFingerprint() {
  let ipAddress = 'unknown-ip';
  
  // Fetch IP Address from a free, public API
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ipAddress = data.ip;
  } catch (e) {
    console.warn('Could not fetch IP address, using fallback components.');
  }

  // Gather browser attributes
  const userAgent = navigator.userAgent;
  const language = navigator.language || 'unknown-lang';
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown-tz';

  // Combine variables into a single raw string
  const rawDataString = `${ipAddress}|${userAgent}|${language}|${screenResolution}|${timezone}`;

  // Hash the combined string to anonymize the raw data
  const hash = await sha256(rawDataString);
  return hash;
}

async function logVisitor() {
  try {
    // Generate the unique fingerprint first
    const fingerprint = await getVisitorFingerprint();

    // Insert the record including the fingerprint
    const { error } = await supabaseClient
      .from('visitor_logs')
      .insert([
        {
          page_path: window.location.pathname,
          referrer: document.referrer || 'Direct',
          user_agent: navigator.userAgent,
          fingerprint: fingerprint
        }
      ]);

    if (error) {
      console.error('Error logging visit:', error);
    }
  } catch (err) {
    console.error('Failed to connect to log service:', err);
  }
}

// Run the logger when the page loads
window.addEventListener('DOMContentLoaded', logVisitor);