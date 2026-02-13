# 🚀 KodnestCareers - Your Complete Job Search Ecosystem

> [!NOTE]
> **Note for Teacher:** While you can explore many features as a guest, we recommend **Signing Up or Logging In** to experience the full personalized career ecosystem, including the personalized dashboard and resume builder. It is **not compulsory** to log in to see the core job discovery features.

**KodnestCareers** is a modern, full-featured job search platform built with React and a Node.js/Prisma backend. It helps job seekers discover opportunities, build professional resumes, track applications, and prepare for interviews - all in one place.

![KodnestCareers Banner](https://img.shields.io/badge/React-18.3-blue?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js) ![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma) ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

---

## 🛠️ Project Setup

This project consists of a **Frontend** (React + Vite) and a **Backend** (Node.js + Express + Prisma + SQLite).

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
*The backend will run on `http://localhost:5000`*

### 2. Frontend Setup
```bash
# Open a new terminal
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## 🎯 Getting Started
1. **Open the App**: Navigate to `http://localhost:5173`.
2. **Sign Up / Login**: Click the "Sign Up" button in the navigation bar. **This is required to unlock all features.**
3. **Explore Jobs**: Visit the "Find Jobs" section to see listings from top companies (Google, Zomato, etc.).
4. **Dashboard**: After logging in, track your applications and view your career stats.
5. **Resume Builder**: Create and preview your professional resume.

---

## ✨ Features

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
KodnestCareers/
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
