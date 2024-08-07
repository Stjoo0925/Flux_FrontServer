<template>
  <!-- Main content -->
  <div class="mt-95 pt-md-4 border-top">
    <div class="container">
      <div class="row">
        <!-- Adjust the number of columns to fit 3 images per row -->
        <div class="col-12 col-sm-4 mb-4" v-for="market in paginatedMarkets" :key="market.marketId">
          <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
            <a href="#" @click.prevent="goToDetail(market.marketId)">
              <img
                :src="market.marketImgs[0]" 
                :alt="market.marketTitle"
                class="zoom-in img-fluid"
                style="height: 300px; object-fit: cover; width: 100%;"
              />
            </a>
          </div>
          <div class="mt-3">
            <h5 class="font-weight-bold text-dark">
              <a href="#" @click.prevent="goToDetail(market.marketId)">
                {{ market.marketTitle }}
              </a>
            </h5>
            <p class="text-muted">{{ market.marketCategory }}</p>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="row">
        <div class="col-12 mt-4">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FluxMarketMain',
  data() {
    return {
      market: [],
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.market.length / this.itemsPerPage);
    },
    paginatedMarkets() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.market.slice(start, end);
    },
  },
  methods: {
    async fetchMarkets() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/market');
        this.market = response.data;
      } catch (error) {
        console.error('Error fetching markets:', error);
      }
    },
    async goToDetail(marketId) {
      try {
        await this.$router.push({ name: 'MarketDetail', params: { marketId } });
      } catch (error) {
        console.error('Navigation error:', error);
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchMarkets();
  },
};
</script>

<style scoped>
.pt-md-4 {
  padding-top: 4rem;
}
.border-top {
  border-top: 1px solid #dee2e6;
}
.text-dark {
  color: #343a40;
}
.text-muted {
  color: #6c757d;
}
.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
.zoom-in {
  transition: transform 0.2s;
}
.zoom-in:hover {
  transform: scale(1.1);
}
</style>
