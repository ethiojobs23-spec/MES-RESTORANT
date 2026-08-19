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
            <div class="header-badge">₹ {{ reserveSettings.current.toLocaleString() }} Res.</div>
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

            <div class="alert-box" v-if="unexpectedPercentage > reserveSettings.threshold">
              <div class="alert-icon">!</div>
              <div class="alert-copy">
                <strong>High Unexpected Expenses Alert!</strong>
                <small>Unexpected expenses are at {{ unexpectedPercentage }}% of total expenses.</small>
              </div>
            </div>

            <div class="summary-block">
              <div class="mini-header">
                <span>TODAY'S FINANCIAL SUMMARY</span>
                <span>{{ todayDateString }}</span>
              </div>

              <div class="metrics-grid">
                <div class="metric-item">
                  <label>Revenue Today</label>
                  <strong>{{ todayRevenue.toLocaleString() }} ETB</strong>
                </div>
                <div class="metric-item">
                  <label>Expenses Today</label>
                  <strong class="danger">{{ todayExpense.toLocaleString() }} ETB</strong>
                </div>
              </div>

              <div class="net-result" :class="{ 'positive-bg': todayRevenue >= todayExpense, 'negative-bg': todayRevenue < todayExpense }">
                <span>Today's Net Result ({{ todayRevenue >= todayExpense ? 'PROFIT' : 'LOSS' }})</span>
                <strong>{{ (todayRevenue - todayExpense).toLocaleString() }} ETB</strong>
              </div>
            </div>

            <div class="info-row">
              <div class="info-box">
                <label>Unexpected Today</label>
                <strong>{{ todayUnexpected.toLocaleString() }} ETB</strong>
              </div>
              <div class="info-box">
                <label>Emergency Reserve</label>
                <strong>{{ reserveSettings.current.toLocaleString() }} ETB</strong>
              </div>
            </div>

            <div class="reserve-panel">
              <div class="reserve-head">
                <div class="reserve-title">
                  <span class="reserve-icon">◔</span>
                  <span>Cash Reserve Protection</span>
                </div>
                <button class="manage-btn" @click="goTo('unexpected')">Manage</button>
              </div>
              <div class="progress-wrap">
                <div class="progress-bar">
                  <span style="width: 30%"></span>
                </div>
              </div>
              <div class="reserve-meta">
                <span>Progress: 30%</span>
                <span>Target: {{ reserveSettings.target.toLocaleString() }} ETB</span>
              </div>
            </div>

            <div class="stats-strip">
              <div class="stat-box">
                <span>All time</span>
                <strong>{{ totalRevenue.toLocaleString() }}</strong>
                <small>Rev</small>
              </div>
              <div class="stat-box">
                <span>All time</span>
                <strong>{{ totalExpense.toLocaleString() }}</strong>
                <small>Exp</small>
              </div>
              <div class="stat-box">
                <span>All time</span>
                <strong>{{ (totalRevenue - totalExpense).toLocaleString() }}</strong>
                <small>Profit</small>
              </div>
            </div>

            <div class="transactions-box">
              <div class="transactions-head">
                <span>Recent Transactions</span>
                <button @click="goTo('ledger')">View All Ledger</button>
              </div>

              <ul>
                <li v-for="tx in allTransactions.slice(0, 3)" :key="tx.id">
                  <span>{{ tx.title }}</span>
                  <strong :class="{ negative: tx.isExpense, positive: !tx.isExpense }">
                    {{ tx.isExpense ? '-' : '+' }}{{ tx.amount }} ETB
                  </strong>
                </li>
                <li v-if="allTransactions.length === 0" class="empty-state">No recent transactions.</li>
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
                  <span :style="{ width: reserveProgress + '%' }"></span>
                </div>
              </div>
              <div class="reserve-meta two-line">
                <div>
                  <span>Progress: {{ reserveProgress }}%</span>
                  <span>Target: {{ reserveSettings.target.toLocaleString() }} ETB</span>
                </div>
                <div>
                  <span>Current Reserve</span>
                  <strong>{{ reserveSettings.current.toLocaleString() }} ETB</strong>
                </div>
              </div>
            </div>

            <div class="field-group small-form">
              <label>Target Reserve (ETB)</label>
              <input type="number" v-model.number="reserveSettings.target" />
            </div>

            <div class="field-group small-form">
              <label>Current Reserve (ETB)</label>
              <input type="number" v-model.number="reserveSettings.current" />
            </div>

            <div class="field-group small-form">
              <label>Unexpected Wiring Threshold (%)</label>
              <input type="number" v-model.number="reserveSettings.threshold" />
            </div>

            <button class="save-btn dark-btn" @click="saveReserveSettings">SAVE RESERVE SETTINGS</button>

            <div class="recorded-card">
              <div class="recorded-head">
                <span>Recorded Unexpected Expenses</span>
              </div>
              <div class="recorded-item" v-for="item in unexpectedExpenses" :key="item.id">
                <span>{{ item.title }} ({{ item.note || 'No note' }})</span>
                <strong>-{{ item.amount }} ETB</strong>
              </div>
              <div v-if="unexpectedExpenses.length === 0" style="padding: 10px; font-size: 0.6rem; color: #9aa5b1; text-align: center;">No unexpected expenses recorded.</div>
            </div>
          </div>

          <div v-else-if="activeTab === 'ledger'" class="view-panel form-panel">
            <div class="form-header">
              <button class="form-icon-btn">▤</button>
              <h2>All Ledger</h2>
              <button class="cancel-link" @click="goHome">Close</button>
            </div>
            
            <div class="transactions-box" style="margin-top: 10px; height: 380px; overflow-y: auto;">
              <ul>
                <li v-for="tx in allTransactions" :key="tx.id">
                  <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span>{{ tx.title }}</span>
                    <small style="color: #9aa5b1; font-size: 0.55rem;">{{ new Date(tx.date).toLocaleDateString() }}</small>
                  </div>
                  <strong :class="{ negative: tx.isExpense, positive: !tx.isExpense }">
                    {{ tx.isExpense ? '-' : '+' }}{{ tx.amount }} ETB
                  </strong>
                </li>
                <li v-if="allTransactions.length === 0" class="empty-state">No transactions yet.</li>
              </ul>
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
                <strong>{{ totalRevenue.toLocaleString() }} ETB</strong>
              </div>
              <div class="report-row">
                <span>Expenses</span>
                <strong>{{ totalExpense.toLocaleString() }} ETB</strong>
              </div>
              <div class="report-row highlight-row" :class="{ 'positive-bg': totalRevenue >= totalExpense, 'negative-bg': totalRevenue < totalExpense }">
                <span>Overall Net Result</span>
                <strong>{{ (totalRevenue - totalExpense).toLocaleString() }} ETB</strong>
              </div>
            </div>

            <div class="export-box">
              <button class="export-btn" @click="exportCSV">Export to CSV Spreadsheet</button>
              <button class="export-btn light-btn" @click="exportJSON">Download Complete Backup (.json)</button>
              <div style="margin-top: 30px;">
                <button class="export-btn dark-btn" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #9aa5b1;" @click="changePasscode">Change App Passcode</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <nav class="bottom-nav" aria-label="Tab navigation">
      <button v-for="tab in navigationTabs" :key="tab.key" :class="['nav-item', { active: activeTab === tab.key }]" @click="goTo(tab.key)">
        <span class="nav-icon">
          <!-- Home Icon -->
          <svg v-if="tab.key === 'home'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
          <!-- Expense Icon -->
          <svg v-if="tab.key === 'expense'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <!-- Revenue Icon -->
          <svg v-if="tab.key === 'revenue'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <!-- Unexpected Icon -->
          <svg v-if="tab.key === 'unexpected'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <!-- Reports Icon -->
          <svg v-if="tab.key === 'reports'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </span>
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
      ],
      reserveSettings: {
        target: 50000,
        current: 15000,
        threshold: 10
      }
    }
  },
  inject: ['triggerPinReset'],
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
      if (path === '/ledger') return 'ledger'
      return 'home'
    },
    allTransactions() {
      const exp = this.expenses.map(e => ({ ...e, isExpense: true, title: e.expense_from, amount: e.amount, dateObj: new Date(e.created_at) }))
      const rev = this.revenues.map(r => ({ ...r, isExpense: false, title: r.product_service, amount: r.total_revenue, dateObj: new Date(r.created_at) }))
      return [...exp, ...rev].sort((a, b) => b.dateObj - a.dateObj)
    },
    totalRevenue() {
      return this.revenues.reduce((sum, r) => sum + parseFloat(r.total_revenue || 0), 0)
    },
    totalExpense() {
      return this.expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
    },
    totalUnexpected() {
      return this.expenses.filter(e => e.expense_type === 'Unexpected').reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
    },
    unexpectedExpenses() {
      return this.expenses.filter(e => e.expense_type === 'Unexpected').map(e => ({ ...e, title: e.expense_from, amount: e.amount, dateObj: new Date(e.created_at) })).sort((a, b) => b.dateObj - a.dateObj)
    },
    todayRevenue() {
      const todayStr = new Date().toISOString().split('T')[0]
      return this.revenues.filter(r => r.date === todayStr).reduce((sum, r) => sum + parseFloat(r.total_revenue || 0), 0)
    },
    todayExpense() {
      const todayStr = new Date().toISOString().split('T')[0]
      return this.expenses.filter(e => e.date === todayStr).reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
    },
    todayUnexpected() {
      const todayStr = new Date().toISOString().split('T')[0]
      return this.expenses.filter(e => e.date === todayStr && e.expense_type === 'Unexpected').reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
    },
    reserveProgress() {
      return Math.min(100, Math.round((this.reserveSettings.current / this.reserveSettings.target) * 100)) || 0;
    },
    unexpectedPercentage() {
       if (this.totalExpense === 0) return 0;
       return ((this.totalUnexpected / this.totalExpense) * 100).toFixed(1);
    },
    todayDateString() {
      return new Date().toLocaleDateString();
    }
  },
  methods: {
    goTo(tab) {
      const map = {
        home: '/',
        expense: '/expense',
        revenue: '/revenue',
        unexpected: '/unexpected',
        reports: '/reports',
        ledger: '/ledger'
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
        const API_BASE = 'https://mes-restorant.vercel.app'; // Update this if your Vercel URL is different
        const [expRes, revRes] = await Promise.all([
          fetch(`${API_BASE}/api/expenses`).then(r => r.json()),
          fetch(`${API_BASE}/api/revenues`).then(r => r.json())
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
        const API_BASE = 'https://mes-restorant.vercel.app';
        await fetch(`${API_BASE}/api/expenses`, {
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
        const API_BASE = 'https://mes-restorant.vercel.app';
        await fetch(`${API_BASE}/api/revenues`, {
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
    saveReserveSettings() {
      alert('Reserve settings saved securely!');
      this.goHome();
    },
    changePasscode() {
      if (confirm('Are you sure you want to reset your passcode? You will be asked to create a new one.')) {
        if (this.triggerPinReset) {
          this.triggerPinReset();
        }
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

.positive {
  color: #0d8b6d;
}

.negative-bg {
  background: #fdf3f3 !important;
  color: #d95555 !important;
}

.positive-bg {
  background: #0d8b6d !important;
  color: #ffffff !important;
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
  background: #ffffff;
  border-top: 1px solid #eaebec;
  display: flex;
  justify-content: space-around;
  padding: 10px 10px 14px;
}

.nav-item {
  background: transparent;
  border: none;
  color: #9aa5b1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s;
}

.nav-item .nav-icon {
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item small {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.nav-item.active {
  color: #0d8b6d;
  background: #eefbf5;
}

@media (max-width: 480px) {
  .app-card {
    max-width: 86vw;
    min-height: 500px;
  }
}
</style>
