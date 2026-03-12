<template>
  <section class="patient-list-page">
    <div class="patient-list-page__frame">
      <header class="patient-list-page__header">
        <div class="patient-card">
          <div class="patient-card__avatar">
            <v-icon icon="mdi-account-outline" size="34" />
          </div>
          <div class="patient-card__info">
            <div class="patient-card__name">Roky Zhang</div>
            <div class="patient-card__id">ID: 67890</div>
          </div>
          <div class="patient-card__metrics">
            <span>0</span>
            <span>0%</span>
          </div>
        </div>

        <div class="patient-list-page__clock">
          <div class="patient-list-page__time">{{ timeText }}</div>
          <div class="patient-list-page__date">{{ dateText }}</div>
        </div>

        <div class="patient-list-page__icons">
          <v-badge color="error" content="5">
            <v-icon icon="mdi-bell-ring-outline" size="28" color="#E53935" />
          </v-badge>
          <v-icon icon="mdi-sitemap-outline" size="28" color="#607d8b" />
          <v-icon icon="mdi-white-balance-sunny" size="28" color="#607d8b" />
          <v-badge color="error" content="10">
            <v-icon icon="mdi-cog-outline" size="28" color="#607d8b" />
          </v-badge>
        </div>
      </header>

      <section class="patient-list-page__toolbar-panel">
        <div class="patient-list-page__toolbar-top">
          <div class="patient-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              class="patient-tabs__btn"
              :class="{ 'patient-tabs__btn--active': activeTab === tab.value }"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="patient-actions">
            <div class="patient-actions__icon-group">
              <v-btn icon="mdi-refresh" variant="text" size="small" />
              <v-btn icon="mdi-eye-outline" variant="text" size="small" />
              <v-btn icon="mdi-download-outline" variant="text" size="small" />
            </div>

            <v-text-field
              v-model="keyword"
              class="patient-actions__search"
              density="comfortable"
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="搜索患者姓名、ID..."
              variant="outlined"
            />

            <v-btn color="primary" icon="mdi-plus" variant="flat" />
            <v-btn icon="mdi-export-variant" variant="outlined" />
            <v-btn icon="mdi-delete-outline" variant="outlined" />
          </div>
        </div>

        <div class="patient-table-wrap">
          <table class="patient-table">
            <thead>
              <tr>
                <th class="patient-table__check"><input type="checkbox" /></th>
                <th>序号</th>
                <th>患者ID</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>检查类型</th>
                <th>检查状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.patientId">
                <td class="patient-table__check"><input type="checkbox" /></td>
                <td>{{ row.order }}</td>
                <td>{{ row.patientId }}</td>
                <td class="patient-table__name">{{ row.name }}</td>
                <td>{{ row.gender }}</td>
                <td>{{ row.age }}</td>
                <td class="patient-table__type">{{ row.examType }}</td>
                <td>
                  <span class="status-pill" :class="`status-pill--${row.statusType}`">{{ row.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="patient-list-page__table-footer">
          <div class="patient-list-page__footer-left">
            <span>每页显示:</span>
            <v-select
              :items="pageOptions"
              density="compact"
              hide-details
              model-value="10"
              variant="outlined"
              class="patient-list-page__page-size"
            />
            <span>显示 1-8 / 共 12 条记录</span>
          </div>

          <div class="patient-list-page__pager">
            <v-btn icon="mdi-page-first" variant="text" disabled />
            <v-btn icon="mdi-chevron-left" variant="text" disabled />
            <v-btn icon="mdi-chevron-right" variant="text" />
            <v-btn icon="mdi-page-last" variant="text" />
          </div>
        </footer>
      </section>

      <footer class="patient-list-page__bottom-actions">
        <v-btn class="ghost-btn" color="primary" variant="outlined" prepend-icon="mdi-chevron-left">
          上一步
        </v-btn>
        <v-btn class="next-btn" color="primary" variant="flat" append-icon="mdi-chevron-right">
          下一步
        </v-btn>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type Row = {
  order: number;
  patientId: string;
  name: string;
  gender: string;
  age: number;
  examType: string;
  status: string;
  statusType: 'pending' | 'done' | 'stopped';
};

const tabs = [
  { label: '待检查', value: 'pending' },
  { label: '已完成', value: 'done' },
];

const activeTab = ref<'pending' | 'done'>('pending');
const keyword = ref('');
const pageOptions = ['10', '20', '50'];
const now = ref(new Date());
let timer: number | null = null;

const rows: Row[] = [
  { order: 6, patientId: 'P001', name: '张三', gender: '男', age: 45, examType: 'CT胸部扫描', status: '待进行', statusType: 'pending' },
  { order: 6, patientId: 'P002', name: '李四', gender: '女', age: 32, examType: 'MRI头部', status: '已完成', statusType: 'done' },
  { order: 5, patientId: 'P003', name: '王五', gender: '男', age: 28, examType: 'CT腹部', status: '待进行', statusType: 'pending' },
  { order: 5, patientId: 'P004', name: '赵六', gender: '女', age: 55, examType: '螺旋扫描', status: '已终止', statusType: 'stopped' },
  { order: 4, patientId: 'P005', name: '孙七', gender: '男', age: 19, examType: '定位像', status: '待进行', statusType: 'pending' },
  { order: 4, patientId: 'P006', name: '周八', gender: '女', age: 64, examType: 'CT增强', status: '已完成', statusType: 'done' },
  { order: 3, patientId: 'P007', name: '吴九', gender: '男', age: 41, examType: '骨盆扫描', status: '已终止', statusType: 'stopped' },
  { order: 3, patientId: 'P008', name: '郑十', gender: '女', age: 37, examType: '颈椎平扫', status: '待进行', statusType: 'pending' },
];

const filteredRows = computed(() => {
  const statusMap = {
    pending: ['待进行'],
    done: ['已完成', '已终止'],
  } as const;

  return rows.filter((row) => {
    const matchesTab = statusMap[activeTab.value].includes(row.status);
    const query = keyword.value.trim();
    if (!query) return matchesTab;
    return matchesTab && [row.name, row.patientId, row.examType].some((value) => value.includes(query));
  });
});

const timeText = computed(() =>
  now.value.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
);

const dateText = computed(() => {
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.value.getDay()];
  return `${now.value.getMonth() + 1}月${now.value.getDate()}日 ${weekday}`;
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.patient-list-page {
  min-height: calc(100vh - 116px);
  display: flex;
}

.patient-list-page__frame {
  width: min(1360px, 100%);
  margin: 16px auto;
  background: #dfe4ee;
  border: 1px solid #cfd8e8;
  border-radius: 26px;
  box-shadow: 0 12px 38px rgba(111, 132, 167, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.patient-list-page__header {
  min-height: 108px;
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 300px 1fr 260px;
  align-items: center;
  gap: 18px;
  background: #eef2f8;
  border-bottom: 2px solid #b9cbe5;
}

.patient-card {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid #b8cae6;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.45);
}

.patient-card__avatar {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 2px;
  background: #5f7f9d;
  color: #fff;
}

.patient-card__name {
  font-size: 24px;
  font-weight: 700;
  color: #24364c;
}

.patient-card__id {
  margin-top: 4px;
  color: #61778c;
  font-size: 14px;
}

.patient-card__metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #8393a8;
  font-weight: 700;
}

.patient-list-page__clock {
  text-align: center;
}

.patient-list-page__time {
  font-size: 48px;
  line-height: 1;
  font-weight: 800;
  color: #2b3d4f;
}

.patient-list-page__date {
  margin-top: 8px;
  font-size: 14px;
  color: #708398;
}

.patient-list-page__icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 22px;
}

.patient-list-page__toolbar-panel {
  margin: 12px;
  padding: 14px 12px 0;
  border: 1px solid #b8cae6;
  border-radius: 14px;
  background: #f8fafc;
}

.patient-list-page__toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.patient-tabs {
  display: inline-flex;
  padding: 6px;
  border: 1px solid #cdd7e7;
  border-radius: 12px;
  background: #eef2f6;
}

.patient-tabs__btn {
  min-width: 140px;
  height: 42px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #4c8ff0;
  font-size: 16px;
  font-weight: 700;
}

.patient-tabs__btn--active {
  background: #4f8ee9;
  color: #fff;
}

.patient-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.patient-actions__icon-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.patient-actions__search {
  width: 320px;
}

.patient-table-wrap {
  overflow: hidden;
  border: 1px solid #ced8e7;
  border-radius: 0 0 14px 14px;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.patient-table th,
.patient-table td {
  height: 70px;
  padding: 0 20px;
  text-align: left;
  border-bottom: 1px solid #e7edf4;
  color: #33475b;
  font-size: 16px;
}

.patient-table thead th {
  background: #4f8ee9;
  color: #fff;
  font-weight: 700;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
}

.patient-table thead th:last-child {
  border-right: 0;
}

.patient-table__check {
  width: 52px;
}

.patient-table__name {
  font-weight: 700;
}

.patient-table__type {
  color: #71889b;
}

.patient-table input[type='checkbox'] {
  width: 22px;
  height: 22px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 84px;
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid;
}

.status-pill--pending {
  color: #f39c12;
  background: #fff5e8;
  border-color: #f6bf68;
}

.status-pill--done {
  color: #4caf50;
  background: #ebf7ec;
  border-color: #95cf98;
}

.status-pill--stopped {
  color: #ef5350;
  background: #fdeeee;
  border-color: #f4bbbb;
}

.patient-list-page__table-footer {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px 0 16px;
  background: #fff;
  color: #708398;
}

.patient-list-page__footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.patient-list-page__page-size {
  width: 88px;
}

.patient-list-page__pager {
  display: flex;
  align-items: center;
  gap: 2px;
}

.patient-list-page__bottom-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 44px 16px;
  border-top: 2px solid #bfd1e7;
  background: #dfe4ee;
}

.ghost-btn,
.next-btn {
  min-width: 230px;
  height: 72px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
}

.next-btn {
  box-shadow: 0 12px 24px rgba(79, 142, 233, 0.22);
}

@media (max-width: 1500px) {
  .patient-list-page__header {
    grid-template-columns: 300px 1fr 200px;
  }

  .patient-list-page__toolbar-top {
    flex-direction: column;
    align-items: stretch;
  }

  .patient-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}
</style>
