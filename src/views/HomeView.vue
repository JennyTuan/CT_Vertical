<template>
  <section class="home-page">
    <div class="home-page__hero">
      <div>
        <div class="home-page__eyebrow">DEMO HOME</div>
        <h1 class="home-page__title">首页</h1>
        <p class="home-page__desc">当前先只保留一个首页入口，右侧预览区固定为 1024 x 768，方便你稳定演示给产品经理。后续我们再按这个舞台尺寸逐页补界面。</p>
      </div>

      <div class="home-page__badge">1024 x 768</div>
    </div>

    <div class="home-page__grid">
      <v-card rounded="xl" elevation="1" class="home-card">
        <div class="home-card__title">当前模式</div>
        <div class="home-card__value">界面演示</div>
      </v-card>
      <v-card rounded="xl" elevation="1" class="home-card">
        <div class="home-card__title">导航状态</div>
        <div class="home-card__value">仅首页</div>
      </v-card>
      <v-card rounded="xl" elevation="1" class="home-card">
        <div class="home-card__title">后续策略</div>
        <div class="home-card__value">逐页补充</div>
      </v-card>
    </div>

    <v-card rounded="xl" elevation="1" class="home-page__panel">
      <h2>下一步建议</h2>
      <p>从这里开始，我们后面每次只补一个页面，比如患者列表、协议选择、图像浏览。这样演示结构会一直稳定，不会再乱。</p>
    </v-card>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  padding: 32px;
  background: linear-gradient(180deg, #f7f9fc 0%, #eff3f8 100%);
}

.home-page__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.home-page__eyebrow {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #96a4b6;
}

.home-page__title {
  margin: 12px 0 10px;
  font-size: 42px;
  color: #20324a;
}

.home-page__desc {
  max-width: 640px;
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: #607489;
}

.home-page__badge {
  min-width: 140px;
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e8eef8;
  color: #2f80ed;
  font-size: 14px;
  font-weight: 700;
}

.home-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.home-card,
.home-page__panel {
  padding: 24px;
  background: rgba(255, 255, 255, 0.92);
}

.home-card__title {
  font-size: 14px;
  color: #8393a8;
}

.home-card__value {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #27466f;
}

.home-page__panel {
  margin-top: 22px;
}

.home-page__panel h2 {
  margin: 0 0 12px;
  font-size: 24px;
  color: #20324a;
}

.home-page__panel p {
  margin: 0;
  color: #607489;
  font-size: 16px;
  line-height: 1.7;
}
</style>
