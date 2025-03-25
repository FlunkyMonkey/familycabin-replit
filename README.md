# FamilyCabin.io

A visually pleasing landing page for familycabin.io featuring a rustic cabin silhouette and minimal text.

## Project Overview

This project is a simple, elegant landing page built with:
- React
- TypeScript
- Tailwind CSS
- Vite

The page features:
- Custom SVG cabin silhouette with animation
- Responsive design
- Custom typography

## Local Development

### Prerequisites
- Node.js v20.x or higher
- npm v10.x or higher

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/familycabin.io.git
cd familycabin.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5000`

## Deployment on Ubuntu Server

### Prerequisites
- Ubuntu 22.04 LTS or newer
- Node.js v20.x or higher
- npm v10.x or higher
- nginx

### Step 1: Install Node.js and npm (if not already installed)

```bash
# Add Node.js repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Install nginx

```bash
# Update package lists
sudo apt update

# Install nginx
sudo apt install -y nginx

# Start nginx and enable it to start on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify nginx is running
sudo systemctl status nginx
```

### Step 3: Set up the application

```bash
# Create directory for the application
sudo mkdir -p /var/www/familycabin.io

# Clone the repository or copy your files
git clone https://github.com/yourusername/familycabin.io.git /tmp/familycabin
cd /tmp/familycabin

# Install dependencies
npm install

# Build the application
npm run build

# Copy the build files to the web directory
sudo cp -r dist/* /var/www/familycabin.io/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/familycabin.io
```

### Step 4: Configure nginx

1. Create an nginx server block:

```bash
sudo nano /etc/nginx/sites-available/familycabin.io
```

2. Add the following configuration:

```nginx
server {
    listen 80;
    server_name familycabin.io www.familycabin.io;

    root /var/www/familycabin.io;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Add caching for static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Logs
    access_log /var/log/nginx/familycabin.io-access.log;
    error_log /var/log/nginx/familycabin.io-error.log;
}
```

3. Enable the site and restart nginx:

```bash
# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/familycabin.io /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 5: Set up SSL with Let's Encrypt (Optional but recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Set up SSL certificate
sudo certbot --nginx -d familycabin.io -d www.familycabin.io

# Follow the prompts
# Certbot will automatically modify your nginx configuration
```

### Step 6: Set up automatic renewal for SSL certificates

```bash
# Test the renewal process
sudo certbot renew --dry-run

# Certbot creates a cron job or systemd timer automatically to renew certificates
```

### Maintenance and Updates

To update your site:

```bash
# Navigate to your local project directory
cd /path/to/your/local/project

# Pull latest changes (if using git)
git pull

# Install dependencies
npm install

# Build the application
npm run build

# Copy the new build to the server
sudo rm -rf /var/www/familycabin.io/*
sudo cp -r dist/* /var/www/familycabin.io/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/familycabin.io
```

## Additional Notes

- For a production environment, you may want to set up a CI/CD pipeline for automated deployments.
- Consider using PM2 or similar process managers if your application includes server-side components.
- Monitor your server's performance and set up automated backups.

## License

[Specify your license here]

## Contact

For any questions or inquiries, please contact [your contact information].