# 📊 MongoDB Compass Connection Guide for VARUN App

## Step-by-Step Instructions

### Step 1: Open MongoDB Compass

Open MongoDB Compass application on your laptop.

---

### Step 2: Try These Connection Strings

MongoDB is running on port 27017. Try these connection options:

#### **Option 1: Direct Connection (Most Likely)**
```
mongodb://rainwise.preview.emergentagent.com:27017/varun_db
```

#### **Option 2: Without Specifying Database**
```
mongodb://rainwise.preview.emergentagent.com:27017
```
(Then select `varun_db` database after connecting)

#### **Option 3: With Authentication (if required)**
```
mongodb://username:password@rainwise.preview.emergentagent.com:27017/varun_db
```
(Usually not required for development)

---

### Step 3: In MongoDB Compass

1. Click **"New Connection"** or **"Connect"**
2. Paste one of the connection strings above in the **"URI"** field
3. Click **"Connect"**

**Screenshot Example:**
```
┌─────────────────────────────────────────────┐
│ New Connection                               │
├─────────────────────────────────────────────┤
│ URI:                                         │
│ mongodb://rainwise.preview.emergentagent.com:27017/varun_db │
│                                              │
│ [Advanced Connection Options ▼]             │
│                                              │
│              [ Connect ]                     │
└─────────────────────────────────────────────┘
```

---

### Step 4: Verify Connection

After connecting, you should see:

**Database:** `varun_db`

**Collections:**
- ✅ users
- ✅ assessments
- ✅ appointments
- ✅ iotsensors
- ✅ sensorreadings
- ✅ notifications
- ✅ communitystats

---

## 🔧 Troubleshooting

### If Connection Fails:

#### **Issue 1: "Connection Refused" or "Timeout"**

**Possible Cause:** Port 27017 might not be exposed externally.

**Solution:** Contact your infrastructure team or try this alternative:

Ask them to provide the external MongoDB URL, or they might need to set up port forwarding.

---

#### **Issue 2: "Authentication Failed"**

**Solution:** MongoDB might require authentication. Try:
- Username: `admin` (or ask your team)
- Password: (ask your infrastructure team)

---

#### **Issue 3: Still Can't Connect**

**Alternative: Use MongoDB Cloud (Atlas)**

Your team might prefer using MongoDB Atlas for external access:
1. They can migrate the database to MongoDB Atlas (free tier)
2. You'll get a connection string like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/varun_db
   ```

---

## 📝 What You'll See After Connecting

### Users Collection Example:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "user",
  "isVerified": false,
  "createdAt": "2024-11-24T06:00:00.000Z"
}
```

### Assessments Collection Example:
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "roofArea": 200,
  "annualRainfall": 800,
  "soilType": "sandy",
  "feasibilityScore": 85,
  "feasibilityStatus": "highly_feasible",
  "potentialHarvestVolume": 144000,
  "waterSaved": 86400,
  "estimatedCost": {
    "installation": 7200,
    "maintenance": 360,
    "total": 7560
  },
  "recommendations": [...]
}
```

---

## 🎯 Quick Test Query

Once connected, try this in MongoDB Compass:

1. Select `varun_db` database
2. Click on `users` collection
3. Click **"Find"** button
4. You should see all registered users

---

## 📞 Need Help?

If you still can't connect, you'll need to:

1. **Check with your infrastructure/DevOps team** for:
   - External MongoDB URL
   - Required authentication credentials
   - Firewall/security group settings

2. **Alternative:** They can set up **MongoDB Atlas** (cloud) for easier external access

---

## ✅ Connection String Summary

**Try this first:**
```
mongodb://rainwise.preview.emergentagent.com:27017/varun_db
```

**Database Name:** `varun_db`
**Port:** `27017`
**Host:** `rainwise.preview.emergentagent.com`

Good luck! 🚀
