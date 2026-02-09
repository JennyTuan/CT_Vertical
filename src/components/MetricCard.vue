<template>
  <div class="ct-card">
    <div class="ct-card-top">
      <span class="ct-card-label">{{ label }}</span>
      <v-icon size="24" :icon="iconName" class="ct-card-icon" />
    </div>
    <div class="ct-card-value">{{ value }}</div>
    <div class="ct-card-bar">
      <div class="ct-card-bar-fill"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: string;
  icon: string;
}>();

const iconName = computed(() => props.icon || 'mdi-circle-outline');
</script>

<style scoped>
.ct-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  transition: box-shadow 0.2s ease;
  height: 100%;
}

.ct-card:hover {
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
}

.ct-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.ct-card-label {
  font-size: 10px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.ct-card-icon {
  color: #e2e8f0;
}

.ct-card-value {
  font-size: 56px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.04em;
  margin: 8px 0;
  font-variant-numeric: tabular-nums;
}

.ct-card-bar {
  width: 100%;
  height: 6px;
  background: #dbeafe;
  border-radius: 999px;
  overflow: hidden;
}

.ct-card-bar-fill {
  height: 100%;
  width: 33%;
  background: #3b82f6;
  transition: width 0.5s ease;
}
</style>
