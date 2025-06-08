import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

// Define the component props interface
interface SearchComponentProps {
    apiUrl: string
    placeholder: string
    maxResults: number
    showImages: boolean
    showPrices: boolean
    showCategories: boolean
}

// Define the search result interface
interface SearchResult {
    id: string
    name: string
    description: string
    price?: number
    category?: string
    tags?: string[]
    image?: string
}

// Define the API response interface
interface SearchResponse {
    query: string
    results: SearchResult[]
    total: number
    message?: string
}

export default function SearchComponent(props: SearchComponentProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const searchItems = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([])
            return
        }

        setLoading(true)
        setError("")

        try {
            const response = await fetch(
                `${props.apiUrl}/api/search?q=${encodeURIComponent(searchQuery)}`
            )
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data: SearchResponse = await response.json()
            
            // Limit results based on maxResults prop
            const limitedResults = data.results.slice(0, props.maxResults)
            setResults(limitedResults)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Search failed")
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        
        // Debounce search - wait 300ms after user stops typing
        const timeoutId = setTimeout(() => {
            searchItems(value)
        }, 300)

        return () => clearTimeout(timeoutId)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    return (
        <div style={containerStyle}>
            {/* Search Input */}
            <div style={searchBoxStyle}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={props.placeholder}
                    style={inputStyle}
                />
                {loading && <div style={loadingStyle}>Searching...</div>}
            </div>

            {/* Error Message */}
            {error && (
                <div style={errorStyle}>
                    Error: {error}
                </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
                <div style={resultsContainerStyle}>
                    <div style={resultsHeaderStyle}>
                        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </div>
                    
                    {results.map((item) => (
                        <div key={item.id} style={resultItemStyle}>
                            <div style={itemContentStyle}>
                                <h3 style={itemNameStyle}>{item.name}</h3>
                                
                                {item.description && (
                                    <p style={itemDescriptionStyle}>{item.description}</p>
                                )}
                                
                                <div style={itemMetaStyle}>
                                    {props.showPrices && item.price && (
                                        <span style={priceStyle}>
                                            {formatPrice(item.price)}
                                        </span>
                                    )}
                                    
                                    {props.showCategories && item.category && (
                                        <span style={categoryStyle}>
                                            {item.category}
                                        </span>
                                    )}
                                </div>
                                
                                {item.tags && item.tags.length > 0 && (
                                    <div style={tagsContainerStyle}>
                                        {item.tags.map((tag, index) => (
                                            <span key={index} style={tagStyle}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {query && !loading && results.length === 0 && !error && (
                <div style={noResultsStyle}>
                    No items found for "{query}"
                </div>
            )}
        </div>
    )
}

// Styles
const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "600px",
    fontFamily: "system-ui, -apple-system, sans-serif",
}

const searchBoxStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: "16px",
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s ease",
}

const loadingStyle: React.CSSProperties = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    color: "#666",
}

const errorStyle: React.CSSProperties = {
    padding: "12px",
    backgroundColor: "#fee",
    color: "#c33",
    borderRadius: "6px",
    marginBottom: "16px",
    fontSize: "14px",
}

const resultsContainerStyle: React.CSSProperties = {
    border: "1px solid #e1e5e9",
    borderRadius: "8px",
    overflow: "hidden",
}

const resultsHeaderStyle: React.CSSProperties = {
    padding: "12px 16px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e1e5e9",
    fontSize: "14px",
    fontWeight: "600",
    color: "#495057",
}

const resultItemStyle: React.CSSProperties = {
    padding: "16px",
    borderBottom: "1px solid #e1e5e9",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
}

const itemContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
}

const itemNameStyle: React.CSSProperties = {
    margin: "0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#212529",
}

const itemDescriptionStyle: React.CSSProperties = {
    margin: "0",
    fontSize: "14px",
    color: "#6c757d",
    lineHeight: "1.4",
}

const itemMetaStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
}

const priceStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#28a745",
}

const categoryStyle: React.CSSProperties = {
    fontSize: "12px",
    padding: "4px 8px",
    backgroundColor: "#e9ecef",
    color: "#495057",
    borderRadius: "4px",
    textTransform: "uppercase",
    fontWeight: "600",
}

const tagsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
}

const tagStyle: React.CSSProperties = {
    fontSize: "11px",
    padding: "2px 6px",
    backgroundColor: "#f8f9fa",
    color: "#6c757d",
    borderRadius: "3px",
    border: "1px solid #e1e5e9",
}

const noResultsStyle: React.CSSProperties = {
    padding: "24px",
    textAlign: "center",
    color: "#6c757d",
    fontSize: "16px",
}

// Property Controls for Framer
addPropertyControls(SearchComponent, {
    apiUrl: {
        type: ControlType.String,
        title: "API URL",
        defaultValue: "http://localhost:5001",
        description: "The base URL of your search API"
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder Text",
        defaultValue: "Search for products...",
        description: "Placeholder text for the search input"
    },
    maxResults: {
        type: ControlType.Number,
        title: "Max Results",
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        description: "Maximum number of results to display"
    },
    showImages: {
        type: ControlType.Boolean,
        title: "Show Images",
        defaultValue: false,
        description: "Display product images in results"
    },
    showPrices: {
        type: ControlType.Boolean,
        title: "Show Prices",
        defaultValue: true,
        description: "Display product prices in results"
    },
    showCategories: {
        type: ControlType.Boolean,
        title: "Show Categories",
        defaultValue: true,
        description: "Display product categories in results"
    }
})

