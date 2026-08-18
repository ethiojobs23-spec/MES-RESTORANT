<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          🏠 Enu Food House
        </router-link>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/report">Reports</router-link></li>
          <li><router-link to="/food">Food</router-link></li>
          <li><router-link to="/menu">Menu</router-link></li>
        </ul>
        <div class="mobile-menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul v-if="mobileMenuOpen" class="mobile-nav-links">
        <li><router-link to="/" @click="mobileMenuOpen = false">Home</router-link></li>
        <li><router-link to="/report" @click="mobileMenuOpen = false">Reports</router-link></li>
        <li><router-link to="/food" @click="mobileMenuOpen = false">Food</router-link></li>
        <li><router-link to="/menu" @click="mobileMenuOpen = false">Menu</router-link></li>
      </ul>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Enu Food House</h3>
          <p>Your favorite food delivery service</p>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>📞 +91 98765 43210</p>
          <p>📧 info@enufoodhouse.com</p>
        </div>
        <div class="footer-section">
          <h4>Hours</h4>
          <p>Mon-Sun: 11:00 AM - 11:00 PM</p>
          <p>Delivery Available</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Enu Food House. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  watch: {
    '$route'() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Navbar Styles */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 5px;
}

.nav-links a:hover {
  color: #fff;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links router-link.router-link-active {
  color: #ffd700;
}

.nav-links router-link.router-link-active::after {
  width: 100%;
  background: #ffd700;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-nav-links {
  list-style: none;
  background: rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mobile-nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: block;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.mobile-nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Footer Styles */
.footer {
  background: linear-gradient(135deg, #333333 0%, #444444 100%);
  color: white;
  padding: 40px 20px 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.footer-section p {
  margin: 8px 0;
  opacity: 0.9;
  line-height: 1.6;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navbar {
    padding: 10px 0;
  }

  .nav-container {
    padding: 10px 20px;
  }

  .logo {
    font-size: 1.2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Route Transition Animation */
.router-enter-active,
.router-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
