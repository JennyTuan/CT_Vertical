<template>
  <div class="gallery-shell">
    <AppSidebar :items="navigationItems" />

    <div class="gallery-shell__main">
      <header class="gallery-shell__topbar">
        <div class="gallery-shell__breadcrumb">
          <span class="gallery-shell__label">PREVIEWING:</span>
          <span class="gallery-shell__current">{{ currentTitle }}</span>
        </div>
      </header>

      <main class="gallery-shell__canvas">
        <div class="gallery-shell__stage">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppSidebar from '@/components/AppSidebar.vue';
import { navigationItems } from '@/constants/navigation';

const route = useRoute();
const currentTitle = computed(() => String(route.meta.title ?? '首页'));
</script>

<style scoped>
.gallery-shell {
  min-height: 100vh;
  display: flex;
  background: #eef2f7;
}

.gallery-shell__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.gallery-shell__topbar {
  height: 60px;
  padding: 0 22px 0 42px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #dfe5ee;
}

.gallery-shell__breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
}

.gallery-shell__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #9aa8bb;
}

.gallery-shell__current {
  font-size: 18px;
  font-weight: 800;
  color: #1d2d44;
}

.gallery-shell__canvas {
  flex: 1;
  min-height: 0;
  padding: 28px 30px 28px 26px;
  overflow: auto;
}

.gallery-shell__stage {
  width: 1024px;
  height: 768px;
  background: #dfe4ef;
  border: 1px solid #d4dce8;
  border-radius: 20px;
  box-shadow: 0 12px 36px rgba(110, 129, 162, 0.12);
  overflow: hidden;
}
</style>
