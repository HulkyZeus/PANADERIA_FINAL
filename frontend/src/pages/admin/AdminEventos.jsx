import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Space, Typography, Popconfirm, message, Tag, Modal, Form, Input, Select, DatePicker, TimePicker, InputNumber, Row, Col, Divider } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editEvento, setEditEvento] = useState(null);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [form] = Form.useForm();

  const API_URL = "http://localhost:4000/api/eventos";
  const API_PRODUCTS = "http://localhost:4000/api/products"; // Ajusta si tu endpoint es diferente

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEventos(res.data);
      } catch (error) {
        message.error("Error al cargar los eventos");
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_PRODUCTS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductosDisponibles(res.data);
      } catch (error) {
        // Puedes mostrar un mensaje si lo deseas
      }
    };
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventos(eventos.filter((e) => e._id !== id));
      message.success("Evento eliminado");
    } catch (error) {
      message.error("Error al eliminar el evento");
    }
  };

  const handleEditar = (evento) => {
    setEditEvento(evento);
    setEditModalVisible(true);
    // Inicializa el formulario con los datos del evento
    form.setFieldsValue({
      nombre_evento: evento.nombre_evento,
      tipo_evento: evento.tipo_evento,
      descripcion: evento.descripcion,
      direccion_evento: evento.direccion_evento,
      fecha_evento: dayjs(evento.fecha_evento),
      hora_evento: dayjs(evento.hora_evento, "HH:mm"),
      cantidad_personas: evento.cantidad_personas,
      productos: evento.productos.map(p => ({
        producto_id: p.producto_id._id || p.producto_id, // por si viene populado o solo el id
        cantidad: p.cantidad
      }))
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditEvento(null);
    form.resetFields();
  };

  const handleEditSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const eventoData = {
        ...values,
        usuario_id: editEvento.usuario_id?._id || editEvento.usuario_id, // <-- Agrega esto
        fecha_evento: values.fecha_evento.format("YYYY-MM-DD"),
        hora_evento: values.hora_evento.format("HH:mm"),
      };
      await axios.put(`${API_URL}/${editEvento._id}`, eventoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventos(eventos.map(ev =>
        ev._id === editEvento._id
          ? {
              ...ev,
              ...eventoData,
              usuario_id: ev.usuario_id // <-- Mantén el objeto original populado
            }
          : ev
      ));
      message.success("Evento actualizado");
      setEditModalVisible(false);
      setEditEvento(null);
      form.resetFields();
    } catch (error) {
      message.error("Error al actualizar el evento");
    }
  };

  const getTagColor = (tipo) => {
    switch (tipo) {
      case "Matrimonio":
        return "magenta";
      case "Baby Shower":
        return "cyan";
      case "Aniversario":
        return "purple";
      case "Cumpleaños":
        return "volcano";
      case "Otros":
        return "geekblue";
      default:
        return "blue";
    }
  };

  const columns = [
    {
      title: "Solicitante",
      dataIndex: ["usuario_id", "username"],
      key: "solicitante",
      render: (text) => text || "N/A",
    },
    {
      title: "Nombre del evento",
      dataIndex: "nombre_evento",
      key: "nombre_evento",
    },
    {
      title: "Tipo de evento",
      dataIndex: "tipo_evento",
      key: "tipo_evento",
      render: (tipo) => (
        <Tag color={getTagColor(tipo)} style={{ fontWeight: 500 }}>
          {tipo}
        </Tag>
      ),
    },
    {
      title: "Fecha del evento",
      dataIndex: "fecha_evento",
      key: "fecha_evento",
      render: (fecha) => new Date(fecha).toLocaleDateString(),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditar(record)}
            style={{ borderColor: "#6b4f1d", color: "#6b4f1d" }}
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Marcar este evento como completado? Esto lo eliminará."
            onConfirm={() => handleEliminar(record._id)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              style={{
                borderColor: "#52c41a",
                color: "#52c41a",
                background: "white",
                fontWeight: 500,
              }}
            >
              Completado
            </Button>
          </Popconfirm>
          <Popconfirm
            title="¿Seguro que deseas eliminar este evento?"
            onConfirm={() => handleEliminar(record._id)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{ borderColor: "#ff7875", color: "#ff7875" }}
            >
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Gestión de Eventos</Title>
      <Table
        columns={columns}
        dataSource={eventos}
        rowKey="_id"
        loading={loading}
        pagination={false}
        bordered
        style={{ background: "#fff", borderRadius: 8, marginTop: 16 }}
        locale={{ emptyText: "No hay eventos" }}
      />

      {/* Modal de edición */}
      <Modal
        title="Editar Evento"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item label="Nombre del Evento" name="nombre_evento" rules={[{ required: true, message: "Ingrese el nombre del evento" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tipo de Evento" name="tipo_evento" rules={[{ required: true, message: "Seleccione el tipo de evento" }]}>
            <Select>
              <Option value="Matrimonio">Matrimonio</Option>
              <Option value="Baby Shower">Baby Shower</Option>
              <Option value="Aniversario">Aniversario</Option>
              <Option value="Cumpleaños">Cumpleaños</Option>
              <Option value="Otros">Otros</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Descripción" name="descripcion" rules={[{ required: true, message: "Ingrese la descripción" }]}>
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Dirección del Evento" name="direccion_evento" rules={[{ required: true, message: "Ingrese la dirección" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fecha del Evento" name="fecha_evento" rules={[{ required: true, message: "Seleccione la fecha" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Hora del Evento" name="hora_evento" rules={[{ required: true, message: "Seleccione la hora" }]}>
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
          <Form.Item label="Cantidad de Personas" name="cantidad_personas" rules={[{ required: true, message: "Ingrese la cantidad de personas" }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Divider orientation="left" style={{ marginTop: 24, fontWeight: "bold" }}>
            Productos para el evento
          </Divider>
          <Form.List name="productos">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={16} key={key} align="middle">
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "producto_id"]}
                        rules={[{ required: true, message: "Seleccione un producto" }]}
                      >
                        <Select
                          placeholder="Seleccione un producto"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toString()
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {productosDisponibles.map((prod) => (
                            <Option key={prod._id} value={prod._id}>
                              {prod.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "cantidad"]}
                        rules={[{ required: true, message: "Ingrese la cantidad" }]}
                      >
                        <InputNumber min={1} placeholder="Cantidad" style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        icon={<MinusCircleOutlined />}
                        danger
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: "100%" }}
                  >
                    Agregar Producto
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminEventos;
