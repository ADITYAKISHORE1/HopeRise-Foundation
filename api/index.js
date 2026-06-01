const express = require('express');
const path = require('path');
const app = express();

// ---- Middleware ----
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ---- In-Memory Data Store ----
const store = {
  contacts: [],
  volunteers: [],
  newsletters: [],
  donations: [],
};

// ---- Blog Posts Data ----
const blogPosts = [
  {
    id: 1,
    title: "How Education Transforms Communities in Rural India",
    excerpt: "Discover how our Bright Minds Initiative has helped over 15,000 children gain access to quality education in remote villages across India.",
    image: "images/education.png",
    category: "Education",
    date: "May 28, 2025",
    readTime: "5 min read",
    author: "Sarah Chen",
    content: `<p>Education is the most powerful tool we have for breaking the cycle of poverty. In rural India, where access to quality schools remains a challenge for millions of children, our Bright Minds Initiative has been creating transformative change since 2015.</p><h2>The Challenge</h2><p>In many remote villages, the nearest school can be 10 kilometers away. Families often cannot afford uniforms, books, or transportation. Girls face additional barriers, with cultural expectations sometimes prioritizing early marriage over education.</p><blockquote>"When we first visited Sundarbans village, only 23% of children were attending school regularly. Today, that number is 94%." — Sarah Chen, Program Director</blockquote><h2>Our Approach</h2><p>Rather than building schools from scratch, we partner with existing community structures. We renovate local buildings, train teachers from within the community, and provide all learning materials free of charge. This model ensures sustainability because the community feels ownership over the program.</p><h2>The Results</h2><p>Over the past 8 years, the Bright Minds Initiative has:</p><p>• Enrolled 15,000+ children in quality education programs<br>• Trained 450 local teachers across 120 villages<br>• Achieved a 97% retention rate among enrolled students<br>• Sent 340 students to university — many the first in their families</p><p>These numbers represent real human lives transformed. When a child in rural India gets an education, the entire family benefits.</p><h2>Looking Ahead</h2><p>By 2026, we aim to expand the program to 200 new villages, reaching an additional 25,000 children. With your support, we can make this vision a reality.</p>`
  },
  {
    id: 2,
    title: "Clean Water Changes Everything: Our Impact in East Africa",
    excerpt: "320 wells built, 200,000 lives transformed. See the ripple effect of clean water access in communities across Kenya and Tanzania.",
    image: "images/water.png",
    category: "Water",
    date: "May 15, 2025",
    readTime: "4 min read",
    author: "James Okafor",
    content: `<p>Access to clean water is a fundamental human right, yet 785 million people worldwide still lack basic water services. In East Africa, our Pure Springs Project is changing this reality one community at a time.</p><h2>The Crisis</h2><p>In rural Kenya and Tanzania, women and children spend an average of 6 hours daily collecting water from distant, often contaminated sources. Waterborne diseases account for 80% of illnesses in these regions.</p><blockquote>"Clean water didn't just improve our health — it gave our children time to go to school instead of fetching water." — Village elder, Makueni County</blockquote><h2>Our Solution</h2><p>We build deep-bore wells equipped with hand pumps designed to last 20+ years. Each well serves 250-500 people and is maintained by trained community water committees.</p><p>We've built 320 wells across 15 counties, providing clean water to over 200,000 people.</p>`
  },
  {
    id: 3,
    title: "Mobile Healthcare: Bringing Doctors to Doorsteps",
    excerpt: "Our Healing Hands network has deployed 45 mobile clinics, providing medical care to remote communities that lack hospital access.",
    image: "images/healthcare.png",
    category: "Healthcare",
    date: "May 3, 2025",
    readTime: "6 min read",
    author: "Dr. Priya Mehta",
    content: `<p>In many parts of the developing world, the nearest hospital can be hours away. Our Healing Hands Network bridges this gap by bringing medical professionals directly to the communities that need them most.</p><h2>The Problem</h2><p>3.5 billion people — nearly half the world's population — lack access to essential health services.</p><h2>Our Mobile Clinics</h2><p>Each of our 45 mobile clinics is a fully equipped medical unit on wheels. Staffed by doctors, nurses, and pharmacists, they travel pre-set routes, visiting 5-8 villages per week.</p><blockquote>"The mobile clinic saved my daughter's life. Without it, we would have had to travel 4 hours to the nearest hospital." — Fatima, mother of three</blockquote>`
  },
  {
    id: 4,
    title: "Women Empowerment: Skills That Build Futures",
    excerpt: "Our vocational training programs have empowered over 8,000 women with marketable skills, boosting household incomes by an average of 40%.",
    image: "images/gallery-women.png",
    category: "Empowerment",
    date: "Apr 22, 2025",
    readTime: "5 min read",
    author: "Maria Garcia",
    content: `<p>When women are empowered with skills and opportunity, entire communities transform. Our Women Rising program provides vocational training, microfinance, and mentorship to women in underserved regions.</p><h2>Training Programs</h2><p>We offer training in tailoring, digital literacy, agriculture, and small business management. Each program runs 6 months and includes ongoing mentorship support.</p><p>Over 8,000 women have graduated, with 85% starting their own income-generating activities within a year. Average household incomes have increased by 40%.</p>`
  },
  {
    id: 5,
    title: "Disaster Relief: Our Response to the Bangladesh Floods",
    excerpt: "When floods devastated southern Bangladesh, our rapid-response team deployed within 48 hours, reaching 12,000 affected families.",
    image: "images/disaster-relief.png",
    category: "Relief",
    date: "Apr 10, 2025",
    readTime: "7 min read",
    author: "Ahmed Khan",
    content: `<p>When the monsoon floods of 2024 devastated Bangladesh's Sylhet region, displacing over 4 million people, HopeRise's rapid response team was on the ground within 48 hours.</p><h2>Immediate Response</h2><p>Our team distributed emergency supply kits containing food, water, medicine, and shelter materials to 12,000 families. We set up 15 temporary medical camps staffed by volunteer doctors and nurses.</p><h2>Recovery Phase</h2><p>As floodwaters receded, we shifted focus to rebuilding. We've helped reconstruct 2,400 homes and restored 35 schools damaged by the flooding.</p>`
  },
  {
    id: 6,
    title: "Reforestation: Planting Hope One Tree at a Time",
    excerpt: "Our Green Tomorrow initiative has planted 500,000 trees across deforested regions, combating climate change while creating local jobs.",
    image: "images/tree-planting.png",
    category: "Environment",
    date: "Mar 28, 2025",
    readTime: "4 min read",
    author: "David Nguyen",
    content: `<p>Deforestation destroys ecosystems, accelerates climate change, and undermines the livelihoods of millions. Our Green Tomorrow initiative tackles this crisis through community-led reforestation.</p><h2>Our Model</h2><p>We hire local community members to plant and maintain tree nurseries. This creates sustainable jobs while restoring degraded land. To date, we've planted 500,000 trees across 5 countries.</p><h2>Impact</h2><p>Our forests sequester approximately 15,000 tonnes of CO2 annually, while providing food, medicine, and income to surrounding communities. We've created 800 permanent green jobs.</p>`
  }
];

// ---- API Routes ----

// GET all blog posts
app.get('/api/blogs', (req, res) => {
  const posts = blogPosts.map(({ content, ...rest }) => rest);
  res.json({ posts, total: posts.length });
});

// GET single blog post
app.get('/api/blogs/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST contact form
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, interest, message } = req.body;
  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  const entry = { id: Date.now(), firstName, lastName, email, interest, message, date: new Date().toISOString() };
  store.contacts.push(entry);
  console.log('📩 New contact:', entry);
  res.json({ success: true, message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.' });
});

// POST volunteer signup
app.post('/api/volunteer', (req, res) => {
  const { firstName, lastName, email, phone, skills, availability, motivation } = req.body;
  if (!firstName || !email) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  const entry = { id: Date.now(), firstName, lastName, email, phone, skills, availability, motivation, date: new Date().toISOString() };
  store.volunteers.push(entry);
  console.log('🙋 New volunteer:', entry);
  res.json({ success: true, message: 'Welcome aboard! We\'ll contact you soon with volunteer opportunities.' });
});

// POST newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  store.newsletters.push({ email, date: new Date().toISOString() });
  console.log('📧 Newsletter signup:', email);
  res.json({ success: true, message: 'You\'re subscribed! Check your inbox for a welcome email.' });
});

// POST donation
app.post('/api/donate', (req, res) => {
  const { amount, frequency, name, email } = req.body;
  const entry = { id: Date.now(), amount, frequency, name, email, date: new Date().toISOString() };
  store.donations.push(entry);
  console.log('❤️ New donation:', entry);
  res.json({ success: true, message: `Thank you for your generous $${amount} donation! Together, we're making a difference.` });
});

// GET stats (for admin/transparency)
app.get('/api/stats', (req, res) => {
  res.json({
    totalContacts: store.contacts.length,
    totalVolunteers: store.volunteers.length,
    totalNewsletterSubs: store.newsletters.length,
    totalDonations: store.donations.length,
    totalDonationAmount: store.donations.reduce((sum, d) => sum + (d.amount || 0), 0),
  });
});

// ---- SPA Fallback (serve index.html for unknown routes) ----
app.get('{*path}', (req, res) => {
  // If the request looks like a file, let it 404 naturally
  if (req.path.includes('.')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ---- Start Server (local dev) ----
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  🌱 HopeRise Foundation Server`);
    console.log(`  ──────────────────────────────`);
    console.log(`  🌐 Local:   http://localhost:${PORT}`);
    console.log(`  📡 API:     http://localhost:${PORT}/api/blogs`);
    console.log(`  ──────────────────────────────\n`);
  });
}

// Export for Vercel serverless
module.exports = app;
