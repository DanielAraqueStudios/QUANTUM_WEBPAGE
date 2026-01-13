# NeuralGlass Deploy Guide

## ✅ You're All Set!

Your Next.js app is now configured for **GitHub Pages static deployment**.

## 🚀 To Deploy:

### Option 1: Automatic (Recommended)

1. **Initialize Git** (if not already):
   ```bash
   cd neuralglass-rebuild
   git init
   git add .
   git commit -m "Initial commit: Premium motion-forward site"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/QUANTUM_WEBPAGE.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repo Settings → Pages
   - Source: Select **GitHub Actions**
   - Done! It will auto-deploy on every push

### Option 2: Manual Build

1. **Build the static site**:
   ```bash
   cd neuralglass-rebuild
   npm run build
   ```

2. **Deploy the `out` folder** to GitHub Pages manually

## 🎯 What I've Configured:

✅ **next.config.ts** - Static export enabled  
✅ **GitHub Action** - Auto-deploy workflow  
✅ **basePath** - Set to `/QUANTUM_WEBPAGE` for GitHub Pages  
✅ **Images** - Unoptimized for static hosting  

## 🌐 Your Site Will Be At:

```
https://YOUR_USERNAME.github.io/QUANTUM_WEBPAGE/
```

## 📝 Important Notes:

- No npm server needed on GitHub Pages (it's static HTML/CSS/JS)
- 3D/React/animations work perfectly as client-side JavaScript
- First deployment takes ~2-5 minutes
- Subsequent deploys are faster

## 🔧 If You Need a Custom Domain:

1. Add a `CNAME` file in `neuralglass-rebuild/public/`
2. Add your domain (e.g., `neuralglass.com`)
3. Configure DNS with your domain provider

Ready to deploy? Push to GitHub and watch the magic happen! 🚀
