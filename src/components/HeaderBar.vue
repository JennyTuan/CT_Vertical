<template>
  <header class="ct-header">
    <!-- Section 1: Patient Info -->
    <div class="ct-patient-section">
      <div class="ct-patient">
        <div class="ct-avatar">
          <i class="mdi mdi-account"></i>
        </div>
        <div class="ct-patient-info">
          <div class="ct-patient-name">欧阳祖华</div>
          <div class="ct-patient-id">ID: 20240312001</div>
        </div>
      </div>
    </div>

    <div class="ct-separator"></div>

    <!-- Section 2: Time Display -->
    <div class="ct-time-section">
      <div class="ct-time">
        <div class="ct-clock">{{ timeText }}</div>
        <div class="ct-date">{{ dateText }}</div>
      </div>
    </div>

    <div class="ct-separator"></div>

    <!-- Section 3: System Status Icons -->
    <div class="ct-status-section">
      <i class="mdi mdi-database-check ct-status-icon success glow"></i>
      <i class="mdi mdi-lan-connect ct-status-icon success"></i>
      <i class="mdi mdi-laser-pointer ct-status-icon active glow"></i>
      <i class="mdi mdi-alarm-light-outline ct-status-icon emergency glow"></i>
    </div>

    <div class="ct-spacer"></div>

    <!-- Section 4: Settings -->
    <div class="ct-settings-section">
      <i class="mdi mdi-cog-outline ct-settings-icon"></i>
    </div>

    <div class="ct-separator"></div>

    <!-- Section 5: Hardware Metrics -->
    <div class="ct-metrics-section">
      <div class="ct-metrics-column">
        <div class="ct-metric-row">
          <i class="mdi mdi-thermometer ct-metric-icon thermal"></i>
          <span class="ct-metric-value">0%</span>
        </div>
        <div class="ct-metric-row">
          <i class="mdi mdi-battery-high ct-metric-icon battery"></i>
          <span class="ct-metric-value">100%</span>
        </div>
      </div>

      <div class="ct-vsep"></div>

      <div class="ct-metrics-column">
        <div class="ct-metric-row">
          <i class="mdi mdi-arrow-left-right ct-metric-icon"></i>
          <span class="ct-metric-value">112.5</span>
          <span class="ct-metric-unit">mm</span>
        </div>
        <div class="ct-metric-row">
          <i class="mdi mdi-angle-acute ct-metric-icon"></i>
          <span class="ct-metric-value">112.5</span>
          <span class="ct-metric-unit">°</span>
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
  background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
  border-bottom: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  color: #334155;
}

/* Separators */
.ct-separator {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, transparent, #cbd5e1, transparent);
  flex-shrink: 0;
}

.ct-vsep {
  width: 1px;
  height: 28px;
  background: #cbd5e1;
  margin: 0 4px;
}

.ct-spacer {
  flex: 1;
  min-width: 20px;
}

/* Section 1: Patient Info */
.ct-patient-section {
  flex-shrink: 0;
}

.ct-patient {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  min-width: 180px;
}

.ct-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #e0f2fe, #dbeafe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #1e4d94;
  font-size: 20px;
}

.ct-patient-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ct-patient-name {
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  color: #0f172a;
}

.ct-patient-id {
  font-size: 9px;
  color: #64748b;
  font-weight: 600;
}

/* Section 2: Time Display */
.ct-time-section {
  flex-shrink: 0;
}

.ct-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
}

.ct-clock {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  letter-spacing: -0.02em;
}

.ct-date {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Section 3: Status Icons */
.ct-status-section {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 4px;
  flex-shrink: 0;
}

.ct-status-icon {
  font-size: 20px;
  color: #64748b;
  transition: all 0.2s ease;
  cursor: pointer;
}

.ct-status-icon:hover {
  transform: scale(1.1);
}

.ct-status-icon.success { 
  color: #10b981; 
}

.ct-status-icon.active { 
  color: #3b82f6; 
}

.ct-status-icon.emergency { 
  color: #ef4444; 
  animation: emergency-pulse 2s infinite ease-in-out;
}

.ct-status-icon.glow {
  filter: drop-shadow(0 0 3px currentColor);
}

@keyframes emergency-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.7; }
}

/* Section 4: Settings */
.ct-settings-section {
  flex-shrink: 0;
}

.ct-settings-icon {
  font-size: 20px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ct-settings-icon:hover {
  color: #1e293b;
  transform: rotate(90deg);
}

/* Section 5: Hardware Metrics */
.ct-metrics-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  flex-shrink: 0;
}

.ct-metrics-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ct-metric-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
}

.ct-metric-icon {
  font-size: 14px;
  color: #94a3b8;
  flex-shrink: 0;
}

.ct-metric-icon.thermal { color: #f97316; }
.ct-metric-icon.battery { color: #10b981; }

.ct-metric-value {
  color: #0f172a;
  font-weight: 800;
  min-width: 42px;
  text-align: right;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 13px;
}

.ct-metric-unit {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 700;
  width: 22px;
  text-align: left;
}
</style>
