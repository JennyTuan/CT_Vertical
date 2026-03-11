<template>
  <MainLayout
    :time="time"
    :target-mode="targetMode"
    :is-syncing="isSyncing"
    :is-matched="isMatched"
    :current-step="currentStep"
    :steps="STEPS"
    @update:target-mode="setTargetMode"
  >
    <section class="figma-position-page">
      <div class="figma-position-page__header">
        <h1 class="figma-position-page__title">请选择患者体位</h1>
        <p class="figma-position-page__subtitle">患者方向：{{ patientDirection }}</p>
      </div>

      <div class="figma-position-page__content">
        <div class="figma-position-page__grid">
          <VCard
            v-for="option in positionOptions"
            :key="option.value"
            class="position-card"
            :class="{ 'position-card--active': selectedPosition === option.value }"
            rounded="lg"
            elevation="1"
            @click="selectedPosition = option.value"
          >
            <div class="position-card__media">
              <img
                class="position-card__image"
                :class="option.imageClass"
                :src="option.image"
                :alt="option.label"
              />
            </div>
            <div class="position-card__label">{{ option.label }}</div>
          </VCard>
        </div>

        <VCard class="orientation-card" rounded="lg" elevation="0">
          <img
            class="orientation-card__image"
            :src="selectedOrientationImage"
            alt="患者体位预览"
          />
        </VCard>
      </div>

      <div class="figma-position-page__actions">
        <VBtn
          class="action-btn action-btn--back"
          color="#DE8F8B"
          variant="flat"
          @click="goBack"
        >
          返回
        </VBtn>

        <VBtn
          class="action-btn action-btn--next"
          color="#99CC7E"
          variant="flat"
          @click="goNext"
        >
          继续
        </VBtn>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { STEPS } from '@/constants/scan';
import { useScanState } from '@/composables/useScanState';

type PositionValue = 'forward' | 'reverse' | 'left' | 'right';

type PositionOption = {
  value: PositionValue;
  label: string;
  image: string;
  previewImage?: string;
  imageClass?: string;
};

const FORWARD_IMAGE = 'https://www.figma.com/api/mcp/asset/c30dcab0-ddb6-40fa-b84a-58f584ceb710';
const REVERSE_IMAGE = 'https://www.figma.com/api/mcp/asset/b4e246e1-e327-4185-8d08-fc6dd4de8b6b';
const LEFT_IMAGE = 'https://www.figma.com/api/mcp/asset/2574693d-e9c5-4c1f-b339-50a0651ca209';
const RIGHT_IMAGE = 'https://www.figma.com/api/mcp/asset/573b9c07-e971-40e2-8cf5-36f02a6c40b8';
const LARGE_PREVIEW_IMAGE = 'https://www.figma.com/api/mcp/asset/74ddb96f-bc0b-4c88-a693-6f6af0f0bc97';

const router = useRouter();
const selectedPosition = ref<PositionValue>('forward');
const patientDirection = '头向上';

const {
  targetMode,
  isSyncing,
  isMatched,
  currentStep,
  time,
  setTargetMode,
  setCurrentStep,
} = useScanState();

const positionOptions: PositionOption[] = [
  {
    value: 'forward',
    label: '正向',
    image: FORWARD_IMAGE,
    previewImage: LARGE_PREVIEW_IMAGE,
  },
  {
    value: 'reverse',
    label: '反向',
    image: REVERSE_IMAGE,
    imageClass: 'position-card__image--reverse',
  },
  {
    value: 'left',
    label: '左侧',
    image: LEFT_IMAGE,
  },
  {
    value: 'right',
    label: '右侧',
    image: RIGHT_IMAGE,
    imageClass: 'position-card__image--right',
  },
];

const selectedOrientationImage = computed(() => {
  const selected = positionOptions.find((item) => item.value === selectedPosition.value);
  return selected?.previewImage ?? LARGE_PREVIEW_IMAGE;
});

const goBack = () => {
  router.push('/');
};

const goNext = () => {
  router.push('/scanning');
};

onMounted(() => {
  setCurrentStep('position');
});
</script>

<style scoped>
.figma-position-page {
  height: 100%;
  padding: 14px 20px 12px;
  background: #dce0ed;
  display: flex;
  flex-direction: column;
}

.figma-position-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.figma-position-page__title,
.figma-position-page__subtitle {
  margin: 0;
  color: #111111;
  font-size: 26px;
  line-height: 1.2;
  font-weight: 500;
}

.figma-position-page__subtitle {
  white-space: nowrap;
}

.figma-position-page__content {
  flex: 1;
  display: grid;
  grid-template-columns: 638px 1fr;
  gap: 24px;
  min-height: 0;
}

.figma-position-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-content: start;
}

.position-card {
  height: 216px;
  padding: 18px 18px 12px;
  background: #e1e6f3;
  border: 1px solid rgba(186, 194, 213, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr 112px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.position-card--active {
  background: #88b0f8;
  border-color: #7ea7f4;
}

.position-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.position-card__image {
  width: 150px;
  height: 165px;
  object-fit: contain;
}

.position-card__image--reverse {
  transform: rotate(90deg) scaleY(-1);
}

.position-card__image--right {
  transform: scaleY(-1);
}

.position-card__label {
  justify-self: center;
  color: #111111;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 500;
}

.orientation-card {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 0;
}

.orientation-card__image {
  width: 100%;
  max-width: 308px;
  max-height: 470px;
  object-fit: contain;
}

.figma-position-page__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 4px 10px 0;
}

.action-btn {
  min-width: 96px;
  height: 38px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  box-shadow: none;
}

.action-btn--back :deep(.v-btn__content),
.action-btn--next :deep(.v-btn__content) {
  color: #ffffff;
}

@media (max-width: 960px) {
  .figma-position-page__content {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .orientation-card {
    min-height: 220px;
  }
}
</style>
