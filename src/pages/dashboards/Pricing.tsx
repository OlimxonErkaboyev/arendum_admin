import { FC, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { categories } from "../../constants";
const { Option } = Select;

const Pricing: FC = () => {
  const [form] = Form.useForm();
  const [calculationType, setCalculationType] = useState<string>("km");

  const onFinish = (values: unknown) => {
    console.log("Form values:", values);
  };

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "20px" }}>
        <Typography.Title>
          Добавление параметров ценообразования
        </Typography.Title>
        <Typography.Text>
          Добавление новый параметр ценообразования
        </Typography.Text>
      </Col>
      <Card>
        <Typography.Title level={2} style={{ marginTop: 0, color: "#3C8CDC" }}>
          Заполните данные
        </Typography.Title>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Укажите Название ценообразования"
            name="tariffName"
            rules={[
              { required: true, message: "Введите название ценообразования" },
            ]}
          >
            <Input placeholder="Название ценообразования" />
          </Form.Item>
          <Form.Item
            label="Укажите тип техники данного тарифа"
            name="machineId"
            rules={[{ required: true, message: "Выберите тип техники" }]}
          >
            <Select
              style={{ width: 200 }}
              showSearch
              allowClear
              placeholder="Выберите категорию"
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Тип расчета стоимости тарифа">
            <Radio.Group
              onChange={(e) => setCalculationType(e.target.value)}
              value={calculationType}
              optionType="button"
              buttonStyle="solid"
              style={{
                display: "flex",
              }}
            >
              <Radio.Button value="km">По километражу</Radio.Button>
              <Radio.Button value="hour">По часам</Radio.Button>
            </Radio.Group>
            <Space
              direction="vertical"
              style={{ marginTop: 15, width: "100%" }}
            >
              {calculationType === "km" && (
                <>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Базовая цена тарифа для аренды грузовиков и длинномеров. При
                    выборе тарифа, в форме заказа появляется поле второй точки
                    локации - место назначения груза.
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Стоимость 1
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="min_amount"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input type="number" placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">UZS</Button>
                    </Col>
                  </Row>
                </>
              )}

              {calculationType === "hour" && (
                <>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Является базовой расчетной ценой тарифа, также для расчета
                    часа работы сверхзаказа используется этот же показатель
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Стоимость 1
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="min_amount"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input type="number" placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">UZS</Button>
                    </Col>
                  </Row>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Указывается минимальное число часов для аренды техники,
                    которое, выводится на фронт умножая на расчетную цену часа
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Минимальное
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="min_waiting_time"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">ЧАС</Button>
                    </Col>
                  </Row>
                </>
              )}
            </Space>
          </Form.Item>
          <Form.List
            name="additionalParameters"
            initialValue={[
              {
                parameterName: "Бесплатные минуты ожидания",
                parameter: "",
                unit: "MIN",
              },
              {
                parameterName: "Стоимость минуты ожидания",
                parameter: "",
                unit: "UZS",
              },
              {
                parameterName: "Штрафной платеж",
                parameter: "",
                unit: "UZS",
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[16, 16]} key={key}>
                    {/* Parameter Name Input */}
                    <Col style={{ width: "250px" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "parameterName"]}
                        rules={[
                          { required: true, message: "Введите значение" },
                        ]}
                      >
                        <Input placeholder="Название параметра" />
                      </Form.Item>
                    </Col>

                    {/* Parameter Value Input */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, "parameter"]}
                        rules={[
                          { required: true, message: "Введите значение" },
                        ]}
                      >
                        <Input type="number" placeholder="Значение" />
                      </Form.Item>
                    </Col>

                    {/* Unit Selection */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, "unit"]}
                        rules={[{ required: true, message: "Введите единицу" }]}
                      >
                        <Select
                          placeholder="Ед.измерения"
                          style={{ width: "100%" }}
                        >
                          <Option value="MIN">МИН</Option>
                          <Option value="HOUR">ЧАС</Option>
                          <Option value="UZS">UZS</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Delete Button */}
                    <Col>
                      <Button onClick={() => remove(name)} danger>
                        <DeleteOutlined />
                      </Button>
                    </Col>
                  </Row>
                ))}
                {/* Add New Parameter Button */}
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

export default Pricing;
