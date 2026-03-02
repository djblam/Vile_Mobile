/**
 * Portfolio Website JavaScript
 * Vanilla JS - No frameworks required
 * 
 * Features:
 * - Dark/Light mode toggle with system preference detection
 * - Mobile navigation menu
 * - Form validation
 * - Smooth scrolling navigation
 */

(function() {
    'use strict';

    // ===================================
    // Theme Management
    // ===================================
    const ThemeManager = {
        STORAGE_KEY: 'theme-preference',
        DARK: 'dark',
        LIGHT: 'light',

        init() {
            this.themeToggle = document.getElementById('theme-toggle');
            this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
            
            // Set initial theme based on: 1) localStorage, 2) system preference
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme) {
                this.setTheme(savedTheme);
            } else if (systemPrefersDark) {
                this.setTheme(this.DARK);
            } else {
                this.setTheme(this.LIGHT);
            }

            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't set a preference
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.setTheme(e.matches ? this.DARK : this.LIGHT);
                }
            });

            // Toggle button click handler
            this.themeToggle?.addEventListener('click', () => this.toggle());
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.updateIcon(theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
        },

        toggle() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
            this.setTheme(newTheme);
        },

        updateIcon(theme) {
            if (this.themeIcon) {
                this.themeIcon.textContent = theme === this.DARK ? '☀️' : '🌙';
            }
        }
    };

    // ===================================
    // Mobile Navigation
    // ===================================
    const MobileNav = {
        init() {
            this.menuBtn = document.getElementById('mobile-menu-btn');
            this.nav = document.querySelector('.nav');
            this.navLinks = document.querySelectorAll('.nav-link');

            this.menuBtn?.addEventListener('click', () => this.toggle());

            // Close menu when clicking a nav link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.nav?.contains(e.target) && !this.menuBtn?.contains(e.target)) {
                    this.close();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        },

        toggle() {
            const isExpanded = this.menuBtn?.getAttribute('aria-expanded') === 'true';
            this.menuBtn?.setAttribute('aria-expanded', !isExpanded);
            this.nav?.classList.toggle('active');
        },

        close() {
            this.menuBtn?.setAttribute('aria-expanded', 'false');
            this.nav?.classList.remove('active');
        }
    };

    // ===================================
    // Form Validation
    // ===================================
    const FormValidator = {
        init() {
            this.form = document.getElementById('contact-form');
            if (!this.form) return;

            this.fields = {
                name: {
                    element: document.getElementById('name'),
                    error: document.getElementById('name-error'),
                    validate: (value) => {
                        if (!value.trim()) return 'Name is required';
                        if (value.trim().length < 2) return 'Name must be at least 2 characters';
                        return '';
                    }
                },
                email: {
                    element: document.getElementById('email'),
                    error: document.getElementById('email-error'),
                    validate: (value) => {
                        if (!value.trim()) return 'Email is required';
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) return 'Please enter a valid email address';
                        return '';
                    }
                },
                message: {
                    element: document.getElementById('message'),
                    error: document.getElementById('message-error'),
                    validate: (value) => {
                        if (!value.trim()) return 'Message is required';
                        if (value.trim().length < 10) return 'Message must be at least 10 characters';
                        return '';
                    }
                }
            };

            // Real-time validation on blur
            Object.keys(this.fields).forEach(fieldName => {
                const field = this.fields[fieldName];
                field.element?.addEventListener('blur', () => this.validateField(fieldName));
                field.element?.addEventListener('input', () => {
                    // Clear error on input if field was previously invalid
                    if (field.element.classList.contains('error')) {
                        this.validateField(fieldName);
                    }
                });
            });

            // Form submission
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        },

        validateField(fieldName) {
            const field = this.fields[fieldName];
            if (!field.element) return true;

            const value = field.element.value;
            const errorMessage = field.validate(value);

            if (errorMessage) {
                field.element.classList.add('error');
                field.element.classList.remove('success');
                if (field.error) field.error.textContent = errorMessage;
                return false;
            } else {
                field.element.classList.remove('error');
                field.element.classList.add('success');
                if (field.error) field.error.textContent = '';
                return true;
            }
        },

        validateAll() {
            let isValid = true;
            Object.keys(this.fields).forEach(fieldName => {
                if (!this.validateField(fieldName)) {
                    isValid = false;
                }
            });
            return isValid;
        },

        handleSubmit(e) {
            e.preventDefault();

            if (!this.validateAll()) {
                // Focus first invalid field
                const firstInvalid = this.form.querySelector('.error');
                firstInvalid?.focus();
                return;
            }

            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            // For GitHub Pages, you might use:
            // - Formspree (https://formspree.io)
            // - Netlify Forms
            // - EmailJS
            // - Your own API endpoint

            console.log('Form submitted:', data);

            // Show success message (customize as needed)
            this.showSuccessMessage();
        },

        showSuccessMessage() {
            const submitBtn = this.form.querySelector('.btn-submit');
            const originalText = submitBtn?.textContent;
            
            if (submitBtn) {
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.disabled = true;
                submitBtn.style.backgroundColor = 'var(--success)';
                submitBtn.style.borderColor = 'var(--success)';
            }

            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                Object.keys(this.fields).forEach(fieldName => {
                    const field = this.fields[fieldName];
                    field.element?.classList.remove('success', 'error');
                });
                
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }
            }, 3000);
        }
    };

    // ===================================
    // Smooth Scroll for Navigation
    // ===================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ===================================
    // Header Scroll Effect
    // ===================================
    const HeaderScroll = {
        init() {
            this.header = document.querySelector('.header');
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                // Add shadow on scroll
                if (currentScroll > 10) {
                    this.header?.style.setProperty('box-shadow', '0 2px 10px var(--shadow-color)');
                } else {
                    this.header?.style.setProperty('box-shadow', 'none');
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }
    };

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const UpdateYear = {
        init() {
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    };

    // ===================================
    // Initialize Everything
    // ===================================
    function init() {
        ThemeManager.init();
        MobileNav.init();
        FormValidator.init();
        SmoothScroll.init();
        HeaderScroll.init();
        UpdateYear.init();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
