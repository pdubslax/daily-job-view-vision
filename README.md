# Daily Planning Prototype

## Running the App

To render this React app, you need to serve it through a local HTTP server (required for ES6 modules and fetch API).

### Option 1: Python HTTP Server (Recommended)

If you have Python installed, run:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Node.js HTTP Server

If you have Node.js installed, you can use `npx`:

```bash
npx http-server -p 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: VS Code Live Server

If you're using VS Code, you can install the "Live Server" extension and right-click on `index.html` to select "Open with Live Server".

## Files

- `index.html` - Main HTML file that renders the app
- `daily-planning-prototype.jsx` - React component with the daily planning interface