# Framer Search Component - Quick Start Instructions

## What You're Getting

✅ **Backend API** - Serves your store data  
✅ **Framer Component** - Search interface for your site  
✅ **Setup Guide** - Complete instructions  
✅ **Sample Data** - Ready to test  

## Quick Setup (5 minutes)

### 1. Deploy the Backend API

**Option A: Use Railway (Recommended)**
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "Deploy from GitHub repo"
4. Upload the provided `store_search_api` folder
5. Railway will automatically deploy your API
6. Copy the provided URL (e.g., `https://your-app.railway.app`)

**Option B: Use Render**
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Upload the provided `store_search_api` folder
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python src/main.py`
6. Deploy and copy the URL

### 2. Add Component to Framer

1. **Create Code Component**:
   - In Framer, go to Assets → Code → Create Code File
   - Name it "StoreSearch"
   - Copy and paste the provided component code

2. **Configure Component**:
   - Drag component to your page
   - Set **API URL** to your deployed backend URL
   - Customize placeholder text and display options

3. **Test**:
   - Try searching for "headphones" or "shoes"
   - Results should appear immediately

### 3. Add Your Store Data

1. **Export from Framer CMS**:
   - Use CMS Export plugin to download your store items as CSV
   - Ensure columns: `id`, `name`, `description`, `price`, `category`, `tags`

2. **Update API Data**:
   - Replace `src/data/store_items.csv` with your exported file
   - Redeploy the API (most services auto-deploy on file changes)

## Component Properties

| Property | Description | Default |
|----------|-------------|---------|
| **API URL** | Your deployed backend URL | `http://localhost:5001` |
| **Placeholder** | Search input text | `"Search for products..."` |
| **Max Results** | Number of results to show | `10` |
| **Show Prices** | Display product prices | `true` |
| **Show Categories** | Display product categories | `true` |

## CSV Format Example

```csv
id,name,description,price,category,tags
1,Wireless Headphones,High-quality audio,199.99,Electronics,"audio, wireless, music"
2,Running Shoes,Comfortable athletic shoes,89.99,Sports,"shoes, running, fitness"
```

## Testing Your Setup

1. **Test API**: Visit `your-api-url/api/health` - should show "healthy"
2. **Test Search**: Visit `your-api-url/api/search?q=headphones` - should return results
3. **Test Component**: Search in Framer preview - should show formatted results

## Troubleshooting

**No search results?**
- Check API URL in component properties
- Verify backend is deployed and accessible
- Check browser console for errors

**Styling issues?**
- Component uses responsive design
- Modify styles in the component code
- Ensure adequate container width (min 300px)

**Need help?**
- Check the complete setup guide
- Test API endpoints directly in browser
- Verify CSV data format

## What's Included

📁 **Backend API Files**:
- `store_search_api/` - Complete Flask application
- Sample data and configuration
- Ready for deployment

📄 **Framer Component**:
- `FramerSearchComponent.tsx` - Complete React component
- Property controls for customization
- Professional styling included

📖 **Documentation**:
- Complete setup guide
- Troubleshooting tips
- Customization options

## Next Steps

1. **Deploy** the backend API to your preferred service
2. **Add** the component to your Framer project
3. **Test** with sample data
4. **Replace** with your actual store data
5. **Customize** styling and behavior as needed

Your search component is now ready to provide a professional search experience for your Framer store!

