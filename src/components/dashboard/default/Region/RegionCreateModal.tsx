import { Form, Input, message, Modal } from "antd";
import { FC } from "react";
import useRegion from "../../../../hooks/region/useRegion";

interface RegionCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const RegionCreateModal: FC<RegionCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { createLoading, create, getRegions } = useRegion();

  const forms = [
    {
      label: "Имя ( RU )",
      name: "name",
      required: true,
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("name", e.target.value)} />
      ),
    },
    {
      label: "Имя ( UZ )",
      name: "regionNameUZ",
      required: true,
      message: "Заполните",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("regionNameUZ", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Создать регион"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          create(values)
            .then((newRegion) => {
              message.success({
                content: `Успешно создано: ${newRegion.name}`,
              });
              onSuccessFields && onSuccessFields();
              form.resetFields();
              getRegions({ page: 1, limit: 10 });
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
      <Form form={form} layout="vertical">
        {forms.map((item, idx) => (
          <Form.Item
            key={idx}
            label={item.label}
            name={item.name}
            rules={[{ required: item.required, message: item.message }]}
          >
            {item.child}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default RegionCreateModal;
