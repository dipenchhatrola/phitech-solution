import { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, message, Tag, Modal, Descriptions } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import api from "../../utils/api";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await api.get("/contact");
      setInquiries(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (record: any) => {
    setSelectedInquiry(record);
    setIsModalVisible(true);
    
    // Mark as read if it was new
    if (record.status === 'New') {
      try {
        await api.put(`/contact/${record._id}`, { status: 'Read' });
        fetchInquiries(); // Refresh list to update status
      } catch (err) {
        console.error("Failed to update status", err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/contact/${id}`);
      message.success("Inquiry deleted successfully");
      fetchInquiries();
    } catch (error) {
      message.error("Failed to delete inquiry");
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'New' ? 'red' : status === 'Read' ? 'blue' : 'green'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-6 rounded-xl">
        <h2 className="text-lg font-semibold">Contact Inquiries</h2>
        <p className="text-sm text-slate-500">Manage inquiries received from the website contact form</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-6">
        <Table 
          columns={columns} 
          dataSource={inquiries} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title="Inquiry Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedInquiry && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Full Name">{selectedInquiry.firstName} {selectedInquiry.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedInquiry.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedInquiry.phone}</Descriptions.Item>
            <Descriptions.Item label="Service">{selectedInquiry.service || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Date">{new Date(selectedInquiry.createdAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Message">{selectedInquiry.message}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
