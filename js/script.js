document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Leaflet default marker paths
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });

  // 2. Map Initialization (Centered around Gwanggyo Punggyeongchae Urbanity)
  const isMobile = window.innerWidth <= 768;
  const map = L.map("map", { dragging: !isMobile, scrollWheelZoom: !isMobile }).setView([37.2757148, 127.0714941], 15);

  // 3. Add OpenStreetMap Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
            `,
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
            `,
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
            `,
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
            `,
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
            `,
    },
    {
      name: "광교중흥S클래스",
      lat: 37.28294,
      lng: 127.058387,
      isCenter: false,
      popupContent: `
                <div class="p-1 min-w-[150px]">
                    <h5 class="text-sm font-bold text-slate-800 mb-1">광교중흥S클래스</h5>
                    <p class="text-xs text-gray-600 mb-0.5">입주: <strong class="font-semibold text-gray-800">2019년 5월</strong></p>
                    <p class="text-xs text-gray-600 mb-0.5">평형: <strong class="font-semibold text-gray-800">35평</strong></p>
                    <p class="text-xs text-gray-600">시세: <span class="font-bold text-[#0066cc]">17.6억</span></p>
                </div>
            `,
    },
  ];

  const stations = [
    {
      name: "흥덕역",
      lat: 37.276216566237274,
      lng: 127.07237826190365,
      popupContent: "<b class='text-sm font-bold text-slate-800'>흥덕역 (예정)</b>",
    },
    {
      name: "원천역",
      lat: 37.270776309804106,
      lng: 127.05999314344892,
      popupContent: "<b class='text-sm font-bold text-slate-800'>원천역 (예정)</b>",
    },
  ];

  // Station Custom DivIcon styled with inline utility classes
  const stationIcon = L.divIcon({
    html: `<div class="bg-[#0052A4] text-white text-[15px] font-bold text-center leading-[44px] w-12 h-12 rounded-full border-2 border-white shadow-[0px_1px_5px_rgba(0,0,0,0.4)]">역</div>`,
    className: "custom-station-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  // 5. Register Location Markers
  locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lng]).addTo(map);
    marker.bindPopup(loc.popupContent);
    if (loc.isCenter) {
      marker.openPopup();
    }
  });

  // Register Station Markers
  stations.forEach((station) => {
    const stationMarker = L.marker([station.lat, station.lng], { icon: stationIcon }).addTo(map);
    stationMarker.bindPopup(station.popupContent);
  });

  // --- 공통 터치/마우스 스와이프 등록 헬퍼 함수 (Pointer API 활용) ---
  function enableTouchAndMouseSwipe(trackElement, onSwipeLeft, onSwipeRight) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    const swipeThreshold = 50; // 스와이프로 인식할 최소 거리(px)

    // 데스크탑 브라우저의 기본 이미지 드래깅(고스트 드래그) 현상을 방지
    const images = trackElement.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });

    // 사용자가 잡아서 끌 수 있음을 시각화하기 위해 grab 커서 적용
    trackElement.style.cursor = "grab";

    // 포인터를 누를 때 (터치 시작 및 마우스 클릭 시작 대응)
    trackElement.addEventListener("pointerdown", (e) => {
      // 마우스 오른쪽이나 휠 클릭은 무시하고 왼쪽 클릭만 허용
      if (e.pointerType === "mouse" && e.button !== 0) return;

      startX = e.clientX;
      startY = e.clientY;
      isDragging = true;
      trackElement.style.cursor = "grabbing";

      // 포인터 캡처 설정을 통해 트랙 경계를 벗어나도 드래그 릴리즈가 정상 수신되도록 함
      trackElement.setPointerCapture(e.pointerId);
    });

    // 포인터를 뗄 때 (터치 끝 및 마우스 클릭 해제 대응)
    trackElement.addEventListener("pointerup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      trackElement.style.cursor = "grab";

      try {
        trackElement.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const endX = e.clientX;
      const endY = e.clientY;

      const distanceX = endX - startX;
      const distanceY = endY - startY;

      // 세로 스크롤 움직임보다 가로 드래그 움직임이 지배적일 때만 동작하도록 제어
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (Math.abs(distanceX) > swipeThreshold) {
          if (distanceX > 0) {
            // 오른쪽으로 끌기 -> 이전 슬라이드
            onSwipeRight();
          } else {
            // 왼쪽으로 끌기 -> 다음 슬라이드
            onSwipeLeft();
          }
        }
      }
    });

    // 시스템 중단 이벤트 처리 (알림 팝업 출현 등)
    trackElement.addEventListener("pointercancel", (e) => {
      isDragging = false;
      trackElement.style.cursor = "grab";
      try {
        trackElement.releasePointerCapture(e.pointerId);
      } catch (err) {}
    });
  }

  // --- 캐러셀 제어 로직 ---

  // [캐러셀 1]: 스카이뷰 및 단지도
  let currentSlide1 = 0;
  const track1 = document.getElementById("carousel1-track");
  const dots1 = [document.getElementById("carousel1-dot-0"), document.getElementById("carousel1-dot-1")];

  function updateCarousel1(index) {
    currentSlide1 = index;
    track1.style.transform = `translateX(-${index * 100}%)`;

    // 인디케이터 상태 변경
    dots1.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.replace("bg-slate-300", "bg-slate-800");
      } else {
        dot.classList.replace("bg-slate-800", "bg-slate-300");
      }
    });
  }

  document.getElementById("carousel1-prev").addEventListener("click", () => {
    const nextIndex = currentSlide1 === 0 ? 1 : currentSlide1 - 1;
    updateCarousel1(nextIndex);
  });

  document.getElementById("carousel1-next").addEventListener("click", () => {
    const nextIndex = currentSlide1 === 1 ? 0 : currentSlide1 + 1;
    updateCarousel1(nextIndex);
  });

  dots1.forEach((dot, idx) => {
    dot.addEventListener("click", () => updateCarousel1(idx));
  });

  // 캐러셀 1 데스크탑 & 모바일 통합 스와이프 활성화
  if (track1) {
    enableTouchAndMouseSwipe(
      track1,
      () => {
        // Swipe Left (Next)
        const nextIndex = currentSlide1 === 1 ? 0 : currentSlide1 + 1;
        updateCarousel1(nextIndex);
      },
      () => {
        // Swipe Right (Prev)
        const nextIndex = currentSlide1 === 0 ? 1 : currentSlide1 - 1;
        updateCarousel1(nextIndex);
      },
    );
  }

  // [캐러셀 2]: 시세 지도 및 교통 환경 이미지
  let currentSlide2 = 0;
  const track2 = document.getElementById("carousel2-track");
  const dots2 = [document.getElementById("carousel2-dot-0"), document.getElementById("carousel2-dot-1")];

  function updateCarousel2(index) {
    currentSlide2 = index;
    track2.style.transform = `translateX(-${index * 100}%)`;

    // 인디케이터 상태 변경
    dots2.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.replace("bg-slate-300", "bg-slate-800");
      } else {
        dot.classList.replace("bg-slate-800", "bg-slate-300");
      }
    });

    // 렌더링 검수: 지도가 있는 슬라이드가 노출될 때 Leaflet 레이아웃을 다시 보정합니다.
    if (index === 1) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300); // CSS 트랜지션 완료 이후 재조정 실행
    }
  }

  document.getElementById("carousel2-prev").addEventListener("click", () => {
    const nextIndex = currentSlide2 === 0 ? 1 : currentSlide2 - 1;
    updateCarousel2(nextIndex);
  });

  document.getElementById("carousel2-next").addEventListener("click", () => {
    const nextIndex = currentSlide2 === 1 ? 0 : currentSlide2 + 1;
    updateCarousel2(nextIndex);
  });

  dots2.forEach((dot, idx) => {
    dot.addEventListener("click", () => updateCarousel2(idx));
  });

  // 캐러셀 2 데스크탑 & 모바일 통합 스와이프 활성화
  // (데스크탑 지도 자체는 Leaflet 내부의 이벤트 캡처에 의해 지도 이동 동작이 먼저 우선 적용되고, 그 외 영역 및 다른 슬라이드는 드래그 스와이프가 적용됩니다.)
  if (track2) {
    enableTouchAndMouseSwipe(
      track2,
      () => {
        // Swipe Left (Next)
        const nextIndex = currentSlide2 === 1 ? 0 : currentSlide2 + 1;
        updateCarousel2(nextIndex);
      },
      () => {
        // Swipe Right (Prev)
        const nextIndex = currentSlide2 === 0 ? 1 : currentSlide2 - 1;
        updateCarousel2(nextIndex);
      },
    );
  }

  // --- 이미지 전체화면 모달 제어 로직 ---
  const imageModal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalDownload = document.getElementById("modal-download");
  const closeModal = document.getElementById("close-modal");
  const viewFullButtons = document.querySelectorAll(".view-full-btn");

  // 모달 활성화 여부를 기록할 상태 변수
  let isModalActive = false;

  if (imageModal && modalImg && closeModal) {
    // 모달 열기 함수
    const showFullscreenModal = (imageSource) => {
      modalImg.src = imageSource;
      if (modalDownload) {
        modalDownload.href = imageSource;
      }
      imageModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden"); // 뒷배경 스크롤 방지

      isModalActive = true;
      // 뒤로가기 감지를 위해 브라우저 히스토리에 가상 상태 추가
      history.pushState({ modalOpen: true }, "");
    };

    // 모달 닫기 함수
    // triggerHistoryBack 매개변수로 뒤로가기 이벤트에 의한 종료인지, 일반 클릭 종료인지 구분합니다.
    const hideFullscreenModal = (triggerHistoryBack = true) => {
      imageModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden"); // 뒷배경 스크롤 허용
      modalImg.src = "";

      if (isModalActive) {
        isModalActive = false;
        // 모달의 x 버튼이나 배경을 직접 클릭해서 닫은 경우, 푸시했던 히스토리 상태를 제거합니다.
        if (triggerHistoryBack && history.state && history.state.modalOpen) {
          history.back();
        }
      }
    };

    // 크게 보기 버튼 이벤트 연결
    viewFullButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const imageSource = button.getAttribute("data-src");
        if (imageSource) {
          showFullscreenModal(imageSource);
        }
      });
    });

    // 닫기 버튼 이벤트
    closeModal.addEventListener("click", () => hideFullscreenModal(true));

    // 배경 클릭 시 닫기 이벤트
    imageModal.addEventListener("click", (e) => {
      if (e.target === imageModal || e.target.id === "modal-img-container") {
        hideFullscreenModal(true);
      }
    });

    // 뒤로가기(popstate) 이벤트 감지 및 처리
    window.addEventListener("popstate", (e) => {
      // 모달이 열려 있는 상태에서 뒤로가기 신호가 오면 모달만 닫아줍니다.
      if (isModalActive) {
        hideFullscreenModal(false); // popstate를 통해 히스토리가 이미 돌아갔으므로 history.back()은 생략합니다.
      }
    });
  }
});
