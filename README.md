# Where's Waldo?

A full-stack "Where's Waldo?"-style photo tagging game. Find the hidden characters in the images as fast as you can and see how you stack up on the leaderboard!

**Live Link:** [Link to deployed application]() <!-- TODO: Add live link -->

## Gameplay

- Choose one of the images to start a new game.
- The characters to find will be displayed at the top of the screen.
- Click on the image where you think a character is hiding.
- A small dropdown will appear. Select the name of the character you think you've found.
- If you're correct, a marker will appear on the image, and the character's portrait will be greyed out.
- If you're wrong, you'll be notified of your miss.
- Find all the characters as quickly as possible to get a high score.
- After the game, you can add your name to the leaderboard to see how you compare with other players.

## Tech Stack

This project is a full-stack application built using a modern technology stack, managed as an Nx monorepo.

### Frontend

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query

### Backend

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma

### Testing

- **Framework:** Vitest

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A running PostgreSQL database instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd where-is-waldo
    ```

2.  **Install dependencies:**
    From the root of the project, run:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    This project requires environment variables for both the client and the server.
    -   In `apps/server`, create a `.env` file by copying the example:
        ```bash
        cp apps/server/.env.example apps/server/.env
        ```
    -   In `apps/client`, create a `.env` file by copying the example:
        ```bash
        cp apps/client/.env.example apps/client/.env
        ```
    -   Fill in the required values in both `.env` files. You will need to provide your PostgreSQL database connection string.

4.  **Set up the database:**
    Run the Prisma migrations to set up your database schema:
    ```bash
    npx nx prisma migrate dev --name init --schema=apps/server/src/config/schema.prisma
    ```

### Running the Application

You can run the client and server separately using the Nx CLI.

-   **To start the backend server:**
    ```bash
    nx serve server
    ```
    The server will typically start on `http://localhost:3000`.

-   **To start the frontend client:**
    ```bash
    nx serve client
    ```
    The client will typically start on `http://localhost:5173`.

### Building for Production

To create a production-ready build of the applications, you can use the `build` command.

-   **To build the server:**
    ```bash
    nx build server
    ```

-   **To build the client:**
    ```bash
    nx build client
    ```
    The production-ready assets will be placed in the `dist/` directory.

### Running Tests

To run the test suite for the server:
```bash
nx test server
```

## Art Credit

- [cityport](https://www.reddit.com/r/wimmelbilder/comments/d63d6z/city_port/)
- [rainforest](https://www.reddit.com/r/wimmelbilder/comments/1l2j48s/rainforest_bj%C3%B6rn_feldmann_2020/)
- [floating-island](https://www.reddit.com/r/wimmelbilder/comments/1ml8v07/floating_island_by_me_2022/)
- [medieval-floating-village](https://www.reddit.com/r/wimmelbilder/comments/1mvfpm4/medieval_floating_village_by_me/)
