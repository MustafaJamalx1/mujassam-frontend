<script setup>
const year = new Date().getFullYear()

const quickLinks = [
  { label: 'Browse Products', to: '/products' },
  { label: 'Upload a Design', to: '/upload' },
  { label: 'Your Cart', to: '/cart' },
]

const materialLinks = [
  { label: 'PLA', href: '#' },
  { label: 'ABS', href: '#' },
  { label: 'PETG', href: '#' },
  { label: 'Resin', href: '#' },
]

const socials = [
  { icon: 'mdi-instagram', href: '#', label: 'Instagram' },
  { icon: 'mdi-twitter', href: '#', label: 'Twitter' },
  { icon: 'mdi-linkedin', href: '#', label: 'LinkedIn' },
]
</script>

<template>
  <footer class="site-footer">
    <!-- Main footer body -->
    <div class="footer-body">
      <div class="footer-grid">

        <!-- Brand column -->
        <div class="footer-col footer-col--brand">
          <div class="footer-logo">
            <span class="footer-logo-icon">
              <v-icon size="18" style="color:#fff;">mdi-cube-scan</v-icon>
            </span>
            <span class="footer-logo-text">Mujassam</span>
          </div>
          <p class="footer-tagline">
            Turning ideas into tangible objects — one layer at a time.
            Premium 3D printing for makers, designers, and dreamers.
          </p>
          <div class="footer-socials">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="social-btn"
            >
              <v-icon size="18">{{ s.icon }}</v-icon>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-list">
            <li v-for="link in quickLinks" :key="link.label">
              <router-link :to="link.to" class="footer-link">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Materials -->
        <div class="footer-col">
          <h4 class="footer-heading">Materials</h4>
          <ul class="footer-list">
            <li v-for="m in materialLinks" :key="m.label">
              <a :href="m.href" class="footer-link">{{ m.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h4 class="footer-heading">Get in Touch</h4>
          <ul class="footer-list footer-list--contact">
            <li>
              <v-icon size="16" class="footer-contact-icon">mdi-email-outline</v-icon>
              <a href="mailto:hello@mujassam.com" class="footer-link">hello@mujassam.com</a>
            </li>
            <li>
              <v-icon size="16" class="footer-contact-icon">mdi-map-marker-outline</v-icon>
              <span class="footer-link footer-link--plain">Riyadh, Saudi Arabia</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span class="footer-copy">© {{ year }} Mujassam. All rights reserved.</span>
        <div class="footer-legal">
          <a href="#" class="footer-legal-link">Privacy Policy</a>
          <a href="#" class="footer-legal-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-brown);
  color: rgba(250, 247, 242, 0.75);
  font-family: var(--font-body);
}

/* Main body */
.footer-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 24px 48px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 640px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
}

/* Brand column */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.footer-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-terracotta);
  border-radius: 7px;
  flex-shrink: 0;
}
.footer-logo-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-cream);
  letter-spacing: -0.02em;
}

.footer-tagline {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(250, 247, 242, 0.6);
  margin-bottom: 24px;
  max-width: 280px;
}

.footer-socials {
  display: flex;
  gap: 8px;
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(250, 247, 242, 0.08);
  color: rgba(250, 247, 242, 0.6);
  text-decoration: none;
  transition: background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.social-btn:hover {
  background: var(--color-terracotta);
  color: #fff;
}

/* Columns */
.footer-heading {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 247, 242, 0.4);
  margin-bottom: 16px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-list--contact li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-contact-icon {
  color: rgba(250, 247, 242, 0.4) !important;
  flex-shrink: 0;
}

.footer-link {
  font-size: 0.9rem;
  color: rgba(250, 247, 242, 0.7);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
.footer-link:hover { color: var(--color-cream); }
.footer-link--plain { cursor: default; }
.footer-link--plain:hover { color: rgba(250, 247, 242, 0.7); }

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(250, 247, 242, 0.08);
}
.footer-bottom-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
}

.footer-copy {
  font-size: 0.8rem;
  color: rgba(250, 247, 242, 0.35);
}

.footer-legal {
  display: flex;
  gap: 20px;
}
.footer-legal-link {
  font-size: 0.8rem;
  color: rgba(250, 247, 242, 0.35);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
.footer-legal-link:hover { color: rgba(250, 247, 242, 0.7); }
</style>
