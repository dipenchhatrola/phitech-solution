import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Upload } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import api from "../../utils/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category");
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
    form.setFieldsValue(record);
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.description) formData.append("description", values.description);
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (!editingId) {
        message.error("Image is required");
        return;
      }

      if (editingId) {
        await api.put(`/categories/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Category updated successfully");
      } else {
        await api.post("/categories", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Category added successfully");
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error: any) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to save category");
      }
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => url ? (
        <img 
          src={url} 
          alt="Category" 
          className="w-12 h-12 object-cover rounded shadow-sm border border-slate-100" 
        />
      ) : <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400 text-center">No Image</div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Delete this category?" onConfirm={() => handleDelete(record._id)}>
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
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage product categories
          </p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Category</Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6">
        <Table 
          columns={columns} 
          dataSource={categories} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal 
        title={editingId ? "Edit Category" : "Add Category"} 
        open={isModalVisible} 
        onOk={handleOk} 
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item label="Category Image" required={!editingId}>
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
