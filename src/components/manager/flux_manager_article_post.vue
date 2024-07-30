<template>
  <!-- 아티클 등록 페이지 시작 -->
  <div class="container">
    <div class="top">
      <h3>아티클 정보를 입력해 주세요.</h3>
    </div>

    <!-- 카테고리 입력창 시작 -->
    <p>분류</p>
    <select v-model="article.category" class="form-select" aria-label="Default select example">
      <option disabled value="">카테고리</option>
      <option value="인터뷰">인터뷰</option>
      <option value="큐레이션">큐레이션</option>
      <option value="이벤트">이벤트</option>
    </select>
    <!-- 카테고리 입력창 종료 -->

    <!-- 제목 입력창 시작 -->
    <div class="subject">
      <p>제목</p>
      <div class="input-group">
        <input v-model="article.title" type="text" aria-label="subject" class="form-control" placeholder="제목을 입력해주세요.">
      </div>
    </div>
    <!-- 제목 입력창 종료 -->

    <!-- 작가 이름 입력창 시작 -->
    <div class="name">
      <p>작가 이름</p>
      <div class="input-group">
        <input v-model="article.author" type="text" aria-label="name" class="form-control" placeholder="작가 이름을 입력해주세요.">
      </div>
    </div>
    <!-- 작가 이름 입력창 종료 -->

    <!-- 이미지 등록창 시작 -->
    <div class="imgInsert">
      <p>이미지 등록</p>
      <div class="form-group">
        <div class="image-upload-container">
          <input type="file" id="image-upload" ref="imageUpload" class="form-control" aria-label="Upload" accept="image/*" @change="handleImageUpload">
          <img id="upload-image-preview" :src="article.image" alt="이미지 업로드" class="upload-image" @click="triggerFileUpload">
        </div>
      </div>
    </div>
    <!-- 이미지 등록창 종료 -->

    <!-- 내용 등록창 시작 -->
    <p>내용</p>
    <div class="input-group">
      <textarea v-model="article.content" class="form-control" aria-label="With textarea" placeholder="내용을 작성해 주세요."></textarea>
    </div>
    <!-- 내용 등록창 종료 -->

    <!-- 등록 버튼 시작 -->
    <button @click="submitArticle" type="button" class="btn btn-primary btn-lg">등록 버튼</button>
    <!-- 등록 버튼 종료 -->
  </div>
  <!-- 아티클 등록 페이지 종료 -->
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManagerArticlePost',
  data() {
    return {
      article: {
        category: '',
        author: '',
        image: null,
        content: '',
        title: ''
      }
    };
  },
  methods: {
    handleImageUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.article.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    triggerFileUpload() {
      this.$refs.imageUpload.click();
    },
    async submitArticle() {
      const formData = new FormData();
      formData.append('articleTitle', this.article.title);
      formData.append('articleAuthor', this.article.author);
      formData.append('articleContent', this.article.content);
      formData.append('articleImgFile', this.$refs.imageUpload.files[0]);

      try {
        const response = await axios.post('http://localhost:8081/manager/article/articlepost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Article submitted:', response.data);
        this.$router.push({ name: 'ArticleListView' });
      } catch (error) {
        console.error('Error submitting article:', error);
      }
    }
  }
};
</script>

<style scoped>
/* 스타일 */
.container {
  border: 1px solid black;
  margin-top: 30px;
  width: 60%;
}

.top {
  margin-bottom: 20px;
  text-align: center;
}

.subject {
  margin-top: 20px;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-control[aria-label="With textarea"] {
  height: 200px;
  resize: none;
}

.imgInsert {
  margin-top: 10px;
}

.imgInsert p {
  margin-top: 10px;
}

.image-upload-container {
  position: relative;
  width: 150px;
  height: 150px;
}

#image-upload {
  display: none;
}

.upload-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border: 2px dashed #ccc;
  border-radius: 4px;
}

.btn {
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #1244AF;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}

.btn:hover {
  background-color: #103a8a;
}
</style>
