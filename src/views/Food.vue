<template>
  <div class="view-container food-view">
    <header class="page-header">
      <h1>🍕 Food Items & Categories</h1>
      <p>Browse our delicious food collection</p>
    </header>

    <main class="content-section">
      <div class="filter-section">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search food items..."
          class="search-input"
        >
        <div class="category-filters">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = selectedCategory === category ? null : category"
            :class="{ active: selectedCategory === category }"
            class="category-btn"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="food-grid">
        <div v-for="item in filteredItems" :key="item.id" class="food-card">
          <div class="food-image">
            <div class="image-placeholder">{{ item.emoji }}</div>
            <span v-if="item.rating" class="rating">⭐ {{ item.rating }}</span>
          </div>
          <div class="food-content">
            <h3>{{ item.name }}</h3>
            <p class="category-tag">{{ item.category }}</p>
            <p class="description">{{ item.description }}</p>
            <div class="food-footer">
              <span class="price">₹{{ item.price }}</span>
              <button class="add-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <section class="categories-section">
        <h2>📂 Food Categories</h2>
        <div class="categories-grid">
          <div v-for="cat in categoryDetails" :key="cat.name" class="category-card">
            <div class="category-emoji">{{ cat.emoji }}</div>
            <h3>{{ cat.name }}</h3>
            <p>{{ cat.count }} items</p>
            <p class="description">{{ cat.description }}</p>
          </div>
        </div>
      </section>

      <!-- Featured Items -->
      <section class="featured-section">
        <h2>⭐ Featured Items</h2>
        <div class="featured-grid">
          <div v-for="item in featuredItems" :key="item.id" class="featured-card">
            <div class="featured-badge">Featured</div>
            <div class="featured-emoji">{{ item.emoji }}</div>
            <h3>{{ item.name }}</h3>
            <p class="featured-desc">{{ item.description }}</p>
            <div class="featured-footer">
              <span class="featured-price">₹{{ item.price }}</span>
              <button class="featured-btn">Order Now</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Food',
  data() {
    return {
      searchQuery: '',
      selectedCategory: null,
      categories: ['Pizza', 'Biryani', 'Salad', 'Bread', 'Appetizers', 'Desserts'],
      categoryDetails: [
        {
          name: 'Pizza',
          emoji: '🍕',
          count: 12,
          description: 'Authentic Italian pizzas with fresh ingredients'
        },
        {
          name: 'Biryani',
          emoji: '🍚',
          count: 8,
          description: 'Aromatic Indian biryani specialties'
        },
        {
          name: 'Salads',
          emoji: '🥗',
          count: 6,
          description: 'Fresh and healthy salad options'
        },
        {
          name: 'Breads',
          emoji: '🍞',
          count: 5,
          description: 'Freshly baked breads and garlic bread'
        },
        {
          name: 'Appetizers',
          emoji: '🍟',
          count: 10,
          description: 'Delicious starters and appetizers'
        },
        {
          name: 'Desserts',
          emoji: '🍰',
          count: 8,
          description: 'Sweet treats and desserts'
        }
      ],
      foodItems: [
        { id: 1, name: 'Margherita Pizza', category: 'Pizza', emoji: '🍕', price: 450, rating: 4.5, description: 'Classic pizza with mozzarella and basil' },
        { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', emoji: '🍕', price: 520, rating: 4.6, description: 'Topped with pepperoni and cheese' },
        { id: 3, name: 'Veggie Pizza', category: 'Pizza', emoji: '🍕', price: 480, rating: 4.3, description: 'Loaded with fresh vegetables' },
        { id: 4, name: 'Chicken Biryani', category: 'Biryani', emoji: '🍚', price: 380, rating: 4.7, description: 'Fragrant biryani with tender chicken' },
        { id: 5, name: 'Mutton Biryani', category: 'Biryani', emoji: '🍚', price: 420, rating: 4.5, description: 'Rich and aromatic mutton biryani' },
        { id: 6, name: 'Vegetable Biryani', category: 'Biryani', emoji: '🍚', price: 320, rating: 4.2, description: 'Mixed vegetables biryani' },
        { id: 7, name: 'Caesar Salad', category: 'Salad', emoji: '🥗', price: 280, rating: 4.4, description: 'Fresh romaine with caesar dressing' },
        { id: 8, name: 'Greek Salad', category: 'Salad', emoji: '🥗', price: 300, rating: 4.5, description: 'Feta cheese and olive salad' },
        { id: 9, name: 'Garlic Bread', category: 'Bread', emoji: '🍞', price: 180, rating: 4.8, description: 'Crispy garlic bread slices' },
        { id: 10, name: 'Cheese Garlic Bread', category: 'Bread', emoji: '🍞', price: 220, rating: 4.7, description: 'Garlic bread with melted cheese' },
        { id: 11, name: 'Paneer Tikka', category: 'Appetizers', emoji: '🍟', price: 320, rating: 4.6, description: 'Grilled paneer cubes with spices' },
        { id: 12, name: 'Chicken Tikka', category: 'Appetizers', emoji: '🍟', price: 380, rating: 4.5, description: 'Tender chicken tikka pieces' },
        { id: 13, name: 'Chocolate Cake', category: 'Desserts', emoji: '🍰', price: 250, rating: 4.8, description: 'Rich chocolate cake slice' },
        { id: 14, name: 'Cheesecake', category: 'Desserts', emoji: '🍰', price: 280, rating: 4.6, description: 'Creamy cheesecake delight' }
      ],
      featuredItems: [
        { id: 1, name: 'Chef\'s Special Pizza', emoji: '🍕', price: 650, description: 'Try our chef\'s exclusive pizza creation' },
        { id: 2, name: 'Biryanis Combo', emoji: '🍚', price: 899, description: 'Enjoy mix of our best biryanis' },
        { id: 3, name: 'Gourmet Spread', emoji: '🥗', price: 599, description: 'Complete meal combo for two' }
      ]
    }
  },
  computed: {
    filteredItems() {
      return this.foodItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory
        return matchesSearch && matchesCategory
      })
    }
  }
}
</script>

<style scoped>
.food-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
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

.filter-section {
  background: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #fa709a;
  box-shadow: 0 0 0 3px rgba(250, 112, 154, 0.1);
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 10px 20px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
  background: #fa709a;
  color: white;
  border-color: #fa709a;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.food-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.food-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.food-image {
  height: 200px;
  background: linear-gradient(135deg, #fa709a, #fee140);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  font-size: 5rem;
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 600;
  color: #fa709a;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.food-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.food-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  color: #333;
}

.category-tag {
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  color: #fa709a;
  font-weight: 600;
}

.description {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 0.95rem;
  flex-grow: 1;
}

.food-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fa709a;
}

.add-btn {
  padding: 8px 20px;
  background: #fa709a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #f85a8c;
  transform: scale(1.05);
}

.categories-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.categories-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.category-card {
  text-align: center;
  padding: 25px;
  background: linear-gradient(135deg, #fa709a, #fee140);
  border-radius: 15px;
  color: white;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-emoji {
  font-size: 3rem;
  margin-bottom: 10px;
}

.category-card h3 {
  margin: 10px 0;
  font-size: 1.4rem;
}

.category-card p {
  margin: 5px 0;
  opacity: 0.95;
}

.category-card .description {
  font-size: 0.9rem;
  margin-top: 10px;
}

.featured-section {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.featured-section h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.featured-card {
  position: relative;
  padding: 30px;
  background: linear-gradient(135deg, rgba(250, 112, 154, 0.1), rgba(254, 225, 64, 0.1));
  border: 2px solid #fa709a;
  border-radius: 15px;
  text-align: center;
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 20px;
  background: #fa709a;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
}

.featured-emoji {
  font-size: 4rem;
  margin: 20px 0 10px;
}

.featured-card h3 {
  margin: 15px 0;
  color: #333;
  font-size: 1.4rem;
}

.featured-desc {
  color: #666;
  margin-bottom: 20px;
}

.featured-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.featured-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fa709a;
}

.featured-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #fa709a, #fee140);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.featured-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 5px 20px rgba(250, 112, 154, 0.4);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.8rem;
  }

  .food-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .category-filters {
    flex-direction: column;
  }

  .category-btn {
    width: 100%;
  }
}
</style>
