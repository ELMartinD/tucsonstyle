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

    // Filtrar productos para remeras en la tabla 'remeras'
    $sql = "SELECT * FROM buzos"; 
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($productos) {
        // Recorrer los productos y mostrar las tarjetas
        foreach ($productos as $producto) {
            echo "<div class='ropas'>";
            echo "<div class='ropaimg'>";
            echo "<img class='ropaimg' src='" . $producto['imagen'] . "' alt='" . $producto['titulo'] . "'>";
            echo "</div>";
            echo "<div>";
            echo "<h1 class='producto-nombre'>" . $producto['titulo'] . "</h1>";
            echo "<p class='precio'>$" . $producto['precio_contado'] . "</p>";
            echo "<p>6 cuotas sin interés de $" . number_format($producto['precio_cuotas'], 2) . "</p>";
            echo "</div>";
            echo "<div>";
            echo "<button class='btn-comprar'>Comprar</button>";
            echo "</div>";
            echo "</div>";
        }
    } else {
        echo "<p>No hay productos disponibles en esta sección.</p>";
    }
} catch (PDOException $e) {
    echo "<p>Error al conectar a la base de datos: " . $e->getMessage() . "</p>";
}
?>
