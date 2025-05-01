declare module "react-bubble-ui" {
  import React from "react";

  interface BubbleUIProps {
    options: Record<string, any>;
    className?: string;
    children?: React.ReactNode;
  }

  const BubbleUI: React.FC<BubbleUIProps>;
  export default BubbleUI;
}
