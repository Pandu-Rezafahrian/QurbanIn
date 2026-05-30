# QurbanIn 🐄🐐🐑

A web application for managing and browsing qurban animals (sapi, kambing, domba).  
Built with **Node.js, Express, Sequelize, EJS**, and styled with a custom UI.

---

## 🚀 Features
- **Authentication & Authorization**
  - Register & login with role (admin, farmer/peternak, pembeli/buyer).
  - Session-based access control.

- **Animal Catalog**
  - Browse all available animals.
  - Search by name.
  - Filter by type (sapi, kambing, domba).
  - Sort by price or weight.
  - Detail page with status (tersedia/terjual).

- **CRUD Operations**
  - Admin & farmer can add, edit, and delete animals.
  - Manage farms (add, edit, delete).
  - Buyer can place orders directly from catalog or detail page.

- **Validation**
  - Server-side validation for required fields (name, type, weight, price, age, farmId).
  - Error messages displayed clearly in forms.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Sequelize ORM
- **Templating:** EJS
- **Authentication:** express-session, bcryptjs
- **Styling:** Custom CSS with badges, buttons, and responsive grid

---

## 📂 Project Structure
QurbanIn/
# Route controllers (Animal, Farm, Auth)
├── controllers/        
# Sequelize models (User, Animal, Farm, Order)
├── models/             
# Database migrations
├── migrations/         
# Initial data
├── seeders/            
# Express routes
├── routes/             
# EJS templates (animals, farms, auth, partials)
├── views/              
# Static assets (CSS, JS)
├── public/       
# Main Express app
└── app.js            
