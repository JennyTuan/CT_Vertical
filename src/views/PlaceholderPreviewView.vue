<template>
  <section class="placeholder-page">
    <div class="placeholder-page__panel">
      <div class="placeholder-page__eyebrow">DEMO SCREEN</div>
      <h1 class="placeholder-page__title">{{ title }}</h1>
      <p class="placeholder-page__desc">当前页先作为演示入口保留，方便你向产品经理串联完整界面结构。具体交互、弹窗和业务事件，后续只在这个页面内部继续细化。</p>

      <div class="placeholder-page__cards">
        <v-card rounded="xl" elevation="1" class="placeholder-card">
          <div class="placeholder-card__title">页面定位</div>
          <div class="placeholder-card__value">独立入口</div>
        </v-card>
        <v-card rounded="xl" elevation="1" class="placeholder-card">
          <div class="placeholder-card__title">当前状态</div>
          <div class="placeholder-card__value">用于演示</div>
        </v-card>
        <v-card rounded="xl" elevation="1" class="placeholder-card">
          <div class="placeholder-card__title">后续扩展</div>
          <div class="placeholder-card__value">弹窗单独处理</div>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = computed(() => String(route.meta.title ?? '页面预览'));
</script>

<style scoped>
.placeholder-page {
  min-height: calc(100vh - 116px);
  display: flex;
}

.placeholder-page__panel {
  width: min(1360px, 100%);
  margin: 16px auto;
  padding: 34px;
  border-radius: 26px;
  border: 1px solid #d4dce8;
  background: linear-gradient(180deg, #f7f9fc 0%, #eff3f8 100%);
  box-shadow: 0 12px 36px rgba(110, 129, 162, 0.12);
}

.placeholder-page__eyebrow {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #96a4b6;
}

.placeholder-page__title {
  margin: 12px 0 10px;
  font-size: 38px;
  color: #20324a;
}

.placeholder-page__desc {
  max-width: 760px;
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: #607489;
}

.placeholder-page__cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.placeholder-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.92);
}

.placeholder-card__title {
  font-size: 14px;
  color: #8393a8;
}

.placeholder-card__value {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #27466f;
}
</style>
