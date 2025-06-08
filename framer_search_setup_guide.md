# Framer Store Search Component - Setup Guide

## Overview

This guide will help you set up a custom search component for your Framer store that can search through your CMS collections. The solution consists of two parts:

1. **Backend API**: A simple Flask server that serves your store data
2. **Framer Component**: A React component that integrates with your Framer site

## What You'll Get

- Real-time search functionality for your store items
- Customizable search results display
- Easy integration with your existing Framer CMS data
- Professional search experience for your customers

## Prerequisites

- A Framer site with CMS collections containing your store items
- Basic familiarity with exporting data from Framer CMS
- Access to deploy a simple web service (we'll provide deployment options)

## Part 1: Setting Up the Backend API

### Step 1: Export Your Store Data from Framer

1. In your Framer project, go to the CMS section
2. Find your store items collection
3. Use the CMS Export plugin (available in Framer Marketplace) to export your collection as a CSV file
4. Make sure your CSV includes these columns:
   - `id` - Unique identifier for each item
   - `name` - Product name
   - `description` - Product description
   - `price` - Product price (optional)
   - `category` - Product category (optional)
   - `tags` - Comma-separated tags (optional)

### Step 2: Deploy the Backend API

We've created a simple Flask API that will serve your store data. You have several deployment options:

#### Option A: Deploy to a Cloud Service (Recommended)

The backend API code is ready to deploy to services like:
- **Heroku** (free tier available)
- **Railway** (simple deployment)
- **Render** (free tier available)
- **Vercel** (for serverless deployment)

#### Option B: Use a Local Development Server

For testing purposes, you can run the API locally:

1. Download the provided API files
2. Install Python and the required dependencies
3. Run the server locally
4. Use a service like ngrok to make it accessible to Framer

### Step 3: Upload Your Store Data

1. Once your API is deployed, you'll have a URL like `https://your-api.herokuapp.com`
2. Replace the sample CSV file with your exported store data
3. The API will automatically load and serve your store items

## Part 2: Adding the Search Component to Framer

### Step 1: Create a New Code Component

1. In your Framer project, go to the **Assets** panel
2. Click the **+** icon next to "Code"
3. Select **"Create Code File"**
4. Name it "StoreSearchComponent"
5. Replace the default code with the provided component code

### Step 2: Configure the Component

The search component has several customizable properties:

- **API URL**: The URL of your deployed backend API
- **Placeholder Text**: Text shown in the search input
- **Max Results**: Maximum number of search results to display
- **Show Prices**: Whether to display product prices
- **Show Categories**: Whether to display product categories
- **Show Images**: Whether to display product images (future feature)

### Step 3: Add the Component to Your Page

1. Drag the search component from the Assets panel onto your page
2. In the Properties panel, configure:
   - Set **API URL** to your deployed backend URL
   - Customize other settings as needed
3. Position and style the component to match your design

## Part 3: Customization Options

### Styling the Component

The component uses inline styles that you can modify in the code:

- **Colors**: Update the color values in the style objects
- **Typography**: Change font families and sizes
- **Layout**: Modify spacing and positioning
- **Animations**: Add hover effects and transitions

### Adding More Features

The component is designed to be extensible. You can add:

- **Product images**: Modify the API to include image URLs
- **Filtering**: Add category or price range filters
- **Sorting**: Add options to sort results by price, name, etc.
- **Click actions**: Add navigation to product detail pages

## Part 4: Maintenance and Updates

### Updating Your Store Data

When you add or modify items in your Framer CMS:

1. Export the updated CSV from Framer
2. Replace the CSV file in your backend API
3. The search will automatically reflect the changes

### Monitoring and Analytics

Consider adding:
- Search analytics to track popular queries
- Error monitoring to catch API issues
- Performance monitoring for search speed

## Troubleshooting

### Common Issues

**Search not working:**
- Check that the API URL is correct in the component properties
- Verify the backend API is running and accessible
- Check browser console for error messages

**No results showing:**
- Verify your CSV data format matches the expected structure
- Check that the search query matches content in your data
- Ensure the API is returning data (test the API URL directly)

**Styling issues:**
- Modify the inline styles in the component code
- Ensure the component has enough space on your page
- Check for CSS conflicts with your site's existing styles

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Test the API endpoints directly in your browser
3. Verify your CSV data format
4. Contact support with specific error messages

## Next Steps

Once your search component is working:

1. **Test thoroughly**: Try various search queries to ensure accuracy
2. **Optimize performance**: Consider adding search result caching
3. **Enhance UX**: Add loading states and better error handling
4. **Monitor usage**: Track how customers use the search feature
5. **Iterate**: Gather feedback and improve the search experience

## Technical Details

### API Endpoints

Your backend API provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/search?q=query` - Search for items
- `GET /api/items` - Get all items

### Component Props

The Framer component accepts these properties:

- `apiUrl: string` - Backend API base URL
- `placeholder: string` - Search input placeholder
- `maxResults: number` - Maximum results to show
- `showImages: boolean` - Display product images
- `showPrices: boolean` - Display product prices
- `showCategories: boolean` - Display product categories

### Data Format

Your CSV should follow this structure:

```csv
id,name,description,price,category,tags
1,Product Name,Product description,99.99,Category,"tag1, tag2, tag3"
```

This completes the setup guide for your Framer store search component. The search functionality will provide a professional experience for your customers while being easy to maintain and update.

