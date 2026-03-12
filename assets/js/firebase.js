/**
 * TIDYAI - Firebase Waitlist Integration
 * Add your Firebase configuration below
 */

// ============================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project details
// ============================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com"
};

// Waitlist collection name
const WAITLIST_COLLECTION = 'waitlist';

// ============================================
// Initialize Firebase (uncomment when configured)
// ============================================

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x/firebase-app.js';
// import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.x/firebase-firestore.js';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

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
        // Using Firebase Firestore
        // Uncomment when Firebase is configured

        /*
        const docRef = await addDoc(collection(db, WAITLIST_COLLECTION), {
          email: email,
          createdAt: serverTimestamp(),
          status: 'pending'
        });
        
        return {
          success: true,
          message: 'Welcome to the waitlist!'
        };
        */

        // For demo purposes - simulate successful submission
        // Remove this when Firebase is configured
        console.log('Waitlist submission:', email);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Welcome to the waitlist!'
        };

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
