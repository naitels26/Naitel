(() => {
    'use strict';
    const root = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 800px)');

    // Keep the existing light default and saved theme, including restricted storage.
    function applyTheme(theme) {
        root.dataset.theme = theme;
        themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { /* Optional persistence. */ }
    applyTheme(savedTheme);
    themeButton?.addEventListener('click', () => {
        const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(theme);
        try { localStorage.setItem('theme', theme); } catch { /* Theme still changes. */ }
    });

    // Type once on load/language change. Every character keeps its layout space.
    const heading = document.querySelector('#hero-title, #service-title');
    let typingTimer;
    function finishTyping() {
        window.clearTimeout(typingTimer);
        heading?.classList.remove('is-typing');
        heading?.querySelector('.is-current')?.classList.remove('is-current');
        if (heading) heading.dataset.typing = 'complete';
    }
    function typeHeading() {
        finishTyping();
        if (!heading || motionPreference.matches || document.hidden) return;
        const characters = [];
        heading.setAttribute('aria-label', heading.textContent.trim());
        const lines = heading.querySelectorAll('.hero-line');
        (lines.length ? [...lines] : [heading]).forEach(line => {
            const fragment = document.createDocumentFragment();
            for (const token of line.textContent.split(/(\s+)/u)) {
                if (!token) continue;
                const word = document.createElement('span');
                word.className = /^\s+$/u.test(token) ? 'typing-space' : 'typing-word';
                word.setAttribute('aria-hidden', 'true');
                for (const character of Array.from(token)) {
                    const span = document.createElement('span');
                    span.className = 'typing-char';
                    span.textContent = character;
                    word.append(span);
                    characters.push(span);
                }
                fragment.append(word);
            }
            line.replaceChildren(fragment);
        });
        heading.classList.add('is-typing');
        heading.dataset.typing = 'active';
        let index = 0;
        function revealCharacter() {
            if (index > 0) characters[index - 1].classList.remove('is-current');
            const character = characters[index++];
            if (!character) { finishTyping(); return; }
            character.classList.add('is-visible', 'is-current');
            // A 28 ms cadence with 180 ms opacity transitions; no layout animation.
            typingTimer = window.setTimeout(index < characters.length ? revealCharacter : finishTyping,
                index < characters.length ? 28 : 180);
        }
        revealCharacter();
    }
    document.addEventListener('languagechange', () => { if (heading?.id === 'hero-title') typeHeading(); });
    document.addEventListener('service-heading-ready', typeHeading);
    document.addEventListener('visibilitychange', () => { if (document.hidden) finishTyping(); });
    motionPreference.addEventListener('change', event => { if (event.matches) finishTyping(); });
    if (heading?.id === 'hero-title') typeHeading();

    // Mobile disclosure: closed links are removed from keyboard/accessibility navigation.
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navigation = document.getElementById('site-nav');
    let menuOpen = false;
    function setMenu(open, restoreFocus = false) {
        menuOpen = mobileViewport.matches && open;
        menuButton.setAttribute('aria-expanded', String(menuOpen));
        navigation.classList.toggle('is-open', menuOpen);
        const collapsed = mobileViewport.matches && !menuOpen;
        if (restoreFocus) menuButton.focus({ preventScroll: true });
        navigation.inert = collapsed;
        if (collapsed) navigation.setAttribute('aria-hidden', 'true');
        else navigation.removeAttribute('aria-hidden');
    }
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            setMenu(!menuOpen);
            if (menuOpen) navigation.querySelector('a')?.focus({ preventScroll: true });
        });
        navigation.addEventListener('click', event => {
            const link = event.target.closest('a[href^="#"]');
            if (!link || !mobileViewport.matches) return;
            setMenu(false, true);
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && menuOpen) setMenu(false, true);
        });
        document.addEventListener('click', event => {
            if (menuOpen && !navigation.contains(event.target) && !menuButton.contains(event.target)) {
                setMenu(false, navigation.contains(document.activeElement));
            }
        });
        document.addEventListener('focusin', event => {
            if (menuOpen && !navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
        });
        mobileViewport.addEventListener('change', () => {
            const focusWillHide = mobileViewport.matches && navigation.contains(document.activeElement);
            setMenu(false, focusWillHide);
        });
        setMenu(false);
        root.classList.add('js');
    }

    // One short entrance per element. Visible content never waits for images or timers.
    const reveals = [...document.querySelectorAll('.reveal')];
    let revealObserver;
    function finishReveal(element) {
        element.classList.remove('is-pending', 'is-entering');
        revealObserver?.unobserve(element);
    }
    function enter(element) {
        element.classList.remove('is-pending');
        element.classList.add('is-entering');
        revealObserver?.unobserve(element);
        element.addEventListener('animationend', () => finishReveal(element), { once: true });
    }
    if (!motionPreference.matches && 'IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) enter(entry.target);
            });
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
        reveals.forEach(element => {
            const bounds = element.getBoundingClientRect();
            if (bounds.top >= window.innerHeight) {
                element.classList.add('is-pending');
                revealObserver.observe(element);
            } else if (bounds.bottom > 0) {
                enter(element);
            }
        });
    }
    // Keyboard users can focus a control before its reveal observer runs.
    document.addEventListener('focusin', event => {
        const parent = event.target.closest('.reveal');
        if (parent) finishReveal(parent);
    });
    motionPreference.addEventListener('change', event => {
        if (event.matches) {
            revealObserver?.disconnect();
            reveals.forEach(finishReveal);
        }
    });

    // Compact service carousel: native horizontal scroll plus small, keyboard-friendly controls.
    function initializeServiceCarousel(carousel) {
        const viewport = carousel.querySelector('.service-chip-viewport, .service-card-viewport');
        const previous = carousel.querySelector('[data-service-prev]');
        const next = carousel.querySelector('[data-service-next]');
        const progress = carousel.querySelector('[data-service-progress]') || carousel.closest('.service-catalog')?.querySelector('[data-service-progress]');
        const pauseButton = carousel.querySelector('[data-service-pause]');
        if (!viewport || !previous || !next) return;
        let autoTimer;
        let paused = false;
        const track = viewport.querySelector('.service-chip-grid, .bento-grid');
        const visibleItems = () => [...viewport.querySelectorAll('.service-chip:not([hidden]), .service-card')];
        const updateControls = () => {
            const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
            const items = visibleItems();
            const first = items[0];
            const gap = parseFloat(getComputedStyle(track).columnGap) || 10;
            const step = (first?.getBoundingClientRect().width || viewport.clientWidth * 0.75) + gap;
            const index = Math.min(items.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step)));
            previous.disabled = viewport.scrollLeft <= 2;
            next.disabled = viewport.scrollLeft >= maxScroll - 2;
            items.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
            if (pauseButton) {
                const lang = root.lang === 'en' ? 'en' : 'es';
                pauseButton.textContent = translations[lang][paused ? 'carousel-resume' : 'carousel-pause'];
                pauseButton.setAttribute('aria-pressed', String(paused));
                pauseButton.hidden = motionPreference.matches;
            }
            if (progress) {
                const scrollRatio = items.length ? (maxScroll > 2 ? Math.max(1 / items.length, viewport.scrollLeft / maxScroll) : 1) : 0;
                progress.style.transform = `scaleX(${Math.min(1, scrollRatio)})`;
            }
        };
        const move = direction => {
            const item = visibleItems()[0];
            const gap = parseFloat(getComputedStyle(track).columnGap) || 10;
            const distance = (item?.getBoundingClientRect().width || viewport.clientWidth * 0.75) + gap;
            viewport.scrollBy({ left: direction * distance, behavior: motionPreference.matches ? 'auto' : 'smooth' });
        };
        const stopAuto = () => {
            window.clearInterval(autoTimer);
            autoTimer = null;
        };
        const startAuto = () => {
            stopAuto();
            if (paused || motionPreference.matches || document.hidden) return;
            autoTimer = window.setInterval(() => {
                if (carousel.matches(':hover') || carousel.contains(document.activeElement) || root.classList.contains('detail-open')) return;
                const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
                if (maxScroll <= 2) return;
                if (viewport.scrollLeft >= maxScroll - 4) {
                    viewport.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    move(1);
                }
            }, Number(carousel.dataset.interval) || 2200);
        };
        pauseButton?.addEventListener('click', () => {
            paused = !paused;
            if (paused) stopAuto(); else startAuto();
            updateControls();
        });
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        viewport.addEventListener('scroll', updateControls, { passive: true });
        window.addEventListener('resize', updateControls, { passive: true });
        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
        carousel.addEventListener('focusin', stopAuto);
        carousel.addEventListener('focusout', event => {
            if (!carousel.contains(event.relatedTarget)) startAuto();
        });
        viewport.addEventListener('pointerdown', stopAuto, { passive: true });
        viewport.addEventListener('pointerup', startAuto, { passive: true });
        document.addEventListener('visibilitychange', () => document.hidden ? stopAuto() : startAuto());
        motionPreference.addEventListener('change', event => { updateControls(); if (event.matches) stopAuto(); else startAuto(); });
        document.addEventListener('languagechange', updateControls);
        document.addEventListener('details-ready', () => { updateControls(); startAuto(); }, { once: true });
        window.setTimeout(updateControls, 0);
        startAuto();
    }
    document.querySelectorAll('[data-service-carousel]').forEach(initializeServiceCarousel);

    // Native POST lets the mail service validate and confirm delivery.
    // Keep form values if the visitor navigates back after a failed submission.
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href="#contact-form"]');
        if (!link) return;
        event.preventDefault();
        if (window.location.hash !== '#contact-form') history.pushState(null, '', '#contact-form');
        document.getElementById('contact-form')?.scrollIntoView({ behavior: motionPreference.matches ? 'instant' : 'smooth', block: 'start' });
        document.getElementById('full-name')?.focus({ preventScroll: true });
    });

    // Local vector geography: works through file://, HTTP and without tile services.
    function initializeMap() {
        const mapElement = document.getElementById('interactive-map');
        if (!mapElement || typeof L === 'undefined' || typeof naitelsMapData === 'undefined') return;
        mapElement.replaceChildren();
        const map = L.map(mapElement, {
            zoomControl: false,
            scrollWheelZoom: false,
            zoomAnimation: false,
            fadeAnimation: false,
            markerZoomAnimation: false,
            inertia: false,
            minZoom: 4,
            maxZoom: 9,
            maxBounds: [[8, -132], [44, -78]],
            maxBoundsViscosity: 1
        });
        L.control.zoom({ position: 'topright' }).addTo(map);
        map.attributionControl.setPrefix('');
        map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a>');
        L.geoJSON(naitelsMapData, {
            interactive: false,
            style: feature => ({
                color: '#50718c', weight: 1, opacity: 0.8,
                fillColor: feature.properties.code === 'MEX' ? '#173f63' : '#0b2c49', fillOpacity: 1
            })
        }).addTo(map);
        [['MÉXICO', [24, -105.5]], ['USA', [34, -103]]].forEach(([name, coords]) => {
            L.marker(coords, { interactive: false, keyboard: false,
                icon: L.divIcon({ className: 'map-country-label', html: name, iconSize: [80, 16], iconAnchor: [40, 8] })
            }).addTo(map);
        });
        // Keep each city at its geographic coordinates at every zoom level.
        const locations = [...document.querySelectorAll('.location-link[data-location]')].map(link => {
            const item = link.closest('.branch-item');
            return { id: link.dataset.location, name: link.querySelector('.location-name').textContent,
                coords: [Number(item.dataset.lat), Number(item.dataset.lng)], link,
                details: item.querySelector('details') };
        });
        if (!locations.length) return;
        const bounds = L.latLngBounds(locations.map(location => location.coords));
        const status = document.getElementById('coverage-status');
        let selectedLocation = null;
        const dictionary = () => typeof translations !== 'undefined' ? translations[root.lang === 'en' ? 'en' : 'es'] : {};
        const overviewControl = L.control({ position: 'bottomleft' });
        let overviewButton;
        overviewControl.onAdd = () => {
            overviewButton = L.DomUtil.create('button', 'map-overview');
            overviewButton.type = 'button';
            L.DomEvent.disableClickPropagation(overviewButton);
            overviewButton.addEventListener('click', showOverview);
            return overviewButton;
        };
        overviewControl.addTo(map);
        function showOverview() {
            selectedLocation = null;
            locations.forEach(location => {
                location.marker?.getElement()?.classList.remove('is-selected');
            });
            map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5, animate: false });
            if (status) status.textContent = dictionary()['coverage-status'] || 'México / USA';
        }
        showOverview();
        function highlightLocation(location) {
            selectedLocation = location;
            locations.forEach(item => {
                item.marker?.getElement()?.classList.toggle('is-selected', item === location);
            });
            if (status) status.textContent = location.name;
        }
        locations.forEach(location => {
            // A real anchor supports touch, keyboard, open-in-new-tab and popup blockers.
            const pointMarkup = `<a class="map-point-link" data-branch-point="${location.id}" href="#contact-form"><span class="map-marker" aria-hidden="true"></span></a>`;
            location.link.addEventListener('click', () => highlightLocation(location));
            location.details.addEventListener('toggle', () => {
                if (location.details.open) highlightLocation(location);
            });
            const icon = L.divIcon({ className: 'custom-leaflet-icon', html: pointMarkup,
                iconSize: [44, 44], iconAnchor: [22, 22] });
            location.marker = L.marker(location.coords, { icon, keyboard: false, title: location.name })
                .addTo(map)
                .bindTooltip(location.name, { direction: 'top', offset: [0, -10], className: 'map-city-tooltip' });
            location.pointLink = location.marker.getElement().querySelector('.map-point-link');
            location.pointLink.setAttribute('aria-label', location.name);
            L.DomEvent.disableClickPropagation(location.pointLink);
            location.pointLink.addEventListener('click', () => highlightLocation(location));
            location.pointLink.addEventListener('focus', () => location.marker.openTooltip());
            location.pointLink.addEventListener('blur', () => location.marker.closeTooltip());
        });
        function translateMapControls() {
            const labels = dictionary();
            [
                ['.leaflet-control-zoom-in', 'map-zoom-in'],
                ['.leaflet-control-zoom-out', 'map-zoom-out']
            ].forEach(([selector, key]) => {
                const control = mapElement.querySelector(selector);
                if (control) {
                    control.setAttribute('aria-label', labels[key] || key);
                    control.setAttribute('title', labels[key] || key);
                }
            });
            overviewButton.textContent = labels['map-overview'] || 'Ver todas';
            locations.forEach(location => {
                const accessibleName = `${location.name}: ${labels['map-sales'] || 'Contactar a ventas'}`;
                location.pointLink.setAttribute('aria-label', accessibleName);
                location.link.setAttribute('aria-label', accessibleName);
            });
            if (status) status.textContent = selectedLocation?.name || labels['coverage-status'] || 'México / USA';
        }
        translateMapControls();
        document.addEventListener('languagechange', translateMapControls);
    }
    function scheduleMap() {
        const container = document.querySelector('.map-container');
        if (!container) return;
        if (!('IntersectionObserver' in window)) {
            initializeMap();
            return;
        }
        // Initialize local geometry only when the map approaches the viewport.
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                observer.disconnect();
                initializeMap();
            }
        }, { rootMargin: '120px' });
        observer.observe(container);
    }
    if (document.readyState !== 'complete') document.addEventListener('DOMContentLoaded', scheduleMap, { once: true });
    else scheduleMap();
})();
