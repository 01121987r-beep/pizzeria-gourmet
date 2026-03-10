const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const revealItems = document.querySelectorAll('.reveal');
const bookingModal = document.querySelector('#bookingModal');
const menuModal = document.querySelector('#menuModal');
const bookingForm = document.querySelector('#bookingForm');
const bookingStatus = document.querySelector('#bookingStatus');
const bookingOpeners = document.querySelectorAll('[data-open-booking="true"]');
const menuOpeners = document.querySelectorAll('[data-open-menu="true"]');
const bookingClosers = document.querySelectorAll('[data-close-booking="true"]');
const menuClosers = document.querySelectorAll('[data-close-menu="true"]');
const bookingDateInput = document.querySelector('#bookingDate');
const inlineBookingDateInput = document.querySelector('#inlineBookingDate');
const cookieConsentKey = 'braciavia_cookie_consent_v1';

const closeMobileMenu = () => {
  if (!header || !menuToggle) {
    return;
  }

  header.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const openBookingModal = () => {
  if (!bookingModal) {
    return;
  }

  closeMobileMenu();
  closeMenuModal();
  bookingModal.classList.add('is-open');
  bookingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    const firstField = bookingForm?.querySelector('input, select, textarea');
    firstField?.focus();
  });
};

const closeBookingModal = () => {
  if (!bookingModal) {
    return;
  }

  bookingModal.classList.remove('is-open');
  bookingModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const openMenuModal = () => {
  if (!menuModal) {
    return;
  }

  closeMobileMenu();
  closeBookingModal();
  menuModal.classList.add('is-open');
  menuModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeMenuModal = () => {
  if (!menuModal) {
    return;
  }

  menuModal.classList.remove('is-open');
  menuModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const createCookieBanner = () => {
  if (localStorage.getItem(cookieConsentKey)) {
    return;
  }

  const banner = document.createElement('div');
  banner.className = 'cookie-banner is-visible';
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <div class="cookie-copy">
        <strong>Cookie</strong>
        <p>Usiamo cookie tecnici per il corretto funzionamento del sito e per ricordare la tua scelta. Maggiori dettagli in <a href="privacy.html">Privacy Policy</a> e <a href="cookie.html">Cookie Policy</a>.</p>
      </div>
      <div class="cookie-actions">
        <button class="btn btn-secondary" type="button" data-cookie-choice="reject">Rifiuta</button>
        <button class="btn btn-primary" type="button" data-cookie-choice="accept">Accetta</button>
      </div>
    </div>
  `;

  banner.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const choice = target.dataset.cookieChoice;
    if (!choice) {
      return;
    }

    localStorage.setItem(cookieConsentKey, choice);
    banner.remove();
  });

  document.body.appendChild(banner);
};

if (header) {
  const toggleHeaderState = () => {
    header.classList.toggle('is-solid', window.scrollY > 24);
  };

  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });
}

if (header && menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (bookingDateInput) {
  bookingDateInput.min = new Date().toISOString().split('T')[0];
}

if (inlineBookingDateInput) {
  inlineBookingDateInput.min = new Date().toISOString().split('T')[0];
}

bookingOpeners.forEach((trigger) => {
  trigger.addEventListener('click', openBookingModal);
});

menuOpeners.forEach((trigger) => {
  trigger.addEventListener('click', openMenuModal);
});

bookingClosers.forEach((trigger) => {
  trigger.addEventListener('click', closeBookingModal);
});

menuClosers.forEach((trigger) => {
  trigger.addEventListener('click', closeMenuModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bookingModal?.classList.contains('is-open')) {
    closeBookingModal();
  }
  if (event.key === 'Escape' && menuModal?.classList.contains('is-open')) {
    closeMenuModal();
  }
});

if (bookingForm && bookingStatus) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      bookingStatus.textContent = 'Completa tutti i campi richiesti e conferma il consenso privacy.';
      return;
    }

    bookingStatus.textContent = 'Richiesta inviata. Ti ricontatteremo a breve per confermare la prenotazione.';
    bookingForm.reset();

    if (bookingDateInput) {
      bookingDateInput.min = new Date().toISOString().split('T')[0];
    }

    window.setTimeout(() => {
      bookingStatus.textContent = '';
      closeBookingModal();
    }, 2200);
  });
}

createCookieBanner();
