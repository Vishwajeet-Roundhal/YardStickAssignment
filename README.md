# 📝 Next.js Task Manager App

A simple **Task Management Application** built using **Next.js (App Router)**, **MongoDB**, and **Server Actions**. Users can **add, edit, mark complete/incomplete, and delete tasks**.  

## 🚀 Features  
- ✅ **Create, Read, Update, Delete (CRUD)** tasks  
- ✅ **MongoDB for persistent storage**  
- ✅ **Server Actions for seamless API calls**  

---

## 📌 **Tech Stack**
- **Frontend:** Next.js  
- **Backend:** Next.js API Routes + MongoDB  
- **Database:** MongoDB Atlas  
- **Deployment:** Vercel  

---

## 🔧 **Installation & Setup**
```sh
git clone https://github.com/Vishwajeet-Roundhal/YardStickAssignment.git
cd task-manager

npm install

MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/tasksDB?retryWrites=true&w=majority

npm run dev or npx next dev

App will be available at: http://localhost:3000

```
📂 Folder Structure
```sh
task-manager/
│-- src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js             # Home page (task list)
│   │   ├── edit/[id]/page.js   # Edit task page
│   │   ├── api/tasks/route.js  # API route for tasks
│   ├── actions/                # Server Actions
│   │   ├── taskActions.js      # CRUD actions for tasks
│   ├── lib/                    # Database connection
│   │   ├── db.js               # MongoDB connection logic
│   ├── model/                  # Mongoose models
│   │   ├── Task.js             # Task schema
│   ├── styles/                 # Global styles
│-- .env                        # Environment variables (not pushed to GitHub)
│-- next.config.js              # Next.js config
│-- package.json                # Dependencies



