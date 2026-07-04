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

// Fetch IP Address from a free, public API
async function getIpAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (e) {
    console.warn('Could not fetch IP address');
    return 'unknown-ip';
  }
}

async function logVisitor() {
  try {
    // 1. Fetch the raw IP address
    const ipAddress = await getIpAddress();

    // 2. Gather browser attributes for fingerprinting
    const userAgent = navigator.userAgent;
    const language = navigator.language || 'unknown-lang';
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown-tz';

    // 3. Combine variables and generate the fingerprint hash
    const rawDataString = `${ipAddress}|${userAgent}|${language}|${screenResolution}|${timezone}`;
    const fingerprint = await sha256(rawDataString);

    // 4. Insert the record including raw IP and fingerprint
    const { error } = await supabaseClient
      .from('visitor_logs')
      .insert([
        {
          page_path: window.location.pathname,
          referrer: document.referrer || 'Direct',
          user_agent: userAgent,
          fingerprint: fingerprint,
          ip_address: ipAddress // Added the new column here
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