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

const createWhatsAppFloat = () => {
  const link = document.createElement('a');
  link.className = 'whatsapp-float';
  link.href = 'https://wa.me/390212345678?text=Ciao%2C%20vorrei%20prenotare%20un%20tavolo%20da%20Braciavia.';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.setAttribute('aria-label', 'Contattaci su WhatsApp');
  link.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.58 5.96L0 24l6.31-1.66a11.84 11.84 0 0 0 5.76 1.48h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.46-8.44ZM12.08 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.75.99 1-3.65-.24-.37a9.82 9.82 0 0 1-1.52-5.25c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.02 6.96 2.9a9.78 9.78 0 0 1 2.88 6.95c0 5.44-4.42 9.86-9.84 9.86Zm5.4-7.37c-.3-.15-1.8-.9-2.07-1-.28-.1-.49-.15-.7.15-.2.3-.79 1-.97 1.2-.18.2-.36.22-.67.08-.3-.15-1.28-.47-2.43-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.6.14-.14.3-.36.46-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.7-1.7-.95-2.33-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.8-.73 2.05-1.43.26-.7.26-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z"/>
    </svg>
  `;

  document.body.appendChild(link);
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
createWhatsAppFloat();
