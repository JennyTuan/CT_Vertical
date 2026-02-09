import { computed, ref } from 'vue';
import { SCAN_MODES } from '@/constants/scan';
import type { ScanMode } from '@/types/scan';

const targetMode = ref<ScanMode>(SCAN_MODES.HORIZONTAL);
const currentHwMode = ref<ScanMode>(SCAN_MODES.HORIZONTAL);
const isSyncing = ref(false);
const currentStep = ref('position');
const time = ref(new Date());

let clockTimer: number | null = null;

const startClock = () => {
  if (clockTimer !== null) return;
  clockTimer = window.setInterval(() => {
    time.value = new Date();
  }, 1000);
};

const handleSync = () => {
  if (isSyncing.value) return;
  isSyncing.value = true;
  window.setTimeout(() => {
    currentHwMode.value = targetMode.value;
    isSyncing.value = false;
  }, 1500);
};

const isMatched = computed(
  () => targetMode.value === currentHwMode.value && !isSyncing.value
);

const setTargetMode = (mode: ScanMode) => {
  targetMode.value = mode;
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
    currentStep,
    time,
    isMatched,
    handleSync,
    setTargetMode,
    setCurrentStep,
  };
};
