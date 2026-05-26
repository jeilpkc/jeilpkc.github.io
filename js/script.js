document.addEventListener('DOMContentLoaded', () => {
    // 1. Leaflet 기본 마커 이미지 경로 오류 방지용 설정
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // 2. 지도 초기화 및 기본 위치 설정 (광교풍경채어바니티 부근 중심)
    // 위도: 37.2715, 경도: 127.0655 / 확대 배율: 15
    const isMobile = window.innerWidth <= 768;
    const map = L.map('map', { dragging: !isMobile, scrollWheelZoom: !isMobile }).setView([37.2757148, 127.0714941], 15);

    // 3. OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 4. 단지별 위·경도 좌표 및 시세 정보 데이터 정의
    const locations = [
        {
            name: "광교풍경채어바니티",
            lat: 37.270702,
            lng: 127.070723,
            isCenter: true,
            popupContent: `
                <div class="map-popup">
                    <h5>광교풍경채어바니티</h5>
                    <p>입주: <strong>2023년 10월</strong></p>
                    <p>평형: <strong>34평 / 41평</strong></p>
                    <span class="center-tag">기준 단지</span>
                </div>
            `
        },
        {
            name: "광교호반베르디움",
            lat: 37.272663,
            lng: 127.0563607,
            isCenter: false,
            popupContent: `
                <div class="map-popup">
                    <h5>광교호반베르디움</h5>
                    <p>입주: <strong>2014년 6월</strong></p>
                    <p>평형: <strong>34평</strong></p>
                    <p>시세: <span class="price">12.9억</span></p>
                </div>
            `
        },        
        {
            name: "광교아이파크",
            lat: 37.274087,
            lng: 127.061219,
            isCenter: false,
            popupContent: `
                <div class="map-popup">
                    <h5>광교아이파크</h5>
                    <p>입주: <strong>2018년 9월</strong></p>
                    <p>평형: <strong>38평</strong></p>
                    <p>시세: <span class="price">15.2억</span></p>
                </div>
            `
        },
        {
            name: "광교더샵",
            lat: 37.271696,
            lng: 127.061016,
            isCenter: false,
            popupContent: `
                <div class="map-popup">
                    <h5>광교더샵</h5>
                    <p>입주: <strong>2018년 8월</strong></p>
                    <p>평형: <strong>37평</strong></p>
                    <p>시세: <span class="price">13.4억</span></p>
                </div>
            `
        },
        {
            name: "영흥숲푸르지오파크비엔",
            lat: 37.2636399,
            lng: 127.06768,
            isCenter: false,
            popupContent: `
                <div class="map-popup">
                    <h5>영흥숲푸르지오파크비엔</h5>
                    <p>입주: <strong>2023년 6월</strong></p>
                    <p>평형: <strong>33평</strong></p>
                    <p>시세: <span class="price">10억</span></p>
                </div>
            `
        },
        {
            name: "광교중흥S클래스",
            lat: 37.282940,
            lng: 127.058387,
            isCenter: false,
            popupContent: `
                <div class="map-popup">
                    <h5>광교중흥S클래스</h5>
                    <p>입주: <strong>2019년 5월</strong></p>
                    <p>평형: <strong>35평</strong></p>
                    <p>시세: <span class="price">17.6억</span></p>
                </div>
            `
        }
    ];

    const stations = [
        {
            name: "흥덕역",
            lat: 37.276216566237274,
            lng: 127.07237826190365,
            popupContent: "<b>흥덕역 (예정)</b>"
        },
        {
            name: "원천역",
            lat: 37.270776309804106,
            lng: 127.05999314344892,
            popupContent: "<b>원천역 (예정)</b>"
        }
    ];

    const stationIcon = L.divIcon({
        html: `<div style="
            background-color: #0052A4; 
            color: white; 
            font-size: 25px; 
            font-weight: bold; 
            text-align: center; 
            line-height: 44px; 
            width: 48px; 
            height: 48px; 
            border-radius: 50%; 
            border: 2px solid white; 
            box-shadow: 0px 1px 5px rgba(0,0,0,0.4);
        ">역</div>`,
        className: 'custom-station-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });    

    // 5. 지도에 마커 등록 및 팝업 연결
    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);
        marker.bindPopup(loc.popupContent);
        if (loc.isCenter) {
            marker.openPopup();
        }
    });

    // 지도에 역 마커 등록 및 팝업 연결
    stations.forEach(station => {
        const stationMarker = L.marker([station.lat, station.lng], { icon: stationIcon }).addTo(map);
        stationMarker.bindPopup(station.popupContent);
    });    
});