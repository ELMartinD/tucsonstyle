<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'productos_db'; // Base de datos
$username = 'root';        // Usuario
$password = '44659947mB@'; // Contraseña

try {
    // Establecer conexión a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener los datos enviados desde el frontend
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificamos si los datos existen y son correctos
    if ($data && isset($data['imagen'], $data['titulo'], $data['precio_contado'], $data['precio_cuotas'], $data['tipo_producto'])) {
        
        // Preparamos la consulta SQL para insertar los datos
        $sql = "INSERT INTO " . $data['tipo_producto'] . " (imagen, titulo, precio_contado, precio_cuotas) VALUES (:imagen, :titulo, :precio_contado, :precio_cuotas)";
        $stmt = $pdo->prepare($sql);
        
        // Ejecutamos la consulta con los parámetros
        $stmt->execute([
            ':imagen' => $data['imagen'], // Imagen en base64
            ':titulo' => $data['titulo'],
            ':precio_contado' => $data['precio_contado'],
            ':precio_cuotas' => $data['precio_cuotas'],
        ]);

        // Enviamos una respuesta de éxito
        echo json_encode(['success' => 'Producto agregado correctamente.']);
    } else {
        // En caso de que falten datos
        echo json_encode(['error' => 'Faltan datos o datos incorrectos.']);
    }
} catch (PDOException $e) {
    // Error al conectar o ejecutar la consulta
    echo json_encode(['error' => 'Error al conectar a la base de datos: ' . $e->getMessage()]);
}
?>












