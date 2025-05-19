import Pedido from "../models/pedidos.model.js";
import Cliente from "../models/clientes.model.js";

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente_id', 'name address celular email');
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
};

export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente_id', 'name address celular email');
    
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    
    res.json(pedido);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({ message: "Error al obtener el pedido" });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const { cedula, metodo_pago, productos, total } = req.body;
    console.log('Datos recibidos para crear pedido:', { cedula, metodo_pago, productos, total });

    // Validar campos requeridos
    const errors = [];
    if (!cedula) errors.push("La cédula del cliente es requerida");
    if (!metodo_pago) errors.push("El método de pago es requerido");
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      errors.push("Debe incluir al menos un producto");
    }
    if (!total || typeof total !== 'number' || total <= 0) {
      errors.push("El total debe ser un número mayor a 0");
    }

    if (errors.length > 0) {
      console.log('Errores de validación:', errors);
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors
      });
    }

    // Verificar si existe el cliente
    const cliente = await Cliente.findOne({ cedula: cedula });
    console.log('Cliente encontrado:', cliente);
    
    if (!cliente) {
      return res.status(400).json({ 
        success: false,
        message: "El cliente debe ser creado antes de realizar el pedido",
        errors: ["Cliente no encontrado"]
      });
    }

    // Validar que los productos tengan todos los campos requeridos
    const productosErrors = productos.map((producto, index) => {
      const productoErrors = [];
      if (!producto.name) productoErrors.push("El nombre del producto es requerido");
      if (!producto.price || typeof producto.price !== 'number') productoErrors.push("El precio debe ser un número");
      if (!producto.quantity || typeof producto.quantity !== 'number') productoErrors.push("La cantidad debe ser un número");
      return productoErrors.length > 0 ? { index, errors: productoErrors } : null;
    }).filter(Boolean);

    if (productosErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Error en los productos",
        errors: productosErrors
      });
    }

    const nuevoPedido = new Pedido({
      cliente_id: cliente._id,
      metodo_pago,
      productos,
      total,
      estado: 'pendiente',
      fecha: new Date()
    });

    console.log('Nuevo pedido a crear:', nuevoPedido);

    const pedidoGuardado = await nuevoPedido.save();
    
    // Poblar los datos del cliente antes de enviar la respuesta
    const pedidoCompleto = await Pedido.findById(pedidoGuardado._id)
      .populate('cliente_id', 'name address celular email');

    res.status(201).json({
      success: true,
      data: pedidoCompleto
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al crear el pedido",
      errors: [error.message]
    });
  }
};

export const actualizarPedido = async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('cliente_id', 'name address celular email');

    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(pedidoActualizado);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    
    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ message: "Error al eliminar el pedido" });
  }
};
