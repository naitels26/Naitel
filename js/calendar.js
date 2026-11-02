(() => {
    'use strict';
    const root = document.querySelector('[data-calendar-root]');
    if (!root) return;
    const input = document.getElementById('visit-date');
    const popup = document.getElementById('visit-calendar');
    if (typeof popup.showModal !== 'function') return;
    const trigger = root.querySelector('[data-calendar-trigger]');
    const title = document.getElementById('visit-calendar-title');
    const weekdays = root.querySelector('[data-calendar-weekdays]');
    const days = root.querySelector('[data-calendar-days]');
    const previous = root.querySelector('[data-calendar-prev]');
    const next = root.querySelector('[data-calendar-next]');
    const panel = input.closest('[data-appointment-panel]');
    const form = input.form;
    const dateKey = value => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
    const parse = value => { const [year, month, day] = value.split('-').map(Number); return new Date(year, month - 1, day); };
    const today = () => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), now.getDate()); };
    let month = new Date(today().getFullYear(), today().getMonth(), 1);
    let focusDate = dateKey(today());

    function render(restoreFocus = false) {
        const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
        const current = today();
        const minimum = input.min && input.min > dateKey(current) ? parse(input.min) : current;
        title.textContent = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(month);
        previous.disabled = month.getFullYear() === minimum.getFullYear() && month.getMonth() === minimum.getMonth();
        weekdays.replaceChildren(...Array.from({ length: 7 }, (_, index) => {
            const heading = document.createElement('span');
            const day = new Date(2024, 0, 1 + index); // Monday first.
            heading.setAttribute('role', 'columnheader');
            heading.textContent = new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(day).replace('.', '');
            return heading;
        }));
        const leading = (month.getDay() + 6) % 7;
        const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const rows = [];
        for (let offset = 0; offset < leading + count; offset += 7) {
            const row = document.createElement('div');
            row.className = 'calendar-week';
            row.setAttribute('role', 'row');
            for (let column = 0; column < 7; column++) {
                const cell = document.createElement('div');
                cell.setAttribute('role', 'gridcell');
                const number = offset + column - leading + 1;
                if (number >= 1 && number <= count) {
                    const day = new Date(month.getFullYear(), month.getMonth(), number);
                    const key = dateKey(day);
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'calendar-day';
                    button.dataset.date = key;
                    button.textContent = String(number);
                    button.disabled = day < minimum;
                    button.tabIndex = key === focusDate && !button.disabled ? 0 : -1;
                    button.setAttribute('aria-label', new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(day));
                    cell.setAttribute('aria-selected', String(key === input.value));
                    if (key === input.value) button.classList.add('is-selected');
                    if (key === dateKey(current)) { button.classList.add('is-today'); button.setAttribute('aria-current', 'date'); }
                    cell.append(button);
                }
                row.append(cell);
            }
            rows.push(row);
        }
        days.replaceChildren(...rows);
        if (restoreFocus) days.querySelector(`[data-date="${focusDate}"]`)?.focus({ preventScroll: true });
    }
    function close(restoreFocus = true) {
        if (popup.open) popup.close();
        popup.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus({ preventScroll: true });
    }
    function open() {
        if (input.disabled) return;
        const chosen = input.value ? parse(input.value) : today();
        const start = chosen < today() ? today() : chosen;
        month = new Date(start.getFullYear(), start.getMonth(), 1);
        focusDate = dateKey(start);
        popup.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        if (!popup.open) popup.showModal();
        render(true);
    }
    function changeMonth(direction) {
        const candidate = new Date(month.getFullYear(), month.getMonth() + direction, 1);
        const current = today();
        if (candidate < new Date(current.getFullYear(), current.getMonth(), 1)) return;
        month = candidate;
        focusDate = dateKey(month.getMonth() === current.getMonth() && month.getFullYear() === current.getFullYear() ? current : month);
        render();
    }
    trigger.addEventListener('click', () => popup.hidden ? open() : close());
    input.addEventListener('click', event => { event.preventDefault(); open(); });
    input.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown' || event.key === 'Enter') { event.preventDefault(); open(); }
    });
    input.addEventListener('change', () => {
        if (input.value) { const selected = parse(input.value); month = new Date(selected.getFullYear(), selected.getMonth(), 1); focusDate = input.value; }
        if (!popup.hidden) render();
    });
    days.addEventListener('click', event => {
        const button = event.target.closest('[data-date]');
        if (!button || button.disabled) return;
        input.value = button.dataset.date;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        close();
    });
    days.addEventListener('keydown', event => {
        const button = event.target.closest('[data-date]');
        if (!button) return;
        const key = event.key;
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(key)) return;
        event.preventDefault();
        const target = parse(button.dataset.date);
        if (key === 'PageUp' || key === 'PageDown') {
            const day = target.getDate();
            target.setDate(1);
            target.setMonth(target.getMonth() + (key === 'PageDown' ? 1 : -1));
            target.setDate(Math.min(day, new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()));
        } else {
            const weekday = (target.getDay() + 6) % 7;
            const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -weekday, End: 6 - weekday }[key];
            target.setDate(target.getDate() + offset);
        }
        if (target < today()) return;
        month = new Date(target.getFullYear(), target.getMonth(), 1);
        focusDate = dateKey(target);
        render(true);
    });
    previous.addEventListener('click', () => changeMonth(-1));
    next.addEventListener('click', () => changeMonth(1));
    root.querySelector('[data-calendar-today]').addEventListener('click', () => {
        month = new Date(today().getFullYear(), today().getMonth(), 1); focusDate = dateKey(today()); render(true);
    });
    root.querySelector('[data-calendar-close]').addEventListener('click', () => close());
    popup.addEventListener('cancel', event => { event.preventDefault(); close(); });
    let pressedBackdrop = false;
    const outside = event => {
        const bounds = popup.getBoundingClientRect();
        return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    popup.addEventListener('pointerdown', event => { pressedBackdrop = event.target === popup && outside(event); });
    popup.addEventListener('click', event => { if (pressedBackdrop && event.target === popup && outside(event)) close(); });
    root.addEventListener('keydown', event => { if (event.key === 'Escape' && !popup.hidden) { event.preventDefault(); close(); } });
    document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) close(false); });
    document.addEventListener('focusin', event => { if (!root.contains(event.target)) close(false); });
    document.addEventListener('languagechange', () => { if (!popup.hidden) render(); });
    panel.addEventListener('toggle', () => { if (!panel.open) close(false); });
    form.addEventListener('reset', () => close(false));
    root.classList.add('is-enhanced');
    trigger.hidden = false;
})();
