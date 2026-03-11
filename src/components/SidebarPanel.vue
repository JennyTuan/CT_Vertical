<template>
  <aside class="ct-sidebar">
    <h2 class="ct-sidebar-title">扫描模式</h2>

    <div class="ct-mode-stack">
      <button
        class="ct-mode-btn"
        :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }"
        @click="emit('update:targetMode', SCAN_MODES.HORIZONTAL)"
      >
        <div class="ct-icon-box" :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }">
          <v-icon size="20" icon="mdi-view-dashboard-outline" />
        </div>
        <div class="ct-btn-label">
          <span class="ct-status-tag" :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }">STATUS: OK</span>
          <span class="ct-mode-name">水平扫描模式</span>
        </div>
      </button>

      <button
        class="ct-mode-btn"
        :class="{ active: targetMode === SCAN_MODES.VERTICAL }"
        @click="emit('update:targetMode', SCAN_MODES.VERTICAL)"
      >
        <div class="ct-icon-box" :class="{ active: targetMode === SCAN_MODES.VERTICAL }">
          <v-icon size="20" icon="mdi-pulse" />
        </div>
        <div class="ct-btn-label">
          <span class="ct-status-tag" :class="{ active: targetMode === SCAN_MODES.VERTICAL }">STATUS: OK</span>
          <span class="ct-mode-name">垂直扫描模式</span>
        </div>
      </button>
    </div>

    <!-- System Ready Tag at bottom -->
    <div class="ct-system-tag">
      <div class="ct-status-dot-container">
        <div class="ct-status-dot"></div>
        <div class="ct-status-dot-ping"></div>
      </div>
      <span class="ct-ready-text">System Ready</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { SCAN_MODES } from '@/constants/scan';
import type { ScanMode } from '@/types/scan';

const props = defineProps<{
  targetMode: ScanMode;
  isSyncing: boolean;
  isMatched: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:targetMode', value: ScanMode): void;
}>();
</script>

<style scoped>
.ct-sidebar {
  width: 200px; /* Reduced from 220px */
  background: #F7F9FC;
  border-right: 1px solid #E2E8F0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.01);
  z-index: 40;
}

.ct-sidebar-title {
  font-size: 9px;
  font-weight: 900;
  color: #8A9EB5;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 4px 4px 12px;
}

.ct-mode-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ct-mode-btn {
  width: 100%;
  padding: 10px; /* Reduced from 12px */
  border-radius: 10px;
  border: 1.5px solid transparent;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
}

.ct-mode-btn.active {
  background: #FFFFFF;
  border-color: #7e9dd2;
  box-shadow: 0 4px 12px rgba(126, 157, 210, 0.15);
}

.ct-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E2E8F0;
  color: #94A3B8;
  flex-shrink: 0;
}

.ct-icon-box.active {
  background: #7e9dd2;
  color: #FFFFFF;
}

.ct-btn-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.ct-status-tag {
  font-size: 8px;
  font-weight: 900;
  color: #CBD5E1;
}

.ct-status-tag.active {
  color: #7e9dd2;
}

.ct-mode-name {
  font-size: 13px;
  font-weight: 700;
  color: #64748B;
}

.ct-mode-btn.active .ct-mode-name {
  color: #1E293B;
}

.ct-system-tag {
  margin-top: auto;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.ct-status-dot-container {
  position: relative;
  width: 8px;
  height: 8px;
}

.ct-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
}

.ct-status-dot-ping {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  opacity: 0.3;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(3);
    opacity: 0;
  }
}

.ct-ready-text {
  font-size: 9px;
  font-weight: 900;
  color: #059669;
  text-transform: uppercase;
}
</style>
