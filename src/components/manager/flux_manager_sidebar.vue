<template>
  <div class="wrapper">
    <div class="border-right sidebar-con d-flex flex-column" id="sidebar-wrapper">
      <div class="sidebar-heading sidebar-title">DashBoard</div>
      <div class="list-group list-group-flush">
        <div class="sidebar-heading">
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager">홈화면</router-link>
          <hr>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/admin/userlist">회원목록</router-link>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/admin/adminlist">회원권한설정</router-link>
          <hr>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/article/articlelist">아티클목록</router-link>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/article/articlepost">아티클등록</router-link>
          <hr>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/notice/noticelist">공지목록</router-link>
          <router-link class="list-group-item list-group-item-action pl-4 sidebar-text" to="/manager/notice/noticepost">공지등록</router-link>
          <hr>
          <div class="list-group-item list-group-item-action pl-4 sidebar-text" @click="showModal">종료</div>
        </div>
      </div>
    </div>

    <!-- Modal HTML -->
    <div class="modal fade" ref="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            종료하고 돌아가시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">취소</button>
            <button type="button" class="btn btn-primary" @click="returnMain">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Modal } from 'bootstrap';

const router = useRouter();
const confirmModal = ref(null);
let modalInstance = null;

function showModal() {
  if (!modalInstance) {
    modalInstance = new Modal(confirmModal.value);
  }
  modalInstance.show();
}

function hideModal() {
  if (modalInstance) {
    modalInstance.hide();
  }
}

function returnMain() {
  hideModal();
  router.push('/');
}
</script>

<style scoped>
.wrapper {
  background-color: #000 !important;
  border-top-right-radius: 10px; /* 좌상단 곡률 */
  border-bottom-right-radius: 10px; /* 좌하단 곡률 */
}

#sidebar-wrapper {
  width: 250px;
}

.sidebar-con {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.sidebar-heading {
  font-size: 1.5rem;
  padding: 1rem;
  color: white;
}

.sidebar-img {
  width: auto;
  height: 50px;
}

.sidebar-title {
  font-family: "LINESeedKR-Bd";
  font-size: 28px;
  color: #1244AF;
  margin-top: 30px;
}

.sidebar-subtitle {
  font-family: "LINESeedKR-Bd";
  font-size: 21px;
  color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 10px;
}

.sidebar-text {
  font-family: "LINESeedKR-Bd";
  font-size: 16px;
  background-color: #000 !important;
  color: #FFFFFF;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.title-link {
  font-family: "LINESeedKR-Bd";
  font-size: 12px;
  color: #FFFFFF;
}

.title-link2 {
  font-family: "LINESeedKR-Bd";
  font-size: 10px;
  color: #FFFFFF;
}

.list-group-item {
  border: none !important;
}

.modal-header {
  font-family: "LINESeedKR-Bd";
  font-size: 16px;
  background-color: #F2F0D8;
}

.modal-footer {
  background-color: #F2F0D8;
}

.btn {
  font-family: "LINESeedKR-Bd";
  font-size: 12px;
}

@media (max-width: 992px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
  .wrapper {
    display: none !important;
  }
}
</style>
