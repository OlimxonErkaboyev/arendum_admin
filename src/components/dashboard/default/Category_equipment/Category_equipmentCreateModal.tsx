/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { FC, useState } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import { UploadOutlined } from "@ant-design/icons";

interface Category_equipmentCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const Category_equipmentCreateModal: FC<Category_equipmentCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = (values: any) => {
    console.log("Name:", values.name);
    if (fileList.length > 0) {
      console.log("Image:", fileList[0].name);
    }
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);
  const { createLoading, addRegion } = useRegion();

  return (
    <Modal
      title="Создать техники"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          addRegion(values)
            .then((newRegion) => {
              message.success({
                content: `Успешно создано: ${newRegion.id}`,
              });
              onSuccessFields && onSuccessFields();
              form.resetFields();
            })
            .catch((error) => {
              message.error("Ошибка создания региона");
              console.error(error);
            });
        });
      }}
      okText="Сохранить"
      okButtonProps={{ loading: createLoading, disabled: createLoading }}
      cancelText="Закрыть"
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      centered
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="nameRu"
          label="Name(RU)"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nameUz"
          label="Name(UZ)"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Category_equipmentCreateModal;
