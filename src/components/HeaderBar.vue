<template>
  <header class="ct-header">
    <div class="ct-patient">
      <div class="ct-avatar">
        <v-icon size="20" icon="mdi-account" />
      </div>
      <div class="ct-patient-info">
        <div class="ct-patient-name">欧阳祖华</div>
        <div class="ct-progress"></div>
      </div>
    </div>

    <div class="ct-time">
      <div class="ct-clock">{{ timeText }}</div>
      <div class="ct-date">3月12日 周日</div>
    </div>

    <div class="ct-icons">
      <v-icon size="18" icon="mdi-database" class="ct-muted" />
      <v-icon size="18" icon="mdi-lan" class="ct-muted" />
      <div class="ct-indicator">
        <v-icon size="18" icon="mdi-alert-circle-outline" class="ct-accent" />
        <span>急诊</span>
      </div>
      <v-icon size="18" icon="mdi-laser-pointer" class="ct-muted" />
      <v-icon size="18" icon="mdi-cog" class="ct-muted" />
    </div>

    <div class="ct-spacer"></div>

    <div class="ct-hw">
      <div class="ct-hw-item">
        <div class="ct-hw-icon">
          <v-icon size="16" icon="mdi-thermometer" />
        </div>
        <span class="ct-hw-value ct-blue">0%</span>
      </div>
      <div class="ct-hw-item">
        <div class="ct-hw-icon">
          <v-icon size="16" icon="mdi-battery" />
        </div>
        <span class="ct-hw-value">100</span>
      </div>
    </div>

    <div class="ct-hw-metrics">
      <div class="ct-hw-metric">
        <v-icon size="14" icon="mdi-arrow-left-right" />
        <span>112</span>
      </div>
      <div class="ct-hw-metric">
        <v-icon size="14" icon="mdi-angle-acute" />
        <span>112</span>
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
  props.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
);
</script>

<style scoped>
.ct-header {
  height: 64px;
  background: #d8dee9;
  border-bottom: 1px solid #c0c8d4;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  color: #445566;
}

.ct-patient {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #dde4ee;
  border: 1px solid #b0b8c4;
  border-radius: 2px;
  min-width: 160px;
  flex-shrink: 0;
}

.ct-avatar {
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #b0b8c4;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.ct-patient-name {
  font-size: 12px;
  font-weight: 700;
}

.ct-progress {
  margin-top: 4px;
  height: 6px;
  background: #96c496;
  border-radius: 999px;
  border: 1px solid #7baf7b;
}

.ct-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;
  border-right: 1px solid #bcc4d0;
  flex-shrink: 0;
}

.ct-clock {
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.ct-date {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #778899;
  margin-top: 2px;
}

.ct-icons {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 9px;
  font-weight: 700;
  min-width: 260px;
}

.ct-icons > * {
  flex-shrink: 0;
}

.ct-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1e88e5;
}

.ct-accent {
  color: #1e88e5;
}

.ct-muted {
  color: #556677;
  opacity: 0.6;
  cursor: pointer;
}

.ct-spacer {
  flex: 1;
}

.ct-hw {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
  border-left: 1px solid #bcc4d0;
  flex-shrink: 0;
}

.ct-hw-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ct-hw-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #334155;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-hw-value {
  font-weight: 700;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
}

.ct-blue {
  color: #1e88e5;
}

.ct-hw-metrics {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 16px;
  border-left: 1px solid #bcc4d0;
  font-size: 12px;
  font-weight: 700;
  opacity: 0.8;
  flex-shrink: 0;
}

.ct-hw-metric {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
