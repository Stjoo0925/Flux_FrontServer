<template>
    <div class="noticeEditContainer">
        <div class="editsubject">
            <h1>공지 수정</h1>
        </div>
        <div class="mb-3">
            <label for="noticeTitle" class="form-label">공지 제목</label>
            <input
                type="text"
                class="form-control"
                id="noticeTitle"
                v-model="noticeTitle"
                :placeholder="noticeTitle"/>
        </div>
        <div class="mb-3">
            <label for="noticeContent" class="form-label">공지 사항</label>
            <textarea
                class="form-control"
                id="noticeContent"
                rows="3"
                v-model="noticeContent"
                :placeholder="noticeContent"></textarea>
        </div>
        <div class="buttongroup">
            <button type="button" class="btn btn-outline-success" @click="updateNotice">
                수정
            </button>
            <button type="button" class="btn btn-outline-danger" @click="cancel">
                취소
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            noti_id: null,
            noticeTitle: '',
            noticeContent: ''
        };
    },
    watch: {
        '$route.query.id': {
            handler(newVal) {
                this.noti_id = newVal;
                this.fetchNotice();
            },
            immediate: true
        }
    },
    methods: {
        fetchNotice() {
            const noti_id = this.noti_id;
            axios.get(`http://localhost:8001/notification?noti_id=${noti_id}`)
                .then(response => {
                    const notice = response.data.find(n => n.noti_id === noti_id); // assuming the response is an array
                    this.noticeTitle = notice.noti_title;
                    this.noticeContent = notice.noti_contents;
                })
                .catch(error => {
                    console.error('There was an error fetching the notification!', error);
                });
        },
        updateNotice() {
            const noti_id = this.noti_id;
            const updatedNotice = {
                noti_title: this.noticeTitle,
                noti_contents: this.noticeContent,
                noti_updateat: new Date().toISOString()
            };

            axios.put(`http://localhost:8001/notification?noti_id=${noti_id}`, updatedNotice)
                .then(response => {
                    console.log('공지 수정 성공:', response.data);
                    this.$router.push('/notification-list'); // 공지 목록 페이지로 리다이렉트
                })
                .catch(error => {
                    console.error('공지 수정 실패:', error);
                });
        },
        cancel() {
            this.$router.go(-1); // 이전 페이지로 이동
        }
    }
};
</script>

<style scoped>
.noticeEditContainer {
    width: 100%;
    max-width: 800px;
    margin: 0 auto; /* 중앙 정렬 */
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin-top: 40px;
}

.editsubject {
    text-align: center;
    margin-bottom: 20px;
}

h1 {
    font-size: 2em;
    font-weight: bold;
}

.mb-3 .form-control {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 40px;
    font-size: 1em;
    padding: 10px;
    box-sizing: border-box;
}

.buttongroup {
    display: flex;
    justify-content: flex-end;
    gap: 10px; /* 버튼 간격 추가 */
    margin-top: 20px;
}

.buttongroup .btn {
    min-width: 100px;
    padding: 10px 20px;
    font-size: 1em;
}

.buttongroup .btn + .btn {
    margin-left: 10px;
}
</style>