<template>
  <aside class="gallery-sidebar">
    <div class="gallery-sidebar__header">
      <div class="gallery-sidebar__title">UI REVIEW GALLERY</div>
      <div class="gallery-sidebar__subtitle">Design Validation System</div>
    </div>

    <div class="gallery-sidebar__section-title">
      <span class="gallery-sidebar__section-dot"></span>
      <span>WT32 平台</span>
    </div>

    <div class="gallery-sidebar__scroll">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="gallery-sidebar__item"
        active-class="gallery-sidebar__item--active"
      >
        {{ item.title }}
      </RouterLink>
    </div>

    <div class="gallery-sidebar__footer">V4.2.0 • BUILD 2026.03</div>
  </aside>
</template>

<script setup lang="ts">
import type { NavigationItem } from '@/constants/navigation';

defineProps<{
  items: NavigationItem[];
}>();
</script>

<style scoped>
.gallery-sidebar {
  width: 334px;
  height: 100vh;
  background: #f4f5f7;
  border-right: 1px solid #d7dce5;
  display: flex;
  flex-direction: column;
}

.gallery-sidebar__header {
  padding: 22px 20px 18px;
  border-bottom: 1px solid #e2e6ee;
}

.gallery-sidebar__title {
  font-size: 18px;
  font-weight: 800;
  color: #0f1f3b;
  letter-spacing: 0.02em;
}

.gallery-sidebar__subtitle {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
}

.gallery-sidebar__section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 18px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #8a97ab;
  letter-spacing: 0.08em;
}

.gallery-sidebar__section-dot {
  width: 6px;
  height: 18px;
  border-radius: 999px;
  background: #c7d0df;
}

.gallery-sidebar__scroll {
  flex: 1;
  overflow: auto;
  padding: 0 4px 16px;
}

.gallery-sidebar__item {
  display: block;
  margin: 0 18px 4px 0;
  padding: 16px 22px;
  border-radius: 0 14px 14px 0;
  color: #546579;
  font-size: 16px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.35);
  border-left: 4px solid transparent;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.gallery-sidebar__item:hover {
  background: #edf1f7;
}

.gallery-sidebar__item--active {
  background: #e8edf5;
  color: #2f80ed;
  border-left-color: #2f80ed;
  font-weight: 700;
}

.gallery-sidebar__footer {
  padding: 16px 18px 18px;
  border-top: 1px solid #e2e6ee;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #8a99b1;
  text-align: center;
}
</style>
