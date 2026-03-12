<template>
  <section class="position-view">
    <div class="position-view__header">
      <div>
        <h1 class="position-view__title">体位选择</h1>
        <p class="position-view__desc">把体位选择作为独立页面入口。后续确认弹窗、患者校验弹窗在这个页面内部单独处理。</p>
      </div>
      <div class="position-view__patient">患者方向：头向上</div>
    </div>

    <div class="position-view__content">
      <div class="position-view__grid">
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
            <img class="position-card__image" :class="option.imageClass" :src="option.image" :alt="option.label" />
          </div>
          <div class="position-card__label">{{ option.label }}</div>
        </VCard>
      </div>

      <VCard class="position-preview" rounded="lg" elevation="0">
        <img class="position-preview__image" :src="selectedOrientationImage" alt="体位预览" />
      </VCard>
    </div>

    <div class="position-view__actions">
      <v-btn color="error" variant="flat" @click="goPatients">返回患者列表</v-btn>
      <v-btn color="secondary" variant="flat" @click="goScan">继续进入扫描</v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const positionOptions: PositionOption[] = [
  { value: 'forward', label: '正向', image: FORWARD_IMAGE, previewImage: LARGE_PREVIEW_IMAGE },
  { value: 'reverse', label: '反向', image: REVERSE_IMAGE, imageClass: 'position-card__image--reverse' },
  { value: 'left', label: '左侧', image: LEFT_IMAGE },
  { value: 'right', label: '右侧', image: RIGHT_IMAGE, imageClass: 'position-card__image--right' },
];

const selectedOrientationImage = computed(() => {
  const selected = positionOptions.find((item) => item.value === selectedPosition.value);
  return selected?.previewImage ?? LARGE_PREVIEW_IMAGE;
});

const goPatients = () => {
  router.push('/patients');
};

const goScan = () => {
  router.push('/scan-console');
};
</script>

<style scoped>
.position-view {
  height: 100%;
  padding: 18px 20px 14px;
  background: #dce0ed;
  display: flex;
  flex-direction: column;
}

.position-view__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.position-view__title {
  margin: 0;
  font-size: 30px;
  color: #111;
}

.position-view__desc {
  margin: 8px 0 0;
  color: #63748b;
  font-size: 14px;
}

.position-view__patient {
  font-size: 22px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
}

.position-view__content {
  flex: 1;
  display: grid;
  grid-template-columns: 640px 1fr;
  gap: 24px;
  min-height: 0;
}

.position-view__grid {
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
}

.position-card--active {
  background: #88b0f8;
  border-color: #7ea7f4;
}

.position-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #111;
  font-size: 32px;
  font-weight: 500;
}

.position-preview {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-preview__image {
  width: 100%;
  max-width: 320px;
  max-height: 500px;
  object-fit: contain;
}

.position-view__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
</style>
