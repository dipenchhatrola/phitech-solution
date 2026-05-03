import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin, message, Typography } from 'antd';
import {
  UserOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CommentOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../../utils/api';

const { Title, Text } = Typography;

const COLORS = ['#FFC107', '#2196F3', '#4CAF50', '#9C27B0', '#FF5722', '#607D8B'];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/overview');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard overview');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Spin size="large" tip="Loading Dashboard Overview..." />
      </div>
    );
  }

  const { totals, statusCounts } = data || { totals: {}, statusCounts: {} };

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  const mouldStatusChartData = Object.entries(statusCounts).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <DashboardOutlined className="text-2xl text-indigo-600" />
        <Title level={2} className="!mb-0 !text-2xl sm:!text-3xl">Dashboard Overview</Title>
      </div>

      {/* Mould Status Cards */}
      <Row gutter={[16, 16]}>
        {Object.entries(statusCounts).length > 0 ? (
          Object.entries(statusCounts).map(([status, count]: [string, any], index) => (
            <Col key={status} xs={12} sm={12} lg={6}>
              <Card
                bordered={false}
                className={`shadow-sm border-l-4 h-full ${status === 'Pending' ? 'border-amber-500' :
                    status === 'In Machine' ? 'border-blue-500' :
                      status === 'Completed' ? 'border-emerald-500' :
                        'border-slate-500'
                  }`}
                bodyStyle={{ padding: '16px' }}
              >
                <Statistic
                  title={<Text type="secondary" className="uppercase tracking-widest text-[10px] font-bold">{status}</Text>}
                  value={count}
                  valueStyle={{ fontSize: '1.5rem', fontWeight: '700' }}
                  prefix={
                    <div className={`mr-2 p-2 rounded-lg inline-flex ${status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                        status === 'In Machine' ? 'bg-blue-100 text-blue-600' :
                          status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-slate-100 text-slate-600'
                      }`}>
                      {status === 'Pending' && <ClockCircleOutlined />}
                      {status === 'In Machine' && <SyncOutlined spin />}
                      {status === 'Completed' && <CheckCircleOutlined />}
                      {(!['Pending', 'In Machine', 'Completed'].includes(status)) && <ToolOutlined />}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card bordered={false} className="text-center py-12 bg-white/50">
              <Text type="secondary">No mould jobs found to display status.</Text>
            </Card>
          </Col>
        )}
      </Row>

      <div className="pt-4 pb-2">
        <Title level={4} className="!text-lg">Overview Totals</Title>
      </div>

      {/* Metric Cards (Reduced size or secondary) */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm bg-white/60 hover:bg-white transition-colors" bodyStyle={{ padding: '16px' }}>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-md">
                <UserOutlined />
              </div>
              <div className="min-w-0">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-tight block truncate">Clients</Text>
                <Text strong className="text-base sm:text-lg">{totals.clients}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm bg-white/60 hover:bg-white transition-colors" bodyStyle={{ padding: '16px' }}>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-md">
                <ToolOutlined />
              </div>
              <div className="min-w-0">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-tight block truncate">Mould Jobs</Text>
                <Text strong className="text-base sm:text-lg">{totals.moulds}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm bg-white/60 hover:bg-white transition-colors" bodyStyle={{ padding: '16px' }}>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-md">
                <ShoppingOutlined />
              </div>
              <div className="min-w-0">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-tight block truncate">Products</Text>
                <Text strong className="text-base sm:text-lg">{totals.products}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm bg-white/60 hover:bg-white transition-colors" bodyStyle={{ padding: '16px' }}>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 text-purple-500 rounded-md">
                <CommentOutlined />
              </div>
              <div className="min-w-0">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-tight block truncate">Testimonials</Text>
                <Text strong className="text-base sm:text-lg">{totals.testimonials}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Mould Jobs by Status" bordered={false} className="shadow-sm h-full">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={mouldStatusChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Status Distribution" bordered={false} className="shadow-sm h-full">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
