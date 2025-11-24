# MongoDB Compass Connection Guide

## Connection Details

**Database Name:** `varun_db`
**Local Connection (within container):** `mongodb://localhost:27017/varun_db`

---

## Option 1: Direct Connection (If Port is Exposed)

Since MongoDB is running inside a Kubernetes container, you'll need to check if port 27017 is exposed externally.

**Connection String Format:**
```
mongodb://<EXTERNAL_HOST>:<EXTERNAL_PORT>/varun_db
```

You would need to replace:
- `<EXTERNAL_HOST>` with the external IP or domain
- `<EXTERNAL_PORT>` with the exposed MongoDB port

---

## Option 2: Port Forwarding (Recommended)

If you have kubectl access to the cluster, you can port-forward:

```bash
kubectl port-forward <pod-name> 27017:27017
```

Then connect using:
```
mongodb://localhost:27017/varun_db
```

---

## Option 3: Using MongoDB Atlas or External MongoDB

For production, consider using MongoDB Atlas (cloud-hosted):
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get the connection string
3. Update `/app/backend-nodejs/.env`:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/varun_db
   ```

---

## Collections Created:

Once you connect, you'll see these collections in `varun_db`:

1. **users** - User accounts (name, email, phone, role)
2. **assessments** - Feasibility assessments with calculations
3. **appointments** - Appointment bookings
4. **iotsensors** - IoT sensor devices
5. **sensorreadings** - Time-series sensor data
6. **notifications** - User notifications
7. **communitystats** - Community-wise statistics

---

## Sample Data Query (MongoDB Compass)

To test the connection, try running this query in MongoDB Compass:

**Collection:** `users`
**Query:**
```json
{}
```

This will show all users in the database.

---

## Current Status:

✅ MongoDB is running on port 27017
✅ Node.js backend is connected to MongoDB
✅ Database name: `varun_db`

**Note:** MongoDB is currently running inside the container. For external access from your laptop, you'll need network configuration or port forwarding set up by your infrastructure team.
