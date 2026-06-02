document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Leaflet default marker paths
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // 2. Map Initialization (Centered around Gwanggyo Punggyeongchae Urbanity)
    const isMobile = window.innerWidth <= 768;
    const map = L.map('map', { dragging: !isMobile, scrollWheelZoom: !isMobile }).setView([37.2757148, 127.0714941], 15);

    // 3. Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 4. Dataset with coordinates and popups using Tailwind utility styles
    const locations = [
        {
            name: "광교풍경채어바니티",
            lat: 37.270702,
            lng: 127.070723,
            isCenter: true,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교풍경채어바니티</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2023년 10월</strong></p>
                    <p class="text-xs text-gray-600">평형: <strong class="font-semibold text-gray-800">34평 / 41평</strong></p>
                    <span class="inline-block bg-[#e84118] text-white text-[10px] px-1.5 py-0.5 rounded mt-1.5 font-bold">기준 단지</span>
                </div>
            `
        },
        {
            name: "광교호반베르디움",
            lat: 37.272663,
            lng: 127.0563607,
            isCenter: false,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교호반베르디움</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2014년 6월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">34평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">12.9억</span></p>
                </div>
            `
        },        
        {
            name: "광교아이파크",
            lat: 37.274087,
            lng: 127.061219,
            isCenter: false,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교아이파크</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2018년 9월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">38평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">15.2억</span></p>
                </div>
            `
        },
        {
            name: "광교더샵",
            lat: 37.271696,
            lng: 127.061016,
            isCenter: false,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교더샵</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2018년 8월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">37평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">13.4억</span></p>
                </div>
            `
        },
        {
            name: "영흥숲푸르지오파크비엔",
            lat: 37.2636399,
            lng: 127.06768,
            isCenter: false,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">영흥숲푸르지오파크비엔</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2023년 6월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">33평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">10억</span></p>
                </div>
            `
        },
        {
            name: "광교중흥S클래스",
            lat: 37.282940,
            lng: 127.058387,
            isCenter: false,
            popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교중흥S클래스</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2019년 5월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">35평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">17.6억</span></p>
                </div>
            `
        }
    ];

    const stations = [
        {
            name: "흥덕역",
            lat: 37.276216566237274,
            lng: 127.07237826190365,
            popupContent: "<b class='text-sm font-bold text-slate-800'>흥덕역 (예정)</b>"
        },
        {
            name: "원천역",
            lat: 37.270776309804106,
            lng: 127.05999314344892,
            popupContent: "<b class='text-sm font-bold text-slate-800'>원천역 (예정)</b>"
        }
    ];

    // Station Custom DivIcon styled with inline utility classes
    const stationIcon = L.divIcon({
        html: `<div class="bg-[#0052A4] text-white text-[15px] font-bold text-center leading-[44px] w-12 h-12 rounded-full border-2 border-white shadow-[0px_1px_5px_rgba(0,0,0,0.4)]">역</div>`,
        className: 'custom-station-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });    

    // 5. Register Location Markers
    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);
        marker.bindPopup(loc.popupContent);
        if (loc.isCenter) {
            marker.openPopup();
        }
    });

    // Register Station Markers
    stations.forEach(station => {
        const stationMarker = L.marker([station.lat, station.lng], { icon: stationIcon }).addTo(map);
        stationMarker.bindPopup(station.popupContent);
    });    

    // --- 캐러셀 제어 로직 ---

    // [캐러셀 1]: 스카이뷰 및 단지도
    let currentSlide1 = 0;
    const track1 = document.getElementById('carousel1-track');
    const dots1 = [
        document.getElementById('carousel1-dot-0'),
        document.getElementById('carousel1-dot-1')
    ];

    function updateCarousel1(index) {
        currentSlide1 = index;
        track1.style.transform = `translateX(-${index * 100}%)`;
        
        // 인디케이터 상태 변경
        dots1.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.replace('bg-slate-300', 'bg-slate-800');
            } else {
                dot.classList.replace('bg-slate-800', 'bg-slate-300');
            }
        });
    }

    document.getElementById('carousel1-prev').addEventListener('click', () => {
        const nextIndex = currentSlide1 === 0 ? 1 : currentSlide1 - 1;
        updateCarousel1(nextIndex);
    });

    document.getElementById('carousel1-next').addEventListener('click', () => {
        const nextIndex = currentSlide1 === 1 ? 0 : currentSlide1 + 1;
        updateCarousel1(nextIndex);
    });

    dots1.forEach((dot, idx) => {
        dot.addEventListener('click', () => updateCarousel1(idx));
    });


    // [캐러셀 2]: 시세 지도 및 교통 환경 이미지
    let currentSlide2 = 0;
    const track2 = document.getElementById('carousel2-track');
    const dots2 = [
        document.getElementById('carousel2-dot-0'),
        document.getElementById('carousel2-dot-1')
    ];

    function updateCarousel2(index) {
        currentSlide2 = index;
        track2.style.transform = `translateX(-${index * 100}%)`;
        
        // 인디케이터 상태 변경
        dots2.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.replace('bg-slate-300', 'bg-slate-800');
            } else {
                dot.classList.replace('bg-slate-800', 'bg-slate-300');
            }
        });

        // 렌더링 검수: 지도가 있는 슬라이드가 노출될 때 Leaflet 레이아웃을 다시 보정합니다.
        if (index === 1) {
            setTimeout(() => {
                map.invalidateSize();
            }, 300); // CSS 트랜지션 완료 이후 재조정 실행
        }
    }

    document.getElementById('carousel2-prev').addEventListener('click', () => {
        const nextIndex = currentSlide2 === 0 ? 1 : currentSlide2 - 1;
        updateCarousel2(nextIndex);
    });

    document.getElementById('carousel2-next').addEventListener('click', () => {
        const nextIndex = currentSlide2 === 1 ? 0 : currentSlide2 + 1;
        updateCarousel2(nextIndex);
    });

    dots2.forEach((dot, idx) => {
        dot.addEventListener('click', () => updateCarousel2(idx));
    });

    // --- 이미지 전체화면 모달 제어 로직 ---
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalDownload = document.getElementById('modal-download');
    const closeModal = document.getElementById('close-modal');
    const viewFullButtons = document.querySelectorAll('.view-full-btn');

    if (imageModal && modalImg && closeModal) {
        // 모달 열기
        viewFullButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const imageSource = button.getAttribute('data-src');
                if (imageSource) {
                    modalImg.src = imageSource;
                    if (modalDownload) {
                        modalDownload.href = imageSource;
                    }
                    imageModal.classList.remove('hidden');
                    document.body.classList.add('overflow-hidden'); // 뒷배경 스크롤 방지
                }
            });
        });

        // 모달 닫기 함수
        const hideFullscreenModal = () => {
            imageModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden'); // 뒷배경 스크롤 허용
            modalImg.src = '';
        };

        closeModal.addEventListener('click', hideFullscreenModal);

        // 이미지 외 바깥 영역 터치시 모달 닫기
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal || e.target.id === 'modal-img-container') {
                hideFullscreenModal();
            }
        });
    }
});