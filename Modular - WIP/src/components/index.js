// This file acts as a "map" for all components in this folder,
// making imports clean and reliable.

// Default exports are listed individually.
export { default as Logo } from './Logo.js';
export { default as Navigation } from './Navigation.js';
export { default as QuizResult } from './QuizResult.js';
export { default as SimpleQuiz } from './SimpleQuiz.js';
export { default as Footer } from './Footer.js';

// Files that export multiple, named components are handled with `export *`.
export * from './homepage-components.js';
export * from './learning-tracks-component.js';

// FIXED: Export the correct component name from floating-action-buttons.js
// The actual component is named FloatingActionButtons, not ImprovedFloatingActionButtons
export { FloatingActionButtons } from './floating-action-buttons.js';
// Create an alias for backward compatibility
export { FloatingActionButtons as ImprovedFloatingActionButtons } from './floating-action-buttons.js';
