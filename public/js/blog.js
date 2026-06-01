/* ============================================
   HopeRise — Blog API Integration
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blog-grid');
  const blogSearch = document.getElementById('blog-search-input');

  if (!blogGrid) return;

  let allPosts = [];

  // Fetch blog posts from API
  async function loadPosts() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      allPosts = data.posts || data;
      renderPosts(allPosts);
    } catch (err) {
      // Fallback to static data
      allPosts = getStaticPosts();
      renderPosts(allPosts);
    }
  }

  function renderPosts(posts) {
    blogGrid.innerHTML = posts.map(post => `
      <div class="card blog-card reveal visible" data-category="${post.category}">
        <div class="card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
          <span class="badge">${post.category}</span>
        </div>
        <div class="card-body">
          <div class="meta">
            <span class="tag">${post.category}</span>
            <span>${post.date}</span>
            <span>·</span>
            <span>${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="blog-post.html?id=${post.id}" class="card-link">Read More →</a>
        </div>
      </div>
    `).join('');
  }

  // Search
  if (blogSearch) {
    blogSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = allPosts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      renderPosts(filtered);
    });
  }

  // Tab filter
  document.querySelectorAll('.blog-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.blog-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      const filtered = cat === 'all' ? allPosts : allPosts.filter(p => p.category === cat);
      renderPosts(filtered);
    });
  });

  loadPosts();

  // Static fallback data
  function getStaticPosts() {
    return [
      {
        id: 1, title: "How Education Transforms Communities in Rural India",
        excerpt: "Discover how our Bright Minds Initiative has helped over 15,000 children gain access to quality education in remote villages across India.",
        image: "images/education.png", category: "Education",
        date: "May 28, 2025", readTime: "5 min read",
        author: "Sarah Chen", content: ""
      },
      {
        id: 2, title: "Clean Water Changes Everything: Our Impact in East Africa",
        excerpt: "320 wells built, 200,000 lives transformed. See the ripple effect of clean water access in communities across Kenya and Tanzania.",
        image: "images/water.png", category: "Water",
        date: "May 15, 2025", readTime: "4 min read",
        author: "James Okafor", content: ""
      },
      {
        id: 3, title: "Mobile Healthcare: Bringing Doctors to Doorsteps",
        excerpt: "Our Healing Hands network has deployed 45 mobile clinics, providing medical care to remote communities that lack hospital access.",
        image: "images/healthcare.png", category: "Healthcare",
        date: "May 3, 2025", readTime: "6 min read",
        author: "Dr. Priya Mehta", content: ""
      },
      {
        id: 4, title: "Women Empowerment: Skills That Build Futures",
        excerpt: "Our vocational training programs have empowered over 8,000 women with marketable skills, boosting household incomes by an average of 40%.",
        image: "images/gallery-women.png", category: "Empowerment",
        date: "Apr 22, 2025", readTime: "5 min read",
        author: "Maria Garcia", content: ""
      },
      {
        id: 5, title: "Disaster Relief: Our Response to the Bangladesh Floods",
        excerpt: "When floods devastated southern Bangladesh, our rapid-response team deployed within 48 hours, reaching 12,000 affected families.",
        image: "images/disaster-relief.png", category: "Relief",
        date: "Apr 10, 2025", readTime: "7 min read",
        author: "Ahmed Khan", content: ""
      },
      {
        id: 6, title: "Reforestation: Planting Hope One Tree at a Time",
        excerpt: "Our Green Tomorrow initiative has planted 500,000 trees across deforested regions, combating climate change while creating local jobs.",
        image: "images/tree-planting.png", category: "Environment",
        date: "Mar 28, 2025", readTime: "4 min read",
        author: "David Nguyen", content: ""
      }
    ];
  }
});

// ---- Blog Post Page ----
function loadBlogPost() {
  const postContent = document.getElementById('post-content');
  if (!postContent) return;

  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id')) || 1;

  fetch(`/api/blogs/${postId}`)
    .then(res => res.json())
    .then(post => renderPost(post))
    .catch(() => renderPost(getDefaultPost(postId)));
}

function getDefaultPost(id) {
  const posts = {
    1: {
      title: "How Education Transforms Communities in Rural India",
      image: "images/education.png",
      category: "Education",
      date: "May 28, 2025",
      readTime: "5 min read",
      author: "Sarah Chen",
      content: `
        <p>Education is the most powerful tool we have for breaking the cycle of poverty. In rural India, where access to quality schools remains a challenge for millions of children, our Bright Minds Initiative has been creating transformative change since 2015.</p>

        <h2>The Challenge</h2>
        <p>In many remote villages, the nearest school can be 10 kilometers away. Families often cannot afford uniforms, books, or transportation. Girls face additional barriers, with cultural expectations sometimes prioritizing early marriage over education.</p>

        <blockquote>"When we first visited Sundarbans village, only 23% of children were attending school regularly. Today, that number is 94%." — Sarah Chen, Program Director</blockquote>

        <h2>Our Approach</h2>
        <p>Rather than building schools from scratch, we partner with existing community structures. We renovate local buildings, train teachers from within the community, and provide all learning materials free of charge. This model ensures sustainability because the community feels ownership over the program.</p>

        <h2>The Results</h2>
        <p>Over the past 8 years, the Bright Minds Initiative has:</p>
        <p>• Enrolled 15,000+ children in quality education programs<br>
        • Trained 450 local teachers across 120 villages<br>
        • Achieved a 97% retention rate among enrolled students<br>
        • Sent 340 students to university — many the first in their families</p>

        <p>These numbers represent real human lives transformed. When a child in rural India gets an education, the entire family benefits. Educated children grow up to earn more, invest in their communities, and break generational cycles of poverty.</p>

        <h2>Looking Ahead</h2>
        <p>By 2026, we aim to expand the program to 200 new villages, reaching an additional 25,000 children. With your support, we can make this vision a reality.</p>
      `
    },
    2: {
      title: "Clean Water Changes Everything: Our Impact in East Africa",
      image: "images/water.png", category: "Water",
      date: "May 15, 2025", readTime: "4 min read", author: "James Okafor",
      content: `<p>Access to clean water is a fundamental human right, yet 785 million people worldwide still lack basic water services. In East Africa, our Pure Springs Project is changing this reality one community at a time.</p><h2>The Crisis</h2><p>In rural Kenya and Tanzania, women and children spend an average of 6 hours daily collecting water from distant, often contaminated sources. Waterborne diseases account for 80% of illnesses in these regions.</p><blockquote>"Clean water didn't just improve our health — it gave our children time to go to school instead of fetching water." — Village elder, Makueni County</blockquote><h2>Our Solution</h2><p>We build deep-bore wells equipped with hand pumps designed to last 20+ years. Each well serves 250-500 people and is maintained by trained community water committees. We've built 320 wells across 15 counties, providing clean water to over 200,000 people.</p>`
    },
    3: {
      title: "Mobile Healthcare: Bringing Doctors to Doorsteps",
      image: "images/healthcare.png", category: "Healthcare",
      date: "May 3, 2025", readTime: "6 min read", author: "Dr. Priya Mehta",
      content: `<p>In many parts of the developing world, the nearest hospital can be hours away. Our Healing Hands Network bridges this gap by bringing medical professionals directly to the communities that need them most.</p><h2>The Problem</h2><p>3.5 billion people — nearly half the world's population — lack access to essential health services. In remote areas, simple illnesses become life-threatening because treatment isn't available in time.</p><h2>Our Mobile Clinics</h2><p>Each of our 45 mobile clinics is a fully equipped medical unit on wheels. Staffed by doctors, nurses, and pharmacists, they travel pre-set routes, visiting 5-8 villages per week. Services include general checkups, vaccinations, maternal care, and emergency treatment.</p><blockquote>"The mobile clinic saved my daughter's life. Without it, we would have had to travel 4 hours to the nearest hospital." — Fatima, mother of three</blockquote>`
    }
  };
  return posts[id] || posts[1];
}

function renderPost(post) {
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-image').src = post.image;
  document.getElementById('post-image').alt = post.title;
  document.getElementById('post-category').textContent = post.category;
  document.getElementById('post-date').textContent = post.date;
  document.getElementById('post-read-time').textContent = post.readTime;
  document.getElementById('post-author-name').textContent = post.author;
  document.getElementById('post-body').innerHTML = post.content;

  // Update page title
  document.title = post.title + ' — HopeRise Foundation';
}

document.addEventListener('DOMContentLoaded', loadBlogPost);
