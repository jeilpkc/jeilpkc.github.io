const SUPABASE_URL = 'https://idwgqfdixjfssloonyii.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FShlMYhEQFhtseSO7Eroew_2dXcp9Bp';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function logVisitor() {
try {
    const { error } = await supabaseClient
    .from('visitor_logs')
    .insert([
        {
        page_path: window.location.pathname,
        referrer: document.referrer || 'Direct',
        user_agent: navigator.userAgent
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