# Crypto Adoption Report

A comprehensive analysis dashboard exploring cryptocurrency adoption patterns and their relationship with macroeconomic indicators.

## 🚀 Deployment to GitHub Pages

### Prerequisites
- Node.js (v14 or higher)
- Git
- GitHub account

### Step-by-Step Deployment

1. **Clone this repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Update the homepage in package.json:**
   Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/crypto-adoption-report"
   ```

3. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Create a GitHub repository** and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/crypto-adoption-report.git
   git branch -M main
   git push -u origin main
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

   This will:
   - Build your React app
   - Create a `gh-pages` branch
   - Push the build to GitHub Pages

6. **Enable GitHub Pages** (if not automatically enabled):
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Source should be set to `gh-pages` branch
   - Your site will be published at: `https://YOUR_GITHUB_USERNAME.github.io/crypto-adoption-report`

### Local Development

Run the app locally:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Updating the Site

After making changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

## 📊 Features

- Interactive data visualizations using Recharts
- Editable configuration for customizing content
- Responsive design
- Time-series forecasting visualizations
- Correlation analysis
- Regional comparisons

## 🛠️ Built With

- React 18
- Recharts
- Lucide React (icons)
- Create React App

## 📝 License

This project is open source and available for educational purposes.
