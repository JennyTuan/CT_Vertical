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
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ct-sidebar-title {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 0 8px 6px;
}

.ct-mode-button {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #f1f5f9;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 13px;
  color: #334155;
  transition: all 0.2s ease;
  cursor: pointer;
}

.ct-mode-button.active {
  border-color: #1e88e5;
  background: #eff6ff;
  box-shadow: 0 6px 16px rgba(30, 136, 229, 0.15);
}

.ct-mode-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #94a3b8;
}

.ct-mode-button.active .ct-mode-icon {
  background: #1e88e5;
  color: #ffffff;
}

.ct-sync {
  margin-top: auto;
  padding: 12px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
}

.ct-sync-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #f97316;
  position: relative;
}

.ct-sync-dot.syncing {
  background: #3b82f6;
  animation: pulse 1s infinite;
}

.ct-sync-dot.matched {
  background: #22c55e;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.45);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
  }
}
</style>
