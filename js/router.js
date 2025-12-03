/**
 * ImpactMojo Section Router
 * Version 1.0.1 - December 3, 2025
 * Enables clean URLs like /courses, /labs, /about that work with Netlify
 * Maps URLs to either sections (scroll) or modals (open)
 * Fixed: Header offset for proper scroll positioning
 */

(function() {
    'use strict';

    // Route configuration
    // type: 'section' = scroll to element, 'modal' = open modal, 'function' = call function
    const routeConfig = {
        // Direct sections (scroll to these)
        '/': { type: 'section', target: 'home' },
        '/home': { type: 'section', target: 'home' },
        '/tracks': { type: 'section', target: 'tracks' },
        '/roadmap': { type: 'section', target: 'roadmap' },
        '/testimonials': { type: 'section', target: 'wall-of-love' },
        '/wall-of-love': { type: 'section', target: 'wall-of-love' },
        '/reviews': { type: 'section', target: 'wall-of-love' },
        '/whats-new': { type: 'section', target: 'whats-new' },
        '/new': { type: 'section', target: 'whats-new' },
        '/support': { type: 'section', target: 'support-us' },
        '/support-us': { type: 'section', target: 'support-us' },
        '/donate': { type: 'section', target: 'support-us' },
        '/about': { type: 'section', target: 'about' },
        '/contact': { type: 'section', target: 'contact' },
        
        // Modal routes (open these modals)
        '/courses': { type: 'modal', target: 'coursesModal' },
        '/labs': { type: 'modal', target: 'labsModal' },
        '/games': { type: 'modal', target: 'gamesModal' },
        '/premium': { type: 'modal', target: 'premiumModal' },
        '/coaching': { type: 'modal', target: 'coachingModal' },
        '/tools': { type: 'modal', target: 'labsModal' }, // Alias
        
        // Speed dial / feature routes (call functions)
        '/bookmarks': { type: 'function', target: 'openBookmarks' },
        '/notes': { type: 'function', target: 'openNotes' },
        '/compare': { type: 'function', target: 'openCompare' },
        '/reading-list': { type: 'function', target: 'openReadingList' },
        
        // External page aliases (redirect)
        '/blog': { type: 'redirect', target: 'blog.html' },
        '/impactlex': { type: 'redirect', target: 'impactlex/' },
        '/dictionary': { type: 'redirect', target: 'impactlex/' },
        '/community': { type: 'redirect', target: 'community/' },
        '/login': { type: 'redirect', target: 'login.html' },
        '/signup': { type: 'redirect', target: 'signup.html' },
        '/account': { type: 'redirect', target: 'account.html' }
    };

    // Get current path without trailing slash
    function getCurrentPath() {
        let path = window.location.pathname;
        // Remove trailing slash except for root
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        // Handle /index.html as root
        if (path === '/index.html') {
            path = '/';
        }
        return path.toLowerCase();
    }

    // Scroll to a section smoothly with header offset
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Small delay to ensure page is loaded
            setTimeout(() => {
                // Get the fixed header height (approximately 80px)
                const headerOffset = 100;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without triggering scroll
                if (sectionId !== 'home') {
                    history.replaceState(null, '', '#' + sectionId);
                }
            }, 150);
            return true;
        }
        return false;
    }

    // Open a modal
    function openModalByName(modalId) {
        // Check if openModal function exists (from main site)
        if (typeof window.openModal === 'function') {
            window.openModal(modalId);
            return true;
        }
        // Fallback: try to show modal directly
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            return true;
        }
        return false;
    }

    // Handle feature functions (speed dial items)
    function handleFeatureFunction(funcName) {
        switch(funcName) {
            case 'openBookmarks':
                if (window.IMX && window.IMX.SpeedDial) {
                    window.IMX.SpeedDial.open();
                    // Small delay then switch to bookmarks tab
                    setTimeout(() => {
                        const bookmarksTab = document.querySelector('[data-panel="bookmarks"]');
                        if (bookmarksTab) bookmarksTab.click();
                    }, 200);
                }
                break;
            case 'openNotes':
                if (window.IMX && window.IMX.SpeedDial) {
                    window.IMX.SpeedDial.open();
                    setTimeout(() => {
                        const notesTab = document.querySelector('[data-panel="notes"]');
                        if (notesTab) notesTab.click();
                    }, 200);
                }
                break;
            case 'openCompare':
                if (window.IMX && window.IMX.Compare) {
                    window.IMX.Compare.showModal();
                }
                break;
            case 'openReadingList':
                if (window.IMX && window.IMX.ReadingList) {
                    window.IMX.ReadingList.show();
                }
                break;
            default:
                console.log('Unknown function:', funcName);
        }
    }

    // Main route handler
    function handleRoute() {
        const path = getCurrentPath();
        const route = routeConfig[path];

        if (!route) {
            // No matching route, check for hash fragment
            if (window.location.hash) {
                const hashTarget = window.location.hash.substring(1);
                scrollToSection(hashTarget);
            }
            return;
        }

        switch(route.type) {
            case 'section':
                scrollToSection(route.target);
                break;
            case 'modal':
                // Wait for DOM and openModal to be available
                setTimeout(() => {
                    openModalByName(route.target);
                }, 300);
                break;
            case 'function':
                // Wait for IMX object to be available
                setTimeout(() => {
                    handleFeatureFunction(route.target);
                }, 500);
                break;
            case 'redirect':
                window.location.href = route.target;
                break;
        }
    }

    // Convert internal links to clean URLs
    function updateInternalLinks() {
        // Find all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            const hash = link.getAttribute('href').substring(1);
            
            // Find matching route for this hash
            for (const [path, config] of Object.entries(routeConfig)) {
                if (config.target === hash && path !== '/') {
                    // Add click handler to use clean URL
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        history.pushState(null, '', path);
                        handleRoute();
                    });
                    break;
                }
            }
        });
    }

    // Handle browser back/forward
    function handlePopState() {
        window.addEventListener('popstate', () => {
            handleRoute();
        });
    }

    // Initialize router
    function init() {
        // Handle initial route
        handleRoute();
        
        // Set up link handling
        updateInternalLinks();
        
        // Handle browser navigation
        handlePopState();
        
        console.log('ImpactMojo Router initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose router API globally
    window.ImpactMojoRouter = {
        scrollToSection: scrollToSection,
        openModal: openModalByName,
        handleRoute: handleRoute,
        routes: routeConfig
    };

})();
