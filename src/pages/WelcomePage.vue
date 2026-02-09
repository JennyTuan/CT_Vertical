<template>
  <div class="ct-frame">
    <!-- Specialized Header for Welcome Screen -->
    <header class="ct-welcome-header">
      <div class="ct-user-tag">
        <div class="ct-user-avatar">
          <v-icon icon="mdi-account-outline" size="20" />
        </div>
        <div class="ct-user-details">
          <div class="ct-user-name">欧阳祖华</div>
          <div class="ct-user-id">000001</div>
        </div>
      </div>

      <div class="ct-center-clock">
        <div class="ct-welcome-time">{{ timeText }}</div>
        <div class="ct-welcome-date">{{ dateText }}</div>
      </div>

      <div class="ct-welcome-actions">
        <v-icon icon="mdi-alarm-light-outline" class="ct-welcome-icon" />
        <v-icon icon="mdi-brightness-7" class="ct-welcome-icon" />
        <v-icon icon="mdi-monitor-dashboard" class="ct-welcome-icon" />
        <v-icon icon="mdi-cog-outline" class="ct-welcome-icon" />
      </div>
    </header>

    <main class="ct-welcome-content">
      <h1 class="ct-welcome-title">欢迎</h1>

      <div class="ct-mode-grid">
        <!-- Horizontal Mode -->
        <div class="ct-mode-card" @click="selectMode(SCAN_MODES.HORIZONTAL)">
          <div class="ct-mode-card-icon">
            <svg viewBox="0 0 100 100" class="ct-svg-icon">
              <rect x="25" y="20" width="50" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="4" />
              <circle cx="50" cy="55" r="18" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>
          </div>
          <span class="ct-mode-card-label">水平模式</span>
        </div>

        <!-- Vertical Mode -->
        <div class="ct-mode-card" @click="selectMode(SCAN_MODES.VERTICAL)">
          <div class="ct-mode-card-icon">
            <svg viewBox="0 0 100 100" class="ct-svg-icon">
              <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="currentColor" stroke-width="4" />
              <rect x="35" y="60" width="30" height="10" rx="2" fill="currentColor" />
            </svg>
          </div>
          <span class="ct-mode-card-label">垂直模式</span>
        </div>

        <!-- Service Mode -->
        <div class="ct-mode-card service">
          <div class="ct-mode-card-icon">
            <v-icon icon="mdi-cog-play-outline" size="64" />
          </div>
          <span class="ct-mode-card-label">服务模式</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { SCAN_MODES } from '@/constants/scan';
import { useScanState } from '@/composables/useScanState';
import type { ScanMode } from '@/types/scan';

const router = useRouter();
const { time, setTargetMode } = useScanState();

const timeText = computed(() =>
  time.value.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
);

const dateText = computed(() => {
  const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', weekday: 'long' };
  return time.value.toLocaleDateString('zh-CN', options).replace('星期', '周');
});

const selectMode = (mode: ScanMode) => {
  setTargetMode(mode);
  router.push('/position');
};
</script>

<style scoped>
.ct-welcome-header {
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
}

.ct-user-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.6);
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #CDD3DB;
}

.ct-user-avatar {
  width: 32px;
  height: 32px;
  background: #E6EAF0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2B5C8A;
}

.ct-user-name {
  font-size: 13px;
  font-weight: 700;
  color: #4A5A6B;
}

.ct-user-id {
  font-size: 11px;
  color: #7A8896;
}

.ct-center-clock {
  text-align: center;
}

.ct-welcome-time {
  font-size: 32px;
  font-weight: 700;
  color: #4A5A6B;
  line-height: 1;
}

.ct-welcome-date {
  font-size: 12px;
  color: #7A8896;
  margin-top: 4px;
}

.ct-welcome-actions {
  display: flex;
  gap: 20px;
}

.ct-welcome-icon {
  color: #2B5C8A;
  cursor: pointer;
  opacity: 0.7;
}

.ct-welcome-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
}

.ct-welcome-title {
  font-size: 72px;
  font-weight: 800;
  color: #2B5C8A;
  margin-bottom: 60px;
  letter-spacing: 0.1em;
}

.ct-mode-grid {
  display: flex;
  gap: 2px;
  background: #B0BEC5;
  padding: 2px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.ct-mode-card {
  width: 280px;
  height: 240px;
  background: #2B5C8A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #FFFFFF;
}

.ct-mode-card:nth-child(2) {
  background: #78909C;
}

.ct-mode-card:nth-child(3) {
  background: #90A4AE;
}

.ct-mode-card:hover {
  filter: brightness(1.1);
  z-index: 1;
  transform: scale(1.02);
}

.ct-mode-card-icon {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ct-svg-icon {
  width: 80px;
  height: 80px;
}

.ct-mode-card-label {
  font-size: 18px;
  font-weight: 700;
}

.ct-mode-card.service {
  opacity: 0.9;
}
</style>
