<template>
  <section class="view-page">
    <div class="view-page__header">
      <div>
        <h1 class="view-page__title">系统信息</h1>
        <p class="view-page__desc">系统页作为独立入口存在，后续维护、配置、日志相关弹窗都放在这里处理。</p>
      </div>
    </div>

    <div class="system-grid">
      <v-card class="system-card" rounded="xl" elevation="1">
        <div class="system-card__title">球管温度</div>
        <div class="system-card__value">38°C</div>
      </v-card>
      <v-card class="system-card" rounded="xl" elevation="1">
        <div class="system-card__title">网络状态</div>
        <div class="system-card__value">正常</div>
      </v-card>
      <v-card class="system-card" rounded="xl" elevation="1">
        <div class="system-card__title">软件版本</div>
        <div class="system-card__value">v0.0.0</div>
      </v-card>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.view-page {
  padding: 24px;
}

.view-page__header {
  margin-bottom: 20px;
}

.view-page__title {
  margin: 0;
  font-size: 30px;
  color: #172b4d;
}

.view-page__desc {
  margin: 8px 0 0;
  font-size: 14px;
  color: #63748b;
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.system-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
}

.system-card__title {
  color: #6e7e94;
  font-size: 13px;
}

.system-card__value {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #1d3f74;
}
</style>
