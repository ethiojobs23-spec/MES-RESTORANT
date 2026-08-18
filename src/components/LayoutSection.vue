<script setup>
const floors = [
  {
    id: 4,
    title: "Fourth Floor: The Rooftop Lounge",
    desc: "A breathtaking open-air space with panoramic views of Hawassa city. Enjoy our signature cocktails, fresh juices, and light western snacks under the stars.",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f12cb37?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Third Floor: Fine Dining & Banquets",
    desc: "An elegant setting for formal dinners and private events. This floor features our premium Ethiopian and Western dinner selections with impeccable service.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Second Floor: The Heritage Hall",
    desc: "Immerse yourself in authentic Ethiopian culture. Traditional seating (Mesob), cultural music, and our finest traditional dishes like Kitfo and Doro Wot.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 1,
    title: "First Floor: Cafe & Juice Bar",
    desc: "A vibrant, casual space perfect for breakfast, quick lunches, and fresh beverages from our dedicated Juice Bar. Meet, work, and relax.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 0,
    title: "Basement: Secure Parking",
    desc: "Convenient and safe underground parking exclusively for Enu Food House guests. Valet service available.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=600"
  }
]
</script>

<template>
  <section class="layout-section">
    <div class="container">
      <div class="text-center mb-4">
        <h2>Four Floors of Excellence</h2>
        <p style="max-width: 600px; margin: 0 auto;">Discover a unique dining experience on every level. From our bustling ground floor cafe to the serene rooftop lounge, Enu Food House is designed to cater to your every mood.</p>
      </div>

      <div class="floors-container">
        <div v-for="(floor, index) in floors" :key="floor.id" class="floor-card" :class="{'reverse': index % 2 !== 0}">
          <div class="floor-image">
            <img :src="floor.image" :alt="floor.title" />
            <div class="floor-number" v-if="floor.id > 0">{{ floor.id }}F</div>
            <div class="floor-number" v-else>B</div>
          </div>
          <div class="floor-content">
            <h3>{{ floor.title }}</h3>
            <p>{{ floor.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout-section {
  background-color: white;
}

.floors-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 4rem;
}

.floor-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.floor-card.reverse {
  grid-template-columns: 1fr 1fr;
  direction: rtl;
}

.floor-card.reverse > * {
  direction: ltr;
}

.floor-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.floor-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.floor-card:hover .floor-image img {
  transform: scale(1.05);
}

.floor-number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-primary);
  color: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.floor-card.reverse .floor-number {
  left: auto;
  right: 1rem;
}

.floor-content h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.floor-content p {
  font-size: 1.125rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .floor-card, .floor-card.reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }
  .floor-image img {
    height: 300px;
  }
}
</style>
