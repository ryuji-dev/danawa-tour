document.addEventListener('DOMContentLoaded', function() {
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const searchForm = document.querySelector('.search-form');

    // 탭 기능 추가
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 탭 콘텐츠 숨기기
            tabContents.forEach(content => {
                content.style.display = 'none';
            });

            // 클릭한 탭에 해당하는 콘텐츠 표시
            const targetContent = document.querySelector(`.tab-content[data-content="${tab.dataset.tab}"]`);
            if (targetContent) {
                targetContent.style.display = 'flex';
            }

            // 모든 탭에서 selected 클래스 제거
            tabs.forEach(t => t.classList.remove('selected'));

            // 클릭한 탭에 selected 클래스 추가
            tab.classList.add('selected');
        });
    });

    // 오늘 날짜를 기준으로 과거 날짜 선택을 제한합니다
    const today = new Date().toISOString().split('T')[0];
    startDate.min = today;
    endDate.min = today;

    // 출발일이 변경될 때
    startDate.addEventListener('change', function() {
        // 도착일은 출발일 이후로만 선택 가능하게 설정
        endDate.min = startDate.value;
        
        // 도착일이 출발일보다 빠르면 도착일을 초기화
        if (endDate.value && endDate.value < startDate.value) {
            endDate.value = '';
            alert('도착일은 출발일 이후여야 합니다.');
        }
    });

    // 도착일이 변경될 때
    endDate.addEventListener('change', function() {
        if (startDate.value && endDate.value) {
            const duration = calculateDuration();
            alert(`선택하신 여행 기간은 ${duration}일입니다.`);
        }
    });

    // 폼 제출 시
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 기본 제출 동작 방지
        
        if (!startDate.value || !endDate.value) {
            alert('출발일과 도착일을 모두 선택해주세요.');
            return;
        }

        const duration = calculateDuration();
        if (duration > 30) {
            alert('30일 이상의 여행은 예약할 수 없습니다.');
            return;
        }

        // 여기에 실제 검색 로직 추가
        console.log('검색 시작:', {
            출발일: startDate.value,
            도착일: endDate.value,
            여행기간: duration + '일'
        });

        // 모든 조건이 충족되면 폼을 제출합니다
        this.submit();
    });

    // 날짜 차이 계산 함수
    function calculateDuration() {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return duration;
    }
});