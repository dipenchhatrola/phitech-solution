import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Upload, Switch, Image, Select, Tag } from "antd";
import { PlusOutlined, DeleteOutlined, InboxOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../utils/api";

const { Dragger } = Upload;
const { Option } = Select;

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingId(record._id);
    form.setFieldsValue({
        ...record,
        category: record.category?._id
    });
    setFileList([]); // Note: In a real app, you'd show existing images
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      message.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("isPublic", values.isPublic ? "true" : "false");
      if (values.category) {
        formData.append("category", values.category);
      }
      
      fileList.forEach(file => {
        if (file.originFileObj) {
          formData.append("photos", file.originFileObj);
        }
      });

      if (editingId) {
        await api.put(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Product updated successfully");
      } else {
        if (fileList.length === 0) {
            message.error("Please upload at least one photo");
            return;
        }
        await api.post("/products", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Product created successfully");
      }
      setIsModalVisible(false);
      fetchProducts();
    } catch (error: any) {
      console.log("Failed:", error);
      message.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: any) => cat?.name || '-',
    },
    {
      title: 'Image',
      dataIndex: 'photos',
      key: 'photos',
      render: (photos: any) => {
        const list = Array.isArray(photos) ? photos : photos ? [photos] : [];
        if (list.length === 0) return <span className="text-xs text-gray-400">No image</span>;
        return (
          <Image.PreviewGroup>
            <Space size="small">
              {list.slice(0, 3).map((src: string, index: number) => (
                <Image
                  key={index}
                  src={src}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              ))}
            </Space>
          </Image.PreviewGroup>
        );
      }
    },
    {
      title: 'Public',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        <Tag color={isPublic !== false ? 'green' : 'red'}>
          {isPublic !== false ? 'Yes' : 'No'}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white border border-slate-200 p-6 rounded-xl">
        <div>
            <h2 className="text-lg font-semibold">Products Management</h2>
            <p className="text-sm text-slate-500">Manage public and internal products</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6">
        <Table 
            columns={columns} 
            dataSource={products} 
            rowKey="_id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal title={editingId ? "Edit Product" : "Add Product"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} width={600}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select placeholder="Select Category" allowClear>
              {categories.map(cat => (
                <Option key={cat._id} value={cat._id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Enter product description" rows={4} />
          </Form.Item>
          <Form.Item name="isPublic" label="Show on Website" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="Upload Photos">
            <Dragger
              multiple
              listType="picture"
              fileList={fileList}
              onChange={(info) => setFileList(info.fileList)}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Click or drag images to upload</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
