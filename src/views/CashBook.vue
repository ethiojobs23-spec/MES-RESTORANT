<template>
  <div class="cashbook-page">
    <main class="stage">
      <div class="phone-shell">
        <div class="app-card">
          <header class="app-header">
            <div class="header-text">
              <h1>Daily CashBook</h1>
              <span>iPhone Mobile Ledger</span>
            </div>
            <div class="header-badge">₹ 15,000 Res.</div>
          </header>

          <div v-if="activeTab === 'home'" class="view-panel home-panel">
            <div class="action-row">
              <button class="action-btn action-expense" @click="openModal('expense')">
                <span>＋</span> Add Expense
              </button>
              <button class="action-btn action-revenue" @click="openModal('revenue')">
                <span>＋</span> Add Revenue
              </button>
            </div>

            <div class="alert-box">
              <div class="alert-icon">!</div>
              <div class="alert-copy">
                <strong>High Unexpected Expenses Alert!</strong>
                <small>Unexpected expenses are at 18.5% of total monthly expenses.</small>
              </div>
            </div>

            <div class="summary-block">
              <div class="mini-header">
                <span>TODAY'S FINANCIAL SUMMARY</span>
                <span>08/17/2026</span>
              </div>

              <div class="metrics-grid">
                <div class="metric-item">
                  <label>Revenue Today</label>
                  <strong>13,000 ETB</strong>
                </div>
                <div class="metric-item">
                  <label>Expenses Today</label>
                  <strong class="danger">6,500 ETB</strong>
                </div>
              </div>

              <div class="net-result">
                <span>Today's Net Result</span>
                <strong>6,500 ETB</strong>
              </div>
            </div>

            <div class="info-row">
              <div class="info-box">
                <label>Unspent Today</label>
                <strong>1,200 ETB</strong>
              </div>
              <div class="info-box">
                <label>Emergency Reserve</label>
                <strong>15,000 ETB</strong>
              </div>
            </div>

            <div class="reserve-panel">
              <div class="reserve-head">
                <div class="reserve-title">
                  <span class="reserve-icon">◔</span>
                  <span>Cash Reserve Protection</span>
                </div>
                <button class="manage-btn">Manage</button>
              </div>
              <div class="progress-wrap">
                <div class="progress-bar">
                  <span style="width: 30%"></span>
                </div>
              </div>
              <div class="reserve-meta">
                <span>Progress: 30%</span>
                <span>Target: 50,000 ETB</span>
              </div>
            </div>

            <div class="stats-strip">
              <div class="stat-box">
                <span>This week</span>
                <strong>13,000</strong>
                <small>Rev</small>
              </div>
              <div class="stat-box">
                <span>This week</span>
                <strong>4,500</strong>
                <small>Exp</small>
              </div>
              <div class="stat-box">
                <span>This week</span>
                <strong>6,500</strong>
                <small>Profit</small>
              </div>
            </div>

            <div class="transactions-box">
              <div class="transactions-head">
                <span>Recent Transactions</span>
                <button>View All Ledger</button>
              </div>

              <ul>
                <li><span>Siga</span><strong class="negative">-3,500 ETB</strong></li>
                <li><span>Zeyit</span><strong class="negative">-1,800 ETB</strong></li>
                <li><span>Emergency repair</span><strong class="negative">-1,200 ETB</strong></li>
              </ul>
            </div>
          </div>

          <div v-else-if="activeTab === 'expense'" class="view-panel form-panel">
            <div class="form-header">
              <button class="form-icon-btn">＋</button>
              <h2>Record Expense</h2>
              <button class="cancel-link" @click="goHome">Cancel</button>
            </div>

            <div class="field-group">
              <label>Date</label>
              <div class="input-wrap date-wrap">
                <input type="date" v-model="expenseForm.date" />
                <span>📅</span>
              </div>
            </div>

            <div class="field-group">
              <label>Expense From</label>
              <select v-model="expenseForm.expense_from">
                <option>Kibe</option>
                <option>Kororima</option>
                <option>Gomen</option>
                <option>Enchet</option>
                <option>Zeyit</option>
                <option>Kitel</option>
                <option>Tikur azmud</option>
                <option>Absh</option>
                <option>Kocho</option>
                <option>Bokolo duket</option>
                <option>Ayib</option>
                <option>Bula</option>
                <option>Siga</option>
                <option>Chew</option>
                <option>Wetet</option>
                <option>Asbeza</option>
                <option>Tekawe pestal</option>
                <option>Sramaskeja wechi</option>
                <option>Yeserategna demoz</option>
                <option>Gebi yekurs ena yemisa</option>
                <option>Gedi yirat</option>
                <option>Total gebi</option>
              </select>
            </div>

            <div class="field-group">
              <label>Amount (ETB)</label>
              <input type="number" v-model.number="expenseForm.amount" placeholder="e.g. 1500" />
            </div>

            <div class="field-group radio-group">
              <label>Expense Type</label>
              <div class="chip-row">
                <button 
                  :class="['chip', { active: expenseForm.expense_type === 'Planned Expense' }]" 
                  @click="expenseForm.expense_type = 'Planned Expense'">
                  Planned Expense
                </button>
                <button 
                  :class="['chip', { active: expenseForm.expense_type === 'Unexpected' }]" 
                  @click="expenseForm.expense_type = 'Unexpected'">
                  Unexpected
                </button>
              </div>
            </div>

            <div class="field-group">
              <label>Note (Optional)</label>
              <input type="text" v-model="expenseForm.note" placeholder="e.g. Staff purchase" />
            </div>

            <button class="save-btn" @click="saveExpense" :disabled="isSaving">
              {{ isSaving ? 'SAVING...' : 'SAVE EXPENSE' }}
            </button>
          </div>

          <div v-else-if="activeTab === 'revenue'" class="view-panel form-panel">
            <div class="form-header">
              <button class="form-icon-btn">＋</button>
              <h2>Record Revenue</h2>
              <button class="cancel-link" @click="goHome">Cancel</button>
            </div>

            <div class="field-group">
              <label>Date</label>
              <div class="input-wrap date-wrap">
                <input type="date" v-model="revenueForm.date" />
                <span>📅</span>
              </div>
            </div>

            <div class="field-group">
              <label>Product / Service</label>
              <select v-model="revenueForm.product_service">
                <option>General Sales</option>
                <option>Service Fee</option>
                <option>Subscription</option>
              </select>
            </div>

            <div class="field-group three-col">
              <div>
                <label>Quantity</label>
                <input type="number" v-model.number="revenueForm.quantity" />
              </div>
              <div>
                <label>Unit Price (ETB)</label>
                <input type="number" v-model.number="revenueForm.unit_price" />
              </div>
            </div>

            <div class="field-group calc-row">
              <label>Calculated Revenue</label>
              <strong>{{ (revenueForm.quantity * revenueForm.unit_price) || 0 }} ETB</strong>
            </div>

            <div class="field-group">
              <label>Customer / Note (Optional)</label>
              <input type="text" v-model="revenueForm.customer_note" placeholder="e.g. Cash sale" />
            </div>

            <button class="save-btn" @click="saveRevenue" :disabled="isSaving">
              {{ isSaving ? 'SAVING...' : 'SAVE REVENUE' }}
            </button>
          </div>

          <div v-else-if="activeTab === 'unexpected'" class="view-panel unexpected-panel">
            <div class="form-header compact-header">
              <button class="form-icon-btn">◌</button>
              <h2>Cash Reserve & Emergency Fund</h2>
            </div>

            <div class="reserve-panel large-panel">
              <div class="reserve-head">
                <div class="reserve-title">
                  <span class="reserve-icon">◔</span>
                  <span>Cash Reserve & Emergency Fund</span>
                </div>
              </div>
              <div class="progress-wrap">
                <div class="progress-bar">
                  <span style="width: 30%"></span>
                </div>
              </div>
              <div class="reserve-meta two-line">
                <div>
                  <span>Progress: 30%</span>
                  <span>Target: 50,000 ETB</span>
                </div>
                <div>
                  <span>Current Reserve</span>
                  <strong>15,000 ETB</strong>
                </div>
              </div>
            </div>

            <div class="field-group small-form">
              <label>Target Reserve (ETB)</label>
              <input type="text" value="50000" />
            </div>

            <div class="field-group small-form">
              <label>Current Reserve (ETB)</label>
              <input type="text" value="15000" />
            </div>

            <div class="field-group small-form">
              <label>Unexpected Wiring Threshold (%)</label>
              <input type="text" value="10" />
            </div>

            <button class="save-btn dark-btn">SAVE RESERVE SETTINGS</button>

            <div class="recorded-card">
              <div class="recorded-head">
                <span>Recorded Unexpected Expenses</span>
              </div>
              <div class="recorded-item">
                <span>Emergency repair (Emergency repair)</span>
                <strong>-1,200 ETB</strong>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'reports'" class="view-panel reports-panel">
            <div class="form-header compact-header">
              <button class="form-icon-btn">◌</button>
              <h2>Financial Performance & Profit</h2>
            </div>

            <div class="report-metrics">
              <div class="report-row">
                <span>Total Revenue</span>
                <strong>13,000 ETB</strong>
              </div>
              <div class="report-row">
                <span>Expenses</span>
                <strong>6,500 ETB</strong>
              </div>
              <div class="report-row highlight-row">
                <span>Overall Net Profit</span>
                <strong>6,500 ETB</strong>
              </div>
            </div>

            <div class="export-box">
              <button class="export-btn" @click="exportCSV">Export to CSV Spreadsheet</button>
              <button class="export-btn light-btn" @click="exportJSON">Download Complete Backup (.json)</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <nav class="bottom-nav" aria-label="Tab navigation">
      <button v-for="tab in navigationTabs" :key="tab.key" :class="['nav-item', { active: activeTab === tab.key }]" @click="goTo(tab.key)">
        <span class="nav-icon">{{ tab.icon }}</span>
        <small>{{ tab.label }}</small>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CashBook',
  data() {
    return {
      modalType: null,
      expenses: [],
      revenues: [],
      isSaving: false,
      expenseForm: {
        date: new Date().toISOString().split('T')[0],
        expense_from: 'Kibe',
        amount: '',
        expense_type: 'Planned Expense',
        note: ''
      },
      revenueForm: {
        date: new Date().toISOString().split('T')[0],
        product_service: 'General Sales',
        quantity: 1,
        unit_price: '',
        customer_note: ''
      },
      navigationTabs: [
        { key: 'home', label: 'Home', icon: '⌂' },
        { key: 'expense', label: 'Expense', icon: '↘' },
        { key: 'revenue', label: 'Revenue', icon: '↗' },
        { key: 'unexpected', label: 'Unexpected', icon: '⚠' },
        { key: 'reports', label: 'Reports', icon: '▣' }
      ]
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    activeTab() {
      const path = this.$route.path || '/'
      if (path === '/expense') return 'expense'
      if (path === '/revenue') return 'revenue'
      if (path === '/unexpected') return 'unexpected'
      if (path === '/reports') return 'reports'
      return 'home'
    }
  },
  methods: {
    goTo(tab) {
      const map = {
        home: '/',
        expense: '/expense',
        revenue: '/revenue',
        unexpected: '/unexpected',
        reports: '/reports'
      }
      this.$router.push(map[tab])
      this.modalType = null
    },
    goHome() {
      this.$router.push('/')
      this.modalType = null
    },
    openModal(type) {
      this.modalType = type
      this.goTo(type)
    },
    async fetchData() {
      try {
        const [expRes, revRes] = await Promise.all([
          fetch('/api/expenses').then(r => r.json()),
          fetch('/api/revenues').then(r => r.json())
        ]);
        this.expenses = Array.isArray(expRes) ? expRes : [];
        this.revenues = Array.isArray(revRes) ? revRes : [];
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },
    async saveExpense() {
      if (!this.expenseForm.amount) return alert('Please enter an amount.');
      this.isSaving = true;
      try {
        await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.expenseForm)
        });
        alert('Expense saved successfully!');
        this.expenseForm.amount = '';
        this.expenseForm.note = '';
        this.fetchData();
        this.goHome();
      } catch (err) {
        alert('Error saving expense.');
      } finally {
        this.isSaving = false;
      }
    },
    async saveRevenue() {
      if (!this.revenueForm.unit_price) return alert('Please enter a unit price.');
      this.isSaving = true;
      try {
        await fetch('/api/revenues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.revenueForm)
        });
        alert('Revenue saved successfully!');
        this.revenueForm.unit_price = '';
        this.revenueForm.customer_note = '';
        this.fetchData();
        this.goHome();
      } catch (err) {
        alert('Error saving revenue.');
      } finally {
        this.isSaving = false;
      }
    },
    exportCSV() {
      const csvContent = "Date,Type,Category,Amount\n2026-08-19,Revenue,Food,500\n2026-08-19,Expense,Supply,200";
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    exportJSON() {
      const data = { expenses: this.expenses, revenues: this.revenues };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", "backup.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
.cashbook-page {
  min-height: 100vh;
  background: #0c1d31;
  display: flex;
  flex-direction: column;
  color: #15314f;
}

.stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 16px;
}

.phone-shell {
  width: 100%;
  display: flex;
  justify-content: center;
}

.app-card {
  width: 100%;
  max-width: 320px;
  min-height: 520px;
  background: #f3f2f2;
  border-radius: 16px 16px 12px 12px;
  padding: 0;
  position: relative;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.25);
}

.app-header {
  background: linear-gradient(180deg, #0d8b6d 0%, #0a7d64 100%);
  color: white;
  padding: 12px 14px 10px;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-text h1 {
  font-size: 1.1rem;
  font-weight: 700;
}

.header-text span {
  font-size: 0.52rem;
  opacity: 0.9;
}

.header-badge {
  font-size: 0.52rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 6px;
}

.view-panel {
  padding: 14px 14px 0;
}

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.action-btn {
  border: none;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-expense {
  background: #f7f3f3;
  color: #1a7a5b;
  border: 1px solid #d5efe1;
}

.action-revenue {
  background: #eefbf5;
  color: #1a8d64;
  border: 1px solid #d5efe1;
}

.alert-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff5ee;
  border-radius: 10px;
  border: 1px solid #f4d3be;
  padding: 8px 9px;
  margin-bottom: 12px;
}

.alert-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffb73f;
  color: white;
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 700;
}

.alert-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.alert-copy strong {
  font-size: 0.66rem;
  color: #6b3a00;
}

.alert-copy small {
  font-size: 0.5rem;
  color: #8d5e1a;
}

.summary-block {
  background: #ffffff;
  border: 1px solid #eef1f4;
  border-radius: 12px;
  padding: 10px 12px 8px;
  margin-bottom: 10px;
}

.mini-header,
.transactions-head,
.reserve-head,
.reserve-meta,
.report-row,
.recorded-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mini-header {
  font-size: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #687387;
  margin-bottom: 8px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metric-item label,
.info-box label,
.stat-box span,
.recorded-head,
.report-row span,
.field-group label {
  font-size: 0.58rem;
  color: #647083;
}

.metric-item strong,
.info-box strong,
.stat-box strong,
.report-row strong,
.recorded-item strong {
  font-size: 0.72rem;
  color: #1d2c43;
}

.danger {
  color: #db3d3d !important;
}

.net-result {
  background: linear-gradient(180deg, #1aa87d 0%, #0e9a71 100%);
  color: white;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  margin-top: 6px;
  font-size: 0.58rem;
}

.net-result strong {
  color: white;
  font-size: 0.76rem;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
}

.info-box {
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.reserve-panel {
  background: white;
  border: 1px solid #edf0f5;
  border-radius: 12px;
  padding: 8px 10px 10px;
  margin-bottom: 10px;
}

.reserve-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6rem;
  font-weight: 600;
  color: #1b2d41;
}

.reserve-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eefaf5;
  color: #1a8d64;
  font-size: 0.7rem;
}

.manage-btn,
.transactions-head button,
.cancel-link {
  border: none;
  background: transparent;
  color: #1a7a5b;
  font-size: 0.54rem;
  font-weight: 700;
  cursor: pointer;
}

.progress-wrap {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #eef2f7;
  overflow: hidden;
  margin: 8px 0;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #58d092, #9feec2);
}

.progress-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #6dcf8f, #8fe0aa);
}

.reserve-meta {
  font-size: 0.52rem;
  color: #687387;
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}

.stat-box {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #edf0f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 4px;
}

.stat-box strong {
  margin: 2px 0;
  font-size: 0.62rem;
}

.stat-box small {
  font-size: 0.52rem;
  color: #647083;
}

.transactions-box {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #edf0f5;
  border-radius: 10px;
  padding: 9px 10px 6px;
}

.transactions-head {
  margin-bottom: 6px;
  font-size: 0.58rem;
  color: #4a5668;
  font-weight: 700;
}

.transactions-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.transactions-box li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-top: 1px solid #eef1f6;
  font-size: 0.58rem;
}

.transactions-box li:first-child {
  border-top: none;
}

.negative {
  color: #d95555;
}

.form-panel {
  padding-top: 14px;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
}

.form-header h2 {
  font-size: 0.88rem;
  color: #1f2a3d;
}

.form-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #dfe7ef;
  background: #fff;
  color: #1b7b5b;
  font-weight: 700;
  cursor: pointer;
}

.compact-header {
  justify-content: flex-start;
  gap: 8px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.input-wrap,
select,
input {
  width: 100%;
  border: 1px solid #dde5ee;
  background: #f9fafb;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.72rem;
  color: #20314d;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
}

.input-wrap input,
select,
input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font: inherit;
  color: inherit;
}

.date-wrap span {
  color: #7a879e;
}

.radio-group .chip-row {
  display: flex;
  gap: 8px;
}

.chip {
  flex: 1;
  border-radius: 999px;
  border: 1px solid #dfe6ef;
  background: #f3f7fa;
  padding: 7px 10px;
  font-size: 0.55rem;
  color: #47586f;
  cursor: pointer;
}

.chip.active {
  background: #dff8ef;
  color: #0d9668;
  border-color: #b8ecd8;
}

.three-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.calc-row {
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
  background: #f8fafb;
  border: 1px solid #e5ebf1;
  border-radius: 8px;
  padding: 8px 10px;
}

.calc-row strong {
  color: #0b7f63;
  font-size: 0.7rem;
}

.save-btn {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: linear-gradient(180deg, #1aa87d 0%, #0e9a71 100%);
  color: white;
  padding: 12px 10px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  margin-top: 6px;
}

.dark-btn {
  background: linear-gradient(180deg, #1e2a38 0%, #18262f 100%);
}

.unexpected-panel,
.reports-panel {
  padding-bottom: 16px;
}

.large-panel {
  margin-bottom: 12px;
}

.reserve-meta.two-line {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
}

.reserve-meta.two-line > div {
  display: flex;
  justify-content: space-between;
}

.small-form {
  margin-bottom: 8px;
}

.recorded-card {
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 10px;
  margin-top: 12px;
  padding: 8px 10px;
}

.recorded-head {
  font-size: 0.56rem;
  color: #54627a;
  margin-bottom: 6px;
}

.recorded-item {
  font-size: 0.56rem;
  color: #20314d;
}

.report-metrics {
  background: white;
  border: 1px solid #edf0f5;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
}

.report-row {
  padding: 9px 10px;
  border-bottom: 1px solid #edf0f5;
}

.report-row:last-child {
  border-bottom: none;
}

.highlight-row {
  background: #edfff6;
}

.export-box {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.export-btn {
  width: 100%;
  color: #116c5d;
  background: #ecfff7;
  border: 1px solid #c8efe0;
  border-radius: 10px;
  padding: 9px 10px;
  font-size: 0.58rem;
  font-weight: 700;
  cursor: pointer;
}

.light-btn {
  background: #f9fafb;
  border-color: #e1e7ee;
  color: #45556b;
}

.bottom-nav {
  width: 100%;
  background: rgba(7, 18, 30, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 10px 10px 14px;
}

.nav-item {
  width: 52px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 0 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.nav-item .nav-icon {
  font-size: 1rem;
  line-height: 1;
}

.nav-item small {
  font-size: 0.46rem;
  letter-spacing: 0.02em;
}

.nav-item.active {
  color: #7ee1b0;
}

.nav-item.active .nav-icon {
  background: rgba(126, 225, 176, 0.18);
  border-radius: 6px;
  padding: 1px 4px;
}

@media (max-width: 480px) {
  .app-card {
    max-width: 86vw;
    min-height: 500px;
  }
}
</style>
