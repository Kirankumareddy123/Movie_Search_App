# 🎬 Movie Search App

A modern, responsive movie search application built with vanilla HTML, CSS, and JavaScript, powered by the OMDb API with full pagination support.

## 🚀 Features

- **Real-time Movie Search** - Search movies, series, and episodes instantly
- **Pagination Support** - Navigate through multiple pages of results (10 per page)
- **Responsive Design** - Mobile-first approach with seamless adaptation to all screen sizes
- **Loading States** - Visual feedback during API requests
- **Error Handling** - Comprehensive error messages for various scenarios
- **LocalStorage Integration** - Remembers your last search query
- **Smooth Animations** - Professional transitions and hover effects
- **Accessibility** - ARIA labels and keyboard navigation support
- **Fallback Images** - Placeholder for movies without posters

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Grid, Flexbox, animations
- **JavaScript (ES6+)** - Async/await, Fetch API, DOM manipulation
- **OMDb API** - Movie database integration

## 📋 Requirements

1. OMDb API Key (free) - Get yours at [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Modern web browser (Chrome, Firefox, Safari, Edge)
3. Internet connection

## ⚙️ Setup Instructions

### Step 1: Get Your API Key

1. Visit [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Select the FREE plan (1,000 daily requests)
3. Enter your email address
4. Check your email and verify your API key

### Step 2: Configure the Application

1. Open `script.js` file
2. Replace `YOUR_API_KEY` with your actual OMDb API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### Step 3: Run the Application

1. Open `index.html` in your web browser
2. Or use a local server (recommended):
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx http-server`
   - Using VS Code: Install "Live Server" extension

## 📁 Project Structure

```
Movie_Search_App/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Application logic and API integration
└── README.md           # Documentation
```

## 🎯 How It Works

### Architecture Flow

```
User Input → Event Listener → Fetch API Request → OMDb API
                                                      ↓
User Interface ← DOM Rendering ← Data Processing ← JSON Response
```

### Key Functions

- **init()** - Initializes event listeners and loads last search
- **handleSearch()** - Validates input and triggers search
- **fetchMovies()** - Makes API request with error handling
- **renderMovies()** - Dynamically creates movie cards
- **renderPagination()** - Updates pagination controls
- **changePage()** - Handles page navigation
- **viewDetails()** - Opens IMDb page in new tab

### State Management

```javascript
state = {
    currentPage: 1,
    totalResults: 0,
    searchQuery: '',
    totalPages: 0
}
```

## 🎨 Design Features

- **Netflix-inspired dark theme** with red accent colors
- **Card-based layout** with hover effects
- **Responsive grid system** adapting to screen sizes
- **Smooth animations** for loading and transitions
- **Professional typography** with proper hierarchy
- **Accessible color contrast** meeting WCAG standards

## 🔧 API Integration

### Endpoint Structure

```
https://www.omdbapi.com/?apikey={API_KEY}&s={SEARCH_QUERY}&page={PAGE_NUMBER}
```

### Parameters

- `apikey` - Your OMDb API key
- `s` - Search query (movie title)
- `page` - Page number (1-based)

### Response Format

```json
{
  "Search": [
    {
      "Title": "Movie Title",
      "Year": "2023",
      "imdbID": "tt1234567",
      "Type": "movie",
      "Poster": "https://..."
    }
  ],
  "totalResults": "100",
  "Response": "True"
}
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📱 Responsive Breakpoints

- **Desktop**: 1400px max-width container
- **Tablet**: 768px and below
- **Mobile**: 480px and below

## 🚨 Error Handling

The application handles:
- Empty search queries
- Network failures
- API errors
- Invalid responses
- Missing poster images
- Rate limit exceeded

## 🔐 Security Notes

- **Never commit your API key** to public repositories
- Use environment variables in production
- Consider implementing rate limiting
- Validate and sanitize user inputs

## 🎓 Learning Outcomes

This project demonstrates:
- Asynchronous JavaScript (async/await)
- RESTful API integration
- State management patterns
- Responsive web design
- Error handling strategies
- DOM manipulation techniques
- Modern CSS features
- Accessibility best practices

## 📈 Future Enhancements

- [ ] Advanced filtering (year, type)
- [ ] Movie details modal
- [ ] Favorites/watchlist feature
- [ ] Search history
- [ ] Infinite scroll option
- [ ] Dark/light theme toggle
- [ ] Share functionality

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning and portfolio purposes.

## 📞 Support

For OMDb API issues, visit: [https://www.omdbapi.com/](https://www.omdbapi.com/)

---

**Built with ❤️ using HTML, CSS, and JavaScript**
"# Movie_Search_App" 
