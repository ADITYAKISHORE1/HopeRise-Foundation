# 🌱 HopeRise Foundation — NGO Website

Welcome to the **HopeRise Foundation** repository! This is a complete, feature-rich, and professionally designed NGO (Non-Governmental Organization) website built to highlight global initiatives such as Education, Clean Water, Healthcare, Women Empowerment, Disaster Relief, and Environmental Conservation.

## 🔗 Live Links
- **Live Website**: [Website](https://hope-rise-foundation-ngo.vercel.app/) *(Update this URL once deployed to Vercel)*

---

## 🎨 Features & Pages (Frontend)
The frontend is built using standard HTML, CSS, and Vanilla JavaScript to ensure maximum speed and compatibility. 

1. **Homepage (`index.html`)**: Features an engaging hero section with particle animations, live impact counters, mission statements, program highlights, and a call-to-action (CTA).
2. **About Us (`about.html`)**: Details the organization's story, an interactive timeline of milestones, team profiles, and partner logos.
3. **Programs (`programs.html`)**: A comprehensive look at the organization's core initiatives with a filterable tab system (Education, Water, Healthcare, etc.).
4. **Impact (`impact.html`)**: Showcases transparency through impact statistics, a financial allocation pie chart, progress bars, an interactive world map, and downloadable annual reports.
5. **Blog (`blog.html`)**: A dynamic blog listing page featuring search functionality, category filtering, and a grid of articles fetched via the backend API.
6. **Blog Post (`blog-post.html`)**: A detailed article template with dynamic content rendering, author details, social sharing buttons, and a related posts sidebar.
7. **Gallery (`gallery.html`)**: A visually stunning masonry photo grid featuring a built-in interactive lightbox viewer and category filters.
8. **Donate (`donate.html`)**: A comprehensive donation page offering one-time/monthly toggles, predefined amount selectors, an impact calculator, and a secure payment form UI.
9. **Volunteer (`volunteer.html`)**: Highlights available volunteer roles and features a seamless multi-step signup form with progress tracking.
10. **Contact (`contact.html`)**: Offers various contact methods, an FAQ accordion, and a functioning contact form.

---

## ⚙️ Backend & API
The backend is powered by **Express.js** (`api/index.js`), structured to run flawlessly in a serverless environment like Vercel. It uses an in-memory data store for demonstration purposes and serves several API endpoints:

- `GET /api/blogs` - Retrieves all blog posts.
- `GET /api/blogs/:id` - Retrieves a specific blog post by its ID.
- `POST /api/contact` - Accepts contact form submissions.
- `POST /api/volunteer` - Accepts multi-step volunteer applications.
- `POST /api/donate` - Processes donation pledges.
- `POST /api/newsletter` - Registers email newsletter subscribers.
- `GET /api/stats` - An admin route that aggregates data on total volunteers, donations, and contacts.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid), Vanilla JavaScript (ES6+).
- **Backend**: Node.js, Express.js (v5+).
- **Architecture**: Static Frontend combined with Serverless Backend Functions.
- **Deployment**: Configured for Vercel via `vercel.json`.

---

## 🚀 Local Development Setup

To run this project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/hoperise-ngo-website.git
   cd hoperise-ngo-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local server**:
   ```bash
   npm run dev
   ```

4. **View the site**:
   Open your browser and navigate to `http://localhost:3000`.

---

## 🌍 Deployment (Vercel)
This project is configured out-of-the-box for **Vercel's free Hobby Tier**.

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New** > **Project** and import your GitHub repository.
4. Leave all build settings as default. Vercel will automatically read `vercel.json` to route your API requests to the Express server while serving the HTML/CSS/JS files statically.
5. Click **Deploy**.

---
*Made with ❤️ for a better world.*
