<template>
  <div class="view-container menu-view">
    <header class="page-header">
      <h1>📋 Complete Menu</h1>
      <p>Our full selection of delicious items</p>
    </header>

    <main class="content-section">
      <div class="menu-tabs">
        <button 
          v-for="tab in menuTabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="{ active: activeTab === tab.id }"
          class="tab-btn"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <div class="menu-container">
        <!-- Section content -->
        <div v-show="activeTab === tab.id" v-for="tab in menuTabs" :key="tab.id" class="menu-section">
          <div class="section-header">
            <h2>{{ tab.icon }} {{ tab.label }}</h2>
            <p>{{ tab.description }}</p>
          </div>

          <div class="items-container">
            <div v-for="item in tab.items" :key="item.id" class="menu-item">
              <div class="item-header">
                <span class="item-emoji">{{ item.emoji }}</span>
                <div class="item-info">
                  <h4>{{ item.name }}</h4>
                  <p class="item-description">{{ item.description }}</p>
                </div>
                <span class="item-price">₹{{ item.price }}</span>
              </div>
              <div v-if="item.details" class="item-details">
                <span v-for="detail in item.details" :key="detail" class="detail-tag">{{ detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nutritional Info -->
      <section class="info-section">
        <h2>ℹ️ Menu Information</h2>
        <div class="info-grid">
          <div class="info-card">
            <span class="info-icon">🌱</span>
            <h3>Vegetarian Options</h3>
            <p>We offer a wide variety of vegetarian and vegan dishes prepared with fresh ingredients.</p>
          </div>
          <div class="info-card">
            <span class="info-icon">🔥</span>
            <h3>Spice Levels</h3>
            <p>All items can be customized with different spice levels from mild to extra spicy.</p>
          </div>
          <div class="info-card">
            <span class="info-icon">⏱️</span>
            <h3>Preparation Time</h3>
            <p>Most items are prepared fresh and served within 20-30 minutes of ordering.</p>
          </div>
          <div class="info-card">
            <span class="info-icon">💳</span>
            <h3>Payment Methods</h3>
            <p>We accept cash, cards, and digital wallets for your convenience.</p>
          </div>
        </div>
      </section>

      <!-- Special Combos -->
      <section class="combos-section">
        <h2>🎁 Special Combos & Deals</h2>
        <div class="combos-grid">
          <div v-for="combo in specialCombos" :key="combo.id" class="combo-card">
            <div class="combo-badge">Save {{ combo.savings }}%</div>
            <h3>{{ combo.name }}</h3>
            <p class="combo-items">{{ combo.includes }}</p>
            <div class="combo-prices">
              <span class="combo-original">₹{{ combo.original }}</span>
              <span class="combo-price">₹{{ combo.price }}</span>
            </div>
            <button class="order-combo-btn">Order Now</button>
          </div>
        </div>
      </section>

      <!-- Allergies and Preferences -->
      <section class="preferences-section">
        <h2>⚠️ Allergies & Preferences</h2>
        <p>
          Please inform our staff of any allergies or dietary restrictions. 
          We're happy to customize dishes to meet your needs. Common allergens: 
          <strong>Nuts, Dairy, Gluten, Shellfish</strong>
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeTab: 'pizza',
      menuTabs: [
        {
          id: 'pizza',
          label: 'Pizzas',
          icon: '🍕',
          description: 'Authentic Italian pizzas with premium toppings',
          items: [
            { id: 1, name: 'Margherita', emoji: '🍕', description: 'Fresh mozzarella, tomato sauce, basil', price: 450, details: ['Vegetarian', 'Gluten Free Available'] },
            { id: 2, name: 'Pepperoni', emoji: '🍕', description: 'Pepperoni slices with melted cheese', price: 520, details: ['Spicy', 'Non-Veg'] },
            { id: 3, name: 'Veggie Delight', emoji: '🍕', description: 'Bell peppers, olives, mushrooms, onions', price: 480, details: ['Vegetarian', 'Healthy'] },
            { id: 4, name: 'Meat Lovers', emoji: '🍕', description: 'Bacon, sausage, pepperoni combo', price: 650, details: ['Non-Veg', 'Hearty'] },
            { id: 5, name: 'BBQ Chicken', emoji: '🍕', description: 'Tender chicken with BBQ sauce', price: 580, details: ['Non-Veg', 'Smoky'] }
          ]
        },
        {
          id: 'biryani',
          label: 'Biryanis',
          icon: '🍚',
          description: 'Fragrant Indian biryanis cooked with aromatic spices',
          items: [
            { id: 6, name: 'Chicken Biryani', emoji: '🍚', description: 'Tender chicken cooked with basmati rice', price: 380, details: ['Non-Veg', 'Aromatic', 'Medium Spice'] },
            { id: 7, name: 'Mutton Biryani', emoji: '🍚', description: 'Rich mutton with aged spices', price: 420, details: ['Non-Veg', 'Rich', 'High Spice'] },
            { id: 8, name: 'Vegetable Biryani', emoji: '🍚', description: 'Mixed vegetables with fragrant rice', price: 320, details: ['Vegetarian', 'Aromatic'] },
            { id: 9, name: 'Paneer Biryani', emoji: '🍚', description: 'Paneer cubes with basmati rice', price: 350, details: ['Vegetarian', 'Protein-rich'] },
            { id: 10, name: 'Seafood Biryani', emoji: '🍚', description: 'Fresh shrimp and fish with rice', price: 520, details: ['Seafood', 'Premium', 'High Spice'] }
          ]
        },
        {
          id: 'salads',
          label: 'Salads',
          icon: '🥗',
          description: 'Fresh and healthy salad options',
          items: [
            { id: 11, name: 'Caesar Salad', emoji: '🥗', description: 'Romaine lettuce with caesar dressing', price: 280, details: ['Vegetarian', 'Healthy', 'Low Cal'] },
            { id: 12, name: 'Greek Salad', emoji: '🥗', description: 'Feta, olives, tomatoes, cucumbers', price: 300, details: ['Vegetarian', 'Mediterranean'] },
            { id: 13, name: 'Chicken Salad', emoji: '🥗', description: 'Grilled chicken with mixed greens', price: 380, details: ['Non-Veg', 'Protein', 'Healthy'] },
            { id: 14, name: 'Garden Salad', emoji: '🥗', description: 'Mixed vegetables with house dressing', price: 250, details: ['Vegan', 'Organic'] }
          ]
        },
        {
          id: 'breads',
          label: 'Breads & Starters',
          icon: '🍞',
          description: 'Freshly baked breads and appetizers',
          items: [
            { id: 15, name: 'Garlic Bread', emoji: '🍞', description: 'Crispy slices with garlic butter', price: 180, details: ['Vegetarian', 'Hot & Fresh'] },
            { id: 16, name: 'Cheese Garlic Bread', emoji: '🍞', description: 'Garlic bread with melted mozzarella', price: 220, details: ['Vegetarian', 'Cheesy'] },
            { id: 17, name: 'Paneer Tikka', emoji: '🍟', description: 'Grilled paneer cubes with spices', price: 320, details: ['Vegetarian', 'Protein', 'Medium Spice'] },
            { id: 18, name: 'Chicken Tikka', emoji: '🍟', description: 'Tender chicken pieces with tandoori spices', price: 380, details: ['Non-Veg', 'High Protein', 'Medium Spice'] },
            { id: 19, name: 'Samosa', emoji: '🍟', description: 'Fried pastry with potato and peas', price: 120, details: ['Vegetarian', 'Crispy', 'Snack'] }
          ]
        },
        {
          id: 'desserts',
          label: 'Desserts',
          icon: '🍰',
          description: 'Sweet treats to end your meal perfectly',
          items: [
            { id: 20, name: 'Chocolate Cake', emoji: '🍰', description: 'Rich chocolate cake slice', price: 250, details: ['Vegetarian', 'Rich'] },
            { id: 21, name: 'Cheesecake', emoji: '🍰', description: 'Creamy New York style cheesecake', price: 280, details: ['Vegetarian', 'Creamy', 'Premium'] },
            { id: 22, name: 'Gulab Jamun', emoji: '🍬', description: 'Soft milk solids in sugar syrup', price: 180, details: ['Vegetarian', 'Traditional', 'Sweet'] },
            { id: 23, name: 'Ice Cream Sundae', emoji: '🍨', description: 'Ice cream with toppings and syrup', price: 220, details: ['Vegetarian', 'Cold', 'Customizable'] }
          ]
        }
      ],
      specialCombos: [
        {
          id: 1,
          name: 'Pizza & Garlic Bread',
          includes: 'Medium Pizza + Garlic Bread + Drink',
          original: 750,
          price: 599,
          savings: 20
        },
        {
          id: 2,
          name: 'Biryani Feast',
          includes: 'Biryani + Salad + Dessert + Drink',
          original: 950,
          price: 749,
          savings: 21
        },
        {
          id: 3,
          name: 'Family Bundle',
          includes: '2 Pizzas + Biryani + Starters + Dessert',
          original: 2200,
          price: 1699,
          savings: 23
        },
        {
          id: 4,
          name: 'Starter Pack',
          includes: '3 Starters + Bread + Drink',
          original: 800,
          price: 599,
          savings: 25
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.page-header p {
  margin-top: 10px;
  opacity: 0.95;
  font-size: 1.1rem;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.menu-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
  background: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  padding: 12px 24px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: #e0e0e0;
}

.tab-btn.active {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  border-color: #4facfe;
}

.menu-container {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  min-height: 400px;
}

.menu-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.section-header h2 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2rem;
}

.section-header p {
  margin: 0;
  color: #999;
  font-size: 1rem;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: #f9f9f9;
}

.menu-item:hover {
  background: #f5f5f5;
  border-color: #4facfe;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.1);
}

.item-header {
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  gap: 20px;
  align-items: center;
}

.item-emoji {
  font-size: 2rem;
  text-align: center;
}

.item-info {
  flex-grow: 1;
}

.item-info h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.1rem;
}

.item-description {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.item-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #4facfe;
  text-align: right;
}

.item-details {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.detail-tag {
  background: #e3f2fd;
  color: #4facfe;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.info-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  padding: 25px;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
  border-radius: 12px;
  text-align: center;
  border: 2px solid #e3f2fd;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #4facfe;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.2);
}

.info-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}

.info-card h3 {
  margin: 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.info-card p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
}

.combos-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.combos-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.combos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.combo-card {
  position: relative;
  padding: 25px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-radius: 15px;
  color: white;
  transition: transform 0.3s ease;
}

.combo-card:hover {
  transform: translateY(-5px);
}

.combo-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #ff6b6b;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
}

.combo-card h3 {
  margin: 15px 0 10px 0;
  font-size: 1.3rem;
}

.combo-items {
  margin: 0 0 20px 0;
  font-size: 0.95rem;
  opacity: 0.95;
  line-height: 1.5;
}

.combo-prices {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px 0;
}

.combo-original {
  text-decoration: line-through;
  opacity: 0.7;
  font-size: 0.95rem;
}

.combo-price {
  font-size: 1.5rem;
  font-weight: bold;
}

.order-combo-btn {
  width: 100%;
  padding: 12px;
  background: white;
  color: #4facfe;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.order-combo-btn:hover {
  background: #f0f0f0;
  transform: scale(1.02);
}

.preferences-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  border-left: 4px solid #ff6b6b;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.preferences-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 15px;
}

.preferences-section p {
  margin: 0;
  color: #666;
  line-height: 1.8;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.8rem;
  }

  .menu-tabs {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
  }

  .menu-container {
    padding: 20px;
  }

  .item-header {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .combos-grid {
    grid-template-columns: 1fr;
  }

  .item-price {
    text-align: left;
  }
}
</style>
