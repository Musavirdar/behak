// BEHAK - Full Stack Application JavaScript

// Application State
let currentUser = null;
let isAdmin = false;

// Simulated Database
const appData = {
    users: [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@kashmiratelier.com',
            password: 'admin123',
            role: 'admin',
            phone: '+91-194-0000-000',
            address: 'BEHAK HQ, Srinagar',
            createdAt: new Date('2024-01-01'),
            measurements: {}
        }
    ],
    products: [
        {
            id: 1,
            name: 'Classic Heritage Paisley Shirt',
            description: 'Pure pashmina-silk blend with traditional Sozni embroidery motifs',
            category: 'classic',
            price: '₹35,000',
            priceRange: '₹25,000 - ₹45,000',
            features: ['70% Pashmina, 30% Silk', 'Sozni Embroidery', 'Natural Dye Colors', 'Traditional Collar Styles'],
            timeline: '25-30 days',
            availability: 'Available',
            embroideryType: 'Sozni',
            fabricBlend: '70% Pashmina, 30% Silk',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 2,
            name: 'Royal Artisan Aari Masterpiece',
            description: 'Higher pashmina content with intricate Aari embroidery patterns',
            category: 'royal',
            price: '₹65,000',
            priceRange: '₹45,000 - ₹85,000',
            features: ['80-90% Pashmina', 'Aari Embroidery', 'Contemporary Cuts', 'Rich Traditional Colors'],
            timeline: '35-45 days',
            availability: 'Available',
            embroideryType: 'Aari',
            fabricBlend: '85% Pashmina, 15% Silk',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 3,
            name: 'Maharaja Tilla Gold Collection',
            description: '100% pure pashmina with Tilla gold/silver thread embroidery',
            category: 'maharaja',
            price: '₹1,20,000',
            priceRange: '₹85,000 - ₹1,50,000',
            features: ['100% Pure Pashmina', 'Tilla Gold/Silver Work', 'Kani-style Borders', 'Bespoke Designs'],
            timeline: '50-65 days',
            availability: 'Available',
            embroideryType: 'Tilla',
            fabricBlend: '100% Pure Pashmina',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 4,
            name: 'Limited Edition Heritage Reproduction',
            description: 'Exclusive collaborations with master artisans and historical reproductions',
            category: 'limited',
            price: '₹2,00,000',
            priceRange: '₹1,00,000+',
            features: ['Master Artisan Collaboration', 'Historical Motifs', 'Antique Techniques', 'Authentication Certificate'],
            timeline: '60-90 days',
            availability: 'Limited',
            embroideryType: 'Mixed Traditional',
            fabricBlend: '100% Pure Pashmina',
            createdAt: new Date('2024-01-01')
        }
    ],
    consultations: [],
    orders: [],
    measurements: []
};

// Collections data
const collectionsData = [
    {
        name: "Classic Heritage Series",
        priceRange: "₹25,000 - ₹45,000",
        description: "Pure pashmina-silk blend with traditional Sozni embroidery motifs",
        features: ["70% Pashmina, 30% Silk", "Sozni Embroidery", "Natural Dye Colors", "Traditional Collar Styles"],
        timeline: "25-30 days",
        category: "classic"
    },
    {
        name: "Royal Artisan Series",
        priceRange: "₹45,000 - ₹85,000",
        description: "Higher pashmina content with intricate Aari embroidery patterns",
        features: ["80-90% Pashmina", "Aari Embroidery", "Contemporary Cuts", "Rich Traditional Colors"],
        timeline: "35-45 days",
        category: "royal"
    },
    {
        name: "Maharaja Collection",
        priceRange: "₹85,000 - ₹1,50,000",
        description: "100% pure pashmina with Tilla gold/silver thread embroidery",
        features: ["100% Pure Pashmina", "Tilla Gold/Silver Work", "Kani-style Borders", "Bespoke Designs"],
        timeline: "50-65 days",
        category: "maharaja"
    },
    {
        name: "Limited Edition",
        priceRange: "₹1,00,000+",
        description: "Exclusive collaborations with master artisans and historical reproductions",
        features: ["Master Artisan Collaboration", "Historical Motifs", "Antique Techniques", "Authentication Certificate"],
        timeline: "60-90 days",
        category: "limited"
    }
];

// Load data from localStorage on page load
function loadAppData() {
    try {
        const savedData = localStorage.getItem('kashmir-atelier-data');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            Object.keys(parsed).forEach(key => {
                if (appData[key] && Array.isArray(appData[key])) {
                    appData[key] = [...appData[key], ...parsed[key].filter(item => 
                        !appData[key].some(existing => existing.id === item.id))];
                }
            });
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Save data to localStorage
function saveAppData() {
    try {
        const dataToSave = {
            users: appData.users.filter(user => user.email !== 'admin@kashmiratelier.com'),
            products: appData.products.filter(product => product.id > 4),
            consultations: appData.consultations,
            orders: appData.orders,
            measurements: appData.measurements
        };
        localStorage.setItem('kashmir-atelier-data', JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    loadAppData();
    renderCollections();
    initializeApp();
    checkAuthState();
});

// Initialize all app functionality
function initializeApp() {
    console.log('Initializing app components...');
    
    // Initialize components in order
    initSmoothScrolling();
    initNavigationButtons();
    initAuthSystem();
    initDashboards();
    initFormHandling();
    initHeaderScroll();
    initAnimatedCounters();
    initProgressBars();
    initScrollAnimations();
    initTechniqueCards();
    
    // Wait for DOM to be fully ready then initialize collection cards
    setTimeout(() => {
        initCollectionCards();
        console.log('All components initialized');
    }, 200);
}

// Smooth Scrolling Navigation - Fixed version
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href').substring(1); // Remove # from href
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                console.log('Scrolling to:', targetId, 'at position:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target section not found:', targetId);
            }
        });
    });
    
    console.log('Smooth scrolling initialized for', navLinks.length, 'links');
}

// Initialize Navigation Buttons - Fixed version
function initNavigationButtons() {
    console.log('Initializing navigation buttons...');
    
    // Hero section buttons
    const exploreBtn = document.querySelector('.hero__actions .btn--primary');
    const consultBtn = document.querySelector('.hero__actions .btn--outline');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Explore button clicked');
            scrollToSection('collections');
        });
        console.log('Explore button initialized');
    }
    
    if (consultBtn) {
        consultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Consultation button clicked');
            scrollToSection('customization');
        });
        console.log('Consultation button initialized');
    }
}

// Global scroll to section function - Fixed version
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        console.log('Target position:', targetPosition);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Authentication System - Fixed version
function initAuthSystem() {
    console.log('Initializing auth system...');
    
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    
    // Show login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Login button clicked');
            showModal('authModal');
        });
        console.log('Login button initialized');
    }
    
    // Dashboard button
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Dashboard button clicked');
            if (isAdmin) {
                showModal('adminDashboard');
                loadAdminData();
            } else {
                showModal('userDashboard');
                loadUserData();
            }
        });
        console.log('Dashboard button initialized');
    }
    
    // Logout buttons
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
        console.log('User logout button initialized');
    }
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', logout);
        console.log('Admin logout button initialized');
    }
    
    // Auth form switching
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Show register clicked');
            switchAuthForm('register');
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Show login clicked');
            switchAuthForm('login');
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form initialized');
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        console.log('Register form initialized');
    }
    
    // Modal close functionality
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            console.log('Modal close clicked');
            const modal = e.target.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('Modal backdrop clicked');
                hideModal(modal.id);
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                hideModal(modal.id);
            });
        }
    });
    
    console.log('Auth system initialized');
}

// Modal Management - Fixed version
function showModal(modalId) {
    console.log('Showing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('Modal shown:', modalId);
    } else {
        console.error('Modal not found:', modalId);
    }
}

function hideModal(modalId) {
    console.log('Hiding modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        console.log('Modal hidden:', modalId);
    }
}

function switchAuthForm(form) {
    console.log('Switching to form:', form);
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    const targetForm = document.getElementById(form + 'Form');
    if (targetForm) {
        targetForm.classList.add('active');
        console.log('Form switched to:', form);
    }
}

function handleLogin(e) {
    e.preventDefault();
    console.log('Processing login...');
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    console.log('Login attempt for:', email);
    
    // Find user
    const user = appData.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        console.log('Login successful for:', user.name);
        currentUser = user;
        isAdmin = user.role === 'admin';
        updateAuthUI();
        hideModal('authModal');
        showNotification(`Welcome back, ${user.name}!`, 'success');
        e.target.reset();
        saveCurrentUser();
    } else {
        console.log('Login failed');
        showNotification('Invalid email or password', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    console.log('Processing registration...');
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    console.log('Registration data:', userData);
    
    // Check if user already exists
    if (appData.users.some(u => u.email === userData.email)) {
        showNotification('An account with this email already exists', 'error');
        return;
    }
    
    // Validate password strength
    if (userData.password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: appData.users.length + 1,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: userData.password,
        role: 'user',
        createdAt: new Date(),
        measurements: {}
    };
    
    appData.users.push(newUser);
    saveAppData();
    
    console.log('User registered:', newUser.name);
    
    currentUser = newUser;
    isAdmin = false;
    updateAuthUI();
    hideModal('authModal');
    showNotification(`Account created successfully! Welcome, ${newUser.name}!`, 'success');
    e.target.reset();
    saveCurrentUser();
}

function logout() {
    console.log('Logging out user');
    currentUser = null;
    isAdmin = false;
    updateAuthUI();
    hideModal('userDashboard');
    hideModal('adminDashboard');
    showNotification('Logged out successfully', 'info');
    localStorage.removeItem('current-user');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userGreeting = document.querySelector('.user-greeting');
    const userName = document.querySelector('.user-name');
    const adminName = document.querySelector('.admin-name');
    
    if (currentUser) {
        console.log('Updating UI for logged in user:', currentUser.name);
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');
        if (userGreeting) userGreeting.textContent = `Hello, ${currentUser.name}`;
        if (userName) userName.textContent = currentUser.name;
        if (adminName) adminName.textContent = currentUser.name;
    } else {
        console.log('Updating UI for logged out state');
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

function checkAuthState() {
    try {
        const savedUser = localStorage.getItem('current-user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            const user = appData.users.find(u => u.id === userData.id);
            if (user) {
                console.log('Restoring user session:', user.name);
                currentUser = user;
                isAdmin = user.role === 'admin';
                updateAuthUI();
            }
        }
    } catch (error) {
        console.error('Error checking auth state:', error);
    }
}

function saveCurrentUser() {
    try {
        if (currentUser) {
            localStorage.setItem('current-user', JSON.stringify({id: currentUser.id}));
        } else {
            localStorage.removeItem('current-user');
        }
    } catch (error) {
        console.error('Error saving user state:', error);
    }
}

// Render Collections Dynamically - Fixed version
function renderCollections() {
    console.log('Rendering collections...');
    const container = document.getElementById('collectionsGrid');
    if (!container) {
        console.error('Collections container not found');
        return;
    }
    
    container.innerHTML = collectionsData.map(collection => `
        <div class="collection-card" data-collection="${collection.category}">
            <div class="collection-card__image collection-card__image--${collection.category}"></div>
            <div class="collection-card__content">
                <h3 class="collection-card__title">${collection.name}</h3>
                <p class="collection-card__price">${collection.priceRange}</p>
                <p class="collection-card__description">${collection.description}</p>
                <ul class="collection-card__features">
                    ${collection.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="collection-card__timeline">
                    <span class="timeline-label">Crafting Time:</span>
                    <span class="timeline-value">${collection.timeline}</span>
                </div>
                <button class="btn btn--outline collection-card__btn">View Details</button>
            </div>
        </div>
    `).join('');
    
    console.log('Collections rendered:', collectionsData.length, 'items');
}

// Collection Cards Interactive Effects - Fixed version
function initCollectionCards() {
    console.log('Initializing collection cards...');
    const collectionCards = document.querySelectorAll('.collection-card');
    
    console.log('Found', collectionCards.length, 'collection cards');
    
    collectionCards.forEach((card, index) => {
        const btn = card.querySelector('.collection-card__btn');
        const collectionType = card.getAttribute('data-collection');
        
        console.log('Initializing card', index, 'type:', collectionType);
        
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Collection card button clicked:', collectionType);
                showCollectionDetails(collectionType, card);
            });
        }

        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('Collection cards initialized');
}

function showCollectionDetails(collectionType, cardElement) {
    console.log('Showing collection details for:', collectionType);
    
    // Remove any existing modals
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 35, 50, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: translateY(50px);
        transition: transform 0.3s ease;
        cursor: default;
    `;

    // Prevent modal content clicks from closing modal
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const title = cardElement.querySelector('.collection-card__title').textContent;
    const price = cardElement.querySelector('.collection-card__price').textContent;
    const description = cardElement.querySelector('.collection-card__description').textContent;
    const features = Array.from(cardElement.querySelectorAll('.collection-card__features li')).map(li => li.textContent);
    const timeline = cardElement.querySelector('.timeline-value').textContent;

    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute; 
            top: 1rem; 
            right: 1rem; 
            background: none; 
            border: none; 
            font-size: 2rem; 
            cursor: pointer; 
            color: #722f37;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s ease;
        ">&times;</button>
        <h2 style="color: #1a2332; margin-bottom: 1rem; margin-right: 2rem;">${title}</h2>
        <p style="color: #d4af37; font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">${price}</p>
        <p style="color: #2c3e50; margin-bottom: 1.5rem; line-height: 1.6;">${description}</p>
        <h3 style="color: #722f37; margin-bottom: 0.5rem; font-size: 1.1rem;">Features:</h3>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
            ${features.map(feature => `<li style="margin-bottom: 0.5rem; color: #2c3e50; line-height: 1.4;">${feature}</li>`).join('')}
        </ul>
        <p style="color: #1a2332; margin-bottom: 2rem;"><strong>Crafting Time:</strong> ${timeline}</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn--primary modal-order-btn" style="
                background: #722f37;
                color: white;
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: background 0.2s ease;
            ">Order Custom</button>
            <button class="btn btn--outline modal-close-btn" style="
                background: transparent;
                color: #722f37;
                padding: 0.8rem 1.5rem;
                border: 1px solid #722f37;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            ">Close</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modalContent.querySelector('.modal-close');
    const closeBtnSecondary = modalContent.querySelector('.modal-close-btn');
    const orderBtn = modalContent.querySelector('.modal-order-btn');

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    closeBtnSecondary.addEventListener('click', closeModal);
    
    orderBtn.addEventListener('click', () => {
        closeModal();
        setTimeout(() => {
            scrollToSection('customization');
        }, 400);
    });

    modal.addEventListener('click', closeModal);

    // Handle escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    console.log('Collection details modal shown');
}

// Form Handling - Fixed version
function initFormHandling() {
    console.log('Initializing form handling...');
    
    const consultationForm = document.getElementById('consultationForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
        console.log('Consultation form initialized');
        
        // Ensure form inputs are functional
        const inputs = consultationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.removeAttribute('disabled');
            input.style.pointerEvents = 'auto';
            
            // Add focus and blur effects
            input.addEventListener('focus', function() {
                this.style.borderColor = '#d4af37';
                this.style.outline = '2px solid rgba(212, 175, 55, 0.4)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                this.style.outline = 'none';
            });
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        console.log('Newsletter form initialized');
        
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');
        if (newsletterInput) {
            newsletterInput.removeAttribute('disabled');
            newsletterInput.style.pointerEvents = 'auto';
        }
    }
}

function handleConsultationSubmit(e) {
    e.preventDefault();
    console.log('Processing consultation form...');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Consultation data:', data);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields: ' + missingFields.join(', '), 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }

    // Create consultation record
    const consultation = {
        id: appData.consultations.length + 1,
        userId: currentUser?.id || null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredCollection: data.collection,
        designPreferences: data.preferences,
        occasion: data.occasion,
        budget: data.budget,
        message: `${data.occasion} ${data.preferences}`.trim(),
        status: 'pending',
        createdAt: new Date()
    };
    
    appData.consultations.push(consultation);
    saveAppData();
    
    console.log('Consultation created:', consultation);

    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Consultation request submitted successfully! We will contact you within 24 hours.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Simulate email notifications
        simulateEmailNotification('consultationBooked', data.email);
        simulateEmailNotification('consultationBooked', 'admin@kashmiratelier.com');
    }, 2000);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    console.log('Processing newsletter form...');
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate subscription
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Dashboard System
function initDashboards() {
    console.log('Initializing dashboards...');
    
    // User dashboard tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.getAttribute('data-tab');
            switchTab(tabName, e.target.closest('.modal').id);
        });
    });
    
    // Measurements form
    const measurementsForm = document.getElementById('measurementsForm');
    if (measurementsForm) {
        measurementsForm.addEventListener('submit', handleMeasurementsSubmit);
    }
    
    // Admin functionality
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', showAddProductForm);
    }
}

function switchTab(tabName, modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Update tab buttons
    modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTabBtn = modal.querySelector(`[data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    // Update tab content
    modal.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    let targetTab = null;
    if (modalId === 'userDashboard') {
        targetTab = modal.querySelector(`#${tabName}Tab`);
    } else if (modalId === 'adminDashboard') {
        targetTab = modal.querySelector(`#${tabName}Tab`);
    }
    
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Load tab-specific data
    if (tabName === 'consultations') {
        loadUserConsultations();
    } else if (tabName === 'orders') {
        loadUserOrders();
    } else if (tabName === 'products' && modalId === 'adminDashboard') {
        loadAdminProducts();
    } else if (tabName === 'adminConsultations') {
        loadAdminConsultations();
    } else if (tabName === 'users') {
        loadAdminUsers();
    } else if (tabName === 'analytics') {
        loadAdminAnalytics();
    }
}

function loadUserData() {
    if (!currentUser) return;
    loadUserMeasurements();
    loadUserConsultations();
    loadUserOrders();
}

function loadUserMeasurements() {
    if (!currentUser?.measurements) return;
    
    const form = document.getElementById('measurementsForm');
    if (!form) return;
    
    Object.keys(currentUser.measurements).forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (input) {
            input.value = currentUser.measurements[field];
        }
    });
}

function handleMeasurementsSubmit(e) {
    e.preventDefault();
    if (!currentUser) return;
    
    const formData = new FormData(e.target);
    const measurements = Object.fromEntries(formData.entries());
    
    // Validate measurements
    const requiredFields = ['chest', 'waist', 'shoulder', 'sleeveLength', 'shirtLength', 'collarSize', 'preferredFit'];
    const missingFields = requiredFields.filter(field => !measurements[field]);
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save measurements
    currentUser.measurements = measurements;
    const userIndex = appData.users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        appData.users[userIndex].measurements = measurements;
    }
    
    saveAppData();
    saveCurrentUser();
    showNotification('Measurements saved successfully!', 'success');
    
    // Simulate email notification
    simulateEmailNotification('measurementsSaved', currentUser.email);
}

function loadUserConsultations() {
    const container = document.getElementById('consultationsList');
    if (!container || !currentUser) return;
    
    const userConsultations = appData.consultations.filter(c => c.userId === currentUser.id);
    
    if (userConsultations.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No Consultations Yet</h4><p>Book your first consultation to get started with your bespoke journey.</p></div>';
        return;
    }
    
    container.innerHTML = userConsultations.map(consultation => `
        <div class="consultation-item">
            <div class="consultation-header">
                <h4 class="consultation-title">Consultation #${consultation.id}</h4>
                <span class="consultation-status status-${consultation.status}">${consultation.status}</span>
            </div>
            <div class="consultation-details">
                <p><strong>Collection:</strong> ${consultation.preferredCollection || 'Not specified'}</p>
                <p><strong>Budget:</strong> ${consultation.budget || 'Not specified'}</p>
                <p><strong>Occasion:</strong> ${consultation.occasion || 'Not specified'}</p>
                <p><strong>Date:</strong> ${new Date(consultation.createdAt).toLocaleDateString()}</p>
                ${consultation.scheduledDate ? `<p><strong>Scheduled:</strong> ${new Date(consultation.scheduledDate).toLocaleDateString()}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function loadUserOrders() {
    const container = document.getElementById('ordersList');
    if (!container || !currentUser) return;
    
    const userOrders = appData.orders.filter(o => o.userId === currentUser.id);
    
    if (userOrders.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No Orders Yet</h4><p>Your custom orders will appear here once you place them.</p></div>';
        return;
    }
    
    container.innerHTML = userOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <h4 class="order-title">Order #${order.id}</h4>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Product:</strong> ${order.productName}</p>
                <p><strong>Amount:</strong> ${order.totalAmount}</p>
                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                ${order.expectedDelivery ? `<p><strong>Expected Delivery:</strong> ${new Date(order.expectedDelivery).toLocaleDateString()}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Admin Dashboard Functions
function loadAdminData() {
    loadAdminProducts();
    loadAdminConsultations();
    loadAdminUsers();
    loadAdminAnalytics();
}

function loadAdminProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    container.innerHTML = appData.products.map(product => `
        <div class="admin-product-item">
            <div class="admin-item-info">
                <h4>${product.name}</h4>
                <p>${product.category} • ${product.price} • ${product.availability}</p>
                <p>${product.description}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn--outline btn--sm" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn--outline btn--sm" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadAdminConsultations() {
    const container = document.getElementById('adminConsultationsList');
    if (!container) return;
    
    container.innerHTML = appData.consultations.map(consultation => {
        return `
            <div class="admin-consultation-item">
                <div class="admin-item-info">
                    <h4>${consultation.name}</h4>
                    <p>${consultation.email} • ${consultation.phone}</p>
                    <p><strong>Collection:</strong> ${consultation.preferredCollection || 'Not specified'}</p>
                    <p><strong>Status:</strong> <span class="consultation-status status-${consultation.status}">${consultation.status}</span></p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn btn--outline btn--sm" onclick="updateConsultationStatus(${consultation.id}, 'confirmed')">Confirm</button>
                    <button class="btn btn--outline btn--sm" onclick="updateConsultationStatus(${consultation.id}, 'completed')">Complete</button>
                </div>
            </div>
        `;
    }).join('');
    
    if (appData.consultations.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No Consultations</h4><p>New consultation requests will appear here.</p></div>';
    }
}

function loadAdminUsers() {
    const container = document.getElementById('usersList');
    if (!container) return;
    
    const users = appData.users.filter(u => u.role !== 'admin');
    
    container.innerHTML = users.map(user => `
        <div class="admin-user-item">
            <div class="admin-item-info">
                <h4>${user.name}</h4>
                <p>${user.email} • ${user.phone || 'No phone'}</p>
                <p><strong>Joined:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
                <p><strong>Measurements:</strong> ${Object.keys(user.measurements || {}).length > 0 ? 'Completed' : 'Not provided'}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn--outline btn--sm" onclick="viewUserDetails(${user.id})">View Details</button>
            </div>
        </div>
    `).join('');
    
    if (users.length === 0) {
        container.innerHTML = '<div class="empty-state"><h4>No Users</h4><p>Registered users will appear here.</p></div>';
    }
}

function loadAdminAnalytics() {
    const totalUsersEl = document.getElementById('totalUsers');
    const totalProductsEl = document.getElementById('totalProducts');
    const pendingConsultationsEl = document.getElementById('pendingConsultations');
    const completedOrdersEl = document.getElementById('completedOrders');
    
    if (totalUsersEl) totalUsersEl.textContent = appData.users.filter(u => u.role !== 'admin').length;
    if (totalProductsEl) totalProductsEl.textContent = appData.products.length;
    if (pendingConsultationsEl) pendingConsultationsEl.textContent = appData.consultations.filter(c => c.status === 'pending').length;
    if (completedOrdersEl) completedOrdersEl.textContent = appData.orders.filter(o => o.status === 'completed').length;
}

function updateConsultationStatus(consultationId, newStatus) {
    const consultation = appData.consultations.find(c => c.id === consultationId);
    if (consultation) {
        consultation.status = newStatus;
        if (newStatus === 'confirmed') {
            consultation.scheduledDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }
        saveAppData();
        loadAdminConsultations();
        showNotification(`Consultation ${newStatus} successfully`, 'success');
        simulateEmailNotification('consultationUpdate', consultation.email, { status: newStatus });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#1e4d3c' : type === 'error' ? '#722f37' : '#1a2332'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
        cursor: pointer;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Email Simulation
function simulateEmailNotification(type, email, data = {}) {
    console.log(`📧 Email sent to ${email}:`, type, data);
}

// Animation functions (abbreviated for core functionality)
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat__number[data-target]');
    const observerOptions = { threshold: 0.5 };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easeOutCubic);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar__fill[data-width]');
    const observerOptions = { threshold: 0.3 };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 200);
                progressObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.collection-card, .technique-card, .artisan-card, .testimonial-card');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(26, 35, 50, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

function initTechniqueCards() {
    const techniqueCards = document.querySelectorAll('.technique-card');
    
    techniqueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
            card.style.borderLeftWidth = '8px';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderLeftWidth = '4px';
        });
    });
}

// Product Management Functions
function showAddProductForm() {
    showNotification('Add Product functionality would open a form modal here', 'info');
}

function editProduct(productId) {
    showNotification('Edit Product functionality would open here', 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = appData.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            appData.products.splice(index, 1);
            saveAppData();
            loadAdminProducts();
            showNotification('Product deleted successfully', 'success');
        }
    }
}

function viewUserDetails(userId) {
    const user = appData.users.find(u => u.id === userId);
    if (user) {
        showNotification(`User details for ${user.name} would be shown in a detailed modal`, 'info');
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        const modalContent = modal.querySelector('div');
        if (modalContent) {
            modalContent.style.maxHeight = '80vh';
        }
    });
}, 250));

// Save user state on page unload
window.addEventListener('beforeunload', () => {
    saveCurrentUser();
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.updateConsultationStatus = updateConsultationStatus;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.viewUserDetails = viewUserDetails;

console.log('BEHAK app script loaded');

fetch('http://localhost:8000/api/products/')
  .then(response => response.json())
  .then(data => {
    // Display products on page
    console.log(data);
  });

  document.getElementById('uploadForm').addEventListener('submit', function(e){
  e.preventDefault();
  let formData = new FormData(this);
  fetch('http://localhost:8000/api/products/', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => alert("Product uploaded!"))
  .catch(err => alert("Error: "+err));
});

fetch('http://127.0.0.1:8000/api/products/')
  .then(response => response.json())
  .then(data => {
    let container = document.getElementById('product-list');
    data.forEach(product => {
      container.innerHTML += `
        <div>
          <h3>${product.name}</h3>
          <img src="<http://127.0.0.1:8000${product.images>[0]?.image}" width="180"/>
          <p>${product.description}</p>
        </div>
      `;
    });
  });
document.getElementById('uploadForm').addEventListener('submit', function(e){
  e.preventDefault();
  let formData = new FormData(this);
  fetch('http://127.0.0.1:8000/api/products/', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => alert("Product uploaded!"))
  .catch(err => alert("Error: "+err));
});