<template>
  <div id="app">
    <router-view :class="{ 'app-blurred': !isAuthenticated }" />
    
    <div v-if="!isAuthenticated" class="lock-screen glassy">
      <div class="lock-content">
        <div class="lock-icon">🔒</div>
        <h2>{{ setupMode ? 'Set Passcode' : 'Enter Passcode' }}</h2>
        <p v-if="setupMode">Create a 6-digit PIN for this device</p>
        <p v-else>Unlock your CashBook</p>
        
        <div class="pin-dots" :class="{ 'error-shake': errorAnim }">
          <span v-for="n in 6" :key="n" :class="{ filled: pin.length >= n }"></span>
        </div>

        <div class="keypad">
          <button v-for="num in [1,2,3,4,5,6,7,8,9]" :key="num" @click="addPin(num)">{{ num }}</button>
          <button class="empty"></button>
          <button @click="addPin(0)">0</button>
          <button class="delete-btn" @click="removePin()">⌫</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      triggerPinReset: this.triggerPinReset
    }
  },
  data() {
    return {
      isAuthenticated: false,
      pin: '',
      expectedPin: localStorage.getItem('app_pin') || null,
      setupMode: !localStorage.getItem('app_pin'),
      errorAnim: false
    }
  },
  methods: {
    triggerPinReset() {
      this.expectedPin = null;
      this.setupMode = true;
      this.isAuthenticated = false;
      localStorage.removeItem('app_pin');
    },
    addPin(num) {
      if (this.pin.length < 6) {
        this.pin += num;
        if (this.pin.length === 6) {
          setTimeout(() => this.checkPin(), 100);
        }
      }
    },
    removePin() {
      if (this.pin.length > 0) {
        this.pin = this.pin.slice(0, -1);
      }
    },
    checkPin() {
      if (this.setupMode) {
        localStorage.setItem('app_pin', this.pin);
        this.expectedPin = this.pin;
        this.setupMode = false;
        this.pin = '';
        this.isAuthenticated = true;
      } else {
        if (this.pin === this.expectedPin) {
          this.isAuthenticated = true;
        } else {
          this.triggerError();
        }
      }
    },
    triggerError() {
      this.errorAnim = true;
      setTimeout(() => {
        this.errorAnim = false;
        this.pin = '';
      }, 400);
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
  margin: 0;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #0c1d31;
}

body {
  min-height: 100vh;
}

button, input, select {
  font: inherit;
}

#app {
  min-height: 100vh;
  background: #0c1d31;
  position: relative;
}

.app-blurred {
  filter: blur(8px) brightness(0.6);
  pointer-events: none;
  user-select: none;
  transition: filter 0.3s ease;
}

/* Glassy Lock Screen */
.lock-screen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.glassy {
  background: rgba(12, 29, 49, 0.4);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  color: white;
}

.lock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
}

.lock-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.lock-content h2 {
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: 6px;
}

.lock-content p {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-bottom: 40px;
}

.pin-dots {
  display: flex;
  gap: 16px;
  margin-bottom: 50px;
}

.pin-dots span {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.8);
  background: transparent;
  transition: all 0.15s ease;
}

.pin-dots span.filled {
  background: white;
  border-color: white;
}

.error-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-2px, 0, 0); }
  20%, 80% { transform: translate3d(4px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
  40%, 60% { transform: translate3d(6px, 0, 0); }
}

.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 28px;
}

.keypad button {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1.8rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.keypad button:active {
  background: rgba(255, 255, 255, 0.3);
}

.keypad button.empty {
  visibility: hidden;
}

.keypad button.delete-btn {
  font-size: 1.4rem;
  background: transparent;
  border: none;
}
</style>
