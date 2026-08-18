<script setup>
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-col">
        <h3>Enu Food House</h3>
        <p>A tribute to Enat wubet Bacha. Bringing the soul of Ethiopian cuisine to the heart of Sidama Zone.</p>
      </div>
      
      <div class="footer-col">
        <h4 class="mb-1">Location</h4>
        <p>Sidama Zone<br>Hawassa City, Ethiopia</p>
      </div>
      
      <div class="footer-col">
        <h4 class="mb-1">Hours</h4>
        <p>Breakfast: 6:00 AM - 11:00 AM<br>Lunch & Dinner: 11:00 AM - 11:00 PM</p>
      </div>
      
      <div class="footer-col">
        <h4 class="mb-1">Contact</h4>
        <p>Tel: +251 91 123 4567<br>Email: hello@enufoodhouse.com</p>
      </div>
    </div>
    <div class="footer-bottom text-center">
      <p>&copy; 2026 Enu Food House. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-text);
  color: var(--color-bg);
  padding-top: 5rem;
}

.footer h3, .footer h4 {
  color: white;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-col p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.footer-bottom {
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
}

.footer-bottom p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
