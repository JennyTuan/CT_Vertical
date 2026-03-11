<template>
  <header class="ct-header">
    <!-- Patient Card -->
    <div class="ct-patient-card">
      <div class="ct-avatar">
        <v-icon icon="mdi-account" size="18" />
      </div>
      <div class="ct-patient-info">
        <span class="ct-name">欧阳祖华</span>
        <span class="ct-id font-mono">ID: 20240312001</span>
      </div>
    </div>

    <!-- Clock Section -->
    <div class="ct-clock-section">
      <span class="ct-time font-mono">{{ timeText }}</span>
      <span class="ct-date">{{ dateText }}</span>
    </div>

    <!-- Status Group -->
    <div class="ct-status-group">
      <div class="ct-icon-rack">
        <v-icon icon="mdi-database" size="18" color="green-darken-2" />
        <v-icon icon="mdi-share-variant" size="18" color="green-darken-2" />
        <v-icon icon="mdi-camera" size="18" color="slate-600" />
        <v-icon icon="mdi-bell" size="18" color="red-lighten-2" />
      </div>
      
      <div class="ct-divider"></div>
      
      <v-icon icon="mdi-cog" size="20" class="ct-settings-icon" />
      
      <!-- Metrics Pills -->
      <div class="ct-quick-metrics">
        <div class="ct-pill">
          <v-icon icon="mdi-thermometer" size="12" color="orange-accent-2" />
          <span class="font-mono">0%</span>
        </div>
        <div class="ct-pill border-l">
          <v-icon icon="mdi-battery" size="12" color="green-accent-3" />
          <span class="font-mono">100%</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  time: Date;
}>();

const timeText = computed(() =>
  props.time.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
);

const dateText = computed(() => {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'numeric', 
    day: 'numeric', 
    weekday: 'short' 
  };
  return props.time.toLocaleDateString('zh-CN', options);
});
</script>

<style scoped>
.ct-header {
  height: 64px;
  background: #C8CED8;
  border-bottom: 1px solid #B0BCCB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 50;
}

.ct-patient-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 16px 6px 6px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.ct-avatar {
  width: 32px;
  height: 32px;
  background: #4A6D95;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
}

.ct-patient-info {
  display: flex;
  flex-direction: column;
}

.ct-name {
  font-size: 13px;
  font-weight: 800;
  color: #2D3748;
  letter-spacing: -0.02em;
}

.ct-id {
  font-size: 9px;
  color: #64748B;
  font-weight: 600;
}

.ct-clock-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ct-time {
  font-size: 22px;
  font-weight: 900;
  color: #1E293B;
  line-height: 1;
}

.ct-date {
  font-size: 10px;
  font-weight: 800;
  color: #64748B;
  margin-top: 2px;
  letter-spacing: 0.1em;
}

.ct-status-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ct-icon-rack {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ct-divider {
  width: 1px;
  height: 24px;
  background: rgba(148, 163, 184, 0.3);
}

.ct-settings-icon {
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ct-settings-icon:hover {
  transform: rotate(45deg);
  color: #4A6D95;
}

.ct-quick-metrics {
  background: rgba(255, 255, 255, 0.4);
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

.ct-pill {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ct-pill.border-l {
  border-left: 1px solid rgba(148, 163, 184, 0.3);
  padding-left: 12px;
}

.ct-pill span {
  font-size: 10px;
  font-weight: 800;
}
</style>
