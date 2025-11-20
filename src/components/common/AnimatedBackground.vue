<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'mesh',
    validator: (value) => ['mesh', 'particles', 'layers', 'waves'].includes(value)
  },
  density: {
    type: String,
    default: 'medium',
    validator: (value) => ['low', 'medium', 'high'].includes(value)
  }
})

const canvas = ref(null)

onMounted(() => {
  if (props.variant === 'particles' && canvas.value) {
    initParticles()
  }
})

function initParticles() {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  const particles = []
  const particleCount = props.density === 'low' ? 30 : props.density === 'medium' ? 50 : 80

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.value.width
      this.y = Math.random() * canvas.value.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.value.width) this.x = 0
      if (this.x < 0) this.x = canvas.value.width
      if (this.y > canvas.value.height) this.y = 0
      if (this.y < 0) this.y = canvas.value.height
    }

    draw() {
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })
    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener('resize', () => {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  })
}
</script>

<template>
  <div class="animated-background" :class="`bg-${variant}`">
    <!-- Mesh Grid Background -->
    <div v-if="variant === 'mesh'" class="mesh-background">
      <div class="mesh-lines"></div>
      <div class="mesh-gradient"></div>
    </div>

    <!-- Particle Canvas -->
    <canvas v-if="variant === 'particles'" ref="canvas" class="particle-canvas"></canvas>

    <!-- Floating Layers -->
    <div v-if="variant === 'layers'" class="layers-background">
      <div class="floating-layer layer-1"></div>
      <div class="floating-layer layer-2"></div>
      <div class="floating-layer layer-3"></div>
      <div class="floating-layer layer-4"></div>
    </div>

    <!-- Wave Pattern -->
    <div v-if="variant === 'waves'" class="waves-background">
      <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="wave-path"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="wave-path"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="wave-path"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animated-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* Mesh Background */
.mesh-background {
  position: relative;
  width: 100%;
  height: 100%;
}

.mesh-lines {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: mesh-move 30s linear infinite;
}

.mesh-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 50%);
  animation: gradient-shift 15s ease-in-out infinite;
}

@keyframes mesh-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes gradient-shift {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Particle Canvas */
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Floating Layers */
.layers-background {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-layer {
  position: absolute;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.08));
  backdrop-filter: blur(2px);
}

.layer-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  right: -5%;
  animation: float-1 12s ease-in-out infinite;
}

.layer-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  left: 5%;
  animation: float-2 15s ease-in-out infinite 1s;
}

.layer-3 {
  width: 350px;
  height: 350px;
  top: 40%;
  left: 20%;
  animation: float-3 18s ease-in-out infinite 2s;
}

.layer-4 {
  width: 300px;
  height: 300px;
  bottom: 20%;
  right: 15%;
  animation: float-4 20s ease-in-out infinite 3s;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
  50% { transform: translate(-30px, -40px) rotate(5deg); opacity: 0.6; }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.25; }
  50% { transform: translate(40px, -30px) rotate(-5deg); opacity: 0.5; }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
  50% { transform: translate(-20px, 35px) rotate(3deg); opacity: 0.45; }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.28; }
  50% { transform: translate(25px, 30px) rotate(-3deg); opacity: 0.55; }
}

/* Wave Background */
.waves-background {
  position: relative;
  width: 100%;
  height: 100%;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  opacity: 0.5;
}

.wave-path {
  fill: #06b6d4;
  animation: wave-move 8s ease-in-out infinite;
}

.wave-path:nth-child(2) {
  animation-delay: 1s;
  fill: #a855f7;
}

.wave-path:nth-child(3) {
  animation-delay: 2s;
  fill: #0891b2;
}

@keyframes wave-move {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-5%); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-layer {
    width: 60% !important;
    height: 60% !important;
  }
  
  .wave {
    height: 100px;
  }
}
</style>
