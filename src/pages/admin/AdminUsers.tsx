import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../../utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      message.success("Client deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete client");
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await api.post("/users", values);
      message.success("Client added successfully");
      setIsModalVisible(false);
      fetchUsers();
    } catch (error: any) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      }
    }
  };

  const columns = [
    {
      title: 'Client Code',
      dataIndex: 'clientId',
      key: 'clientId',
      sorter: (a: any, b: any) => a.clientId.localeCompare(b.clientId),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full text-xs font-semibold">Active</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm title="Delete this client?" onConfirm={() => handleDelete(record._id)}>
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-semibold">Clients</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage clients mapped to mould data
          </p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Client</Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6">
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal title="Add Client" open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="clientId" label="Client Code" rules={[{ required: true }]}>
            <Input placeholder="e.g. C001" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile Number" rules={[{ required: true }]}>
            <Input placeholder="Password for client login" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
