const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_sonia',
    password: '6#3mnAeac7?#7sp',
    database: 'freedb_Travely'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));
// enable form processing
app.use(express.urlencoded({ extended: false }));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save upload files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // File name to save
    }
});

const upload = multer({ storage: storage });

// Define routes
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM product';
    // Fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Product');
        }
        // Render HTML page with data
        res.render('index', { product: results });
    });
});

app.get('/product/:id', (req, res) => {
    // Extract the product ID from the request parameters
    const product_id = req.params.id;
    const sql = 'SELECT * FROM product WHERE product_id = ?';
    // Fetch data from MySQL based on the product ID
    connection.query(sql, [product_id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Product by ID');
        }
        // Check if any product with the given ID was found
        if (results.length > 0) {
            // Render HTML page with product data
            res.render('product', { product: results[0] });
        } else {
            // If no product with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Product Not Found');
        }
    });
});

app.get('/moreProduct', (req, res) => {
    const sql = 'SELECT * FROM product';
    // Fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Product');
        }
        // Render HTML page with data
        res.render('moreProduct', { product: results });
    });
});

app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});

app.post('/product', upload.single('image'), (req, res) => {
    // Extract product data from the request body
    const { name, type, country, price } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }
    const sql = 'INSERT INTO product (name, type, country, price, image) VALUES (?, ?, ?, ?, ?)';
    // Insert the new product into the database
    connection.query(sql, [name, type, country, price, image], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding product:", error);
            res.status(500).send('Error Adding product');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

app.get('/editProduct/:id', (req, res) => {
    const product_id = req.params.id;
    const sql = 'SELECT * FROM product WHERE product_id = ?';
    // Fetch data from MySql based on the product ID
    connection.query(sql, [product_id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Product by ID');
        }
        // Check if any product with the given ID was found
        if (results.length > 0) {
            // Render HTML page with product data
            res.render('editProduct', { product: results[0] });
        } else {
            // If no product with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Product Not Found');
        }
    });
});

app.post('/editProduct/:id', upload.single('image'), (req, res) => {
    const product_id = req.params.id;
    const { name, type, country, price, currentImage } = req.body;
    
    let image = currentImage; // Default to current image

    if (req.file) {
        image = req.file.filename; // Use new image if uploaded
    }

    const sql = 'UPDATE product SET name = ?, type = ?, country = ?, price = ?, image = ? WHERE product_id = ?';

    // Insert the new product into the database
    connection.query(sql, [name, type, country, price, image, product_id], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error updating product:", error);
            res.status(500).send('Error Updating Product');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});


app.get('/deleteProduct/:id', (req, res) => {
    const product_id = req.params.id;
    const sql = 'DELETE FROM product WHERE product_id = ?';
    connection.query(sql, [product_id], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Deleting Product by ID');
        }
        // Send a success response
        res.redirect('/');
    });
});

app.get('/aboutUs', (req, res) => {
    res.render('aboutUs');
});

app.get('/signUp', (req, res) => {
    res.render('signUp');
});

// Example:
// app.get('/', (req, res) => {
// connection.query('SELECT * FROM TABLE', (error, results) => {
// if (error) throw error;
// res.render('index', { results }); // Render HTML page with data
// });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
