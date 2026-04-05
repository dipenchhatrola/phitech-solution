import { useState, useEffect } from "react";
import { Table, Tag, Button, Modal, Form, DatePicker, Select, InputNumber, Space, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../../utils/api";

const { Option } = Select;

export default function AdminMouldStatus() {
  const [moulds, setMoulds] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({
    totalMoulds: 0,
    statusCounts: { Pending: 0, "In Machine": 0, Completed: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mouldsRes, analyticsRes, usersRes, productsRes] = await Promise.all([
        api.get("/moulds"),
        api.get("/moulds/analytics"),
        api.get("/users"),
        api.get("/products")
      ]);
      setMoulds(mouldsRes.data);
      setAnalytics(analyticsRes.data);
      setClients(usersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load generic mould data");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/moulds/${id}`);
      message.success("Mould deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete mould");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/moulds/${id}`, { status: newStatus });
      message.success("Status updated");
      fetchData();
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.startDate) values.startDate = values.startDate.toDate();
      if (values.expectedCompletion) values.expectedCompletion = values.expectedCompletion.toDate();

      if (editingId) {
        await api.put(`/moulds/${editingId}`, values);
        message.success("Mould updated successfully");
      } else {
        await api.post("/moulds", values);
        message.success("Mould created successfully");
      }
      setIsModalVisible(false);
      fetchData();
    } catch (error: any) {
      console.error("Failed:", error);
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
      // To add filtering for clientId we could add distinct client filters dynamically
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'In Machine', value: 'In Machine' },
        { text: 'Completed', value: 'Completed' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string, record: any) => {
        return (
          <Select size="small" value={status} style={{ width: 120 }} onChange={(val) => handleUpdateStatus(record._id, val)}>
            <Option value="Pending"><Tag color="gold">Pending</Tag></Option>
            <Option value="In Machine"><Tag color="blue">In Machine</Tag></Option>
            <Option value="Completed"><Tag color="green">Completed</Tag></Option>
          </Select>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: any, b: any) => a.quantity - b.quantity,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Expected',
      dataIndex: 'expectedCompletion',
      key: 'expectedCompletion',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => { 
            setEditingId(record._id); 
            form.setFieldsValue({...record, startDate: dayjs(record.startDate), expectedCompletion: dayjs(record.expectedCompletion)}); 
            setIsModalVisible(true); 
          }} />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Total Moulds</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{analytics.totalMoulds}</p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Pending</p>
          <p className="text-2xl font-semibold text-amber-600 mt-2">{analytics.statusCounts?.Pending || 0}</p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">In Machine</p>
          <p className="text-2xl font-semibold text-blue-600 mt-2">{analytics.statusCounts?.InMachine || 0}</p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Completed</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-2">{analytics.statusCounts?.Completed || 0}</p>
        </div>
      </section>

      <section className="rounded-xl bg-white border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Mould Status</h2>
            <p className="text-sm text-slate-500">Overview of mould progress by client</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Mould</Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={moulds} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </section>

      <Modal title={editingId ? "Edit Mould" : "Add Mould"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="clientId" label="Client Code" rules={[{ required: true }]}>
            <Select showSearch placeholder="Select a Client" disabled={!!editingId} filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }>
              {clients.map((client: any) => (
                <Option key={client._id} value={client.clientId}>{client.clientId} - {client.mobile}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="productId" label="Product" rules={[{ required: true }]}>
            <Select showSearch placeholder="Select a Product" filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }>
              {products.map((product: any) => (
                <Option key={product._id} value={product.name}>{product.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expectedCompletion" label="Expected Completion Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="Pending">
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="In Machine">In Machine</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
