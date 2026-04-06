# MongoDB Atlas Setup Guide for VoltStore

## Issue: ECONNREFUSED Error

If you're seeing `Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.4fkhxjy.mongodb.net`, it means your network cannot connect to MongoDB Atlas. This is usually due to IP whitelist restrictions.

## Solution: Whitelist Your IP Address

### Step 1: Log in to MongoDB Atlas
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Log in with your credentials (username: `asim`)

### Step 2: Navigate to Network Access
1. In the left sidebar, click **"Network Access"** under **"Security"**
2. You'll see the IP whitelist settings

### Step 3: Add Your IP Address
**Option A: Allow Access from Anywhere (for development)**
- Click **"Add IP Address"**
- Select **"Allow Access from Anywhere"** (0.0.0.0/0)
- Click **"Confirm"**

**Option B: Add Your Current IP (more secure)**
- Click **"Add IP Address"**
- Click **"Add Current IP Address"**
- Click **"Confirm"**

### Step 4: Test Connection
After whitelisting, run the seed command again:
```bash
npm run seed
```

## Alternative: Use Local MongoDB

If you prefer to use a local MongoDB instance:

1. Install MongoDB locally from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Update `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/voltstore
   ```
4. Run `npm run seed`

## Verify Connection

After successful seeding, start the development server:
```bash
npm run dev
```

The app should now connect to MongoDB and load products from the database.

## Troubleshooting

### Still getting ECONNREFUSED?
1. Check if your ISP or network firewall is blocking MongoDB Atlas
2. Try using a VPN
3. Use the local MongoDB alternative

### Credentials Error?
- Double-check your username and password in `.env`
- Ensure special characters in password are properly encoded

### Timeout Error?
- Check your internet connection
- Increase timeout values in `backend/config/db.ts`