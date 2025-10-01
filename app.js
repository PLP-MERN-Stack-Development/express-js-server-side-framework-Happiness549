//Task 1
const express = require('express');
const app = express();
app.use(express.json());
app.get('/',(req,res) => res.send('Hello world!'));
app.listen(300,() => console.log('Server is running on http://localhost:300'));

//Task 2
let products = [];

app.get('/api/products', (req,res) => res.json(products));

app.get('/api/products/:id', (req,res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).json({message: 'Product not found'});
    res.json(product)
});

app.post('/api/products', (req,res) => {
    const { id, name, description, price, category, inStock } = req.body;
    const newProduct = { id, name, description, price, category, inStock};
    products.push(newProduct);
    res.status(201).json(newProduct);

});


app.put('/api/products/:id', (req,res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).json({message: 'Product not found'});
    const { id, name, description, price, category, inStock } = req.body;
    Object.assign(product, { id, name, description, price, category, inStock});
    res.json(product);
});


app.delete('/api/products/:id', (req,res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if(productIndex === -1) return res.status(404).json({message: "Product not found"});
    products.splice(productIndex, 1);
    res.json({message: 'Product deleted successfully'})
});

//TAsk 3

app.use((req,res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.use(express.json());
const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if(!apiKey || apiKey !== 'mysecretkey') return res.status(401).json({message: "unauthorized"});
    
    next();
};
 app.use(authMiddleware);


const validateProduct = (req,res) => {
    const { id, name, description, price, category, inStock} = req.body;
    if(!id || !name || !description || !price || !category || inStock === undefined){
        return res.status(400).json({message: "All product fields are required"});
        
    }
    next();
};



//
app.post('/api/products', validateProduct, (req, res) => {
  const { id, name, description, price, category, inStock } = req.body;
  const newProduct = { id, name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', validateProduct, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const { name, description, price, category, inStock } = req.body;
  Object.assign(product, { name, description, price, category, inStock });
  res.json(product);
});

//Task 4

class NotFoundError extends error{
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class validationError extends error{
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error"
    res.status(status).json({error: message});
});

app.get('/api/products/:id', (req, res, next) => {
      const product = products.find(p => p.id === parseInt(req.params.id));
      if (!product) return next(new NotFoundError('Product not found'));
        res.json(product);
});
        

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/api/products/async/:id', asyncHandler(async (req, res) => {
      const product = products.find(p => p.id === parseInt(req.params.id));
      if (!product) throw new NotFoundError('Product not found');
        res.json(product);
}));


//Task 5
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;
  let filtered = products;

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginated = filtered.slice(startIndex, endIndex);

  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    total: filtered.length,
    products: paginated
  });
});

// 2️⃣ Search products by name
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  const results = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  res.json(results);
});

// 3️⃣ Product statistics (count by category)
app.get('/api/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});




