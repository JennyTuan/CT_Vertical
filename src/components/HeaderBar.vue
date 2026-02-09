<template>
  <header class="ct-header">
    <!-- Patient Info Section -->
    <div class="ct-patient">
      <div class="ct-avatar">
        <i class="mdi mdi-account ct-icon-primary"></i>
      </div>
      <div class="ct-patient-info">
        <div class="ct-patient-name">欧阳祖华</div>
        <div class="ct-patient-id">ID: 20240312001</div>
      </div>
    </div>

    <!-- Clock Section -->
    <div class="ct-time">
      <div class="ct-clock font-tech">{{ timeText }}</div>
      <div class="ct-date">{{ dateText }}</div>
    </div>

    <!-- Status Icons Group -->
    <div class="ct-status-container">
      <div class="ct-status-icons">
        <i class="mdi mdi-database-check ct-status-icon success glow"></i>
        <i class="mdi mdi-lan-connect ct-status-icon success"></i>
        <i class="mdi mdi-laser-pointer ct-status-icon active glow"></i>
        <i class="mdi mdi-alarm-light-outline ct-status-icon emergency glow"></i>
      </div>

      <i class="mdi mdi-cog-outline ct-status-icon settings"></i>
    </div>

    <div class="ct-spacer"></div>

    <!-- Hardware & Metrics Section -->
    <div class="ct-right-section">
      <!-- Hardware Rows (Simplified) -->
      <div class="ct-hw-rows">
        <div class="ct-hw-row">
          <i class="mdi mdi-thermometer ct-hw-icon temp"></i>
          <span class="ct-hw-val">0%</span>
        </div>
        <div class="ct-hw-row">
          <i class="mdi mdi-battery-high ct-hw-icon batt"></i>
          <span class="ct-hw-val">100%</span>
        </div>
      </div>

      <div class="ct-divider"></div>

      <!-- Live Metrics -->
      <div class="ct-metrics-box">
        <div class="metric-row">
          <i class="mdi mdi-arrow-left-right"></i>
          <span class="val">112.5</span>
          <span class="unit">mm</span>
        </div>
        <div class="metric-row">
          <i class="mdi mdi-angle-acute"></i>
          <span class="val">112.5</span>
          <span class="unit">°</span>
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
  const str = props.time.toLocaleDateString('zh-CN', options);
  // Optional: replace "周x" with "星期x" or keep it short
  return str;
});
</script>

<style scoped>
.ct-header {
  height: 64px;
  background: linear-gradient(to right, #f8fafc, #edf2f7);
  border-bottom: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #334155;
}

/* Patient Section */
.ct-patient {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  min-width: 180px;
}

.ct-avatar {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #1e4d94;
  font-size: 20px;
}

.ct-icon-primary {
  color: #1e4d94;
}

.ct-patient-info {
  display: flex;
  flex-direction: column;
}

.ct-patient-name {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

.ct-patient-id {
  font-size: 9px;
  color: #64748b;
}

/* Time Section */
.ct-time {
  margin-left: 20px;
  padding: 0 20px;
  border-left: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.ct-clock {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}

.ct-date {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  margin-top: 2px;
}

/* Status Section */
.ct-status-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
}

.ct-status-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ct-status-icon {
  font-size: 20px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-status-icon.success { color: #10b981; }
.ct-status-icon.active { color: #3b82f6; }
.ct-status-icon.emergency { 
  color: #ef4444; 
  animation: icon-pulse 2s infinite ease-in-out;
}

.ct-status-icon.glow {
  filter: drop-shadow(0 0 3px currentColor);
}

@keyframes icon-pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.ct-spacer {
  flex: 1;
}

/* Right Side Section */
.ct-right-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ct-hw-rows {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 60px;
}

.ct-hw-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 800;
  color: #475569;
}

.ct-hw-icon {
  font-size: 14px;
}

.ct-hw-icon.temp { color: #f97316; }
.ct-hw-icon.batt { color: #10b981; }

.ct-hw-val {
  color: #01122a;
  flex: 1;
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
}

.ct-divider {
  width: 1px;
  height: 24px;
  background: #cbd5e1;
}

.ct-metrics-box {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 80px;
}

.metric-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  color: #475569;
}

.metric-row i {
  font-size: 12px;
  color: #94a3b8;
}

.metric-row .val {
  color: #0f172a;
  flex: 1;
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
}

.metric-row .unit {
  font-size: 9px;
  color: #94a3b8;
  width: 20px;
}
</style>
