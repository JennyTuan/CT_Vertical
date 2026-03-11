<template>
  <div class="ct-frame">
    <!-- Specialized Header for Welcome Screen - More visible "Bar" style -->
    <header class="ct-welcome-header">
      <div class="ct-user-tag">
        <div class="ct-user-avatar">
          <v-icon icon="mdi-account" size="20" color="white" />
        </div>
        <div class="ct-user-details">
          <div class="ct-user-name">欧阳祖华</div>
          <div class="ct-user-id">ID: 000001</div>
        </div>
      </div>

      <div class="ct-center-clock">
        <div class="ct-welcome-time">{{ timeText }}</div>
        <div class="ct-welcome-date">{{ dateText }}</div>
      </div>

      <div class="ct-welcome-actions">
        <div class="ct-welcome-action-btn">
          <v-icon icon="mdi-alarm-light-outline" size="24" color="#2B5C8A" />
        </div>
        <div class="ct-welcome-action-btn">
          <v-icon icon="mdi-brightness-7" size="24" color="#2B5C8A" />
        </div>
        <div class="ct-welcome-action-btn">
          <v-icon icon="mdi-monitor-dashboard" size="24" color="#2B5C8A" />
        </div>
        <div class="ct-welcome-action-btn settings">
          <v-icon icon="mdi-cog-outline" size="24" color="#2B5C8A" />
        </div>
      </div>
    </header>

    <main class="ct-welcome-content">
      <h1 class="ct-welcome-title">欢迎使用</h1>

      <div class="ct-mode-grid">
        <!-- Horizontal Mode -->
        <div class="ct-mode-card horizontal" @click="selectMode(SCAN_MODES.HORIZONTAL)">
          <div class="ct-mode-card-icon">
            <svg viewBox="0 0 100 100" class="ct-svg-icon">
              <rect x="25" y="20" width="50" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="4" />
              <circle cx="50" cy="55" r="18" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>
          </div>
          <span class="ct-mode-card-label">水平扫描模式</span>
          <div class="ct-mode-desc">点击进入水平曝光场景</div>
        </div>

        <!-- Vertical Mode -->
        <div class="ct-mode-card vertical" @click="selectMode(SCAN_MODES.VERTICAL)">
          <div class="ct-mode-card-icon">
            <svg viewBox="0 0 100 100" class="ct-svg-icon">
              <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="currentColor" stroke-width="4" />
              <rect x="35" y="60" width="30" height="10" rx="2" fill="currentColor" />
            </svg>
          </div>
          <span class="ct-mode-card-label">垂直扫描模式</span>
          <div class="ct-mode-desc">点击进入垂直曝光场景</div>
        </div>

        <!-- Service Mode -->
        <div class="ct-mode-card service">
          <div class="ct-mode-card-icon">
            <v-icon icon="mdi-cog-play-outline" size="64" />
          </div>
          <span class="ct-mode-card-label">服务与配置</span>
          <div class="ct-mode-desc">系统维护与高级设置</div>
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
  const str = time.value.toLocaleDateString('zh-CN', options);
  return str.replace('星期', '周');
});

const selectMode = (mode: ScanMode) => {
  setTargetMode(mode);
  router.push('/position');
};
</script>

<style scoped>
.ct-welcome-header {
  height: 72px; /* Slightly shorter, more like a standard bar */
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* More solid background to be "visible" as a bar */
  background: linear-gradient(180deg, #D4D8E4 0%, #C1C5D5 100%);
  border-bottom: 1.5px solid #A8B0C4;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.ct-user-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(180, 195, 215, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.ct-user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6A9AC6 0%, #2B5C8A 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(43, 92, 138, 0.2);
}

.ct-user-details {
  display: flex;
  flex-direction: column;
}

.ct-user-name {
  font-size: 13px;
  font-weight: 800;
  color: #263238;
  line-height: 1.2;
}

.ct-user-id {
  font-size: 10px;
  color: #6B7885;
  font-weight: 600;
}

.ct-center-clock {
  text-align: center;
}

.ct-welcome-time {
  font-size: 32px; /* Compressed slightly */
  font-weight: 900;
  color: #263238;
  line-height: 1;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 0 rgba(255,255,255,0.5);
}

.ct-welcome-date {
  font-size: 12px;
  font-weight: 700;
  color: #5A6878;
  margin-top: 2px;
}

.ct-welcome-actions {
  display: flex;
  gap: 8px;
}

.ct-welcome-action-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(180, 195, 215, 0.5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ct-welcome-action-btn:hover {
  background: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.ct-welcome-action-btn.settings:hover {
  transform: translateY(-1px) rotate(45deg);
}

.ct-welcome-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
}

.ct-welcome-title {
  font-size: 64px;
  font-weight: 900;
  color: #2B5C8A;
  margin-bottom: 40px;
  letter-spacing: 0.15em;
  text-shadow: 0 4px 12px rgba(43, 92, 138, 0.1);
  position: relative;
}

.ct-welcome-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 15%;
  right: 15%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #2B5C8A, transparent);
  opacity: 0.6;
}

.ct-mode-grid {
  display: flex;
  gap: 24px;
  padding: 10px;
}

.ct-mode-card {
  width: 260px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #FFFFFF;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.ct-mode-card.horizontal {
  background: linear-gradient(135deg, #2B5C8A 0%, #1E4470 100%);
}

.ct-mode-card.vertical {
  background: linear-gradient(135deg, #607D8B 0%, #455A64 100%);
}

.ct-mode-card.service {
  background: linear-gradient(135deg, #90A4AE 0%, #78909C 100%);
}

.ct-mode-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
}

.ct-mode-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 35%);
}

.ct-mode-card-icon {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.ct-svg-icon {
  width: 72px;
  height: 72px;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
}

.ct-mode-card-label {
  font-size: 20px;
  font-weight: 800;
}

.ct-mode-desc {
  font-size: 13px;
  opacity: 0.7;
}
</style>
