<?php
// Conexión a la base de datos
$host = 'localhost';
$dbname = 'productos_db';
$username = 'root';
$password = '44659947mB@';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener los datos del producto enviados por el cliente
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar los datos recibidos
    if (isset($data['imagen']) && isset($data['titulo']) && isset($data['precio_contado']) && isset($data['precio_cuotas']) && isset($data['tipo_producto'])) {
        $imagen = $data['imagen']; // La imagen en base64
        $titulo = $data['titulo'];
        $precioContado = $data['precio_contado'];
        $precioCuotas = $data['precio_cuotas'];
        $tipoProducto = $data['tipo_producto'];

        // Inserción en la base de datos
        $sql = "INSERT INTO $tipoProducto (imagen, titulo, precio_contado, precio_cuotas) VALUES (:imagen, :titulo, :precio_contado, :precio_cuotas)";
        $stmt = $pdo->prepare($sql);

        // Ejecutar la consulta con los datos
        $stmt->bindParam(':imagen', $imagen);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':precio_contado', $precioContado);
        $stmt->bindParam(':precio_cuotas', $precioCuotas);

        if ($stmt->execute()) {
            echo json_encode(['success' => 'Producto agregado correctamente']);
        } else {
            echo json_encode(['error' => 'Error al agregar el producto. Intente nuevamente.']);
        }
    } else {
        echo json_encode(['error' => 'Datos incompletos']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al conectar a la base de datos: ' . $e->getMessage()]);
}
?>











