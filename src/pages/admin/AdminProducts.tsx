import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, message, Upload, Switch, Image } from "antd";
import { PlusOutlined, DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import api from "../../utils/api";

const { Dragger } = Upload;

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const backendBase = process.env.REACT_APP_BACKEND_URL || "";
  const normalizedBackendBase = backendBase.endsWith("/")
    ? backendBase.slice(0, -1)
    : backendBase;

  const buildPhotoUrl = (photoUrl: string) => {
    if (!photoUrl) return "";
    if (/^https?:\/\//i.test(photoUrl)) return photoUrl;
    if (photoUrl.startsWith("/")) {
      return `${normalizedBackendBase}${photoUrl}`;
    }
    return `${normalizedBackendBase}/${photoUrl}`;
  };

  useEffect(() => {
    fetchProducts();
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

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setFileList([]);
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
      
      if (fileList.length === 0) {
        message.error("Please upload at least one product photo!");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("isPublic", values.isPublic ? "true" : "false");
      
      fileList.forEach(file => {
        formData.append("photos", file.originFileObj || file);
      });

      if (editingId) {
        message.info("Edit not fully implemented in backend yet");
      } else {
        await api.post("/products", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Product created successfully");
      }
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      filters: [{ text: 'Cap', value: 'Cap' }, { text: 'Bottle', value: 'Bottle' }],
      onFilter: (value: any, record: any) => record.name.includes(value),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'photos',
      key: 'photos',
      render: (photos: any) => {
        const list = Array.isArray(photos)
          ? photos.filter(Boolean)
          : photos
            ? [photos]
            : [];

        if (list.length === 0) {
          return <span className="text-xs text-gray-400">No image</span>;
        }

        return (
          <Image.PreviewGroup>
            <Space size="small">
              {list.slice(0, 3).map((src: string, index: number) => (
                <Image
                  key={`${src}-${index}`}
                  src={buildPhotoUrl(src)}
                  width={48}
                  height={48}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              ))}
              {list.length > 3 ? (
                <span className="text-xs text-gray-500">+{list.length - 3}</span>
              ) : null}
            </Space>
          </Image.PreviewGroup>
        );
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Public',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${isPublic !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isPublic !== false ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Product
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal title={editingId ? "Edit Product" : "Add Product"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isPublic" label="Show on Public Website" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="Upload Photos" required>
            <Dragger
              multiple
              listType="picture"
              fileList={fileList}
              onChange={(info) => {
                setFileList(info.fileList);
              }}
              beforeUpload={() => false} // Prevent auto-upload since we upload manually via formData
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
