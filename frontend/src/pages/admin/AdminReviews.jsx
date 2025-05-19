import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Modal, Form, Input, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [form] = Form.useForm();

  const API_REVIEWS = "http://localhost:4000/api/reviews"; // Cambia según tu endpoint

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch de reseñas
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("No se encontró el token de autenticación");
        return;
      }
      const response = await axios.get(API_REVIEWS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar las reseñas:", error);
      message.error("Error al cargar las reseñas");
      setLoading(false);
    }
  };

  // Editar reseña
  const handleEdit = (review) => {
    setEditingReview(review);
    form.setFieldsValue({
      usuario: review.usuario?.username || "N/A",
      comentario: review.comentario,
      calificacion: review.calificacion,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (review) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_REVIEWS}/${review._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== review._id));
      message.success("Reseña eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      message.error("Error al eliminar la reseña");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");
      await axios.put(`${API_REVIEWS}/${editingReview._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(
        reviews.map((r) =>
          r._id === editingReview._id ? { ...r, ...values } : r
        )
      );
      message.success("Reseña actualizada correctamente");
      setIsModalVisible(false);
      setEditingReview(null);
      form.resetFields();
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      message.error("Error al actualizar la reseña");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingReview(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Usuario',
      dataIndex: ['usuario', 'username'],
      key: 'usuario',
      render: (text) => text || "N/A",
    },
    {
      title: 'Comentario',
      dataIndex: 'comentario',
      key: 'comentario',
    },
    {
      title: 'Calificación',
      dataIndex: 'calificacion',
      key: 'calificacion',
      render: (calificacion) => <Rate disabled defaultValue={calificacion} />,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ backgroundColor: '#fff', color: '#612c1d', border: '1px solid #612c1d' }}
          >
            Editar
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Gestión de Reseñas</h2>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} reseñas`,
        }}
      />

      <Modal
        title="Editar Reseña"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
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
            rules={[{ required: true, message: 'Por favor ingrese el comentario' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="calificacion"
            label="Calificación"
            rules={[{ required: true, message: 'Por favor ingrese la calificación' }]}
          >
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminReviews;