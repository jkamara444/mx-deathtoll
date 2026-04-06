# Death Toll: Mexico's Crisis of Violence

A comprehensive newspaper-style investigative webpage analyzing the systematic killing of journalists, activists, and political figures in Mexico.

## Project Overview

This digital newspaper presents a serious, long-form investigation into Mexico's death toll crisis with a focus on the killings of journalists, activists, and political figures. The design mimics modern investigative journalism with strong typography, grid-based layouts, and scroll-based storytelling.

## Features

### Main Investigation Page
- **8 distinct sections** with newspaper-style layout
- **Responsive design** that works on all devices
- **Interactive data visualizations** including charts, maps, and timelines
- **Scroll-based animations** and parallax effects
- **Professional typography** with newspaper aesthetic

### Individual Section Pages
Each section expands into its own detailed analysis page:
1. **Headline** - Introduction and overview
2. **The Issue** - Statistical analysis and data
3. **The System** - Structural causes and institutional failure
4. **Targeting** - Risk analysis and victim profiles
5. **The Cycle** - How violence repeats and reinforces itself
6. **Normalization** - How deaths are framed and ignored
7. **The Cost** - Beyond lives lost
8. **Historical Anchor** - Luis Donaldo Colosio and connections to present

### Interactive Elements
- **Animated counters** for key statistics
- **Interactive timeline** showing deaths over time
- **Risk map** visualization by state
- **Economic impact** charts
- **Cycle diagram** with hover effects
- **Progress indicator** for long-form reading
- **Smooth scrolling** navigation

## Design Philosophy

### Aesthetic
- **Serious and minimal** design appropriate for investigative journalism
- **Black, white, and muted tones** with strategic use of red accent color
- **Strong typography hierarchy** using serif and sans-serif fonts
- **Grid-based layouts** reminiscent of newspaper columns

### User Experience
- **Scroll-based storytelling** that reveals information progressively
- **Clear section separation** like newspaper feature blocks
- **Responsive design** that maintains readability on all devices
- **Accessibility features** including proper semantic HTML and ARIA support

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements for proper document structure
- Accessible navigation and content hierarchy
- SEO-friendly markup

### CSS Features
- CSS Grid and Flexbox for responsive layouts
- Custom CSS variables for consistent theming
- Print styles for article printing
- Mobile-first responsive design
- Smooth transitions and hover effects

### JavaScript Functionality
- Intersection Observer for scroll-triggered animations
- Dynamic chart generation
- Smooth scrolling navigation
- Interactive data visualizations
- Progress tracking for long-form content

## File Structure

```
├── index.html              # Main investigation page
├── styles.css              # All styling and responsive design
├── script.js               # Interactive functionality
├── README.md               # This file
└── sections/               # Individual section pages
    ├── headline.html       # Headline analysis
    ├── issue.html          # Statistical analysis
    ├── system.html         # System analysis
    ├── targeting.html      # Risk analysis
    ├── cycle.html          # Cycle analysis
    ├── normalization.html  # Normalization analysis
    ├── cost.html           # Cost analysis
    └── history.html        # Historical analysis
```

## Data Sources

This investigation is based on data from:
- Article 19 (Mexico)
- Committee to Protect Journalists
- Human Rights Watch
- Amnesty International
- Mexican government records
- Academic research on political violence

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with responsive design
- Print functionality for offline reading
- Accessibility features for screen readers

## Usage

1. Open `index.html` in a web browser to view the main investigation
2. Navigate through sections using the top navigation or scrolling
3. Click "Read More" links to explore detailed section analyses
4. Use the print button to generate a printable version

## Customization

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --color-accent: #8b0000;  /* Change accent color */
    --color-black: #000000;   /* Change text colors */
    /* ... other variables */
}
```

### Fonts
Update Google Fonts imports in HTML files or use local fonts
### Content
Edit HTML files directly to update text, statistics, and data

## Accessibility

- Semantic HTML5 structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Performance

- Optimized CSS and JavaScript
- Minimal external dependencies
- Efficient scroll animations
- Lazy loading for visualizations
- Print-optimized stylesheets

## License

This project is published in the public interest for educational and journalistic purposes.
