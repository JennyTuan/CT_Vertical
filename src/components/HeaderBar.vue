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
  height: 70px;
  background: #E6EAF0;
  border-bottom: 1px solid #CDD3DB;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  color: #4A5A6B;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Separators */
.ct-separator {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, transparent 0%, #CDD3DB 20%, #CDD3DB 80%, transparent 100%);
  flex-shrink: 0;
  margin: 0 2px;
}

.ct-vsep {
  width: 1px;
  height: 32px;
  background: #CDD3DB;
  margin: 0 8px;
}

.ct-spacer {
  flex: 1;
  min-width: 16px;
}

/* Section 1: Patient Info */
.ct-patient-section {
  flex-shrink: 0;
}

.ct-patient {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #FFFFFF;
  border: 1px solid #D5DBE3;
  border-radius: 8px;
  min-height: 52px;
  min-width: 170px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.ct-patient:hover {
  border-color: #6A9AC6;
  box-shadow: 0 2px 4px rgba(106, 154, 198, 0.12);
}

.ct-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6A9AC6 0%, #2B5C8A 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #FFFFFF;
  font-size: 22px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(43, 92, 138, 0.2);
}

.ct-patient-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ct-patient-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: #3A4A58;
  font-family: 'Roboto', sans-serif;
}

.ct-patient-id {
  font-size: 11px;
  color: #6B7885;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
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
  justify-content: center;
}

.ct-clock {
  font-size: 26px;
  font-weight: 700;
  color: #3A4A58;
  line-height: 1;
  font-family: 'Roboto Mono', 'Consolas', monospace;
  letter-spacing: -0.02em;
}

.ct-date {
  font-size: 10px;
  font-weight: 500;
  color: #6B7885;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Roboto', sans-serif;
}

/* Section 3: Status Icons */
.ct-status-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  flex-shrink: 0;
}

.ct-status-icon {
  font-size: 24px;
  color: #6B7885;
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.ct-status-icon:hover {
  background: rgba(90, 138, 184, 0.12);
  transform: scale(1.05);
}

.ct-status-icon.success { 
  color: #3D8B4E; 
}

.ct-status-icon.active { 
  color: #2B5C8A; 
}

.ct-status-icon.emergency { 
  color: #C94848; 
  animation: emergency-pulse 2s infinite ease-in-out;
}

.ct-status-icon.glow {
  filter: drop-shadow(0 0 4px currentColor);
}

@keyframes emergency-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.12); opacity: 0.8; }
}

/* Section 4: Settings */
.ct-settings-section {
  flex-shrink: 0;
}

.ct-settings-icon {
  font-size: 24px;
  color: #6B7885;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.ct-settings-icon:hover {
  color: #2B5C8A;
  background: rgba(106, 154, 198, 0.1);
  transform: rotate(90deg);
}

/* Section 5: Hardware Metrics */
.ct-metrics-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #FFFFFF;
  border: 1px solid #D5DBE3;
  border-radius: 8px;
  flex-shrink: 0;
  min-height: 52px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.ct-metrics-section:hover {
  border-color: #6A9AC6;
  box-shadow: 0 2px 4px rgba(106, 154, 198, 0.12);
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
  font-weight: 600;
  min-height: 20px;
}

.ct-metric-icon {
  font-size: 15px;
  color: #7A8896;
  flex-shrink: 0;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-metric-icon.thermal { color: #D68534; }
.ct-metric-icon.battery { color: #3D8B4E; }

.ct-metric-value {
  color: #3A4A58;
  font-weight: 700;
  min-width: 40px;
  text-align: right;
  font-family: 'Roboto Mono', 'Consolas', monospace;
  font-size: 12px;
}

.ct-metric-unit {
  font-size: 10px;
  color: #6B7885;
  font-weight: 500;
  width: 20px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
}
</style>
