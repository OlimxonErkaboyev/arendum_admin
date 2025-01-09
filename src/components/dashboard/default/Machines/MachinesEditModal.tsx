import { Form, Input, message, Modal, Spin } from "antd";
import { FC, useEffect } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import { showErrors } from "../../../../errorHandler/errors";

interface MachinesEditModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const MachinesEditModal: FC<MachinesEditModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const {
    getDetail,
    getRegions,
    update,
    detail,
    updateLoading,
    detailLoading,
  } = useRegion();

  const [form] = Form.useForm();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        regionNameRU: detail?.regionNameRU,
        regionNameUZ: detail?.regionNameUZ,
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      update(id, values).then((res) => {
        if (!res) {
          getRegions({ pageNumber: 1, pageSize: 20 });
          message.success({ content: "Обновлено успешно" });
          onCancel();
        } else {
          showErrors(res);
        }
      });
    });
  };

  const forms = [
    {
      label: "Имя ( RU )",
      name: "regionNameRU",
      required: true,
      message: "Заполните",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("regionNameRU", e.target.value)}
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
    <>
      <Modal
        title={`${detail?.regionNameRU}`}
        open={open}
        okText="Сохранить"
        onOk={() => {
          form.submit();
          onSave;
        }}
        confirmLoading={updateLoading}
        okButtonProps={{ disabled: updateLoading }}
        cancelText="Закрыть"
        onCancel={onCancel}
        width={1000}
        centered
      >
        {detailLoading ? (
          <Spin />
        ) : (
          <Form form={form} labelCol={{ span: 2 }} onFinish={onSave}>
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
        )}
      </Modal>
    </>
  );
};

export default MachinesEditModal;
