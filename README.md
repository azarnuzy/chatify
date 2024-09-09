# Chatify - React Chat App

Welcome to **Chatify**, a modern chat application built with **React Vite**. This app has two core features: chatting with your friends and engaging with an AI-powered chatbot. The app is styled with TailwindCSS and powered by Socket.io for real-time messaging.

## 🔥 Features

1. **Chat with Friends**: Connect with friends in real-time.
2. **AI Chatbot**: Engage with an intelligent AI chatbot, powered by Google Generative AI.

## 🌐 Live Demo

You can check out the live demo of the app [here](https://react-vite-chat.vercel.app/).

## 🖼️ Pages Preview

- **Login**  
  ![Login](/public/login.png)

- **Register**  
  ![Register](/public/register.png)

- **Homepage**  
  ![Homepage](/public/homepage.png)

- **Chat**  
  ![Chat](/public/detail-chat.png)

- **AI Chat**  
  ![AI Chat](/public/ai-chat.png)

## 📋 Installation & Running Locally

To run this project locally, follow these steps:

### 1. Clone the repository:

\`\`\`bash
git clone https://github.com/your-username/chatify.git
cd chatify
\`\`\`

### 2. Setup environment variables:

Copy the `.env.example` to `.env` and add your environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Ensure that the **SECRET_KEY** and **VITE_API_SECRET** are properly configured in your `.env` file.

### 3. Install dependencies:

You have two options to run the project.

#### Option 1: Using Yarn

\`\`\`bash
yarn install
\`\`\`

To run the project in development mode:
\`\`\`bash
yarn run dev
\`\`\`

To build the project for production:
\`\`\`bash
yarn run build
\`\`\`

#### Option 2: Using Docker

### Running with Docker

Build the project using Docker:
\`\`\`bash
docker build -t chatify .
\`\`\`

Run the Docker container:
\`\`\`bash
docker run -p 3000:3000 chatify
\`\`\`

### Running with Docker Compose

Ensure Docker is running on your machine, and run the following command:
\`\`\`bash
docker-compose up
\`\`\`

## 📦 Available Scripts

Inside the `package.json`, you can find the following scripts:

- \`yarn run dev\`: Starts the development server.
- \`yarn run build\`: Builds the app for production.
- \`yarn run lint\`: Runs the linter on the codebase.
- \`yarn run preview\`: Previews the production build locally.

## 🛠️ Technologies Used

- **React**: UI framework for building interfaces.
- **Vite**: Fast development build tool.
- **Socket.io**: Real-time communication for the chat feature.
- **Google Generative AI**: AI-powered chatbot.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **React Hook Form & Zod**: For form validation and handling.
- **React Router**: For navigation between pages.
- **Recoil**: State management.
- **React-Markdown**: For parsing and rendering markdown in AI responses.

## 🛡️ Linting & Formatting

This project is set up with:

- **ESLint**: JavaScript/TypeScript linting.
- **Prettier**: Code formatting.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🙋‍♂️ Author

Created and maintained by **Muhammad Azar Nuzy**.

Feel free to contribute, open issues, or fork the repository to improve the project!

---

### Additional Notes:

- **Meta Tags**: This app comes with pre-configured meta tags for SEO and social sharing.
