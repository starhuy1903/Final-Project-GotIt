import React from "react";
import { Button as AhaButton } from "@ahaui/react";

const Button = () => {
  return (
    <div>
      <AhaButton variant="primary">
        <AhaButton.label>Hello</AhaButton.label>
      </AhaButton>
    </div>
  );
};

export default Button;
