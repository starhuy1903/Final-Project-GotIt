import React from "react";
import { Button as AhaButton } from "@ahaui/react";

const Button = () => {
  return (
    <div>
      <AhaButton variant="accent">
        <AhaButton.Label>Hello</AhaButton.Label>
      </AhaButton>
    </div>
  );
};

export default Button;
