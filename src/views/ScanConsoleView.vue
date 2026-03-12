<template>
  <section class="view-page">
    <div class="view-page__header">
      <div>
        <h1 class="view-page__title">扫描控制</h1>
        <p class="view-page__desc">扫描控制页只负责本页状态和动作。后续开始扫描、异常确认等弹窗都在这里单独接入。</p>
      </div>
    </div>

    <div class="scan-grid">
      <v-card class="scan-card" rounded="xl" elevation="1">
        <div class="scan-card__label">当前模式</div>
        <div class="scan-card__value">标准扫描</div>
      </v-card>
      <v-card class="scan-card" rounded="xl" elevation="1">
        <div class="scan-card__label">设备联机</div>
        <div class="scan-card__value scan-card__value--ok">已连接</div>
      </v-card>
      <v-card class="scan-card" rounded="xl" elevation="1">
        <div class="scan-card__label">扫描状态</div>
        <div class="scan-card__value">待开始</div>
      </v-card>
    </div>

    <v-card class="scan-panel" rounded="xl" elevation="1">
      <h2>操作区</h2>
      <p>这里保留为扫描控制主面板，后续开始扫描确认、参数校验、异常提示等弹窗都从本页发起。</p>
      <div class="scan-panel__actions">
        <v-btn color="primary" variant="flat">准备扫描</v-btn>
        <v-btn color="secondary" variant="flat">开始扫描</v-btn>
      </div>
    </v-card>
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

.scan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.scan-card,
.scan-panel {
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
}

.scan-card__label {
  color: #6e7e94;
  font-size: 13px;
}

.scan-card__value {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #1d3f74;
}

.scan-card__value--ok {
  color: #3c8d5b;
}

.scan-panel h2 {
  margin: 0 0 12px;
  font-size: 22px;
  color: #172b4d;
}

.scan-panel p {
  margin: 0;
  color: #63748b;
}

.scan-panel__actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}
</style>
