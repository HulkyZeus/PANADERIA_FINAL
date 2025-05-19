import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Table, Button, Space, Typography, Popconfirm, message, Modal, Form, Input, Rate } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title } = Typography;
const { TextArea } = Input;

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [form] = Form.useForm();

  const API_URL = "http://localhost:4000/api/reviews";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(API_URL, {
          withCredentials: true, // Asegura que las cookies se envíen
        });
        setReviews(res.data);
      } catch (error) {
        message.error("Error al cargar las reseñas");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      setReviews(reviews.filter((r) => r._id !== id));
      message.success("Reseña eliminada");
    } catch (error) {
      message.error("Error al eliminar la reseña");
    }
  };

  const handleEditar = (review) => {
    setEditReview(review);
    setEditModalVisible(true);
    form.setFieldsValue({
      usuario: review.usuario?.username || "N/A",
      comentario: review.description,
      calificacion: review.rating,
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditReview(null);
    form.resetFields();
  };

  const handleEditSubmit = async (values) => {
    try {
      const reviewData = {
        ...values,
      };
      await axios.put(`${API_URL}/${editReview._id}`, reviewData, {
        withCredentials: true,
      });
      setReviews(reviews.map((r) =>
        r._id === editReview._id
          ? { ...r, ...reviewData }
          : r
      ));
      message.success("Reseña actualizada");
      setEditModalVisible(false);
      setEditReview(null);
      form.resetFields();
    } catch (error) {
      message.error("Error al actualizar la reseña");
    }
  };

  const columns = [
    {
        title: "Email",
        dataIndex: ["usuario_id", "email"], // Agrega una columna para el email
        key: "email",
        render: (text, record) => record.usuario_id?.email || "N/A",
    },
    {
      title: "Comentario",
      dataIndex: "description",
      key: "comentario",
    },
    {
      title: "Calificación",
      dataIndex: "rating",
      key: "calificacion",
      render: (rating) => <Rate disabled defaultValue={rating} />,
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
            title="¿Seguro que deseas eliminar esta reseña?"
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
      <Title level={3}>Gestión de Reseñas</Title>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
        pagination={false}
        bordered
        style={{ background: "#fff", borderRadius: 8, marginTop: 16 }}
        locale={{ emptyText: "No hay reseñas" }}
      />

      {/* Modal de edición */}
      <Modal
        title="Editar Reseña"
        open={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="usuario"
            label="Usuario"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="comentario"
            label="Comentario"
            rules={[{ required: true, message: "Por favor ingrese el comentario" }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="calificacion"
            label="Calificación"
            rules={[{ required: true, message: "Por favor ingrese la calificación" }]}
          >
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminReviews;