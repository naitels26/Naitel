(() => {
    'use strict';
    const form = document.getElementById('contact-form');
    const panel = form?.querySelector('[data-appointment-panel]');
    if (!panel) return;
    const date = document.getElementById('visit-date');
    const time = document.getElementById('visit-time');
    const mode = document.getElementById('visit-mode');
    const location = document.getElementById('visit-location');
    const locationField = panel.querySelector('[data-appointment-location]');
    const zone = document.getElementById('visit-zone');
    const timezoneLabel = panel.querySelector('[data-appointment-timezone]');
    const controls = [...panel.querySelectorAll('input, select')];
    const copy = () => translations[document.documentElement.lang === 'en' ? 'en' : 'es'];
    const localDate = value => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;

    function sync() {
        const now = new Date();
        const active = panel.open;
        const remote = mode.value === 'Videollamada';
        controls.forEach(control => { control.disabled = !active; });
        date.required = active;
        time.required = active;
        location.required = active && !remote;
        location.disabled = !active || remote;
        locationField.hidden = remote;
        date.min = localDate(now);
        date.setCustomValidity('');
        time.setCustomValidity('');
        if (active && date.value && date.value < date.min) date.setCustomValidity(copy()['visit-date-past']);
        if (active && date.value && time.value) {
            const proposed = new Date(`${date.value}T${time.value}`);
            if (proposed.getTime() <= now.getTime()) time.setCustomValidity(copy()['visit-time-past']);
        }
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Intl.DateTimeFormat(document.documentElement.lang, { timeZoneName: 'shortOffset' }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || '';
        zone.value = timezone || offset;
        timezoneLabel.textContent = `${copy()['visit-timezone']} ${timezone || ''}${offset ? ` (${offset})` : ''}`;
    }
    panel.addEventListener('toggle', sync);
    panel.addEventListener('input', sync);
    panel.addEventListener('change', sync);
    form.addEventListener('submit', sync);
    form.addEventListener('reset', () => { panel.open = false; sync(); });
    document.addEventListener('languagechange', sync);
    // Refresh minimum dates and validity when a tab is revisited after midnight.
    window.addEventListener('focus', sync);
    sync();
})();
