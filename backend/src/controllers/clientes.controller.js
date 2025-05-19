import Cliente from "../models/clientes.model.js";

export const crearCliente = async (req, res) => {
  try {
    const { usuario_id, name, address, cedula, celular, email } = req.body;
    
    // Validar campos requeridos
    const errors = [];
    if (!cedula) errors.push("La cédula es requerida");
    if (!name) errors.push("El nombre es requerido");
    if (!address) errors.push("La dirección es requerida");
    if (!celular) errors.push("El celular es requerido");
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors
      });
    }

    // Verificar si ya existe un cliente con esa cédula
    const clienteExistente = await Cliente.findOne({ cedula });
    if (clienteExistente) {
      return res.status(400).json({ 
        success: false,
        message: "Ya existe un cliente con esta cédula",
        errors: ["Cédula duplicada"]
      });
    }

    const nuevoCliente = new Cliente({
      usuario_id,
      name,
      address,
      cedula,
      celular,
      email
    });

    await nuevoCliente.save();
    res.status(201).json({
      success: true,
      data: nuevoCliente
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al crear el cliente",
      errors: [error.message]
    });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { name, address, celular, email } = req.body;

    // Validar campos requeridos
    const errors = [];
    if (!name) errors.push("El nombre es requerido");
    if (!address) errors.push("La dirección es requerida");
    if (!celular) errors.push("El celular es requerido");
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors
      });
    }

    const clienteActualizado = await Cliente.findOneAndUpdate(
      { cedula },
      { name, address, celular, email },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ 
        success: false,
        message: "Cliente no encontrado",
        errors: ["No se encontró el cliente con la cédula proporcionada"]
      });
    }

    res.json({
      success: true,
      data: clienteActualizado
    });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al actualizar el cliente",
      errors: [error.message]
    });
  }
};

export const getClientePorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const cliente = await Cliente.findOne({ cedula });
    
    if (!cliente) {
      return res.status(404).json({ 
        success: false, 
        message: "Cliente no encontrado" 
      });
    }

    return res.status(200).json({
      success: true,
      cliente
    });
  } catch (error) {
    console.error("Error al buscar cliente por cédula:", error);
    return res.status(500).json({
      success: false,
      message: "Error al buscar cliente",
      error: error.message
    });
  }
};

export const obtenerClientePorUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const cliente = await Cliente.findOne({ usuario_id });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

// Funciones para el administrador
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json({
      success: true,
      data: clientes
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los clientes",
      error: error.message
    });
  }
};

export const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado"
      });
    }

    res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el cliente",
      error: error.message
    });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndDelete(id);
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado"
      });
    }

    res.json({
      success: true,
      message: "Cliente eliminado exitosamente"
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el cliente",
      error: error.message
    });
  }
}; 