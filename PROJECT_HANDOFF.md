# My-PC-Store Project Handoff

## 1. Project goal
This project is a React + Vite web app for a modern PC components store. The main idea is to give users a polished storefront experience with:
- a landing page
- product browsing
- authentication (login/register)
- a user profile page
- future expansion into admin/product management and shopping cart features

The app is currently more of a UI-first prototype with Firebase integration already started, but several core commerce features are still incomplete.

## 2. Tech stack
- React 19
- Vite 8
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- lucide-react
- motion

## 3. Current project structure
```text
src/
├── App.jsx                 # main route setup
├── main.jsx                # app entry point with BrowserRouter
├── assets/                 # images and static assets
├── components/             # reusable UI components
├── Lib/                    # page/section components (some overlap with components/)
├── Hook/                   # custom hooks (auth, poster images)
├── Page/                   # route-level page components
├── firebase/               # Firebase setup
└── index.css               # global styles / Tailwind entry
```

## 4. Important files and what they do
### Entry and routing
- [src/main.jsx](src/main.jsx) – boots the app and wraps it in BrowserRouter.
- [src/App.jsx](src/App.jsx) – defines the main routes:
  - `/` → Home
  - `/login` → Login
  - `/register` → Register
  - `/product` → Product page
  - `/profile` → Protected profile page

### Authentication
- [src/Hook/AuthContext.jsx](src/Hook/AuthContext.jsx) – provides Firebase auth state to the app.
- [src/Page/LoginPage.jsx](src/Page/LoginPage.jsx) – login form with Firebase sign-in.
- [src/Page/RegisterPage.jsx](src/Page/RegisterPage.jsx) – registration form with Firebase account creation.
- [src/firebase/firebase.js](src/firebase/firebase.js) – initializes Firebase app, auth, and Firestore.

### Pages
- [src/Page/Homepage.jsx](src/Page/Homepage.jsx) – landing page layout.
- [src/Page/ProductPage.jsx](src/Page/ProductPage.jsx) – product page shell.
- [src/Page/ProfilePage.jsx](src/Page/ProfilePage.jsx) – protected profile page using auth state.
- [src/Page/Admin.jsx](src/Page/Admin.jsx) – currently empty / not wired up yet.

### UI components
- [src/components/Navbar.jsx](src/components/Navbar.jsx) – responsive navbar with auth-aware profile menu.
- [src/components/ProductToolbar.jsx](src/components/ProductToolbar.jsx) – search/filter/sort UI for products.
- [src/components/ProductCard.jsx](src/components/ProductCard.jsx) – reusable product card component.
- [src/components/PosterCarousel.jsx](src/components/PosterCarousel.jsx) – image carousel powered by Firestore data.
- [src/components/WhyChooseUs.jsx](src/components/WhyChooseUs.jsx) – homepage section.

### Hooks / data fetches
- [src/Hook/usePosterImages.js](src/Hook/usePosterImages.js) – fetches image URLs from Firestore and returns them as an array.

## 5. What is already working
The project already has these pieces:
- React + Vite project structure
- Responsive landing page
- Navbar with dark mode toggle
- Login and registration pages using Firebase Authentication
- Auth state shared across the app via a custom context
- Protected profile page
- Product page scaffold with toolbar and product card UI
- Poster carousel that reads images from Firestore

## 6. What is incomplete or unfinished
These are the main gaps that should be understood before making changes:
- The product page is only a UI shell. It does not yet display real product data from Firebase or a backend.
- The navbar links to `/orders` and `/admin`, but those routes are not currently implemented.
- The admin page is empty.
- There is no cart system yet.
- There is no checkout/order history flow.
- There is no real product management system for admins.
- There are some duplicated or overlapping component areas under [src/components](src/components) and [src/Lib](src/Lib). The app is using some of them, but the structure is not fully unified.

## 7. Current app behavior and data flow
### Authentication flow
1. The app initializes Firebase.
2. AuthContext listens for Firebase auth state changes.
3. Login/Register pages call Firebase methods.
4. The navbar and profile page react to the current user.

### Poster flow
1. A custom hook reads a Firestore document.
2. It extracts image fields from the document.
3. The poster carousel renders those images.

### Routing flow
- Route-based pages are defined centrally in [src/App.jsx](src/App.jsx).
- Pages are organized under [src/Page](src/Page).
- Reusable UI is kept in [src/components](src/components) and [src/Lib](src/Lib).

## 8. What I want to implement next
The intended direction for this project is to turn it into a more complete PC store app.

### Priority 1: Product catalog
- Create a Firestore collection for products.
- Add fields such as:
  - name
  - brand
  - category
  - price
  - rating
  - image
  - description
- Render real product cards from Firestore on the product page.
- Hook up search/filter/sort controls to the product list.

### Priority 2: Cart and checkout
- Add a cart state (context or local state).
- Allow users to add products from the product page.
- Create a cart page.
- Implement checkout flow.

### Priority 3: Admin dashboard
- Create an admin page.
- Allow admin users to add/edit/delete products.
- Use Firebase Firestore as the backend data source.
- Add protected/admin-only routes.

### Priority 4: Orders and profile enhancements
- Add an orders page.
- Store completed orders in Firestore.
- Show order history in the profile area.

### Priority 5: Polish and quality
- Improve loading/error states.
- Add form validation.
- Improve accessibility.
- Add consistent naming and folder organization.

## 9. Recommended implementation approach for future AI work
When working on this project, follow this order:
1. Keep the existing auth system intact.
2. Reuse the current navbar and page layout patterns.
3. Add new data-driven features with Firebase Firestore rather than hardcoded mock arrays.
4. Add routes in [src/App.jsx](src/App.jsx) for any new page.
5. Put page-level components in [src/Page](src/Page).
6. Put reusable UI in [src/components](src/components).
7. Keep styling consistent with the existing Tailwind-based look.

## 10. Development commands
Run the project locally with:
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

Lint:
```bash
npm run lint
```

## 11. Environment variables
The Firebase setup expects these environment variables in the Vite environment:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

These should be placed in a local environment file such as `.env.local`.

## 12. Notes for the next AI
- Do not break the current login/register flow.
- Preserve the existing visual style unless there is a clear reason to redesign it.
- Prefer to build features incrementally and test them in the browser.
- If adding a new feature, make sure the route and page are wired correctly.
- If you create shared state, consider placing it in a context so it can be reused cleanly.

## 13. Suggested next milestone
A good next milestone would be:
- connect the product page to a Firestore product collection
- render the products dynamically
- add a working cart button
- create the admin dashboard page

That would move the app from “UI prototype” into a more complete storefront experience.
