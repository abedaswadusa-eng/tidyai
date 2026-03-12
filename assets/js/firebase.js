/**
 * TIDYAI - Firebase Waitlist Integration
 * Uses Firebase CDN for static site deployment
 */

// ============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project details
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDBiTNOeie-Tz2Rn37vXGJFYavqX2T6o3M",
    authDomain: "tidyai-4ad87.firebaseapp.com",
    projectId: "tidyai-4ad87",
    storageBucket: "tidyai-4ad87.firebasestorage.app",
    messagingSenderId: "92533733060",
    appId: "1:92533733060:android:968e5180ae7eb13a307b91",
    databaseURL: "https://tidyai-4ad87.firebaseio.com"
};

// Waitlist collection name
const WAITLIST_COLLECTION = 'waitlist';

// ============================================
// Initialize Firebase
// ============================================
let db;

async function initFirebase() {
    if (typeof firebase !== 'undefined' && !db) {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log('Firebase initialized');
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    }
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
        // Initialize Firebase if not already done
        await initFirebase();

        if (db) {
            // Use Firebase Firestore
            await db.collection(WAITLIST_COLLECTION).add({
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'pending'
            });

            return {
                success: true,
                message: 'Welcome to the waitlist!'
            };
        } else {
            // Fallback: simulate successful submission (remove when Firebase is configured)
            console.log('Waitlist submission (simulated):', email);
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                success: true,
                message: 'Welcome to the waitlist!'
            };
        }
    } catch (error) {
        console.error('Waitlist error:', error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.'
        };
    }
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
