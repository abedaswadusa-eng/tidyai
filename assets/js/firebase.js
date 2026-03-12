/**
 * TIDYAI - Firebase Waitlist Integration
 * Uses Firebase CDN for static site deployment
 */

// ============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project details
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDBiTNOeie-Tz2Rn37vXGJFYavqX2T6o3",
    authDomain: "tidyai-4ad87.firebaseapp.com",
    projectId: "tidyai-4ad87",
    storageBucket: "tidyai-4ad87.firebasestorage.app",
    messagingSenderId: "92533733060",
    appId: "1:92533733060:android:968e5180ae7eb13a307b91",
    databaseURL: "https://tidyai-4ad87.firebaseio.com"
};

// Waitlist collection name
const WAITLIST_COLLECTION = 'waitlist';

// Firebase app instance
let app = null;
let db = null;

/**
 * Initialize Firebase app
 */
async function initFirebase() {
    if (!app) {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
        app = initializeApp(firebaseConfig);
    }
    return app;
}

/**
 * Get Firestore instance
 */
async function getDb() {
    if (!db) {
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
        db = getFirestore(await initFirebase());
    }
    return db;
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Submit email to waitlist
 * @param {string} email - User's email address
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function submitToWaitlist(email) {
    // Validate email
    if (!email || !isValidEmail(email)) {
        return {
            success: false,
            message: 'Please enter a valid email address'
        };
    }

    try {
        // Get Firestore instance
        const firestore = await getDb();
        const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");

        // Add to waitlist collection
        await addDoc(collection(firestore, WAITLIST_COLLECTION), {
            email: email,
            joinedAt: new Date().toISOString()
        });

        console.log("Email saved to waitlist!");
        return {
            success: true,
            message: 'Welcome to the waitlist!'
        };

    } catch (error) {
        console.error('Error saving email:', error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.'
        };
    }
}

/**
 * Initialize waitlist form
 */
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const input = document.getElementById('waitlist-email');
    const submitBtn = document.getElementById('waitlist-submit');
    const messageEl = document.getElementById('waitlist-message');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = input.value.trim();

        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'JOINING...';
        messageEl.textContent = '';
        messageEl.className = 'waitlist-message';

        const result = await submitToWaitlist(email);

        if (result.success) {
            messageEl.textContent = result.message;
            messageEl.classList.add('success');
            input.value = '';
        } else {
            messageEl.textContent = result.message;
            messageEl.classList.add('error');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBSCRIBE';
    });
}

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initWaitlistForm();
});

// Export for use in other files
window.TIDYAI = {
    submitToWaitlist,
    isValidEmail
};
