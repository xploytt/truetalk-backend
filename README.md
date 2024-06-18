# TrueTalk Backend

TrueTalk Backend is a server-side application built with Express.js, using Sequelize as the ORM for interacting with a PostgreSQL database. It serves and saves data related to galleries, books, blogs, adverts, and videos. It also processes messages received from the contact-us page. The application follows the MVC (Model-View-Controller) architecture.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- **CRUD Operations**: Manage galleries, books, blogs, adverts, and videos.
- **Message Processing**: Handle messages from the contact-us page.
- **MVC Architecture**: Follows the Model-View-Controller pattern.

## Installation

To get a local copy up and running follow these simple steps:

1. **Clone the repo**

   ```sh
   git clone https://github.com/xploytt/truetalk-backend.git
   ```

2. **Navigate to the project directory**

   ```sh
   cd truetalk-backend
   ```

3. **Install dependencies**

   ```sh
   npm install
   ```

4. **Set up environment variables**

- DB_HOST=your_database_host
- DB_USER=your_database_user
- DB_PASS=your_database_password
- DB_NAME=your_database_name
- PORT=3200

5. **Run the application**
   ```sh
   npm start
   ```

## Usage

Once the application is running, it will listen for API requests on the specified port (default is 3200). You can interact with the various endpoints to manage galleries, books, blogs, adverts, videos, and process messages from the contact-us page.

## Endpoints

### Blogs

- `GET /blogs`: Retrieve all blogs
- `GET /blogs/blogId`: Retrieve a single blog
- `POST /blogs`: Create a new blog
- `PUT /blogs/:blogId`: Update an existing blog
- `DELETE /blogs/blogId`: Delete a blog

### Contact Us

- `POST /contact-us`: Process a contact message

### Videos

- `GET /videos`: Retrieve all videos
- `POST /videos`: Upload a new video
- `PUT /videos/`: Update an existing video.. expects a keyTitle in the req as an identifier for the video to update
- `DELETE /videos/:id`: Delete a video

### Adverts

- `GET /adverts`: Retrieve all adverts
- `POST /adverts`: Create a new advert
- `PUT /adverts/`: Update an existing advert.. expects a keyTitle in the req as an identifier for the advert to update
- `DELETE /adverts/:id`: Delete an advert

### Gallery

- `GET /gallerys`: Retrieve all gallery items
- `POST /gallerys`: Add a new gallery item
- `DELETE /gallerys/:id`: Delete a gallery item

### Books

- `GET /books`: Retrieve all books
- `POST /books`: Add a new book
- `PUT /books/:id`: Update an existing book.. expects a keyTitle in the req as an identifier for the book to update
- `DELETE /books/:id`: Delete a book

## License

Distributed under the MIT License. See `LICENSE` for more information.
