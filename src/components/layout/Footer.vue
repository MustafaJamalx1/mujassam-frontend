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
  { icon: 'mdi-twitter', url: '#' },
  { icon: 'mdi-instagram', url: '#' },
  { icon: 'mdi-facebook', url: '#' }
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
                <div 
                  style="width: 48px; height: 48px; background: black; border: 2px solid black; display: flex; align-items: center; justify-content: center;"
                >
                  <v-icon color="white" size="28">mdi-cube-outline</v-icon>
                </div>
                <div class="ml-3">
                  <div class="text-h5 font-weight-bold" style="font-family: var(--font-display); color: black; text-transform: uppercase; letter-spacing: 1px;">
                    MUJASSAM
                  </div>
                  <div class="text-caption" style="color: #606060; margin-top: -4px; text-transform: uppercase; letter-spacing: 1px;">3D PRINTING</div>
                </div>
              </div>
              <p class="text-body-2 mb-5" style="color: #606060; line-height: 1.6;">
                Precision 3D printing for custom designs and rapid prototyping.
              </p>
              
              <!-- Social links -->
              <div class="d-flex ga-2">
                <a
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.url"
                  class="social-link"
                  style="border: 2px solid black; background: white; color: black;"
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
                <h3 class="footer-heading mb-4" style="color: black; text-transform: uppercase; letter-spacing: 1px;">COMPANY</h3>
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
                <h3 class="footer-heading mb-4" style="color: black; text-transform: uppercase; letter-spacing: 1px;">SUPPORT</h3>
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
                <h3 class="footer-heading mb-4" style="color: black; text-transform: uppercase; letter-spacing: 1px;">LEGAL</h3>
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
    <div class="footer-bottom" style="border-top: 2px solid black;">
      <v-container>
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-4">
          <div class="text-body-2" style="color: black; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            &copy; {{ currentYear }} <span class="font-weight-bold">MUJASSAM</span>. ALL RIGHTS RESERVED.
          </div>
          <div class="d-flex align-center ga-2">
            <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
              <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">ISO CERTIFIED</span>
            </div>
            <div class="pa-2 px-3" style="border: 2px solid black; background: white;">
              <span style="color: black; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;">ECO-FRIENDLY</span>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </footer>
</template>

<style scoped>
.modern-footer {
  position: relative;
  background: white;
  margin-top: 80px;
}

.footer-main {
  position: relative;
  padding: 60px 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  box-shadow: 4px 4px 0 black;
  transform: translate(-2px, -2px);
}

.footer-heading {
  font-size: 0.938rem;
  font-weight: 700;
  font-family: var(--font-display);
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
  color: #606060;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
  display: inline-block;
}

.footer-link:hover {
  color: black;
}

.footer-bottom {
  padding: 1.5rem 0;
  background: white;
}

.section-padding {
  padding: 60px 0;
}
</style>
