import { Form, Input, message, Modal, Select } from "antd";
import { FC } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import { regions } from "../../../../constants";

interface DistrictCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const DistrictCreateModal: FC<DistrictCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { createLoading, addRegion } = useRegion();

  const forms = [
    {
      label: "Регион проживания",
      name: "regionId",
      required: true,
      message: "Выберите регион",
      child: (
        <Select
          showSearch
          allowClear
          // loading={createLoading}
          // disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            regions &&
            regions?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })
          }
        />
      ),
    },
    {
      label: "Имя ( RU )",
      name: "regionNameRU",
      required: true,
      message: "Заполните",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("diNameRU", e.target.value)}
        />
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

export default DistrictCreateModal;
