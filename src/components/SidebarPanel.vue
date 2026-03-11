<template>
  <aside class="ct-sidebar">
    <h2 class="ct-sidebar-title">扫描模式</h2>

    <button
      class="ct-mode-button"
      :class="{ active: targetMode === SCAN_MODES.HORIZONTAL }"
      @click="emit('update:targetMode', SCAN_MODES.HORIZONTAL)"
    >
      <div class="ct-mode-icon">
        <v-icon size="20" icon="mdi-view-dashboard" />
      </div>
      <span>水平扫描模式</span>
    </button>

    <button
      class="ct-mode-button"
      :class="{ active: targetMode === SCAN_MODES.VERTICAL }"
      @click="emit('update:targetMode', SCAN_MODES.VERTICAL)"
    >
      <div class="ct-mode-icon">
        <v-icon size="20" icon="mdi-pulse" />
      </div>
      <span>垂直扫描模式</span>
    </button>

    <div class="ct-sync" :class="syncClass">
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
  background: #F5F7FA;
  border-right: 1px solid #CDD3DB;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ct-sidebar-title {
  font-size: 10px;
  font-weight: 700;
  color: #8A9BB0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0 6px 6px;
  font-family: 'Roboto', sans-serif;
  border-bottom: 1px solid #DDE2EA;
  margin-bottom: 2px;
}

.ct-mode-button {
  width: 100%;
  min-height: 52px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #D0D9E4;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #4A5A6B;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.ct-mode-button:hover:not(.active) {
  border-color: #8AAFCE;
  background: #EEF4FA;
  box-shadow: 0 2px 6px rgba(43, 92, 138, 0.08);
}

.ct-mode-button.active {
  border-color: #2B5C8A;
  background: #EEF4FA;
  color: #2B5C8A;
  box-shadow: 0 2px 8px rgba(43, 92, 138, 0.15), inset 0 0 0 1px rgba(43, 92, 138, 0.1);
}

.ct-mode-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EDF2F7;
  color: #7094BA;
  flex-shrink: 0;
  border: 1px solid #DDE2EA;
  transition: all 0.2s ease;
}

.ct-mode-button.active .ct-mode-icon {
  background: #2B5C8A;
  color: #FFFFFF;
  border-color: #1E4470;
}

.ct-sync {
  margin-top: auto;
  padding: 10px 12px;
  border-radius: 8px;
  background: #FFF8F0;
  border: 1px solid #F0C090;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #7A5A30;
  min-height: 44px;
  font-family: 'Roboto', sans-serif;
  transition: all 0.3s ease;
}

.ct-sync.syncing {
  background: #EEF4FA;
  border-color: #90B8D8;
  color: #2B5C8A;
}

.ct-sync.matched {
  background: #F0FAF2;
  border-color: #90CCA0;
  color: #2E7D32;
}

.ct-sync-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #D68534;
  position: relative;
  flex-shrink: 0;
}

.ct-sync-dot.syncing {
  background: #2B5C8A;
  animation: pulse 1s infinite;
}

.ct-sync-dot.matched {
  background: #2E7D32;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(43, 92, 138, 0.5); }
  100% { box-shadow: 0 0 0 8px rgba(43, 92, 138, 0); }
}
</style>
