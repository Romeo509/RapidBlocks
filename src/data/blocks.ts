import { BlockTemplate } from '@/types';

export const blockTemplates: BlockTemplate[] = [
  // ========== BUTTONS ==========
  {
    id: 'btn-primary',
    name: 'Primary Button',
    category: 'Buttons',
    icon: '🔘',
    defaultWidth: 150,
    defaultHeight: 50,
    html: `<button class="btn-primary">Click Me</button>`,
    css: `
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  height: 100%;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
    `
  },
  {
    id: 'btn-outline',
    name: 'Outline Button',
    category: 'Buttons',
    icon: '⭕',
    defaultWidth: 150,
    defaultHeight: 50,
    html: `<button class="btn-outline">Learn More</button>`,
    css: `
.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  height: 100%;
}
.btn-outline:hover {
  background: #3b82f6;
  color: white;
}
    `
  },
  {
    id: 'btn-icon',
    name: 'Icon Button',
    category: 'Buttons',
    icon: '➡️',
    defaultWidth: 180,
    defaultHeight: 50,
    html: `<button class="btn-icon">Get Started <span>→</span></button>`,
    css: `
.btn-icon {
  background: #10b981;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  width: 100%;
  height: 100%;
}
.btn-icon:hover {
  background: #059669;
}
.btn-icon span {
  transition: transform 0.2s;
}
.btn-icon:hover span {
  transform: translateX(4px);
}
    `
  },

  // ========== CARDS ==========
  {
    id: 'card-profile',
    name: 'Profile Card',
    category: 'Cards',
    icon: '👤',
    defaultWidth: 320,
    defaultHeight: 400,
    html: `
<div class="profile-card">
  <div class="profile-header">
    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Profile" />
  </div>
  <div class="profile-body">
    <h3>John Doe</h3>
    <p class="title">Senior Developer</p>
    <p class="bio">Passionate about creating beautiful and functional web experiences.</p>
    <div class="social-links">
      <a href="#">Twitter</a>
      <a href="#">LinkedIn</a>
      <a href="#">GitHub</a>
    </div>
  </div>
</div>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  display: flex;
  justify-content: center;
}
.profile-header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}
.profile-body {
  padding: 20px;
  text-align: center;
  flex: 1;
}
.profile-body h3 {
  font-size: 1.4rem;
  color: #1f2937;
  margin-bottom: 4px;
}
.profile-body .title {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 12px;
}
.profile-body .bio {
  color: #4b5563;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 16px;
}
.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.social-links a {
  color: #667eea;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 6px;
  background: #f3f4f6;
  transition: all 0.2s;
}
.social-links a:hover {
  background: #667eea;
  color: white;
}
    `
  },
  {
    id: 'card-product',
    name: 'Product Card',
    category: 'Cards',
    icon: '🛍️',
    defaultWidth: 300,
    defaultHeight: 420,
    html: `
<div class="product-card">
  <div class="product-image">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop" alt="Product" />
    <span class="badge">New</span>
  </div>
  <div class="product-info">
    <span class="category">Electronics</span>
    <h3>Smart Watch Pro</h3>
    <p>Advanced fitness tracking with heart rate monitor and GPS.</p>
    <div class="price-row">
      <span class="price">$299</span>
      <button>Add to Cart</button>
    </div>
  </div>
</div>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.product-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.product-card:hover .product-image img {
  transform: scale(1.05);
}
.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.category {
  color: #6b7280;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.product-info h3 {
  font-size: 1.2rem;
  color: #1f2937;
  margin: 8px 0;
}
.product-info p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
}
.price-row button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.price-row button:hover {
  background: #2563eb;
}
    `
  },
  {
    id: 'card-testimonial',
    name: 'Testimonial Card',
    category: 'Cards',
    icon: '💬',
    defaultWidth: 350,
    defaultHeight: 250,
    html: `
<div class="testimonial-card">
  <div class="quote">"</div>
  <p class="text">This product has completely transformed how we work. The team is more productive than ever!</p>
  <div class="author">
    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face" alt="Author" />
    <div class="author-info">
      <strong>Sarah Johnson</strong>
      <span>CEO, TechCorp</span>
    </div>
  </div>
</div>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.quote {
  font-size: 4rem;
  color: #3b82f6;
  line-height: 1;
  margin-bottom: -20px;
  font-family: Georgia, serif;
}
.text {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
  font-style: italic;
  flex: 1;
}
.author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}
.author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.author-info {
  display: flex;
  flex-direction: column;
}
.author-info strong {
  color: #1f2937;
  font-size: 0.95rem;
}
.author-info span {
  color: #6b7280;
  font-size: 0.85rem;
}
    `
  },

  // ========== NAVIGATION ==========
  {
    id: 'nav-simple',
    name: 'Simple Navbar',
    category: 'Navigation',
    icon: '📱',
    defaultWidth: 800,
    defaultHeight: 70,
    html: `
<nav class="navbar">
  <div class="logo">Brand</div>
  <ul class="nav-links">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <button class="cta-btn">Get Started</button>
</nav>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: white;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}
.nav-links a {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover, .nav-links a.active {
  color: #3b82f6;
}
.cta-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.cta-btn:hover {
  background: #2563eb;
}
    `
  },

  // ========== HERO SECTIONS ==========
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    category: 'Hero',
    icon: '🎯',
    defaultWidth: 800,
    defaultHeight: 500,
    html: `
<section class="hero">
  <h1>Build Something Amazing</h1>
  <p>Create beautiful websites without writing code. Drag, drop, and customize to your heart's content.</p>
  <div class="hero-buttons">
    <button class="btn-primary">Start Building</button>
    <button class="btn-secondary">Watch Demo</button>
  </div>
</section>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 80px 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 30px;
  opacity: 0.9;
}
.hero-buttons {
  display: flex;
  gap: 16px;
}
.btn-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
}
.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover {
  background: white;
  color: #667eea;
}
    `
  },

  // ========== FORMS ==========
  {
    id: 'form-contact',
    name: 'Contact Form',
    category: 'Forms',
    icon: '📝',
    defaultWidth: 400,
    defaultHeight: 450,
    html: `
<form class="contact-form">
  <h3>Contact Us</h3>
  <div class="form-group">
    <label>Name</label>
    <input type="text" placeholder="Your name" />
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" placeholder="your@email.com" />
  </div>
  <div class="form-group">
    <label>Message</label>
    <textarea placeholder="Your message..." rows="4"></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.contact-form {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  height: 100%;
}
.contact-form h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}
.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}
.form-group textarea {
  resize: vertical;
  min-height: 100px;
}
.contact-form button {
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.contact-form button:hover {
  background: #2563eb;
}
    `
  },
  {
    id: 'form-login',
    name: 'Login Form',
    category: 'Forms',
    icon: '🔐',
    defaultWidth: 380,
    defaultHeight: 420,
    html: `
<form class="login-form">
  <div class="form-header">
    <h3>Welcome Back</h3>
    <p>Sign in to your account</p>
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" placeholder="your@email.com" />
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" placeholder="••••••••" />
  </div>
  <div class="form-options">
    <label class="checkbox"><input type="checkbox" /> Remember me</label>
    <a href="#">Forgot password?</a>
  </div>
  <button type="submit">Sign In</button>
  <p class="signup-link">Don't have an account? <a href="#">Sign up</a></p>
</form>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.login-form {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  height: 100%;
}
.form-header {
  text-align: center;
  margin-bottom: 30px;
}
.form-header h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 8px;
}
.form-header p {
  color: #6b7280;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
}
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
}
.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
}
.form-options a {
  color: #3b82f6;
  text-decoration: none;
}
.login-form button {
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-form button:hover {
  background: #2563eb;
}
.signup-link {
  text-align: center;
  margin-top: 20px;
  color: #6b7280;
  font-size: 0.9rem;
}
.signup-link a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}
    `
  },

  // ========== FEATURES ==========
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    category: 'Features',
    icon: '⭐',
    defaultWidth: 700,
    defaultHeight: 350,
    html: `
<div class="features-grid">
  <div class="feature">
    <div class="icon">🚀</div>
    <h4>Fast Performance</h4>
    <p>Lightning-fast load times and smooth interactions.</p>
  </div>
  <div class="feature">
    <div class="icon">🔒</div>
    <h4>Secure</h4>
    <p>Enterprise-grade security for your data.</p>
  </div>
  <div class="feature">
    <div class="icon">📱</div>
    <h4>Responsive</h4>
    <p>Looks great on all devices and screen sizes.</p>
  </div>
</div>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 30px;
  background: #f9fafb;
  border-radius: 16px;
  width: 100%;
  height: 100%;
}
.feature {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
.feature:hover {
  transform: translateY(-4px);
}
.icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}
.feature h4 {
  font-size: 1.1rem;
  color: #1f2937;
  margin-bottom: 8px;
}
.feature p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}
    `
  },

  // ========== PRICING ==========
  {
    id: 'pricing-card',
    name: 'Pricing Card',
    category: 'Pricing',
    icon: '💳',
    defaultWidth: 300,
    defaultHeight: 450,
    html: `
<div class="pricing-card">
  <div class="pricing-header">
    <h4>Pro Plan</h4>
    <div class="price">
      <span class="currency">$</span>
      <span class="amount">49</span>
      <span class="period">/month</span>
    </div>
  </div>
  <ul class="features">
    <li>✓ Unlimited projects</li>
    <li>✓ Priority support</li>
    <li>✓ Advanced analytics</li>
    <li>✓ Custom domain</li>
    <li>✓ Team collaboration</li>
  </ul>
  <button>Get Started</button>
</div>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.pricing-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.pricing-header {
  margin-bottom: 24px;
}
.pricing-header h4 {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 12px;
}
.price {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.currency {
  font-size: 1.5rem;
  color: #1f2937;
}
.amount {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1f2937;
}
.period {
  color: #6b7280;
  font-size: 1rem;
}
.features {
  list-style: none;
  text-align: left;
  flex: 1;
}
.features li {
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
}
.features li:last-child {
  border-bottom: none;
}
.pricing-card button {
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 20px;
}
.pricing-card button:hover {
  background: #2563eb;
}
    `
  },

  // ========== FOOTERS ==========
  {
    id: 'footer-simple',
    name: 'Simple Footer',
    category: 'Footer',
    icon: '🦶',
    defaultWidth: 800,
    defaultHeight: 200,
    html: `
<footer class="footer">
  <div class="footer-content">
    <div class="footer-brand">
      <h3>RapidBlocks</h3>
      <p>Build beautiful websites with ease.</p>
    </div>
    <div class="footer-links">
      <div class="link-group">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Templates</a>
      </div>
      <div class="link-group">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
      </div>
      <div class="link-group">
        <h4>Support</h4>
        <a href="#">Help</a>
        <a href="#">Contact</a>
        <a href="#">Docs</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2024 RapidBlocks. All rights reserved.</p>
  </div>
</footer>
    `,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.footer {
  background: #1f2937;
  color: white;
  padding: 40px 30px 20px;
  width: 100%;
  height: 100%;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.footer-brand h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
}
.footer-brand p {
  color: #9ca3af;
  font-size: 0.9rem;
}
.footer-links {
  display: flex;
  gap: 60px;
}
.link-group h4 {
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: #9ca3af;
}
.link-group a {
  display: block;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 8px;
  transition: color 0.2s;
}
.link-group a:hover {
  color: #3b82f6;
}
.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 20px;
  text-align: center;
}
.footer-bottom p {
  color: #9ca3af;
  font-size: 0.85rem;
}
    `
  },

  // ========== TEXT ==========
  {
    id: 'text-heading',
    name: 'Heading',
    category: 'Text',
    icon: '📰',
    defaultWidth: 400,
    defaultHeight: 80,
    html: `<h1 class="heading">Your Amazing Headline</h1>`,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
    `
  },
  {
    id: 'text-paragraph',
    name: 'Paragraph',
    category: 'Text',
    icon: '📄',
    defaultWidth: 500,
    defaultHeight: 100,
    html: `<p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>`,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.paragraph {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.7;
  width: 100%;
  height: 100%;
}
    `
  },

  // ========== IMAGES ==========
  {
    id: 'image-rounded',
    name: 'Rounded Image',
    category: 'Media',
    icon: '🖼️',
    defaultWidth: 300,
    defaultHeight: 200,
    html: `<img class="rounded-image" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Image" />`,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.rounded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
    `
  },

  // ========== DIVIDERS ==========
  {
    id: 'divider-simple',
    name: 'Simple Divider',
    category: 'Layout',
    icon: '➖',
    defaultWidth: 400,
    defaultHeight: 30,
    html: `<hr class="divider" />`,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
.divider {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  margin: 10px 0;
}
    `
  },

  // ========== BADGES ==========
  {
    id: 'badge-status',
    name: 'Status Badge',
    category: 'Elements',
    icon: '🏷️',
    defaultWidth: 100,
    defaultHeight: 35,
    html: `<span class="badge">Active</span>`,
    css: `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.badge {
  background: #10b981;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}
    `
  },
];

export const categories = [
  'Buttons',
  'Cards',
  'Navigation',
  'Hero',
  'Forms',
  'Features',
  'Pricing',
  'Footer',
  'Text',
  'Media',
  'Layout',
  'Elements',
];
