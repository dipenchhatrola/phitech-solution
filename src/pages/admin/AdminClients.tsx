import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Image } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../../utils/api";
import ImageUploadBox from "../../components/admin/ImageUploadBox";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/clients");
      setClients(response.data);
    } catch (error) {
      message.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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
    if (record.image) {
      setFileList([{ uid: '-1', name: 'logo.png', status: 'done', url: record.image }]);
    } else {
      setFileList([]);
    }
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
      title: 'Client Name',
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
          <Image
            src={image}
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Client Management</h2>
          <p className="text-sm text-slate-500">Manage Clients</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="w-full sm:w-auto">
          Add Client
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          className="admin-table"
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
          <Form.Item label="Upload Logo" required={!editingId}>
            <ImageUploadBox fileList={fileList} setFileList={setFileList} maxCount={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
