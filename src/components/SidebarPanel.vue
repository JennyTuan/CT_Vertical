<template>
  <aside class="ct-sidebar">
    <h2 class="ct-sidebar-title">模式设置</h2>

    <button
      class="ct-mode-button"
      :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }"
      @click="emit('update:targetMode', SCAN_MODES.HORIZONTAL)"
    >
      <div class="ct-mode-icon">
        <v-icon size="24" icon="mdi-view-dashboard" />
      </div>
      <span>水平扫描模式</span>
    </button>

    <button
      class="ct-mode-button"
      :class="{ active: targetMode === SCAN_MODES.VERTICAL }"
      @click="emit('update:targetMode', SCAN_MODES.VERTICAL)"
    >
      <div class="ct-mode-icon">
        <v-icon size="24" icon="mdi-pulse" />
      </div>
      <span>垂直扫描模式</span>
    </button>

    <div class="ct-sync">
      <div class="ct-sync-dot" :class="syncClass"></div>
      <span>{{ statusText }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const syncClass = computed(() => ({
  syncing: props.isSyncing,
  matched: props.isMatched && !props.isSyncing,
  mismatch: !props.isMatched && !props.isSyncing,
}));

const statusText = computed(() => {
  if (props.isSyncing) return '同步中...';
  if (props.isMatched) return '硬件已锁定就绪';
  return '模式不一致';
});
</script>

<style scoped>
.ct-sidebar {
  width: 256px;
  background: #FFFFFF;
  border-right: 1px solid #CFD8DC;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ct-sidebar-title {
  font-size: 11px;
  font-weight: 600;
  color: #78909C;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 8px 8px;
  font-family: 'Roboto', sans-serif;
}

.ct-mode-button {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 2px solid #CFD8DC;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #455A64;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
}

.ct-mode-button:hover:not(.active) {
  border-color: #90CAF9;
  background: #E3F2FD;
}

.ct-mode-button.active {
  border-color: #1976D2;
  background: #E3F2FD;
  color: #1976D2;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);
}

.ct-mode-icon {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ECEFF1;
  color: #78909C;
  flex-shrink: 0;
}

.ct-mode-button.active .ct-mode-icon {
  background: #1976D2;
  color: #FFFFFF;
}

.ct-sync {
  margin-top: auto;
  padding: 12px;
  border-radius: 4px;
  background: #F5F7FA;
  border: 1px solid #CFD8DC;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #546E7A;
  min-height: 48px;
  font-family: 'Roboto', sans-serif;
}

.ct-sync-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ED6C02;
  position: relative;
  flex-shrink: 0;
}

.ct-sync-dot.syncing {
  background: #1976D2;
  animation: pulse 1s infinite;
}

.ct-sync-dot.matched {
  background: #2E7D32;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.5);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
}
</style>
