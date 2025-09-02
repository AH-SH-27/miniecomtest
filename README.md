**Mini E-commerce Application**  

This is a mini e-commerce application built with **Spring Boot** (backend) and **Next.js 15** (frontend).  

---

**Project Structure**  
- **Backend:** `ecomtest`  
- **Frontend:** `ecomfrontend`  

---

**Backend**  

The backend follows **clean architecture** and best practices:  
- `entity` / `enums`  
- `controllers`  
- `services` / `impl`  
- `repository`  
- `security`  
- `config`  
- `dtos` / `request` / `response`  
- `mappers`  

**Key Features**
- **JWT authentication** for stateless security  
- **Spring Data JPA** with custom implementations  
- **Validation & annotations** applied properly  
- Config managed via `resources/application.yaml`  

**Database (PostgreSQL)**  
1. Install **PostgreSQL** and open **pgAdmin**  
2. Create a new database: `ecomtest_db` (default port: `5432`)  
3. Update credentials in `resources/application.yaml`:  
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/ecomtest_db
       username: postgres
       password: admin

**Frontend**
The frontend is built with Next.js 15 and TypeScript.

**Tools & Libraries**
Shadcn UI (UI components)

Redux Toolkit (cart state management)

Axios & React Query (fetching + state)

LocalStorage (JWT persistence)

**Features**
User
Login / Registration

Profile fetching via JWT

View all products

Add to cart (with quantity)

Manage cart items

Place orders (role: USER)

**Admin Panel**
Separate layout

Add products

View all orders

Check low-stock products

**Security**
Role-based route protection

API validation & security

**Testing**
Backend APIs tested with an API testing tool

Backend & frontend tested independently and together

**Getting Started**
1. Clone the project
bash
Copy code
git clone https://github.com/AH-SH-27/miniecomtest.git
2. Backend Setup
bash
Copy code
cd ecomtest
mvn spring-boot:run
3. Frontend Setup
bash
Copy code
cd ecomfrontend
npm install
npm run dev

**Notes**
All required files and .env are included in the project.

For issues or feedback, feel free to reach out!
