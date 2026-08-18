<template>
  <div class="view-container home-view">
    <header class="hero-section">
      <div class="hero-content">
        <h1>🏠 Enu Food House</h1>
        <p class="subtitle">Welcome to your food house dashboard</p>
      </div>
    </header>

    <main class="content-section">
      <div class="dashboard-grid">
        <div class="card feature-card">
          <div class="card-icon">📊</div>
          <h3>Reports</h3>
          <p>View detailed reports and analytics</p>
          <router-link to="/report" class="btn btn-primary">View Reports</router-link>
        </div>

        <div class="card feature-card">
          <div class="card-icon">🍕</div>
          <h3>Food Items</h3>
          <p>Browse food categories and items</p>
          <router-link to="/food" class="btn btn-primary">Explore Food</router-link>
        </div>

        <div class="card feature-card">
          <div class="card-icon">📋</div>
          <h3>Menu</h3>
          <p>Check our complete menu</p>
          <router-link to="/menu" class="btn btn-primary">View Menu</router-link>
        </div>

        <div class="card stats-card">
          <h3>Quick Stats</h3>
          <div class="stats-grid">
            <div class="stat">
              <span class="stat-value">42</span>
              <span class="stat-label">Items</span>
            </div>
            <div class="stat">
              <span class="stat-value">8</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat">
              <span class="stat-value">156</span>
              <span class="stat-label">Orders</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Home Content Section -->
      <section class="info-section">
        <h2>About Our System</h2>
        <div class="content-text">
          <p>
            Welcome to Enu Food House! This is your comprehensive food management system built with Vue.js.
            Navigate through different sections to explore reports, food items, and our menu.
          </p>
          <ul class="feature-list">
            <li>📈 Track sales and analytics</li>
            <li>🍽️ Manage food inventory</li>
            <li>📝 Create and update menus</li>
            <li>💼 Generate business reports</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Enu Food House'
    }
  }
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-section {
  padding: 60px 20px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.2);
}

.hero-content h1 {
  font-size: 3rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 10px;
  opacity: 0.95;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
}

.feature-card p {
  color: #666;
  margin-bottom: 20px;
  flex-grow: 1;
}

.btn {
  display: inline-block;
  padding: 10px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.stats-card {
  grid-column: span auto;
}

.stats-card h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 0.9rem;
  color: #999;
  margin-top: 5px;
}

.info-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.info-section h2 {
  color: #333;
  margin-top: 0;
  font-size: 2rem;
  margin-bottom: 20px;
}

.content-text {
  color: #555;
  line-height: 1.8;
}

.content-text p {
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.feature-list li {
  padding: 15px;
  background: #f9f9f9;
  border-left: 4px solid #667eea;
  border-radius: 5px;
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
