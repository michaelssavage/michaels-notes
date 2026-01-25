import { Drawer as VaulDrawer } from "vaul";

interface DrawerProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Drawer = ({
  title,
  description,
  isOpen,
  onOpenChange,
  children,
}: DrawerProps) => {
  return (
    <VaulDrawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 50,
          }}
        />
        <VaulDrawer.Content
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 51,
          }}
        >
          <VaulDrawer.Title className="visually-hidden">
            {title}
          </VaulDrawer.Title>
          <VaulDrawer.Description className="visually-hidden">
            {description}
          </VaulDrawer.Description>
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};
