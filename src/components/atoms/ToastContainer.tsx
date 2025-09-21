import { lazy, Suspense } from "react";

const Toaster = lazy(() =>
  import("react-hot-toast").then((mod) => ({ default: mod.Toaster })),
);

export const ToastProvider = () => (
  <Suspense fallback={null}>
    <Toaster />
  </Suspense>
);
