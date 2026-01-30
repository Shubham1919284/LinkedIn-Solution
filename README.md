# 🎮 Solvr - Daily LinkedIn Game Solutions

![Solvr Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js) ![Firebase](https://img.shields.io/badge/Firebase-Storage%20%26%20Firestore-orange?style=for-the-badge&logo=firebase) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-blue?style=for-the-badge&logo=tailwindcss)

**Solvr** is a sleek, mobile-first Progressive Web App (PWA) designed to provide instant daily solutions for popular LinkedIn games. Built for speed and simplicity, it replaces complex data entry with a streamlined image-based workflow.

## 🚀 Features

*   **📸 Image-First Workflow**: Admin uploads a screenshot of the daily solution, and it's instantly available to all users. No complex OCR or manual data entry required.
*   **📱 Mobile Optimized**: Fully responsive design with a bottom navigation bar for mobile users, functioning just like a native app.
*   **🧩 Supported Games**:
    *   **Pinpoint**: Find the category.
    *   **Queens**: Solve the grid.
    *   **Zip (Crossclimb)**: Connect the words.
    *   **Sudoku**: New 6x6 solver.
*   **🔒 Secure Admin Panel**: Password-protected dashboard for authorized uploads.
*   **⚡ Modern Tech Stack**: Built with Next.js 15 (App Router), Firebase Backend (Firestore & Storage), and styled with Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore, Storage, Auth)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **PWA**: `@ducanh2912/next-pwa` for offline capabilities and installability.
- **Icons**: `lucide-react`

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- A [Firebase Project](https://console.firebase.google.com/)

### Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Shubham1919284/LinkedIn-Solution.git
    cd LinkedIn-Solution
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=your-service-account-email
    FIREBASE_PRIVATE_KEY="your-private-key"
    ```

4.  **Run the App**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the app.

## 🚀 Deployment

This project is optimized for **Vercel** deployment (which supports Next.js Server Actions securely).

1.  Push your code to GitHub.
2.  Import the project into [Vercel](https://vercel.com).
3.  Add your Environment Variables in the Vercel Dashboard.
4.  Deploy!

---

**Note**: This project uses Next.js Server Actions for secure uploads, bypassing CORS restrictions by handling file transfers server-side via the Firebase Admin SDK.

Made with ❤️ by Shubham
