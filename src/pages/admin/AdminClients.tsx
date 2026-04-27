import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Upload } from "antd";
import { PlusOutlined, DeleteOutlined, InboxOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../utils/api";

const { Dragger } = Upload;

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get("/clients");
      setClients(response.data);
    } catch (error) {
      message.error("Failed to load testimonials");
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

  const handleEdit = (record: any) => {
    setEditingId(record._id);
    form.setFieldsValue({
        name: record.name,
        link: record.link
    });
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/clients/${id}`);
      message.success("Testimonial deleted successfully");
      fetchClients();
    } catch (error) {
      message.error("Failed to delete testimonial");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.link) formData.append("link", values.link);
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (!editingId) {
        message.error("Please upload an image");
        return;
      }

      if (editingId) {
        await api.put(`/clients/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Testimonial updated successfully");
      } else {
        await api.post("/clients", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Testimonial created successfully");
      }
      setIsModalVisible(false);
      fetchClients();
    } catch (error: any) {
      console.log("Failed:", error);
      message.error(error.response?.data?.message || "Failed to save testimonial");
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => {
        if (!image) return <span className="text-xs text-gray-400">No image</span>;
        return (
          <img
            src={image}
            alt="Testimonial"
            width={40}
            height={40}
            style={{ objectFit: "contain", borderRadius: 4 }}
          />
        );
      }
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => link ? <a href={link} target="_blank" rel="noopener noreferrer">Visit</a> : '-',
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
            <h2 className="text-lg font-semibold">Testimonials Management</h2>
            <p className="text-sm text-slate-500">Manage testimonial logos and links</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6">
        <Table 
            columns={columns} 
            dataSource={clients} 
            rowKey="_id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal title={editingId ? "Edit Testimonial" : "Add Testimonial"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} width={600}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Testimonial Name" rules={[{ required: true }]}>
            <Input placeholder="Enter testimonial name" />
          </Form.Item>
          <Form.Item name="link" label="Website Link (Optional)">
            <Input placeholder="Enter URL (https://...)" />
          </Form.Item>
          <Form.Item label="Upload Logo">
            <Dragger
              maxCount={1}
              listType="picture"
              fileList={fileList}
              onChange={(info) => setFileList(info.fileList)}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Click or drag image to upload</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
