import React, { useState, useEffect } from 'react';
import { Card, Button, Upload, Form, Input, InputNumber, Modal, message, Image, Space, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/products';
import { beforeUpload } from '../../utils/imageUtils';
import { useAuth } from '../../context/AuthContext';

const { TextArea } = Input;

const AdminProductos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      message.error('No tienes permisos para realizar esta acción');
      // Redirigir al login si es necesario
      return;
    }
    fetchProducts();
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // Cambiado de getProductsByCategory a getProducts
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Error al cargar los productos');
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      
      // Ensure category is sent as a string
      Object.keys(values).forEach(key => {
        if (key === 'category') {
          formData.append(key, values[key].toString());
        } else {
          formData.append(key, values[key]);
        }
      });
      
      // Agregar la imagen si existe
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      setUploading(true);
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        message.success('Producto actualizado correctamente');
      } else {
        const response = await createProduct(formData);
        if (!response) {
          throw new Error('No se recibió respuesta del servidor');
        }
        message.success('Producto creado correctamente');
      }
      setUploading(false);

      setIsModalVisible(false);
      setFileList([]);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      setUploading(false);
      console.error('Error detallado:', error);
      message.error(error.message || 'Error al guardar el producto');
    }
};

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    setFileList([]);
    form.resetFields();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (product) => {
    try {
      await deleteProduct(product._id);
      message.success('Producto eliminado correctamente');
      fetchProducts();
    } catch (error) {
      message.error('Error al eliminar el producto');
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'panes', label: 'Panes' },
    { value: 'postres', label: 'Postres' },
    { value: 'desayuno', label: 'Desayunos' },
    { value: 'combos', label: 'Combos' },

  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          style={{ backgroundColor: '#e0b067', color: 'white' }}  
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Agregar Producto
        </Button>
      </div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Select
          style={{ width: 200 }} 
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredProducts.map(product => (
          <Card
            key={product._id}
            cover={<Image src={product.imageUrl} alt={product.name} style={{ height: 200, objectFit: 'cover' }} />}
            actions={[
              <EditOutlined key="edit" onClick={() => handleEdit(product)} />,
              <DeleteOutlined key="delete" onClick={() => handleDelete(product)} />
            ]}
          >
            <Card.Meta
              title={product.name}
              description={
                <>
                  <p>{product.description}</p>
                  <p><strong>Categoría:</strong> {categories.find(cat => cat.value === product.category)?.label || product.category}</p>
                  <p style={{ fontWeight: 'bold' }}>${product.price}</p>
                </>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        confirmLoading={uploading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Categoría"
            rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}
          >
            <Select>
              <Select.Option value="bebidas">Bebidas</Select.Option>
              <Select.Option value="panes">Panes</Select.Option>
              <Select.Option value="postres">Postres</Select.Option>
              <Select.Option value="desayunos">Desayunos</Select.Option>
              <Select.Option value="combos">Combos</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            label="Imagen"
            required
          >
            <Upload
              name="image"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Subir</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductos;