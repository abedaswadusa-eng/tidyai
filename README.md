# TIDYAI Website

Gauchère-inspired minimalist luxury website for TidyAI - an AI-powered room tidying assistant.

## 🎨 Design System

The design follows Gauchère's aesthetic principles:
- Ultra-minimalist, high-fashion editorial layout
- Massive whitespace (breathing room everywhere)
- All caps typography (900 weight, huge tracking)
- Monochrome palette with subtle gray textures
- Grid-based presentation
- "Less is more" philosophy

## 📁 Project Structure

```
tidyai-website/
├── index.html              # Home page
├── download.html           # Download page
├── about.html              # About Us page
├── 404.html                # Error page
├── README.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # Complete styling
    ├── js/
    │   ├── main.js         # Navigation & interactions
    │   └── firebase.js     # Waitlist functionality
    ├── images/
    │   ├── logo.svg        # Logo
    │   ├── hero-image.webp # App mockup
    │   └── favicon.ico     # Favicon
    └── downloads/
        └── tidyai-v1.0.0.apk  # Android APK (your actual APK)
```

## 🚀 Getting Started

### 1. Replace Placeholder Assets

- **`assets/images/hero-image.webp`** - Replace with your actual app screenshot/mockup
- **`assets/downloads/tidyai-v1.0.0.apk`** - Replace with your actual APK file

### 2. Configure Firebase (Optional)

To enable the waitlist functionality:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Update `assets/js/firebase.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com"
};
```

4. Uncomment the Firebase initialization code in `firebase.js`

### 3. Customize Content

- Update email address in `about.html` and `index.html`
- Update social media links
- Update version number in `download.html`
- Add your actual APK file

## 🎯 Design Customization

### Colors

All colors are defined in CSS variables in `style.css`:

```css
:root {
  --color-bg: #FFFFFF;
  --color-text: #000000;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E8E8E8;
  --color-gray-400: #BBBBBB;
  --color-gray-600: #888888;
}
```

### Typography

The design uses system fonts with custom letter-spacing:
- Headings: 900 weight, 4px letter-spacing
- Navigation: 400 weight, 2px letter-spacing
- Body: 400 weight, normal spacing

## 📱 Deployment

### Static Hosting

This is a static website that can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: `firebase deploy`

### Build for Production

No build step required - just upload the files as-is.

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Copyright © 2025 TIDYAI. All rights reserved.

## 🙏 Credits

Design inspired by [Gauchère](https://gauchere.com) - a Parisian high-fashion brand known for minimalist luxury.
