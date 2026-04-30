// Type declarations for React Canary ViewTransition API
// ViewTransition is available in React Canary but not yet in stable type definitions

import "react";
import type { ReactNode, FC } from "react";

declare module "react" {
  // ViewTransition component for animating DOM changes
  export interface ViewTransitionProps {
    name?: string;
    children?: ReactNode;
    enter?: string | Record<string, string>;
    exit?: string | Record<string, string>;
    update?: string | Record<string, string>;
    share?: string | Record<string, string>;
    default?: string | Record<string, string>;
  }

  export const ViewTransition: FC<ViewTransitionProps>;
}
