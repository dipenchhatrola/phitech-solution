import { useState, useEffect } from "react";
import { Form, Input, Button, message, Card } from "antd";
import api from "../../utils/api";

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

  if (fetching) return <div className="p-8 text-center">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Site Settings</h1>
          <p className="text-slate-500">Manage social links, contact info, and site details</p>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{ facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "", mobileNumber: "", contactNumber: "", whatsappNumber: "", email: "", address: "" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="space-y-4 border-r border-slate-100 pr-0 md:pr-8">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Contact Information</h2>
              
              <Form.Item name="email" label="Email Address">
                <Input placeholder="e.g. info@example.com" />
              </Form.Item>
              
              <Form.Item name="mobileNumber" label="Mobile Number">
                <Input placeholder="e.g. +91 9876543210" />
              </Form.Item>

              <Form.Item name="contactNumber" label="Landline/Contact Number">
                <Input placeholder="e.g. 022-12345678" />
              </Form.Item>

              <Form.Item name="whatsappNumber" label="WhatsApp Number">
                <Input placeholder="e.g. +91 9876543210" />
              </Form.Item>

              <Form.Item name="address" label="Physical Address">
                <Input.TextArea rows={3} placeholder="Full address" />
              </Form.Item>
            </div>

            <div className="space-y-4 pl-0 md:pl-8 mt-8 md:mt-0">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Social Media Links</h2>
              
              <Form.Item name="facebook" label="Facebook URL">
                <Input placeholder="https://facebook.com/..." />
              </Form.Item>

              <Form.Item name="instagram" label="Instagram URL">
                <Input placeholder="https://instagram.com/..." />
              </Form.Item>

              <Form.Item name="twitter" label="Twitter/X URL">
                <Input placeholder="https://twitter.com/..." />
              </Form.Item>

              <Form.Item name="linkedin" label="LinkedIn URL">
                <Input placeholder="https://linkedin.com/in/..." />
              </Form.Item>

              <Form.Item name="youtube" label="YouTube URL">
                <Input placeholder="https://youtube.com/..." />
              </Form.Item>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
            <Button type="primary" htmlType="submit" loading={loading} size="large" className="px-8">
              Save Settings
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
