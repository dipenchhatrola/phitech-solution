import { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Tabs, Typography, Space, Divider, Row, Col } from "antd";
import {
  GlobalOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  SaveOutlined,
  EnvironmentOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  WhatsAppOutlined
} from "@ant-design/icons";
import api from "../../utils/api";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function AdminSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setFetching(true);
      const res = await api.get("/settings");
      form.setFieldsValue(res.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load settings");
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      await api.put("/settings", values);
      message.success("Settings saved successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex justify-center items-center h-64">
      <Space direction="vertical" align="center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <Text type="secondary">Loading ultra settings...</Text>
      </Space>
    </div>
  );

  return (
    <div className=" mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1">Platform Settings</Title>
          <Text type="secondary">Configure your website's global information and social identity.</Text>
        </div>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          loading={loading}
          onClick={() => form.submit()}
          className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-lg shadow-lg shadow-indigo-200 transition-all hover:scale-105"
        >
          Save All Changes
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          youtube: "",
          mobileNumber: "",
          contactNumber: "",
          whatsappNumber: "",
          email: "",
          address: "",
          googleMapsUrl: ""
        }}
        className="modern-settings-form"
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            className="settings-tabs"
            items={[
              {
                key: '1',
                label: (
                  <span className="flex items-center px-4 py-2">
                    <PhoneOutlined className="mr-2" />
                    Contact Info
                  </span>
                ),
                children: (
                  <div className="p-8 space-y-6">
                    <Title level={4}>Contact Details</Title>
                    <Text type="secondary">Primary contact information displayed on the website.</Text>
                    <Divider className="my-4" />
                    <Row gutter={24}>
                      <Col span={24} md={12}>
                        <Form.Item name="email" label="Email Address" rules={[{ type: 'email' }]}>
                          <Input prefix={<MailOutlined className="text-slate-400" />} placeholder="info@phitech.com" className="h-11 rounded-lg" />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={12}>
                        <Form.Item name="whatsappNumber" label="WhatsApp Number">
                          <Input prefix={<WhatsAppOutlined className="text-emerald-500" />} placeholder="+91 98765 43210" className="h-11 rounded-lg" />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={12}>
                        <Form.Item name="mobileNumber" label="Primary Mobile">
                          <Input prefix={<PhoneOutlined className="text-slate-400" />} placeholder="+91 98765 43210" className="h-11 rounded-lg" />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={12}>
                        <Form.Item name="contactNumber" label="Secondary/Office Number">
                          <Input prefix={<PhoneOutlined className="text-slate-400" />} placeholder="022-12345678" className="h-11 rounded-lg" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="address" label="Office Address">
                          <Input.TextArea rows={4} placeholder="Enter full physical address here..." className="rounded-xl" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ),
              },
              {
                key: '2',
                label: (
                  <span className="flex items-center px-4 py-2">
                    <ShareAltOutlined className="mr-2" />
                    Social Presence
                  </span>
                ),
                children: (
                  <div className="p-8 space-y-6">
                    <Title level={4}>Social Media Links</Title>
                    <Text type="secondary">Connect your social media profiles to the website footer.</Text>
                    <Divider className="my-4" />
                    <div className="space-y-4">
                      <Form.Item name="facebook" label="Facebook Profile">
                        <Input prefix={<FacebookOutlined className="text-blue-600" />} placeholder="https://facebook.com/yourpage" className="h-11 rounded-lg" />
                      </Form.Item>
                      <Form.Item name="instagram" label="Instagram Handle">
                        <Input prefix={<InstagramOutlined className="text-pink-500" />} placeholder="https://instagram.com/yourhandle" className="h-11 rounded-lg" />
                      </Form.Item>
                      <Form.Item name="twitter" label="Twitter / X">
                        <Input prefix={<TwitterOutlined className="text-sky-500" />} placeholder="https://twitter.com/yourhandle" className="h-11 rounded-lg" />
                      </Form.Item>
                      <Form.Item name="linkedin" label="LinkedIn Company Page">
                        <Input prefix={<LinkedinOutlined className="text-blue-700" />} placeholder="https://linkedin.com/company/yourcompany" className="h-11 rounded-lg" />
                      </Form.Item>
                      <Form.Item name="youtube" label="YouTube Channel">
                        <Input prefix={<YoutubeOutlined className="text-red-600" />} placeholder="https://youtube.com/@yourchannel" className="h-11 rounded-lg" />
                      </Form.Item>
                    </div>
                  </div>
                ),
              },
              {
                key: '3',
                label: (
                  <span className="flex items-center px-4 py-2">
                    <EnvironmentOutlined className="mr-2" />
                    Maps & Location
                  </span>
                ),
                children: (
                  <div className="p-8 space-y-6">
                    <Title level={4}>Google Maps Integration</Title>
                    <Text type="secondary">Embed your office location using a Google Maps share link or API key.</Text>
                    <Divider className="my-4" />
                    <Form.Item name="googleMapsUrl" label="Google Maps Embed URL">
                      <Input.TextArea rows={4} placeholder="Paste your <iframe src='...'> or URL here" className="rounded-xl" />
                    </Form.Item>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
                      <GlobalOutlined className="text-blue-500 mt-1" />
                      <div>
                        <Text strong className="block text-blue-800">Pro Tip</Text>
                        <Text className="text-blue-700 text-sm">
                          Use the 'Embed a map' option in Google Maps and copy only the 'src' attribute value for the best result.
                        </Text>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Form>

      <style>{`
        .settings-tabs .ant-tabs-nav {
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          padding-top: 20px;
          min-width: 200px;
        }
        .settings-tabs .ant-tabs-tab {
          margin: 4px 0 !important;
          padding: 12px 0 !important;
          border-radius: 0 8px 8px 0 !important;
          transition: all 0.3s;
        }
        .settings-tabs .ant-tabs-tab-active {
          background: #fff !important;
          box-shadow: 2px 0 0 #4f46e5 inset;
        }
        .settings-tabs .ant-tabs-ink-bar {
          display: none;
        }
        .modern-settings-form .ant-form-item-label label {
          font-weight: 500;
          color: #475569;
        }
      `}</style>
    </div>
  );
}
