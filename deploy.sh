#!/bin/bash

# Crypto Adoption Report - Quick Deploy Script

echo "🚀 Crypto Adoption Report Deployment Script"
echo "==========================================="
echo ""

# Check if username is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub username required"
    echo "Usage: ./deploy.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_NAME="crypto-adoption-report"

echo "📝 Updating package.json with your GitHub username..."
sed -i "s/YOUR_GITHUB_USERNAME/$USERNAME/g" package.json

echo "✅ Configuration updated!"
echo ""
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Create GitHub repo: https://github.com/new"
echo "   - Name it: $REPO_NAME"
echo "3. Initialize Git:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin https://github.com/$USERNAME/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "4. Deploy: npm run deploy"
echo ""
echo "Your site will be live at: https://$USERNAME.github.io/$REPO_NAME"
