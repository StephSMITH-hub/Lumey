"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};
function ReactSwagger({ spec }: Props) {
  return <div></div>;
  //  <SwaggerUI spec={spec} />;
}
export default ReactSwagger;
