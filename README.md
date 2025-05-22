# User Registration Form

## Project Description

This project is a multi-step user registration form built with React, React Hook Form, and Zod for validation. It features two steps:

* **Step 1:** Collect user credentials and interests.
* **Step 2:** Upload an avatar and submit the complete form data.

The form includes client-side validation and file upload handling. It demonstrates best practices with React Hook Form, schema validation, and clean UI design using Chakra UI.

---

## Setup Instructions

### Prerequisites

* Node.js (v14 or higher recommended)
* npm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/emilmilev1/form-submit.git
   ```
2. Navigate into the project directory:

   ```bash
   cd form-submit
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App Locally

Start the development server:

```bash
npm start
```

Open your browser and visit `http://localhost:3000` to see the app in action.

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized build will be available in the `build` folder.

---

## Folder Structure Overview

```
/src
  /components        # Reusable UI components and form steps
  /interfaces        # TypeScript interfaces for form data and other /types
  /pages             # Main page components like RegistrationForm
  /schemas           # Zod validation schemas
  /hooks             # Custom hooks like useFetch for API requests
  /mocks             # A mock server for the interests endpoint and the form submission.
  index.tsx          # App entry point
```

---

## Important Notes

* Form validation is handled with Zod integrated via `@hookform/resolvers`.
* The multi-step form uses React Hook Form's `FormProvider` for shared form state.
* The file upload uses the native HTML file input and FormData for submission.
* The project includes error handling for API fetches.
* Consistent commits were made throughout development to reflect progress.

---

## Commit History

The project includes at least 10 meaningful commits showing feature additions, fixes, and improvements.

---

## Deployment (Bonus)

This project is deployed and accessible online:

[Live Demo on Vercel](https://form-submit-gules.vercel.app)

---

Feel free to reach out if you have any questions or suggestions!

*Author: Your Name*
*Contact: [emil.milev.pro@gmail.com](mailto:emil.milev.pro@gmail.com)*
