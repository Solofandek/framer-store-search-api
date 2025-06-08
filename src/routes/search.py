from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import csv
import os
import json

search_bp = Blueprint('search', __name__)

# Sample store data - this will be replaced with CSV data
sample_data = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "description": "High-quality wireless headphones with noise cancellation",
        "price": 199.99,
        "category": "Electronics",
        "tags": ["audio", "wireless", "headphones", "music"]
    },
    {
        "id": 2,
        "name": "Running Shoes",
        "description": "Comfortable running shoes for daily exercise",
        "price": 89.99,
        "category": "Sports",
        "tags": ["shoes", "running", "sports", "fitness"]
    },
    {
        "id": 3,
        "name": "Coffee Maker",
        "description": "Automatic coffee maker with programmable timer",
        "price": 129.99,
        "category": "Kitchen",
        "tags": ["coffee", "kitchen", "appliance", "morning"]
    }
]

def load_store_data():
    """Load store data from CSV file if it exists, otherwise use sample data"""
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'store_items.csv')
    
    if os.path.exists(csv_path):
        items = []
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Convert price to float if it exists
                if 'price' in row and row['price']:
                    try:
                        row['price'] = float(row['price'])
                    except ValueError:
                        row['price'] = 0.0
                
                # Parse tags if they exist (assuming comma-separated)
                if 'tags' in row and row['tags']:
                    row['tags'] = [tag.strip() for tag in row['tags'].split(',')]
                else:
                    row['tags'] = []
                
                items.append(row)
        return items
    
    return sample_data

@search_bp.route('/search', methods=['GET'])
@cross_origin()
def search_items():
    """Search for items based on query parameter"""
    query = request.args.get('q', '').lower().strip()
    
    if not query:
        return jsonify({
            'query': query,
            'results': [],
            'total': 0,
            'message': 'Please provide a search query'
        })
    
    # Load store data
    store_items = load_store_data()
    
    # Search through items
    results = []
    for item in store_items:
        # Search in name, description, category, and tags
        searchable_text = ' '.join([
            str(item.get('name', '')),
            str(item.get('description', '')),
            str(item.get('category', '')),
            ' '.join(item.get('tags', []))
        ]).lower()
        
        if query in searchable_text:
            results.append(item)
    
    return jsonify({
        'query': query,
        'results': results,
        'total': len(results)
    })

@search_bp.route('/items', methods=['GET'])
@cross_origin()
def get_all_items():
    """Get all store items"""
    store_items = load_store_data()
    return jsonify({
        'items': store_items,
        'total': len(store_items)
    })

@search_bp.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Store Search API is running'
    })

