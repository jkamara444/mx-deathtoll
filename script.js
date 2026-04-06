// Death Toll Investigation - Interactive JavaScript
// Newspaper-style webpage with data visualizations and scroll-based storytelling

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initNavigation();
    initCounters();
    initScrollAnimations();
    initCharts();
    initInteractions();
});

// Smooth scrolling navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.masthead').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });
}

// Animated counters for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter-number, .stat-number, .percentage');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

// Scroll-based animations and parallax effects
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');

    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Trigger on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Parallax effect for headline section
    const headlineSection = document.querySelector('.headline-section');
    if (headlineSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = headlineSection.querySelectorAll('.main-headline, .sub-headline, .deck');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Initialize data visualizations
function initCharts() {
    createTimelineChart();
    createRiskMap();
    createEconomicChart();
    createCycleVisualization();
}

// Timeline chart for deaths over time
function createTimelineChart() {
    const timelineContainer = document.getElementById('timeline-chart');
    if (!timelineContainer) return;

    const data = [
        { year: 2000, deaths: 3 },
        { year: 2002, deaths: 5 },
        { year: 2004, deaths: 8 },
        { year: 2006, deaths: 12 },
        { year: 2008, deaths: 18 },
        { year: 2010, deaths: 24 },
        { year: 2012, deaths: 31 },
        { year: 2014, deaths: 28 },
        { year: 2016, deaths: 35 },
        { year: 2018, deaths: 42 },
        { year: 2020, deaths: 38 },
        { year: 2022, deaths: 45 },
        { year: 2024, deaths: 41 }
    ];

    // Create simple bar chart visualization
    const chartHTML = `
        <div class="simple-chart">
            <div class="chart-bars">
                ${data.map(item => `
                    <div class="chart-bar" style="height: ${(item.deaths / 45) * 100}%">
                        <div class="bar-value">${item.deaths}</div>
                        <div class="bar-label">${item.year}</div>
                    </div>
                `).join('')}
            </div>
            <div class="chart-title">Journalist Deaths by Year (2000-2024)</div>
        </div>
    `;

    timelineContainer.innerHTML = chartHTML;

    // Add chart styles
    const style = document.createElement('style');
    style.textContent = `
        .simple-chart {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .chart-bars {
            display: flex;
            align-items: flex-end;
            gap: 8px;
            height: 250px;
            padding: 0 10px;
        }
        .chart-bar {
            flex: 1;
            background: linear-gradient(to top, #8b0000, #cd5c5c);
            border-radius: 4px 4px 0 0;
            position: relative;
            min-width: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .chart-bar:hover {
            transform: translateY(-5px);
            filter: brightness(1.1);
        }
        .bar-value {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            font-weight: bold;
            color: #8b0000;
        }
        .bar-label {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            color: #666;
        }
        .chart-title {
            margin-top: 30px;
            font-family: var(--font-sans);
            font-size: 12px;
            font-weight: 600;
            color: #333;
        }
    `;
    document.head.appendChild(style);
}

// Risk map visualization
function createRiskMap() {
    const riskContainer = document.getElementById('risk-visualization');
    if (!riskContainer) return;

    const states = [
        { name: 'Veracruz', risk: 'extreme', x: 60, y: 40 },
        { name: 'Tamaulipas', risk: 'extreme', x: 75, y: 20 },
        { name: 'Guerrero', risk: 'high', x: 45, y: 55 },
        { name: 'Michoacán', risk: 'high', x: 35, y: 45 },
        { name: 'Sinaloa', risk: 'high', x: 25, y: 35 },
        { name: 'Jalisco', risk: 'medium', x: 30, y: 50 },
        { name: 'Mexico City', risk: 'medium', x: 40, y: 48 },
        { name: 'Oaxaca', risk: 'medium', x: 35, y: 65 },
        { name: 'Chiapas', risk: 'elevated', x: 40, y: 75 },
        { name: 'Chihuahua', risk: 'high', x: 20, y: 15 }
    ];

    const riskColors = {
        extreme: '#8b0000',
        high: '#cd5c5c',
        medium: '#ffa500',
        elevated: '#ffd700'
    };

    const mapHTML = `
        <div class="risk-map-container">
            <div class="map-background">
                <div class="map-title">Risk Levels by State</div>
                <div class="states-container">
                    ${states.map(state => `
                        <div class="state-marker" 
                             style="left: ${state.x}%; top: ${state.y}%; background: ${riskColors[state.risk]}"
                             data-state="${state.name}" 
                             data-risk="${state.risk}">
                            <div class="state-tooltip">
                                <strong>${state.name}</strong><br>
                                Risk Level: ${state.risk}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="risk-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #8b0000"></div>
                    <span>Extreme Risk</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #cd5c5c"></div>
                    <span>High Risk</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ffa500"></div>
                    <span>Medium Risk</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ffd700"></div>
                    <span>Elevated Risk</span>
                </div>
            </div>
        </div>
    `;

    riskContainer.innerHTML = mapHTML;

    // Add map styles
    const style = document.createElement('style');
    style.textContent = `
        .risk-map-container {
            width: 100%;
            height: 100%;
            position: relative;
            background: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .map-background {
            width: 100%;
            height: 100%;
            position: relative;
            background: linear-gradient(135deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(225deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(315deg, #f0f0f0 25%, #e0e0e0 25%);
            background-position: 10px 0, 10px 0, 0 0, 0 0;
            background-size: 20px 20px;
        }
        .map-title {
            text-align: center;
            padding: 15px;
            font-family: var(--font-sans);
            font-size: 14px;
            font-weight: 600;
            color: #333;
            background: rgba(255, 255, 255, 0.9);
        }
        .states-container {
            position: relative;
            height: calc(100% - 50px);
        }
        .state-marker {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .state-marker:hover {
            transform: scale(1.5);
            z-index: 10;
        }
        .state-tooltip {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 11px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .state-marker:hover .state-tooltip {
            opacity: 1;
        }
        .risk-legend {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px;
            border-radius: 4px;
            font-size: 10px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }
        .legend-color {
            width: 12px;
            height: 12px;
            margin-right: 6px;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Economic impact chart
function createEconomicChart() {
    const economicContainer = document.getElementById('economic-chart');
    if (!economicContainer) return;

    const data = [
        { category: 'Corruption Costs', amount: 8.7, color: '#8b0000' },
        { category: 'Lost Investment', amount: 12.3, color: '#cd5c5c' },
        { category: 'Tourism Impact', amount: 4.5, color: '#ffa500' },
        { category: 'Job Losses', amount: 3.2, color: '#ffd700' }
    ];

    const total = data.reduce((sum, item) => sum + item.amount, 0);

    const chartHTML = `
        <div class="economic-chart-container">
            <div class="chart-title">Annual Economic Impact (Billions USD)</div>
            <div class="bar-chart">
                ${data.map(item => `
                    <div class="economic-bar">
                        <div class="bar-fill" style="height: ${(item.amount / total) * 100}%; background: ${item.color}"></div>
                        <div class="bar-label">${item.category}</div>
                        <div class="bar-value">$${item.amount}B</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    economicContainer.innerHTML = chartHTML;

    // Add economic chart styles
    const style = document.createElement('style');
    style.textContent = `
        .economic-chart-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .chart-title {
            font-family: var(--font-sans);
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        .bar-chart {
            display: flex;
            align-items: flex-end;
            gap: 20px;
            height: 200px;
            width: 100%;
            max-width: 400px;
        }
        .economic-bar {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        .bar-fill {
            width: 100%;
            background: linear-gradient(to top, #8b0000, #cd5c5c);
            border-radius: 4px 4px 0 0;
            transition: all 0.3s ease;
            position: relative;
        }
        .economic-bar:hover .bar-fill {
            filter: brightness(1.1);
            transform: translateY(-5px);
        }
        .bar-label {
            position: absolute;
            bottom: -30px;
            font-size: 10px;
            color: #666;
            text-align: center;
            width: 100%;
        }
        .bar-value {
            position: absolute;
            top: -25px;
            font-size: 11px;
            font-weight: bold;
            color: #333;
        }
    `;
    document.head.appendChild(style);
}

// Interactive cycle visualization
function createCycleVisualization() {
    // Add hover effects to cycle steps
    const cycleSteps = document.querySelectorAll('.cycle-step');

    cycleSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function () {
            // Highlight connected steps
            const nextIndex = (index + 1) % cycleSteps.length;
            const prevIndex = (index - 1 + cycleSteps.length) % cycleSteps.length;

            cycleSteps[nextIndex].classList.add('highlight-next');
            cycleSteps[prevIndex].classList.add('highlight-prev');
        });

        step.addEventListener('mouseleave', function () {
            cycleSteps.forEach(s => s.classList.remove('highlight-next', 'highlight-prev'));
        });
    });

    // Add cycle animation styles
    const style = document.createElement('style');
    style.textContent = `
        .cycle-step {
            transition: all 0.3s ease;
        }
        .cycle-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        .highlight-next {
            border-left: 4px solid #ffa500;
        }
        .highlight-prev {
            border-left: 4px solid #ffd700;
        }
    `;
    document.head.appendChild(style);
}

// Initialize interactive elements
function initInteractions() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .factor-card, .target-group, .cost-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Smooth scroll for "Read More" links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Navigate to subpage
            window.location.href = this.href;
        });
    });

}

// Progress indicator for long-form reading
function initProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #e91e63; /* Pink accent color */
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.scrollY / documentHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize progress indicator
initProgressIndicator();
