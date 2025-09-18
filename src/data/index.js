// Safe data exports with validation
// This ensures all data exports are arrays and won't cause map errors

// Helper function to ensure data is an array
const ensureArray = (data, name) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data === undefined || data === null) {
    console.warn(`[ImpactMojo] ${name} is undefined/null, using empty array`);
    return [];
  }
  // If it's an object with a default export, try to extract it
  if (data && typeof data === 'object') {
    if (Array.isArray(data.default)) {
      return data.default;
    }
    // Check if there's a specific property that's an array
    const keys = Object.keys(data);
    for (const key of keys) {
      if (Array.isArray(data[key])) {
        console.warn(`[ImpactMojo] Using ${name}.${key} as array`);
        return data[key];
      }
    }
  }
  console.warn(`[ImpactMojo] ${name} is not an array, using empty array`);
  return [];
};

// Import and validate each data file
let aiTools = [];
let courses = [];
let featuredContent = [];
let labs = [];
let premiumResources = [];
let testimonials = [];
let trackStyling = [];

try {
  const aiToolsData = require('./ai-tools-data.js');
  aiTools = ensureArray(aiToolsData.aiTools || aiToolsData, 'aiTools');
} catch (e) {
  console.warn('[ImpactMojo] Could not load ai-tools-data.js:', e.message);
  aiTools = [];
}

try {
  const courseData = require('./course-data.js');
  courses = ensureArray(courseData.courses || courseData, 'courses');
} catch (e) {
  console.warn('[ImpactMojo] Could not load course-data.js:', e.message);
  courses = [];
}

try {
  const featuredData = require('./featured-content-data.js');
  featuredContent = ensureArray(featuredData.featuredContent || featuredData, 'featuredContent');
} catch (e) {
  console.warn('[ImpactMojo] Could not load featured-content-data.js:', e.message);
  featuredContent = [];
}

try {
  const labsData = require('./labs-data.js');
  labs = ensureArray(labsData.labs || labsData, 'labs');
} catch (e) {
  console.warn('[ImpactMojo] Could not load labs-data.js:', e.message);
  labs = [];
}

try {
  const premiumData = require('./premium-resources-data.js');
  premiumResources = ensureArray(premiumData.premiumResources || premiumData, 'premiumResources');
} catch (e) {
  console.warn('[ImpactMojo] Could not load premium-resources-data.js:', e.message);
  premiumResources = [];
}

try {
  const testimonialsData = require('./testimonials-data.js');
  testimonials = ensureArray(testimonialsData.testimonials || testimonialsData, 'testimonials');
} catch (e) {
  console.warn('[ImpactMojo] Could not load testimonials-data.js:', e.message);
  testimonials = [];
}

try {
  const trackData = require('./track-styling-data.js');
  trackStyling = ensureArray(trackData.trackStyling || trackData.tracks || trackData, 'trackStyling');
} catch (e) {
  console.warn('[ImpactMojo] Could not load track-styling-data.js:', e.message);
  trackStyling = [];
}

// Export everything with guaranteed array format
export {
  aiTools,
  courses,
  featuredContent,
  labs,
  premiumResources,
  testimonials,
  trackStyling
};

// Also export as a single object for convenience
export const allData = {
  aiTools,
  courses,
  featuredContent,
  labs,
  premiumResources,
  testimonials,
  trackStyling
};

// Log what we've loaded for debugging
console.log('[ImpactMojo] Data loaded:', {
  aiTools: aiTools.length,
  courses: courses.length,
  featuredContent: featuredContent.length,
  labs: labs.length,
  premiumResources: premiumResources.length,
  testimonials: testimonials.length,
  trackStyling: trackStyling.length
});
