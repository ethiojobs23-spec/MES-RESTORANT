<script setup>
const menuCategories = [
  {
    name: 'Traditional Ethiopian',
    items: [
      { name: 'Doro Wot', desc: 'Spicy chicken stew slow-cooked with berbere, served with hard-boiled eggs and fresh injera.', price: '350 ETB' },
      { name: 'Kitfo', desc: 'Minced lean beef marinated in mitmita and niter kibbeh (spiced butter).', price: '400 ETB' },
      { name: 'Tibs', desc: 'Sizzling prime beef or lamb sautéed with onions, rosemary, and jalapeños.', price: '380 ETB' },
      { name: 'Firfir', desc: 'Shredded injera tossed in a rich, spicy berbere sauce, often served for breakfast.', price: '250 ETB' },
    ]
  },
  {
    name: 'Breakfast & Western',
    items: [
      { name: 'Enu Special Breakfast', desc: 'Eggs any style, toast, grilled tomato, and Ethiopian coffee.', price: '200 ETB' },
      { name: 'Avocado Toast', desc: 'Fresh local avocado on artisan bread with chili flakes and lime.', price: '180 ETB' },
      { name: 'Grilled Steak Sandwich', desc: 'Tender beef with caramelized onions and cheese on a baguette.', price: '320 ETB' },
      { name: 'Pasta Arrabbiata', desc: 'Al dente pasta tossed in a spicy tomato and garlic sauce.', price: '280 ETB' },
    ]
  },
  {
    name: 'Fresh Juice Bar',
    items: [
      { name: 'Spris', desc: 'The classic Ethiopian layered juice: avocado, mango, and papaya.', price: '120 ETB' },
      { name: 'Fresh Papaya', desc: 'Pure, sweet local papaya blended to perfection.', price: '100 ETB' },
      { name: 'Avocado Delight', desc: 'Creamy avocado juice with a touch of sugar and lime.', price: '110 ETB' },
      { name: 'Mango Tango', desc: 'Freshly squeezed seasonal mangoes.', price: '100 ETB' },
    ]
  }
]
</script>

<template>
  <section class="menu-section">
    <div class="container">
      <div class="text-center mb-4">
        <h2>Our Menu Highlights</h2>
        <p>A culinary journey from traditional Ethiopian roots to beloved international flavors.</p>
      </div>

      <div class="menu-grid">
        <div v-for="category in menuCategories" :key="category.name" class="menu-category">
          <h3 class="category-title">{{ category.name }}</h3>
          <div class="menu-items">
            <div v-for="item in category.items" :key="item.name" class="menu-item">
              <div class="item-header">
                <h4 class="item-name">{{ item.name }}</h4>
                <span class="item-price">{{ item.price }}</span>
              </div>
              <p class="item-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-4">
        <button class="btn-primary">Download Full Menu</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  background-color: var(--color-bg);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.category-title {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  border-bottom: 1px dotted var(--color-border);
}

.item-name {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--color-text);
  margin-bottom: 0;
  background-color: var(--color-bg);
  padding-right: 0.5rem;
}

.item-price {
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-bg);
  padding-left: 0.5rem;
}

.item-desc {
  font-size: 0.875rem;
  margin-bottom: 0;
}
</style>
