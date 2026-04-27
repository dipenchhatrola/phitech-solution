import { useState, useEffect, useMemo } from "react";
import { Table, Tag, Button, Modal, Form, DatePicker, Select, Input, InputNumber, Space, message, Popconfirm, Upload } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../../utils/api";
import { useMoulds } from "../../context/MouldContext";

const { Option } = Select;

export default function AdminMouldStatus() {
  const { moulds, setMoulds, updateMouldOptimistic, fetchMoulds, loading: mouldsLoading } = useMoulds();
  const [clients, setClients] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customProductNames, setCustomProductNames] = useState<string[]>([]);
  const [customProductName, setCustomProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const [selectedClientFilter, setSelectedClientFilter] = useState<string | undefined>(undefined);
  const [customStatuses, setCustomStatuses] = useState<string[]>(() => {
    const saved = localStorage.getItem('customMouldStatuses');
    return saved ? JSON.parse(saved) : [];
  });
  const [newStatusName, setNewStatusName] = useState("");

  useEffect(() => {
    localStorage.setItem('customMouldStatuses', JSON.stringify(customStatuses));
  }, [customStatuses]);

  const defaultStatuses = ["Pending", "In Machine", "Completed"];
  const allStatuses = Array.from(new Set([...defaultStatuses, ...customStatuses]));

  const handleAddStatus = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    const trimmed = newStatusName.trim();
    if (trimmed && !allStatuses.includes(trimmed)) {
      setCustomStatuses([...customStatuses, trimmed]);
      setNewStatusName("");
    }
  };

  const handleDeleteStatus = (e: React.MouseEvent, statusToDelete: string) => {
    e.stopPropagation();
    e.preventDefault();
    setCustomStatuses(customStatuses.filter(s => s !== statusToDelete));
  };

  const renderStatusDropdown = (menu: React.ReactElement) => (
    <div>
      {menu}
      <div className="px-3 py-2 border-t border-slate-100 flex gap-2 items-center">
        <Input
          placeholder="New status"
          size="small"
          value={newStatusName}
          onChange={(e) => setNewStatusName(e.target.value)}
          onPressEnter={handleAddStatus}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
        <Button type="primary" size="small" onClick={handleAddStatus}>Add</Button>
      </div>
    </div>
  );

  const filteredMoulds = useMemo(() => {
    if (!selectedClientFilter) return moulds;
    return moulds.filter((m: any) => m.clientId === selectedClientFilter);
  }, [moulds, selectedClientFilter]);

  const analytics = useMemo(() => {
    const totalMoulds = moulds.length;
    const statusCounts = moulds.reduce((acc: any, mould: any) => {
      const status = (mould.status || "Pending").replace(" ", ""); // Handle "In Machine" vs "InMachine" mapping if needed
      // Actually, looking at the code, it uses "In Machine" in Select but analytics shows "InMachine"
      const key = status === "In Machine" ? "InMachine" : status;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, { Pending: 0, InMachine: 0, Completed: 0 });
    return { totalMoulds, statusCounts };
  }, [moulds]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, productsRes] = await Promise.all([
        api.get("/users"),
        api.get("/products")
      ]);
      await fetchMoulds();
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
    setCustomProductName("");
    setIsModalVisible(true);
  };

  const productOptions = Array.from(
    new Set([
      ...products.map((product: any) => product?.name).filter(Boolean),
      ...moulds.map((mould: any) => mould?.productId).filter(Boolean),
      ...customProductNames
    ])
  ).map((name) => ({ value: name, label: name }));

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/moulds/${id}`);
      message.success("Mould deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete mould");
    }
  };

  const handleUpdateMould = async (id: string, updates: any) => {
    await updateMouldOptimistic(id, updates);
  };

  const handleOk = async () => {
    try {
      // Prioritize custom name if something is typed in the custom box
      const trimmedCustom = customProductName.trim();
      if (trimmedCustom) {
        form.setFieldsValue({ productId: trimmedCustom });
        if (!customProductNames.includes(trimmedCustom)) {
          setCustomProductNames((prev) => [...prev, trimmedCustom]);
        }
        setCustomProductName(""); // Clear it after use
      }

      const values = await form.validateFields();
      
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'startDate' || key === 'expectedCompletion') {
          if (values[key]) {
            formData.append(key, values[key].toDate().toISOString());
          }
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editingId) {
        await api.put(`/moulds/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Mould updated successfully");
      } else {
        await api.post("/moulds", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success("Mould created successfully");
      }
      setIsModalVisible(false);
      setFileList([]);
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => url ? (
        <img 
          src={url} 
          alt="Mould" 
          className="w-12 h-12 object-cover rounded shadow-sm border border-slate-100" 
        />
      ) : <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400 text-center">No Image</div>,
    },
    {
      title: 'Client Info',
      key: 'clientInfo',
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium">{record.clientId}</div>
          <div className="text-xs text-slate-500">{record.user?.clientName || 'N/A'} - {record.user?.city || 'N/A'}</div>
        </div>
      ),
      sorter: (a: any, b: any) => a.clientId.localeCompare(b.clientId),
    },
    {
      title: 'Product Name',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: allStatuses.map(s => ({ text: s, value: s })),
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string, record: any) => {
        return (
          <Select 
            size="small" 
            value={status} 
            style={{ width: 130 }} 
            onChange={(val) => handleUpdateMould(record._id, { status: val })}
            dropdownRender={renderStatusDropdown}
          >
            {allStatuses.map(s => (
              <Option key={s} value={s}>
                <div className="flex justify-between items-center w-full">
                  <span>{s === 'In Machine' ? <Tag color="blue">{s}</Tag> : s === 'Pending' ? <Tag color="gold">{s}</Tag> : s === 'Completed' ? <Tag color="green">{s}</Tag> : <Tag color="default">{s}</Tag>}</span>
                  {!defaultStatuses.includes(s) && (
                    <DeleteOutlined 
                      className="text-red-400 hover:text-red-600 ml-2" 
                      onClick={(e: any) => handleDeleteStatus(e, s)} 
                    />
                  )}
                </div>
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Percentage (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      sorter: (a: any, b: any) => a.percentage - b.percentage,
      render: (val: any, record: any) => (
        <InputNumber
          min={0}
          max={100}
          size="small"
          value={val || 0}
          formatter={value => `${value}%`}
          parser={value => value!.replace('%', '')}
          onChange={(newVal) => handleUpdateMould(record._id, { percentage: newVal })}
          style={{ width: 80 }}
          disabled={record.status === 'Pending'}
        />
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => date ? dayjs(date).format("DD-MM-YYYY") : "-",
    },
    {
      title: 'Expected',
      dataIndex: 'expectedCompletion',
      key: 'expectedCompletion',
      render: (date: string) => date ? dayjs(date).format("DD-MM-YYYY") : "-",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            setEditingId(record._id);
            form.setFieldsValue({ ...record, startDate: dayjs(record.startDate), expectedCompletion: dayjs(record.expectedCompletion) });
            setCustomProductName("");
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
          <div className="flex gap-4 items-center">
            <Select
              showSearch
              allowClear
              placeholder="Filter by Client"
              style={{ width: 200 }}
              value={selectedClientFilter}
              onChange={setSelectedClientFilter}
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {clients.map((client: any) => (
                <Option key={client._id} value={client.clientId}>
                  {client.clientName ? `${client.clientId} - ${client.clientName}` : client.clientId}
                </Option>
              ))}
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Job</Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredMoulds}
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
                <Option key={client._id} value={client.clientId}>
                  {client.clientId} - {client.clientName || 'N/A'} ({client.city || 'N/A'})
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Mould Image">
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
          <Form.Item name="productId" label="Product Name" rules={[{ required: true, message: "Please select or enter a product name" }]}>
            <Select
              showSearch
              options={productOptions}
              placeholder="Select a product name"
              filterOption={(inputValue, option: any) =>
                (option?.label || "").toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div className="px-3 py-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Custom Product Name</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type custom name"
                        value={customProductName}
                        onChange={(e) => setCustomProductName(e.target.value)}
                        onPressEnter={() => {
                          const trimmed = customProductName.trim();
                          if (!trimmed) return;
                          setCustomProductNames((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                          form.setFieldsValue({ productId: trimmed });
                          setCustomProductName("");
                        }}
                      />
                      <Button
                        type="primary"
                        onClick={() => {
                          const trimmed = customProductName.trim();
                          if (!trimmed) return;
                          setCustomProductNames((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                          form.setFieldsValue({ productId: trimmed });
                          setCustomProductName("");
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.status !== currentValues.status}
          >
            {({ getFieldValue, setFieldsValue }) => {
              const status = getFieldValue('status');
              if (status === 'Completed' && getFieldValue('percentage') !== 100) {
                setFieldsValue({ percentage: 100 });
              }
              return (
                <Form.Item name="percentage" label="Percentage (%)" rules={[{ required: true }]}>
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    disabled={status === 'Pending'}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expectedCompletion" label="Expected Completion Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="Pending">
            <Select dropdownRender={renderStatusDropdown}>
              {allStatuses.map(s => (
                <Option key={s} value={s}>
                  <div className="flex justify-between items-center w-full">
                    <span>{s}</span>
                    {!defaultStatuses.includes(s) && (
                      <DeleteOutlined 
                        className="text-red-400 hover:text-red-600 ml-2" 
                        onClick={(e: any) => handleDeleteStatus(e, s)} 
                      />
                    )}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
