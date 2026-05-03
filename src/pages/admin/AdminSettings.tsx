import { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, message, Tabs, Typography, Space, Divider, Row, Col } from "antd";
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

export default function AdminSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchSettings = useCallback(async () => {
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
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

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

  const [tabPosition, setTabPosition] = useState<'left' | 'top'>('left');

  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? 'top' : 'left');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (fetching) return (
    <div className="flex justify-center items-center h-64">
      <Space direction="vertical" align="center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <Text type="secondary">Loading settings...</Text>
      </Space>
    </div>
  );

  return (
    <div className="mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1 !text-2xl">Platform Settings</Title>
          <Text type="secondary" className="text-sm">Configure your website's global information and social identity.</Text>
        </div>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          loading={loading}
          onClick={() => form.submit()}
          className="bg-indigo-600 hover:bg-indigo-700 h-11 sm:h-12 px-6 sm:px-8 rounded-lg shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
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
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <Tabs
            defaultActiveKey="1"
            tabPosition={tabPosition}
            className="settings-tabs"
            items={[
              {
                key: '1',
                label: (
                  <span className="flex items-center px-2 sm:px-4 py-1 sm:py-2">
                    <PhoneOutlined className="mr-2" />
                    Contact Info
                  </span>
                ),
                children: (
                  <div className="p-4 sm:p-8 space-y-6">
                    <Title level={4} className="!mb-0">Contact Details</Title>
                    <Text type="secondary" className="text-sm">Primary contact information displayed on the website.</Text>
                    <Divider className="my-4" />
                    <Row gutter={[16, 0]}>
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
                  <span className="flex items-center px-2 sm:px-4 py-1 sm:py-2">
                    <ShareAltOutlined className="mr-2" />
                    Social Presence
                  </span>
                ),
                children: (
                  <div className="p-4 sm:p-8 space-y-6">
                    <Title level={4} className="!mb-0">Social Media Links</Title>
                    <Text type="secondary" className="text-sm">Connect your social media profiles to the website footer.</Text>
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
                  <span className="flex items-center px-2 sm:px-4 py-1 sm:py-2">
                    <EnvironmentOutlined className="mr-2" />
                    Maps & Location
                  </span>
                ),
                children: (
                  <div className="p-4 sm:p-8 space-y-6">
                    <Title level={4} className="!mb-0">Google Maps Integration</Title>
                    <Text type="secondary" className="text-sm">Embed your office location using a Google Maps share link.</Text>
                    <Divider className="my-4" />
                    <Form.Item name="googleMapsUrl" label="Google Maps Embed URL">
                      <Input.TextArea rows={4} placeholder="Paste your <iframe src='...'> or URL here" className="rounded-xl" />
                    </Form.Item>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
                      <GlobalOutlined className="text-blue-500 mt-1" />
                      <div>
                        <Text strong className="block text-blue-800 text-sm">Pro Tip</Text>
                        <Text className="text-blue-700 text-[13px]">
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
          background: #f8fafc !important;
          padding: ${tabPosition === 'left' ? '20px 0' : '0 12px'} !important;
          border-right: ${tabPosition === 'left' ? '1px solid #e2e8f0' : 'none'} !important;
          border-bottom: ${tabPosition === 'top' ? '1px solid #e2e8f0' : 'none'} !important;
          min-width: ${tabPosition === 'left' ? '220px' : 'auto'} !important;
          margin-bottom: 0 !important;
        }
        
        .settings-tabs .ant-tabs-nav-wrap {
          padding: ${tabPosition === 'top' ? '4px 0' : '0'} !important;
        }

        /* Hide scrollbars everywhere in tabs */
        .settings-tabs *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .settings-tabs * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        .settings-tabs .ant-tabs-tab {
          margin: ${tabPosition === 'left' ? '4px 0 !important' : '0 4px !important'};
          padding: ${tabPosition === 'left' ? '12px 20px !important' : '10px 16px !important'};
          border-radius: 8px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #64748b !important;
          border: none !important;
        }

        .settings-tabs .ant-tabs-tab:hover {
          color: #4f46e5 !important;
          background: rgba(79, 70, 229, 0.05) !important;
        }

        .settings-tabs .ant-tabs-tab-active {
          background: ${tabPosition === 'left' ? '#fff' : 'transparent'} !important;
          position: relative;
        }

        .settings-tabs .ant-tabs-tab-active::after {
          content: '';
          position: absolute;
          background: #4f46e5;
          border-radius: 4px;
          ${tabPosition === 'left' 
            ? 'left: 0; top: 20%; bottom: 20%; width: 3px;' 
            : 'bottom: 0; left: 20%; right: 20%; height: 3px;'
          }
        }

        .settings-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #4f46e5 !important;
          font-weight: 600 !important;
        }

        .settings-tabs .ant-tabs-ink-bar {
          display: none !important;
        }

        .modern-settings-form .ant-form-item-label label {
          font-weight: 500;
          color: #475569;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
