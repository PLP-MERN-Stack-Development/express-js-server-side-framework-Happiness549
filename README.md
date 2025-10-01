API Endpoints
Products

GET /api/products – List all products (supports optional query params: category, page, limit)

GET /api/products/:id – Get a product by ID

POST /api/products – Create a new product (requires x-api-key header)

PUT /api/products/:id – Update a product (requires x-api-key header)

DELETE /api/products/:id – Delete a product (requires x-api-key header)

GET /api/products/search?q=term – Search products by name

GET /api/products/stats – Get product count by category

🔑 Protected routes require the x-api-key header.

💡 Examples of Requests and Responses

Create a Product – POST /api/products with x-api-key header and product fields (id, name, description, price, category, inStock). Returns the created product as JSON.

List Products with Pagination – GET /api/products?page=1&limit=5. Returns JSON containing page, limit, total products, and products array.

Product Statistics – GET /api/products/stats. Returns a JSON object with each category as a key and the number of products in that category as the value.

⚙️ Environment Variables

 Project requires:

MONGO_URI – MongoDB connection string

API_KEY – API key for authentication

PORT – Port number for the server (default 3000)

🔒 Never commit your real .env file to GitHub. Use .env.example as a template.

📝 License

This project is open-source and free to use.




# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 





