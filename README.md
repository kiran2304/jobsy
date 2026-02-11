# 🚀 Jobsy - Your Complete Job Search Ecosystem

**Jobsy** is a modern, full-featured job search platform built with React that helps job seekers discover opportunities, build professional resumes, track applications, and prepare for interviews - all in one place.

![Jobsy Banner](https://img.shields.io/badge/React-18.3-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🔍 **Smart Job Discovery**
- Real-time job listings from top Indian companies (Google, Microsoft, Amazon, Flipkart, Zomato, Swiggy, TCS, Infosys)
- Advanced filters: Location, Salary Range, Job Type, Skills
- Direct "Apply Now" links to company career pages
- Simulated real-time data sync engine

### 📊 **Personalized Dashboard**
- Track all your job applications in one place
- Application status tracking (Applied, Interview, Offer, Rejected)
- Quick stats: Total applications, interviews scheduled, offers received
- Recent activity timeline

### 📝 **AI-Powered Resume Builder**
- Professional resume templates
- AI-powered content suggestions
- ATS (Applicant Tracking System) score checker
- Real-time preview
- Export to PDF

### 💼 **Career Tools**
- **Cover Letter Generator** - AI-assisted personalized cover letters
- **Skill Assessment** - Test your knowledge in various tech domains
- **Learning Roadmap** - Personalized career development paths
- **Company Explorer** - Research top employers with detailed profiles

### 📧 **Communication Hub**
- Centralized inbox for all job-related emails
- Application status notifications
- Interview invitations tracking

### ⚙️ **Settings & Integrations**
- Manage data sources and scraping preferences
- Notification preferences
- Privacy controls
- Real-time data sync controls

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 5.4
- **Routing:** React Router DOM 7.1
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with CSS Variables
- **State Management:** React Hooks (useState, useEffect)
- **Data Persistence:** LocalStorage
- **Fonts:** Google Fonts (Inter, Outfit)

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kiran2304/jobsy.git
   cd jobsy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🎯 Usage

### Getting Started
1. **Sign Up** - Create your account (demo mode uses localStorage)
2. **Explore Jobs** - Browse through curated job listings
3. **Apply** - Click "Apply Now" to visit company career pages
4. **Track Applications** - Monitor your progress in the Dashboard
5. **Build Resume** - Use the AI-powered resume builder
6. **Prepare** - Take skill assessments and follow learning roadmaps

### Key Pages
- `/` - Landing page with hero section
- `/jobs` - Job discovery with filters
- `/dashboard` - Application tracking dashboard
- `/resume` - Resume builder
- `/companies` - Company profiles
- `/roadmap` - Career development paths
- `/assessment` - Skill testing
- `/inbox` - Message center

---

## 🎨 Design Highlights

- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark Mode Ready** - CSS variable-based theming
- **Accessibility** - Semantic HTML and ARIA labels
- **Performance** - Optimized with Vite for fast load times

---

## 📂 Project Structure

```
jobsy/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── BugReportModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── JobDiscovery.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── Companies.jsx
│   │   ├── Roadmap.jsx
│   │   ├── Assessment.jsx
│   │   ├── CoverLetter.jsx
│   │   ├── Inbox.jsx
│   │   ├── Settings.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/
│   │   └── JobService.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Use GitHub Actions or gh-pages package
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kiran Hosakeri**
- GitHub: [@kiran2304](https://github.com/kiran2304)
- Email: kiranhosakeri@gmail.com

---

## 🙏 Acknowledgments

- Job data sourced from company career pages
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

## 📸 Screenshots

### 🎨 Resume Builder
![Resume Builder](screenshots/resume-builder.png)
*AI-powered resume builder with real-time preview and ATS score checker*

### 🏢 Company Explorer
![Companies](screenshots/companies.png)
*Browse top Indian companies with detailed profiles and job listings*

### 📊 Application Dashboard
![Dashboard](screenshots/dashboard.png)
*Track all your applications with status updates and analytics*

### 🗺️ Learning Roadmap
![Roadmap](screenshots/roadmap.png)
*Personalized career development paths with progress tracking*

### ⚙️ Settings & Data Engine
![Settings](screenshots/settings.png)
*Real-time data sync engine and integration management*

---

## 🔮 Future Enhancements

- [ ] Backend integration for real-time job scraping
- [ ] Email notifications via SendGrid/AWS SES
- [ ] User authentication with JWT
- [ ] Social login (Google, LinkedIn)
- [ ] Advanced analytics dashboard
- [ ] Job recommendations using ML
- [ ] Interview preparation resources
- [ ] Salary negotiation tools

---

**Made with ❤️ by Kiran Hosakeri**
