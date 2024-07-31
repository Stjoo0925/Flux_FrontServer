<template>
    <div class="notice-page-container">
        <div v-if="!selectedNoticeId">
            <!-- 목록 보기 -->
            <div class="noticeMain">
                <div class="noticeSubject">
                    <h1>공지 목록</h1>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">공지 코드</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성 날짜</th>
                            <th scope="col">수정</th>
                            <th scope="col">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="notification in paginatedNotices" :key="notification.noticeId">
                            <th scope="row">{{ notification.noticeId }}</th>
                            <td @click="selectNotice(notification.noticeId)" class="clickable-cell">{{ notification.noticeTitle }}</td>
                            <td>{{ formatDate(notification.noticeCreateAt) }}</td>
                            <td @click="goToModify(notification.noticeId)" class="modify-cell">수정</td>
                            <td @click="deleteNotice(notification.noticeId)" class="delete-cell">삭제</td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" class="pagination-container">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div v-else>
            <!-- 세부 사항 보기 -->
            <div class="notice-detail-container">
                <div class="detail-header">
                    <h1>{{ selectedNotice.noticeTitle }}</h1>
                </div>
                <div class="detail-content">
                    <p><strong>작성 날짜:</strong> {{ formatDate(selectedNotice.noticeCreateAt) }}</p>
                    <p>{{ selectedNotice.noticeContent }}</p>
                </div>
                <div class="button-group">
                    <button 
                        type="button" 
                        class="btn btn-outline-primary" 
                        @click="clearSelection"
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            notifications: [],
            selectedNoticeId: null,
            selectedNotice: null,
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        paginatedNotices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.notifications.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.notifications.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchNotices() {
            try {
                const response = await axios.get('http://localhost:8080/notification');
                this.notifications = response.data;
            } catch (error) {
                console.error('공지 목록을 가져오는데 실패했습니다:', error);
            }
        },
        async fetchNotice(noticeId) {
            try {
                const response = await axios.get(`http://localhost:8080/notification/${noticeId}`);
                this.selectedNotice = response.data;
            } catch (error) {
                console.error('공지 상세 정보를 가져오는데 실패했습니다:', error);
            }
        },
        selectNotice(noticeId) {
            this.selectedNoticeId = noticeId;
            this.fetchNotice(noticeId);
        },
        clearSelection() {
            this.selectedNoticeId = null;
            this.selectedNotice = null;
        },
        async deleteNotice(noticeId) {
            try {
                await axios.delete(`http://localhost:8080/notification/${noticeId}`);
                this.fetchNotices(); // 공지 목록을 다시 가져옵니다.
            } catch (error) {
                console.error('공지 삭제를 실패했습니다:', error);
            }
        },
        goToModify(noticeId) {
            this.$router.push(`/manager/notice/noticemodify?id=${noticeId}`);
        },
        formatDate(date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    },
    mounted() {
        this.fetchNotices();
    }
};
</script>

<style scoped>
.notice-page-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto; /* 중앙 정렬 */
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin-top: 20px; /* 상단 여백 추가 */
}

.noticeMain,
.notice-detail-container {
    margin-bottom: 20px;
}

.noticeSubject {
    text-align: center;
    margin-bottom: 20px;
}

.noticeSubject h1 {
    font-size: 2em;
    font-weight: bold;
}

.table {
    width: 100%;
}

.clickable-cell {
    cursor: pointer;
    color: #007bff; /* 클릭 가능한 느낌을 주기 위해 색상 변경 */
    text-decoration: underline; /* 클릭 가능한 느낌을 주기 위해 밑줄 추가 */
}

.clickable-cell:hover {
    color: #0056b3; /* 호버 시 색상 변경 */
}

.modify-cell, .delete-cell {
    cursor: pointer;
    color: #007bff; /* 클릭 가능한 느낌을 주기 위해 색상 변경 */
    text-decoration: underline; /* 클릭 가능한 느낌을 주기 위해 밑줄 추가 */
}

.modify-cell:hover, .delete-cell:hover {
    color: #0056b3; /* 호버 시 색상 변경 */
}

.pagination-container {
    display: flex;
    justify-content: center; /* 페이지네이션을 중앙 정렬 */
}

.pagination {
    display: flex;
    gap: 5px; /* 페이지 번호 간격 */
}

.page-link {
    color: #007bff; /* 페이지 링크 색상 */
    border-color: #007bff; /* 페이지 링크 테두리 색상 */
}

.page-link:hover {
    background-color: #007bff; /* 링크 호버 시 배경 색상 */
    color: white; /* 링크 호버 시 글자 색상 */
}

.page-item.active .page-link {
    background-color: #007bff; /* 현재 페이지 배경 색상 */
    color: white; /* 현재 페이지 글자 색상 */
}

.notice-detail-container {
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}

.detail-header {
    text-align: center;
    margin-bottom: 20px;
}

.detail-header h1 {
    font-size: 2em;
    font-weight: bold;
}

.detail-content {
    margin-bottom: 20px;
}

.detail-content p {
    margin: 10px 0;
}

.button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.button-group .btn {
    min-width: 100px;
    padding: 10px 20px;
    font-size: 1em;
}
</style>
