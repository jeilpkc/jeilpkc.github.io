document.addEventListener('DOMContentLoaded', () => {
    const suggestionForm = document.getElementById('suggestion-form');
    const commentList = document.getElementById('comment-list');
    const commentCount = document.getElementById('comment-count');

    // 로컬 스토리지에서 의견 데이터 불러오기
    let suggestions = JSON.parse(localStorage.getItem('neighborhoodSuggestions')) || [];

    // 의견 렌더링 함수
    function renderSuggestions() {
        commentList.innerHTML = '';
        commentCount.textContent = suggestions.length;

        if (suggestions.length === 0) {
            commentList.innerHTML = '<p style="text-align:center; color:#868e96; padding: 20px 0;">작성된 의견이 아직 없습니다. 첫 제안을 남겨주세요!</p>';
            return;
        }

        suggestions.forEach((item, index) => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            
            commentItem.innerHTML = `
                <div class="meta">
                    <span>${escapeHTML(item.name)} <span style="font-weight:normal; color:#868e96; margin-left:10px;">${item.date}</span></span>
                    <button class="delete-btn" data-index="${index}">삭제</button>
                </div>
                <div class="text">${escapeHTML(item.comment)}</div>
            `;
            commentList.appendChild(commentItem);
        });

        // 삭제 버튼 이벤트 바인딩
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteSuggestion);
        });
    }

    // HTML escape 처리 (보안 대책)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // 의견 제출 이벤트 처리
    suggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('user-name');
        const commentInput = document.getElementById('user-comment');

        const newSuggestion = {
            name: nameInput.value.trim(),
            comment: commentInput.value.trim(),
            date: new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        suggestions.unshift(newSuggestion); // 새로운 제안을 배열 맨 앞에 추가
        localStorage.setItem('neighborhoodSuggestions', JSON.stringify(suggestions));

        // 입력 폼 초기화
        nameInput.value = '';
        commentInput.value = '';

        renderSuggestions();
    });

    // 의견 삭제 처리
    function deleteSuggestion(e) {
        const index = e.target.getAttribute('data-index');
        const passwordCheck = confirm("이 제안을 정말로 삭제하시겠습니까?");
        
        if (passwordCheck) {
            suggestions.splice(index, 1);
            localStorage.setItem('neighborhoodSuggestions', JSON.stringify(suggestions));
            renderSuggestions();
        }
    }

    // 초기 화면 구성
    renderSuggestions();
});