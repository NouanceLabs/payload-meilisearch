import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useConfig } from "payload/components/utilities";
import { useAuth } from "payload/components/utilities";
import { DefaultTemplate } from "payload/components/templates";
import { Button, Eyebrow, Gutter } from "payload/components/elements";
import { AdminView } from "payload/config";
import { useStepNav } from "payload/components/hooks";
import { Meta } from "payload/components/utilities";

const ManageMeilisearch: AdminView = ({ user, canAccessAdmin }) => {
  const {
    routes: { admin: adminRoute },
    collections,
    plugins,
  } = useConfig();
  const { setStepNav } = useStepNav();

  useEffect(() => {
    setStepNav([
      {
        label: "Meilisearch",
      },
    ]);
  }, [setStepNav]);

  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  console.log("collections", collections);

  return (
    <DefaultTemplate>
      <Meta title="Manage Meilisearch" />
      <Eyebrow />
      <Gutter className="gutter-left gutter-right">
        <h1>Manage Meilisearch</h1>
        <p>
          Here is a custom route that was added in the Payload config. It uses
          the Default Template, so the sidebar is rendered.
        </p>
      </Gutter>
    </DefaultTemplate>
  );
};

export default ManageMeilisearch;
