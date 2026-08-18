<script setup>
</script>

<template>
  <section class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <span class="badge">Welcome to Sidama Zone, Hawassa</span>
      <h1>Enu Food House</h1>
      <p class="subtitle">Experience the finest authentic Ethiopian cuisine and modern flavors across four stunning floors of culinary excellence.</p>
      <div class="hero-actions">
        <a href="#menu" class="btn-primary">View Menu</a>
        <a href="#floors" class="btn-secondary">Explore Our Space</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* offset for navbar */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(30, 26, 24, 0.4), rgba(30, 26, 24, 0.8));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

h1 {
  color: white;
  font-size: 5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-secondary {
  display: inline-block;
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  text-align: center;
  border: 1px solid white;
  transition: all var(--transition);
}

.btn-secondary:hover {
  background-color: white;
  color: var(--color-text);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  h1 { font-size: 3.5rem; }
  .hero-actions {
    flex-direction: column;
  }
}
</style>
