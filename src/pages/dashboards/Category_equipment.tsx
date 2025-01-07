import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import Category_equipmentCreateModal from "../../components/dashboard/default/Category_equipment/Category_equipmentCreateModal";
import Category_equipmentTable from "./../../components/dashboard/default/Category_equipment/Category_equipmentTable";

const Category_equipment = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Категории техники</title>
          </Helmet>
          <PageHeader
            title="Категории техники"
            extra={
              <MainButton
                buttonText="Создать техники"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <Category_equipmentTable />
      </div>
      <Category_equipmentCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default Category_equipment;
