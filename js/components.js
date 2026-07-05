/**
 * Common components for the website to maintain DRY principle.
 */

const COMPONENTS = {
  header: `
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <a href="index.html" class="hover:opacity-80 transition duration-200">
          <h1 class="text-xl font-bold text-slate-800">광교풍경채 <span class="text-[#0066cc] text-lg">어바니티</span></h1>
        </a>
        <nav>
          <ul id="main-nav" class="flex gap-5 flex-wrap justify-center">
            <li><a href="index.html" data-nav="index" class="text-sm font-medium text-gray-600 hover:text-[#0066cc] transition">소개</a></li>
            <li><a href="faq.html" data-nav="faq" class="text-sm font-medium text-gray-600 hover:text-[#0066cc] transition">FAQ</a></li>
            <li><a href="map.html" data-nav="map" class="text-sm font-medium text-gray-600 hover:text-[#0066cc] transition">지도</a></li>
            <li><a href="community.html" data-nav="community" class="text-sm font-medium text-gray-600 hover:text-[#0066cc] transition">커뮤니티</a></li>
            <li><a href="kakao.html" data-nav="kakao" class="text-sm font-medium text-gray-600 hover:text-[#0066cc] transition">카톡방</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  footer: `
    <footer class="bg-slate-800 text-slate-400 py-10 px-4 text-center text-sm mt-auto">
      <div class="max-w-5xl mx-auto">
        <p>&copy; 2026 광교풍경채 투명공유방. All rights reserved.</p>
        <p class="text-xs text-slate-500 mt-4 leading-relaxed max-w-3xl mx-auto opacity-70">
          본 사이트는 공식 입주자대표회의와 무관하며, 투명한 정보 공유와 이웃 간 자발적인 주거 환경 개선 제안을 돕기 위해 운영됩니다.
        </p>
      </div>
    </footer>
  `,
  desktopBanners: `
    <!-- Desktop Left Banner -->
    <aside
      class="hidden xl:flex fixed left-[15px] 2xl:left-[calc(50%-840px)] top-28 w-[120px] 2xl:w-[160px] h-[660px] bg-slate-100 border border-dashed border-slate-300 rounded-lg shadow-sm z-40 items-center justify-center p-2 text-center">
      <a href="https://open.kakao.com/o/pOlGIDvi" class="w-full h-full flex flex-col justify-center items-center gap-2" target="_blank">
        <img src="assets/banner-desktop-kakao-open.svg" alt="좌측배너" class="w-full h-full object-cover rounded hidden"
          onload="this.classList.remove('hidden'); this.nextElementSibling.style.display='none';"
          onerror="this.style.display='none';">
        <div class="flex flex-col items-center justify-center text-slate-400">
          <span class="text-xl mb-1">📢</span>
          <span class="text-xs font-semibold">광교풍경채<br>투명공유방</span>
          <span class="text-[10px] text-slate-400 mt-1">좌측</span>
        </div>
      </a>
    </aside>

    <!-- Desktop Right Banner -->
    <aside
      class="hidden xl:flex fixed right-[15px] 2xl:right-[calc(50%-840px)] top-28 w-[120px] 2xl:w-[160px] h-[660px] bg-slate-100 border border-dashed border-slate-300 rounded-lg shadow-sm z-40 items-center justify-center p-2 text-center">
      <a href="https://forms.gle/7jatoLRCiNjXbVPb7" class="w-full h-full flex flex-col justify-center items-center gap-2" target="_blank">
        <img src="assets/banner-desktop-ad-request.svg" alt="우측배너" class="w-full h-full object-cover rounded hidden"
          onload="this.classList.remove('hidden'); this.nextElementSibling.style.display='none';"
          onerror="this.style.display='none';">
        <div class="flex flex-col items-center justify-center text-slate-400">
          <span class="text-xl mb-1">📢</span>
          <span class="text-xs font-semibold">광교풍경채<br>투명공유방</span>
          <span class="text-[10px] text-slate-400 mt-1">우측</span>
        </div>
      </a>
    </aside>
  `,
  mobileBannerTypeOne: `
    <div class="xl:hidden bg-slate-100 border-y border-gray-200 py-3 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <a href="https://open.kakao.com/o/pOlGIDvi"
          class="relative flex items-center justify-center min-h-[100px] bg-white hover:bg-gray-50 border border-dashed border-gray-300 rounded-lg overflow-hidden transition" target="_blank">
          <img src="assets/banner-mobile-kakao-open.svg" alt="광고 영역"
            class="w-full h-auto max-h-[100px] rounded mx-auto object-cover hidden" 
            onload="this.classList.remove('hidden'); this.nextElementSibling.style.display='none';"
            onerror="this.style.display='none';">
          <span class="block text-xs text-slate-400 font-semibold">📢<br>광교풍경채<br>투명공유방</span>
        </a>
      </div>
    </div>
  `,
  mobileBannerTypeTwo: `
    <div class="xl:hidden bg-slate-100 border-y border-gray-200 py-3 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <a href="https://forms.gle/7jatoLRCiNjXbVPb7"
          class="relative flex items-center justify-center min-h-[100px] bg-white hover:bg-gray-50 border border-dashed border-gray-300 rounded-lg overflow-hidden transition" target="_blank">
          <img src="assets/banner-mobile-ad-request.svg" alt="광고 영역"
            class="w-full h-auto max-h-[100px] rounded mx-auto object-cover hidden" 
            onload="this.classList.remove('hidden'); this.nextElementSibling.style.display='none';"
            onerror="this.style.display='none';">
          <span class="block text-xs text-slate-400 font-semibold">📢<br>광교풍경채<br>투명공유방</span>
        </a>
      </div>
    </div>
  `
};

function initLayout() {
  // Inject Desktop Banners
  document.body.insertAdjacentHTML('afterbegin', COMPONENTS.desktopBanners);

  // Inject Header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = COMPONENTS.header;
  }

  // Inject Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = COMPONENTS.footer;
  }

  // Inject All Mobile Banners
  const mobileBannerPlaceholders = document.querySelectorAll('[id^="mobile-banner-"]');
  mobileBannerPlaceholders.forEach(placeholder => {
    if (placeholder.id === 'mobile-banner-2') {
      placeholder.outerHTML = COMPONENTS.mobileBannerTypeTwo;
    } else {
      placeholder.outerHTML = COMPONENTS.mobileBannerTypeOne;
    }
  });

  // Handle Active Navigation
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('#main-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (path === '/' && href === 'index.html')) {
      link.classList.add('text-[#0066cc]', 'font-semibold');
      link.classList.remove('text-gray-600', 'font-medium');
    } else {
      link.classList.add('text-gray-600', 'font-medium');
      link.classList.remove('text-[#0066cc]', 'font-semibold');
    }
  });
}

document.addEventListener('DOMContentLoaded', initLayout);
