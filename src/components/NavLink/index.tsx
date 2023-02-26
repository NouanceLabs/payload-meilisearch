import React from "react";
import { Button } from "payload/components/elements";
import { useConfig } from "payload/components/utilities";
import "./index.scss";

const NavLink: React.FC = () => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();

  return (
    <Button
      el={"link"}
      className={`manage-button`}
      buttonStyle="secondary"
      to={`${adminRoute}/meilisearch`}
    >
      Manage Meilisearch
    </Button>
  );
};

export default NavLink;
