# 📝 QuickBlog — MERN Blogging Platform

QuickBlog is a full-stack, modern blogging platform that enables seamless creation, publication, and management of blog posts. With a polished, responsive interface and robust features, QuickBlog is ideal for demonstrating scalable architecture and clean code to recruiters.

## 🚀 Live Demo

- [Frontend](https://quickblog-frontend.onrender.com/)  
- [Backend](https://quickblog-aao4.onrender.com/)
---

## 🖼️ Screenshots

### User
![User home](https://github.com/user-attachments/assets/ccc2df28-7c4c-402e-bb8e-a2e24979c4ea)
![Read a blog](https://github.com/user-attachments/assets/e96c74fc-93d4-47d6-b88b-df4dfbd95d4d)
![View and add a comment](https://github.com/user-attachments/assets/aed007e9-595c-4244-a93c-aea3305a1593)

### Admin
![Adsh board](https://github.com/user-attachments/assets/4009dd80-68d6-41cb-868d-c7d748559e48)
![Add a blog](https://github.com/user-attachments/assets/1d1a0ecc-b8d6-4297-93cd-0dbcbd0f7ad7)
![manage of blogs](https://github.com/user-attachments/assets/c1a409a1-0b7a-49a5-b37d-629500ae1ece)
![manage comments](https://github.com/user-attachments/assets/bc5a48dd-5903-4951-84ac-2bbdfa9e63be)

---

## 🛠️ Tech Stack

| Layer        | Technology                   |
| ------------ | --------------------------- |
| Frontend     | React.js, CSS/Styled        |
| Backend      | Node.js, Express.js         |
| Database     | MongoDB (Mongoose)          |
| Auth         | JWT Tokens                  |
| Editor       | Rich Text Editor (Quill.js) |
| Deployment   | Render.com                  |
| Media Upload | ImageKit                    |
| AI Integration | Google Gemini API  |

---

## ✨ Features

### User
- Browse and search posts by category 
- Comment and view comments on blogs
- Responsive design for all devices

### Admin
- Secure login for content management
- Create, edit, and publish blog posts
- Manage comments in blog posts 
- Rich text editor for writing and formatting
- Role-based access controls
- AI-powered content creation using Google Gemini API

---

## 🗂️ Folder Structure

```
/frontend    # React client app
/backend     # Node/Express API server
```

---
## ⚙️ Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/SubhamSaha0/QuickBlog.git
cd QuickBlog
```

**2. Backend Setup**
```bash
cd backend
npm install
# Create a .env file with the following variables:
PORT=3000
MONGODB_URI=your_mongodb_connection_string

# Admin credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

JWT_SECRET=your_jwt_secret

# ImageKit (for media uploads)
IMAGEKIT_URL_END_POINT=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

# Google Gemini API (for AI-powered content writing)
GEMINI_API_KEY=your_gemini_api_key

npm start
```
---

## 🧪 API Documentation

### Authentication
- **POST** `/api/auth/register`  
  Register a new user  
  _Body_: `{ name, email, password }`
- **POST** `/api/auth/login`  
  User login, returns JWT token  
  _Body_: `{ email, password }`

### Posts
- **GET** `/api/posts`  
  Get all blog posts
- **POST** `/api/posts`  
  Create a new post (authenticated)  
  _Body_: `{ title, content, category }`  
  _Header_: `token`
- **PUT** `/api/posts/:id`  
  Edit a post (author/admin)  
  _Header_: `token`
- **DELETE** `/api/posts/:id`  
  Delete a post (author/admin)  
  _Header_: `token`

### Comments
- **POST** `/api/comments`  
  Add a comment to a post (authenticated)  
  _Body_: `{ postId, text }`
- **DELETE** `/api/comments/:id`  
  Delete a comment (admin)

---

## 📝 Contributing

Contributions welcome! Please fork the repo, create a branch, and submit a pull request.

---

## 📄 License

MIT © Subham Saha

---

## 👤 Contact

[LinkedIn](https://www.linkedin.com/in/subham-saha-277342202/) • [Email](mailto:subhamsaha2511@gmail.com)
