import React from 'react';
import { Upload, message, Button } from 'antd';
import { InboxOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface ImageUploadBoxProps {
  fileList: any[];
  setFileList: (list: any[]) => void;
  maxCount?: number;
  multiple?: boolean;
}

export default function ImageUploadBox({ fileList, setFileList, maxCount = 1, multiple = false }: ImageUploadBoxProps) {
  
  const beforeUpload = (file: File) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
    }
    return false;
  };

  const handleChange = (info: any) => {
    const validFiles = info.fileList.filter((f: any) => {
      if (f.originFileObj) {
        return f.size / 1024 / 1024 < 10;
      }
      return true;
    });
    setFileList(validFiles);
  };

  const handleRemove = (file: any) => {
    setFileList(fileList.filter(f => f.uid !== file.uid));
  };

  return (
    <div className="w-full">
      {fileList.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {fileList.map((file, index) => {
            const src = file.url || file.thumbUrl || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : '');
            return (
              <div key={file.uid || index} className="relative group border border-slate-200 rounded p-2 bg-slate-50 w-full sm:w-auto flex justify-center">
                <img src={src} alt="Preview" className="h-32 object-contain rounded" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(file);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                >
                  <DeleteOutlined style={{ fontSize: '12px' }} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {fileList.length < maxCount && (
        <Dragger
          multiple={multiple}
          showUploadList={false}
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          className="bg-slate-50"
        >
          {fileList.length > 0 ? (
            <div className="py-4">
              <PlusOutlined className="text-2xl text-slate-400 mb-2" />
              <p className="text-slate-600 font-medium">Add More {maxCount > 1 ? 'Images' : 'Image'}</p>
            </div>
          ) : (
            <div className="py-8">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Click or drag {maxCount > 1 ? 'images' : 'image'} to upload</p>
              <p className="text-xs text-slate-500 mt-2">Maximum file size: 10MB</p>
            </div>
          )}
        </Dragger>
      )}
    </div>
  );
}
