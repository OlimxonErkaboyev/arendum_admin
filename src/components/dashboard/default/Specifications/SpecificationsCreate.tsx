import { Card, Col, Typography } from "antd";
import React from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { categories } from "../../../../constants";

const { Option } = Select;

// interface Parameter {
//   name: string;
//   unit: string;
//   value: string;
// }

const SpecificationsCreate: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "20px" }}>
        <Typography.Title>Добавление параметров спецтехнтки</Typography.Title>
        <Typography.Text>Добавление новый параметр спецтехнтки</Typography.Text>
      </Col>
      <Card>
        <Typography.Title level={2} style={{ marginTop: 0, color: "#3C8CDC" }}>
          Заполите данные
        </Typography.Title>

        <Form onFinish={onFinish} form={form} layout="vertical">
          <Space style={{ flexWrap: "wrap" }}>
            <Form.Item
              label="Название параметра"
              name="name"
              rules={[
                { required: true, message: "Введите название параметра" },
              ]}
            >
              <Input
                style={{ width: "300px" }}
                placeholder="Название параметра"
              />
            </Form.Item>
            <Form.Item
              label="Единицы измерения"
              name="unit"
              rules={[
                { required: true, message: "Выберите единицу измерения" },
              ]}
            >
              <Select
                style={{ width: "200px" }}
                placeholder="Единицы измерения"
                allowClear
              >
                <Option value="кг">кг</Option>
                <Option value="т">т</Option>
                <Option value="м">м</Option>
                <Option value="км">км</Option>
                <Option value="Эсть">Эсть</Option>
                <Option value="Нет">Нет</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.List name="parameters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "param"]}
                      rules={[{ required: true, message: "Введите значение" }]}
                    >
                      <Input placeholder="Значение" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "summa"]}
                      rules={[{ required: true, message: "Введите сумма" }]}
                    >
                      <Input placeholder="Сумма" type="number" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Добавить ещё
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Связать со следующими категориями"
            rules={[{ required: true, message: "Введите выберите категорию" }]}
            name="category"
          >
            <Select
              style={{ width: 200 }}
              placeholder="Выберите категорию"
              allowClear
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SpecificationsCreate;
