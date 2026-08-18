<template>
  <div class="view-container report-view">
    <header class="page-header">
      <h1>📊 Reports & Analytics</h1>
      <p>Detailed business analytics and performance metrics</p>
    </header>

    <main class="content-section">
      <div class="report-controls">
        <button 
          v-for="period in periods" 
          :key="period.id"
          @click="activePeriod = period.id"
          :class="{ active: activePeriod === period.id }"
          class="period-btn"
        >
          {{ period.label }}
        </button>
      </div>

      <div class="reports-grid">
        <!-- Sales Report -->
        <div class="card report-card">
          <div class="card-header">
            <h3>💰 Sales Report</h3>
            <span class="period">{{ activePeriodLabel }}</span>
          </div>
          <div class="chart-placeholder">
            <div class="chart-bar" v-for="i in 7" :key="`sales-${i}`" :style="{ height: (Math.random() * 80 + 20) + '%' }"></div>
          </div>
          <div class="stats-row">
            <div class="stat">
              <span class="label">Total Revenue</span>
              <span class="value">₹45,320</span>
            </div>
            <div class="stat">
              <span class="label">Avg Order</span>
              <span class="value">₹890</span>
            </div>
          </div>
        </div>

        <!-- Customer Report -->
        <div class="card report-card">
          <div class="card-header">
            <h3>👥 Customer Analytics</h3>
            <span class="period">{{ activePeriodLabel }}</span>
          </div>
          <div class="metric-box">
            <div class="metric">
              <span class="metric-value">1,245</span>
              <span class="metric-label">Total Customers</span>
            </div>
            <div class="metric">
              <span class="metric-value">342</span>
              <span class="metric-label">New Customers</span>
            </div>
            <div class="metric">
              <span class="metric-value">89%</span>
              <span class="metric-label">Retention Rate</span>
            </div>
          </div>
        </div>

        <!-- Order Report -->
        <div class="card report-card">
          <div class="card-header">
            <h3>📦 Order Statistics</h3>
            <span class="period">{{ activePeriodLabel }}</span>
          </div>
          <div class="order-stats">
            <div class="order-stat">
              <span class="order-value">512</span>
              <span class="order-label">Total Orders</span>
            </div>
            <div class="order-stat">
              <span class="order-value">485</span>
              <span class="order-label">Completed</span>
            </div>
            <div class="order-stat">
              <span class="order-value">27</span>
              <span class="order-label">Pending</span>
            </div>
          </div>
        </div>

        <!-- Top Items -->
        <div class="card report-card full-width">
          <div class="card-header">
            <h3>⭐ Top Selling Items</h3>
          </div>
          <div class="items-list">
            <div v-for="(item, index) in topItems" :key="index" class="item-row">
              <span class="rank">#{{ index + 1 }}</span>
              <span class="name">{{ item.name }}</span>
              <span class="sales">{{ item.sales }} sold</span>
              <div class="progress">
                <div class="progress-bar" :style="{ width: (item.sales / 200 * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Report Section -->
      <div class="card detail-card">
        <h2>📈 Detailed Performance Metrics</h2>
        <div class="metrics-table">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current Period</th>
                <th>Previous Period</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Revenue</td>
                <td>₹45,320</td>
                <td>₹42,150</td>
                <td class="positive">↑ 7.5%</td>
              </tr>
              <tr>
                <td>Total Orders</td>
                <td>512</td>
                <td>487</td>
                <td class="positive">↑ 5.1%</td>
              </tr>
              <tr>
                <td>Avg Order Value</td>
                <td>₹890</td>
                <td>₹865</td>
                <td class="positive">↑ 2.9%</td>
              </tr>
              <tr>
                <td>Customer Satisfaction</td>
                <td>4.6/5</td>
                <td>4.4/5</td>
                <td class="positive">↑ 4.5%</td>
              </tr>
              <tr>
                <td>Item Turnover Rate</td>
                <td>3.2x</td>
                <td>3.0x</td>
                <td class="positive">↑ 6.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data() {
    return {
      activePeriod: 'week',
      periods: [
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'quarter', label: 'This Quarter' },
        { id: 'year', label: 'This Year' }
      ],
      topItems: [
        { name: 'Margherita Pizza', sales: 185 },
        { name: 'Chicken Biryani', sales: 168 },
        { name: 'Caesar Salad', sales: 142 },
        { name: 'Garlic Bread', sales: 128 },
        { name: 'Paneer Tikka', sales: 115 }
      ]
    }
  },
  computed: {
    activePeriodLabel() {
      return this.periods.find(p => p.id === this.activePeriod)?.label || 'This Week'
    }
  }
}
</script>

<style scoped>
.report-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding-bottom: 40px;
}

.page-header {
  padding: 40px 20px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
}

.page-header p {
  margin-top: 10px;
  opacity: 0.9;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.report-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.period-btn {
  padding: 10px 20px;
  background: white;
  border: 2px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
}

.period-btn.active,
.period-btn:hover {
  background: #f5576c;
  color: white;
  border-color: #f5576c;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.report-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.report-card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f5f5f5;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.period {
  background: #f5f5f5;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #666;
}

.chart-placeholder {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 150px;
  margin-bottom: 20px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #f093fb, #f5576c);
  border-radius: 5px;
  min-height: 20px;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding-top: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat .label {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 5px;
}

.stat .value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

.metric-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.metric {
  text-align: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
}

.metric-value {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: #f5576c;
  margin-bottom: 5px;
}

.metric-label {
  display: block;
  font-size: 0.85rem;
  color: #666;
}

.order-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.order-stat {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  border-radius: 10px;
}

.order-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.order-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.95;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item-row {
  display: grid;
  grid-template-columns: 40px 200px 100px 1fr;
  gap: 15px;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
}

.rank {
  font-weight: bold;
  color: #f5576c;
  text-align: center;
}

.name {
  color: #333;
  font-weight: 600;
}

.sales {
  color: #666;
  text-align: right;
}

.progress {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #f093fb, #f5576c);
}

.detail-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.detail-card h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 25px;
}

.metrics-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f9f9f9;
}

th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
}

tbody tr:hover {
  background: #fafafa;
}

.positive {
  color: #4caf50;
  font-weight: 600;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.8rem;
  }

  .reports-grid {
    grid-template-columns: 1fr;
  }

  .item-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .metric-box {
    grid-template-columns: 1fr;
  }

  .order-stats {
    grid-template-columns: 1fr;
  }
}
</style>
