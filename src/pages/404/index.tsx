import { FC, ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Custom404: NextPageWithLayout = () => {
  return <h1>404 - Page Not Found</h1>;
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Custom404;
