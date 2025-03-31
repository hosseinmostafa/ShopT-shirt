# Shop.co

Shop.co is an e-commerce platform built with **Angular**, providing a seamless shopping experience for men's, women's, and children's clothing, as well as accessories.

![Shop.co Homepage](Screenshot%20(656).png)

## Technologies Used

- **Angular**: Frontend framework
- **HTML, CSS, SCSS**: For structuring and styling
- **TypeScript**: Enhancing JavaScript with strong typing
- **Bootstrap**: Responsive UI framework
- **Firebase**: Backend services (Authentication, Firestore, Hosting)

## Features

- Browse and purchase a variety of clothing and accessories
- Responsive design for mobile and desktop
- Loading spinner using **ngx-spinner**
- Animations with **AOS (Animate On Scroll Library)**
- Product filtering and search functionality
- Wishlist and cart functionality
- User authentication with Firebase

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/shop.co.git
   cd shop.co
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open in your browser: `https://shop-tshirt.netlify.app`

## Deployment

The application is deployed using Firebase Hosting:

```sh
ng build --prod
firebase deploy
```

## Folder Structure

```
shop.co/
├── src/
│   ├── app/
│   │   ├── components/      # UI Components
│   │   ├── services/        # API Services
│   │   ├── pages/           # Page Views
│   │   ├── models/          # TypeScript Interfaces
│   │   ├── app.module.ts    # Angular Module
│   │   └── app.component.ts # Main Component
│   ├── assets/              # Images, Videos, Fonts
│   ├── styles/              # Global SCSS & CSS
│   └── environments/        # Configuration files
├── angular.json             # Angular Project Config
├── package.json             # Dependencies & Scripts
├── README.md                # Project Documentation
└── firebase.json            # Firebase Hosting Config
```

## Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

