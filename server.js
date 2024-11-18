const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de Multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
    }
});
const upload = multer({ storage: storage });

// Middleware para manejar los datos de los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Carpeta para los archivos estáticos

// Ruta para agregar productos
app.post('/add-product', upload.single('imagen'), (req, res) => {
    const { nombre, precioContado, precioCuotas } = req.body;
    const imagenUrl = 'img/' + req.file.filename;

    // Cargar los productos existentes
    fs.readFile('datos.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de datos.');
        }
        
        const productos = JSON.parse(data || '[]');
        const nuevoProducto = {
            nombre,
            precioContado,
            precioCuotas,
            imagenUrl
        };
        
        // Agregar el nuevo producto
        productos.push(nuevoProducto);

        // Guardar los productos nuevamente en el archivo datos.json
        fs.writeFile('datos.json', JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el producto.');
            }
            res.send('Producto agregado exitosamente.');
        });
    });
});

// Ruta para obtener los productos
app.get('/get-products', (req, res) => {
    fs.readFile('datos.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de datos.');
        }
        
        const productos = JSON.parse(data || '[]');
        res.json(productos);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});








