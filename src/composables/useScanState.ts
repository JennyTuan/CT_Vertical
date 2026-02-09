import { computed, ref } from 'vue';
import { SCAN_MODES } from '@/constants/scan';
import type { ScanMode } from '@/types/scan';

const targetMode = ref<ScanMode>(SCAN_MODES.HORIZONTAL);
const currentHwMode = ref<ScanMode>(SCAN_MODES.HORIZONTAL);
const isSyncing = ref(false);
const syncProgress = ref(0);
const currentStep = ref('position');
const time = ref(new Date());

let clockTimer: number | null = null;
let syncTimer: number | null = null;

const startClock = () => {
  if (clockTimer !== null) return;
  clockTimer = window.setInterval(() => {
    time.value = new Date();
  }, 1000);
};

const startSyncing = () => {
  if (isSyncing.value || targetMode.value === currentHwMode.value) return;

  isSyncing.value = true;
  syncProgress.value = 0;

  const duration = 10000; // 10 seconds
  const interval = 100; // Update every 100ms
  const increment = (interval / duration) * 100;

  syncTimer = window.setInterval(() => {
    syncProgress.value += increment;

    if (syncProgress.value >= 100) {
      completeSync();
    }
  }, interval);
};

const stopSyncing = () => {
  if (!isSyncing.value) return;

  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
  }

  if (syncProgress.value < 100) {
    isSyncing.value = false;
    syncProgress.value = 0;
  }
};

const completeSync = () => {
  if (syncTimer) clearInterval(syncTimer);
  syncTimer = null;
  syncProgress.value = 100;
  currentHwMode.value = targetMode.value;
  isSyncing.value = false;
};

const isMatched = computed(
  () => targetMode.value === currentHwMode.value
);

const setTargetMode = (mode: ScanMode) => {
  targetMode.value = mode;
  syncProgress.value = 0;
};

const setCurrentStep = (step: string) => {
  currentStep.value = step;
};

export const useScanState = () => {
  startClock();

  return {
    targetMode,
    currentHwMode,
    isSyncing,
    syncProgress,
    currentStep,
    time,
    isMatched,
    startSyncing,
    stopSyncing,
    setTargetMode,
    setCurrentStep,
  };
};
