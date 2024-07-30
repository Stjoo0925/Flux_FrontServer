<template>
    <div class="nocontainer">
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
                    <tr v-for="notice in paginatedNotices" :key="notice.noticeId">
                        <th scope="row">{{ notice.noticeId }}</th>
                        <td>{{ notice.noticeTitle }}</td>
                        <td>{{ formatDate(notice.noticeCreateAt) }}</td>
                        <td @click="goToModify(notice.noticeId)" class="modify-cell">수정</td>
                        <td @click="deleteNotice(notice.noticeId)" class="delete-cell">삭제</td>
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
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            notices: [],
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        paginatedNotices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.notices.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.notices.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchNotices() {
            try {
                const response = await axios.get('http://localhost:8080/notification');
                this.notices = response.data;
            } catch (error) {
                console.error('공지 목록을 가져오는데 실패했습니다:', error);
            }
        },
        goToModify(noticeId) {
            this.$router.push(`/manager/notice/noticemodify?id=${noticeId}`);
        },
        async deleteNotice(noticeId) {
            try {
                await axios.delete(`http://localhost:8080/notification/${noticeId}`);
                this.fetchNotices(); // 공지 목록을 다시 가져옵니다.
            } catch (error) {
                console.error('공지 삭제를 실패했습니다:', error);
            }
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
.nocontainer {
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    background-color: #f8f9fa; /* 배경색 설정 (옵션) */
}

.noticeMain {
    max-width: 900px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.noticeSubject {
    text-align: center;
    margin-bottom: 40px; /* 제목과 테이블 사이의 간격을 증가시킴 */
}

.noticeSubject h1 {
    font-size: 2em;
    font-weight: bold;
}

.table {
    width: 100%;
    margin-bottom: 20px;
}

.modify-cell, .delete-cell {
    cursor: pointer;
    color: blue; /* 클릭 가능한 느낌을 주기 위해 색상 변경 */
    text-decoration: underline; /* 클릭 가능한 느낌을 주기 위해 밑줄 추가 */
}

.modify-cell:hover, .delete-cell:hover {
    color: darkblue; /* 호버 시 색상 변경 */
}

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.pagination {
    display: flex;
    gap: 5px; /* 페이지 번호 간격 */
}

.page-link {
    color: black; /* 페이지 링크 색상 */
    border-color: black; /* 페이지 링크 테두리 색상 */
}

.page-link:hover {
    background-color: black; /* 링크 호버시 배경 색상 */
    color: white; /* 링크 호버시 글자 색상 */
}

.page-item.active .page-link {
    background-color: black; /* 현재 페이지 배경 색상 */
    color: white; /* 현재 페이지 글자 색상 */
}
</style>
    