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
  return str;
});
</script>

<style scoped>
.ct-header {
  height: 68px;
  background: linear-gradient(180deg, #C8CCDC 0%, #B8BDD0 100%);
  border-bottom: 2px solid #A8B0C4;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  color: #4A5A6B;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.3);
}

/* Separators */
.ct-separator {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent 0%, rgba(100,115,140,0.4) 25%, rgba(100,115,140,0.4) 75%, transparent 100%);
  flex-shrink: 0;
  margin: 0 2px;
}

.ct-vsep {
  width: 1px;
  height: 28px;
  background: #C0C8D8;
  margin: 0 6px;
}

.ct-spacer {
  flex: 1;
  min-width: 8px;
}

/* Section 1: Patient Info */
.ct-patient-section {
  flex-shrink: 0;
}

.ct-patient {
  display: flex;
  align-items: center;
  padding: 7px 12px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(180, 195, 215, 0.8);
  border-radius: 8px;
  min-height: 48px;
  min-width: 170px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  transition: all 0.2s ease;
}

.ct-patient:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: #8AAFCE;
  box-shadow: 0 2px 6px rgba(43, 92, 138, 0.12);
}

.ct-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6A9AC6 0%, #2B5C8A 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #FFFFFF;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(43, 92, 138, 0.25);
}

.ct-patient-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ct-patient-name {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  color: #2A3A4A;
  font-family: 'Roboto', sans-serif;
}

.ct-patient-id {
  font-size: 10px;
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
  min-width: 84px;
  justify-content: center;
}

.ct-clock {
  font-size: 24px;
  font-weight: 700;
  color: #2A3A4A;
  line-height: 1;
  font-family: 'Roboto Mono', 'Consolas', monospace;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 0 rgba(255,255,255,0.5);
}

.ct-date {
  font-size: 10px;
  font-weight: 500;
  color: #5A6878;
  margin-top: 4px;
  letter-spacing: 0.04em;
  font-family: 'Roboto', sans-serif;
}

/* Section 3: Status Icons */
.ct-status-section {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
  flex-shrink: 0;
}

.ct-status-icon {
  font-size: 22px;
  color: #6B7885;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.ct-status-icon:hover {
  background: rgba(255, 255, 255, 0.3);
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
  font-size: 22px;
  color: #5A6878;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.ct-settings-icon:hover {
  color: #2B5C8A;
  background: rgba(255, 255, 255, 0.35);
  transform: rotate(90deg);
}

/* Section 5: Hardware Metrics */
.ct-metrics-section {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(180, 195, 215, 0.8);
  border-radius: 8px;
  flex-shrink: 0;
  min-height: 48px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  transition: all 0.2s ease;
}

.ct-metrics-section:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: #8AAFCE;
  box-shadow: 0 2px 6px rgba(43, 92, 138, 0.12);
}

.ct-metrics-column {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ct-metric-row {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  min-height: 18px;
}

.ct-metric-icon {
  font-size: 14px;
  color: #7A8896;
  flex-shrink: 0;
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-metric-icon.thermal { color: #D68534; }
.ct-metric-icon.battery { color: #3D8B4E; }

.ct-metric-value {
  color: #2A3A4A;
  font-weight: 700;
  min-width: 38px;
  text-align: right;
  font-family: 'Roboto Mono', 'Consolas', monospace;
  font-size: 11px;
}

.ct-metric-unit {
  font-size: 10px;
  color: #6B7885;
  font-weight: 500;
  width: 18px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
}
</style>
