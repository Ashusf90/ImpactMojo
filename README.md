# ImpactMojo

**Development Know-How for Social Impact**

ImpactMojo is an open-source learning platform providing rigorous, theory-grounded educational content on development, equity, and social justice in India and South Asia.

**Live:** [impactmojo.in](https://www.impactmojo.in)

## About

ImpactMojo addresses a critical gap in development education. Development work in India and South Asia lacks a standardized, evidence-based knowledge foundation—resulting in many interventions lacking rigor and impact. 

This project curates accessible, high-quality educational materials on:

- **Development Economics 101** – Growth, inequality, institutions, and policy through an Indian lens
- **Data Feminism 101** – Challenging dominant data narratives using feminist theory
- **Social Safety Nets 101** – Understanding India's welfare architecture (PDS, NREGA, pensions, Aadhaar)
- **Climate Change 101** – IPCC basics, vulnerability, adaptation, and climate justice
- **Decent Work for All 101** – Fair livelihoods, labor rights, and informality
- **Gender Studies 101** – Feminist theory, queer movements, and legal shifts in South Asia
- **And more** – Public Health, Education, Digital Ethics, Livelihoods, Indian Constitution

All materials are grounded in South Asian context and designed for educators, practitioners, researchers, and policymakers.

## Quick Start

### View Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Varnasr/ImpactMojo.git
   cd ImpactMojo
   ```

2. **Open in your browser:**
   - Simply open `index.html` in any browser, or
   - Use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have it)
     npx http-server
     ```
   - Then visit `http://localhost:8000`

## Project Structure

```
ImpactMojo/
├── index.html          # Main entry point
├── styles/
│   └── style.css       # Styling
├── js/
│   ├── app.js          # Main application logic
│   └── service-worker.js  # PWA offline support
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── manifest.json       # PWA manifest
├── netlify.toml        # Netlify configuration
└── README.md
```

## Features

- 📚 **Curated Knowledge Decks** – Theory-grounded, applied to real contexts
- 📱 **Progressive Web App (PWA)** – Works offline, installable
- ♿ **Accessible** – Built with accessibility standards in mind
- 📱 **Responsive** – Works on desktop, tablet, and mobile
- ⚡ **Fast** – Static HTML, no heavy dependencies
- 🔄 **Service Worker** – Offline-first functionality

## Progressive Web App

This site is a partial PWA and can be installed on devices:

- **Desktop (Chrome/Edge):** Click the install icon in the address bar
- **Mobile:** Tap "Add to Home Screen" or "Install App"
- **Offline:** Core functionality works without internet

The `service-worker.js` handles caching and offline support.

## Deployment

This project is deployed on **Netlify** with automatic updates.

### Deploy Your Own Fork

1. **Fork this repository** on GitHub
2. **Connect to Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your forked repository
   - Click "Deploy site"
3. **Done!** Your site is live. Any push to main will auto-deploy.

**Netlify Settings:**
- Build command: None (static site)
- Publish directory: `.` (root)

To add a custom domain:
1. In Netlify, go to Domain settings
2. Add your domain or update nameservers

### Local Development

No build step needed. Simply edit files and refresh your browser:

```bash
# Make changes to index.html, styles/style.css, or js/app.js
# Then refresh your browser to see updates
```

## Contributing

We welcome contributions! Whether you're improving design, adding content, fixing bugs, or enhancing accessibility, your work strengthens this resource for the development community.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/your-feature`
3. **Make your changes** – Edit HTML, CSS, or JavaScript
4. **Test locally** – Open in a browser to verify
5. **Commit:** `git commit -am 'Add feature'`
6. **Push:** `git push origin feature/your-feature`
7. **Submit a Pull Request** with a description of your changes

### Contribution Ideas

- **Content** – Refine existing decks, update examples, add new topics
- **Design & UX** – Improve navigation, layout, visual design, readability
- **Accessibility** – Enhance WCAG compliance, improve screen reader support
- **Translations** – Translate content into other South Asian languages
- **Testing** – Report bugs, test across browsers and devices
- **Documentation** – Improve guides and comments

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Offline Usage

1. Visit the site online once to cache content
2. The service worker will cache key assets
3. Offline functionality will work on revisits
4. Check the browser console for service worker status

## License

This project is released under the **Creative Commons Attribution 4.0 International (CC-BY-4.0)** license.

The educational content and knowledge decks are made available for educational and non-commercial use. Educators are encouraged to adapt and use materials in their teaching with appropriate attribution.

See [LICENSE](./LICENSE) for details.

## Citation

If you use ImpactMojo materials in research, teaching, or practice, please cite:

```
Raman, V. S. (2024). ImpactMojo: Development Know-How for Social Impact. 
Retrieved from https://www.impactmojo.in
```

## Issues & Support

- **Report bugs:** [GitHub Issues](https://github.com/Varnasr/ImpactMojo/issues)
- **Feature requests:** [GitHub Issues](https://github.com/Varnasr/ImpactMojo/issues)
- **General inquiries:** Visit [impactmojo.in](https://www.impactmojo.in)

## Performance Tips

- Keep CSS in `styles/` folder for easy management
- Compress images before adding to `assets/images/`
- Cache files in service worker for offline functionality
- Use semantic HTML for accessibility

## Maintenance

### Regular Updates

```bash
# Pull latest changes
git pull origin main

# Test locally before deploying
# (Simply open index.html or run local server)

# Push changes
git add .
git commit -m "Update content or fix"
git push origin main

# Netlify automatically deploys
```

### Service Worker Cache Management

To update what's cached offline:
- Edit `service-worker.js`
- Update the cache version number (e.g., `v1` → `v2`)
- This forces browsers to fetch new content on next visit

## Acknowledgments

ImpactMojo was founded by **Dr. Varna Sri Raman**, a development economist with two decades of experience in development practice, research, and education across South Asia.

The platform is shaped by contributions from educators, practitioners, designers, and the broader development community.

---

**Last Updated:** October 2025  
**License:** CC-BY-4.0  
**Hosting:** Netlify
