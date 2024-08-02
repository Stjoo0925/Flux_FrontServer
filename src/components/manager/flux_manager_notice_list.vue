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
                        <tr v-for="(notice, index) in noticeList" :key="index">
                            <td>{{ notice.noticeId }}</td>
                            <td>
                                <a href="javascript:void(0);" @click="goToDetail(notice.noticeId)">{{ notice.noticeTitle }}</a>
                            </td>
                            <td>{{ formatDate(notice.noticeCreateAt) }}</td>
                            <td>
                                <button @click="goToEditNotice(notice.noticeId)" class="btn btn-warning btn-sm">수정</button>
                            </td>
                            <td>
                                <button @click="deleteNotice(notice.noticeId)" class="btn btn-danger btn-sm">삭제</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="noticeWriteButton">
                    <router-link to="/manager/notice/noticewrite">
                        <button class="btn btn-primary">공지 작성</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <!-- 상세 보기 -->
            <div class="noticeDetail">
                <h2>{{ selectedNotice.noticeTitle }}</h2>
                <p>{{ selectedNotice.noticeContent }}</p>
                <button @click="selectedNoticeId = null" class="btn btn-secondary">목록으로 돌아가기</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            noticeList: [],
            selectedNoticeId: null,
            selectedNotice: null,
        };
    },
    mounted() {
        this.fetchNotices();
    },
    methods: {
    async fetchNotices() {
        try {
            const response = await axios.get('/api/notification');
            this.noticeList = response.data;
        } catch (error) {
            console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다!', error);
        }
    },

    async deleteNotice(noticeId) {
        try {
            await axios.delete(`/api/notification/${noticeId}`);
            this.fetchNotices();
        } catch (error) {
            console.error('공지사항을 삭제하는 중 오류가 발생했습니다!', error);
        }
    },
        goToEditNotice(noticeId) {
            this.$router.push({ path: '/manager/notice/noticeedit', query: { id: noticeId } });
        },
        async deleteNotice(noticeId) {
            try {
                await axios.delete(`/api/notification/${noticeId}`);
                this.fetchNotices();
            } catch (error) {
                console.error('공지사항을 삭제하는 중 오류가 발생했습니다!', error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
    },
};
</script>

<style scoped>
.notice-page-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin-top: 40px;
}

.noticeSubject {
    text-align: center;
    margin-bottom: 20px;
}

h1 {
    font-size: 2em;
    font-weight: bold;
}

.noticeMain {
    width: 100%;
}

.table {
    width: 100%;
    margin-bottom: 20px;
}

.noticeWriteButton {
    text-align: right;
}

.noticeDetail {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin-top: 40px;
    text-align: center;
}

.noticeDetail h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
}

.noticeDetail p {
    font-size: 1em;
    margin-bottom: 20px;
}
</style>
