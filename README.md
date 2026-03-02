# djblam.github.io

Personal portfolio website hosted on GitHub Pages.

🌐 **Live Site:** [https://djblam.github.io](https://djblam.github.io)

---

## 🚀 GitHub Pages Setup Instructions

### Step 1: Create the Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Configure the repository:
   - **Owner:** `djblam`
   - **Repository name:** `djblam.github.io` (must match your username exactly)
   - **Visibility:** Public (required for free GitHub Pages)
   - **Initialize:** Leave unchecked if pushing existing code
3. Click **Create repository**

### Step 2: Push Your Code

```bash
# Navigate to your project folder
cd djblam.github.io

# Initialize git (if not already done)
git init

# Add the remote origin
git remote add origin https://github.com/djblam/djblam.github.io.git

# Stage all files
git add .

# Create your first commit
git commit -m "Initial commit: Portfolio website"

# Push to GitHub (main branch)
git push -u origin main
```

> **Note:** If your default branch is `master`, either push to master or rename it:
> ```bash
> git branch -M main
> git push -u origin main
> ```

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/djblam/djblam.github.io`
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

### Step 4: Access Your Site

Your site will be live at **https://djblam.github.io** within a few minutes!

---

## 📁 Project Structure

```
djblam.github.io/
├── index.html      # Main HTML file with semantic structure
├── styles.css      # Mobile-first CSS with dark mode support
├── script.js       # Vanilla JS for interactivity
├── README.md       # This file
└── .gitignore      # Git ignore rules
```

---

## ✨ Features

- **Responsive Design:** Mobile-first approach, looks great on all devices
- **Dark/Light Mode:** Automatic system preference detection + manual toggle
- **Semantic HTML5:** Proper accessibility and SEO structure
- **Smooth Animations:** CSS transitions and scroll effects
- **Form Validation:** Client-side validation with helpful error messages
- **No Dependencies:** Pure HTML, CSS, and JavaScript - no frameworks needed
- **Fast Loading:** Minimal assets, optimized for performance

---

## 🎨 Customization Guide

### Update Your Personal Info

1. **index.html:**
   - Replace `[Your Name]` with your actual name
   - Update meta description and author tags
   - Modify hero section content
   - Add your real projects with descriptions
   - Update social links (GitHub, LinkedIn, Email)

2. **styles.css:**
   - Modify CSS variables in `:root` to change colors
   - Adjust `--accent-primary` for your brand color
   - Customize fonts by changing `--font-family`

3. **script.js:**
   - Configure form submission (see Form Integration section below)

### Adding Your Photo

Replace the `.image-placeholder` div in the About section with:

```html
<img src="your-photo.jpg" alt="Your Name" class="profile-photo">
```

Add corresponding CSS:

```css
.profile-photo {
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: var(--border-radius-lg);
}
```

### Adding Projects

Duplicate the `.project-card` article and update:
- Project screenshot/image
- Title and description
- Technology tags
- Demo and GitHub links

---

## 📬 Form Integration Options

The contact form needs a backend service to send emails. Here are some free options:

### Option 1: Formspree (Recommended)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms

If you deploy to Netlify instead:
```html
<form name="contact" method="POST" data-netlify="true">
```

### Option 3: EmailJS

Use client-side email sending:
```javascript
// Add EmailJS SDK and configure in script.js
emailjs.send('service_id', 'template_id', formData);
```

---

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/djblam/djblam.github.io.git
   cd djblam.github.io
   ```

2. Open with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve
   
   # Using VS Code Live Server extension
   # Right-click index.html > "Open with Live Server"
   ```

3. Visit `http://localhost:8000` in your browser

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

---

Made with ☕ and vanilla JavaScript
