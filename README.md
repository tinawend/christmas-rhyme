# 🎄 Christmas Rhyme Generator

A festive web application that uses AI to generate rhymes for your Christmas gifts! Built with React, TailwindCSS, and Google Gemini API.

![Christmas Rhyme Generator](https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- A Google Gemini API Key (Free)

### 🛠️ Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tinawend/christmas-rhyme.git
    cd christmas-rhyme
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    - Create a file named `.env` in the root directory.
    - Add your Google Gemini API key:
      ```env
      VITE_GEMINI_API_KEY=your_actual_api_key_here
      ```
    - You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 🌐 Deploy to GitHub Pages (Free)

This project is configured to deploy automatically to GitHub Pages!

1.  **Push the code** to GitHub (already done).
2.  **Add your API Key**:
    - Go to your GitHub Repository > **Settings** > **Secrets and variables** > **Actions**.
    - Click **New repository secret**.
    - Name: `VITE_GEMINI_API_KEY`
    - Value: Your actual API key.
3.  **Enable Pages**:
    - Go to **Settings** > **Pages**.
    - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4.  **Wait for Deployment**:
    - Go to the **Actions** tab to see the deployment running.
    - Once finished, your site will be live at `https://your-username.github.io/christmas-rhyme/`.

### 🔒 Security Note
Since this is a public website, you **MUST** restrict your API key to prevent others from using it.
1.  Go to [Google AI Studio API Keys](https://aistudio.google.com/app/apikey).
2.  Click on your key.
3.  Under **API restrictions**, select **Restrict key**.
4.  Under **Application restrictions**, select **Websites**.
5.  Add your website URL (e.g., `https://www.techmamman.se/*` or `https://tinawend.github.io/*`).

## ✨ Features

- **AI-Powered Rhymes**: Generates creative rhymes based on the gift and desired tone.
- **Smart Rhyming**: Ensures the rhyme ends with a word that rhymes with the gift (without revealing it!).
- **Festive Design**: "White Christmas" theme with snow animations and glassmorphism.
- **Responsive**: Works on mobile and desktop.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **AI**: Google Gemini API (`@google/generative-ai`)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Merry Christmas! 🎅🎁
