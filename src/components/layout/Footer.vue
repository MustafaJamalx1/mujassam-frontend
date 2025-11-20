<script setup>
const currentYear = new Date().getFullYear()

const footerLinks = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' }
  ],
  support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Returns', path: '/returns' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ]
}

const socialLinks = [
  { icon: 'mdi-twitter', url: '#', color: '#06b6d4' },
  { icon: 'mdi-instagram', url: '#', color: '#a855f7' },
  { icon: 'mdi-facebook', url: '#', color: '#f43f5e' }
]
</script>

<template>
  <footer class="modern-footer">
    <!-- Main Footer -->
    <div class="footer-main section-padding">
      <v-container>
        <v-row>
          <!-- Brand -->
          <v-col cols="12" md="4">
            <div class="footer-brand mb-6">
              <div class="d-flex align-center mb-4">
                <v-avatar 
                  size="48" 
                  class="brand-avatar"
                  style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);"
                >
                  <v-icon color="white" size="28">mdi-cube-outline</v-icon>
                </v-avatar>
                <div class="ml-3">
                  <div class="text-h5 font-weight-bold text-gradient" style="font-family: var(--font-display);">
                    Mujassam
                  </div>
                  <div class="text-caption" style="color: #64748b; margin-top: -4px;">3D Printing Excellence</div>
                </div>
              </div>
              <p class="text-body-2 mb-5" style="color: #64748b; line-height: 1.6;">
                Transforming ideas into reality with precision 3D printing. Your trusted partner for custom designs and rapid prototyping.
              </p>
              
              <!-- Social links -->
              <div class="d-flex ga-2">
                <a
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.url"
                  class="social-link glass"
                  :style="{ '--social-color': social.color }"
                >
                  <v-icon size="20">{{ social.icon }}</v-icon>
                </a>
              </div>
            </div>
          </v-col>

          <!-- Links -->
          <v-col cols="12" md="8">
            <v-row>
              <!-- Company links -->
              <v-col cols="6" sm="4">
                <h3 class="footer-heading mb-4">Company</h3>
                <ul class="footer-links">
                  <li v-for="link in footerLinks.company" :key="link.name">
                    <router-link :to="link.path" class="footer-link">
                      {{ link.name }}
                    </router-link>
                  </li>
                </ul>
              </v-col>

              <!-- Support links -->
              <v-col cols="6" sm="4">
                <h3 class="footer-heading mb-4">Support</h3>
                <ul class="footer-links">
                  <li v-for="link in footerLinks.support" :key="link.name">
                    <router-link :to="link.path" class="footer-link">
                      {{ link.name }}
                    </router-link>
                  </li>
                </ul>
              </v-col>

              <!-- Legal links -->
              <v-col cols="12" sm="4">
                <h3 class="footer-heading mb-4">Legal</h3>
                <ul class="footer-links">
                  <li v-for="link in footerLinks.legal" :key="link.name">
                    <router-link :to="link.path" class="footer-link">
                      {{ link.name }}
                    </router-link>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <v-container>
        <v-divider class="mb-6" style="border-color: rgba(203, 213, 225, 0.2);"></v-divider>
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-4">
          <div class="text-body-2" style="color: #64748b;">
            &copy; {{ currentYear }} <span class="font-weight-bold text-gradient-primary">Mujassam</span>. All rights reserved.
          </div>
          <div class="d-flex align-center ga-2">
            <v-chip size="small" class="glass" style="border: 1px solid rgba(6, 182, 212, 0.2);">
              <v-icon start size="14" style="color: #06b6d4;">mdi-check-decagram</v-icon>
              <span style="color: #0f172a; font-weight: 600;">ISO Certified</span>
            </v-chip>
            <v-chip size="small" class="glass" style="border: 1px solid rgba(16, 185, 129, 0.2);">
              <v-icon start size="14" style="color: #10b981;">mdi-leaf</v-icon>
              <span style="color: #0f172a; font-weight: 600;">Eco-Friendly</span>
            </v-chip>
          </div>
        </div>
      </v-container>
    </div>
  </footer>
</template>

<style scoped>
.modern-footer {
  position: relative;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  margin-top: 120px;
}

.modern-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3) 50%, transparent);
}

.footer-main {
  position: relative;
}

.brand-avatar {
  transition: all 0.3s ease;
}

.footer-brand:hover .brand-avatar {
  transform: rotate(10deg) scale(1.05);
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4) !important;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(203, 213, 225, 0.3);
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--social-color);
  border-color: var(--social-color);
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.footer-heading {
  font-size: 0.938rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: #0f172a;
  letter-spacing: -0.01em;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #06b6d4;
  transform: translateX(4px);
}

.footer-bottom {
  padding: 1.5rem 0;
  background: rgba(248, 250, 252, 0.5);
}
</style>

<style scoped>
.footer-link {
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
