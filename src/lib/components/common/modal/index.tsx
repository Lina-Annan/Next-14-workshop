import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren, useEffect } from "react";

import ModalHeader, { ModalHeaderProps } from "./modal-header";
import { cn } from "@/lib/functions/cn";

export type ModalVariants = "regular" | "delete" | "custom" | "max";

type BaseModalProps = Omit<ModalHeaderProps, "onClose"> & {
  isOpen: boolean;
  className?: string;
  headerChildren?: React.ReactNode;
  headerClassName?: string;
  footer?: React.ReactNode;
  variant?: ModalVariants;
  hasDivider?: boolean;
  childrenClassName?: string;
  onModalChange?: (isOpen: boolean) => void;
  onModalClose?: () => void;
  isLoading?: boolean;
};

type ModalProps = BaseModalProps &
  // If custom confirm component is provided, onConfirm should not be provided
  (| { footer?: React.ReactNode; onConfirm?: never }
    | { footer?: never; onConfirm?: () => void }
  ) &
  // If header size is large, children and headerChildren should not be provided
  ({ size?: "large"; headerChildren?: never } | { size?: "small" });

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  title,
  isOpen,
  icon,
  children,
  className,
  headerChildren,
  headerClassName,
  childrenClassName,
  size,
  variant = "regular",
  isLoading,
  onModalClose,
  onModalChange,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-dnd-disabled", "true");

      return () => {
        document.body.removeAttribute("data-dnd-disabled");
      };
    }
  }, [isOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        onModalChange?.(open);
        if (!open && !isLoading) {
          onModalClose?.();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0 z-40"
          id="overlay"
          style={{ pointerEvents: "auto" }}
        />

        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Content
            className={cn(
              "max-h-[85vh] w-[90vw] max-w-[650px] rounded-xl bg-white focus shadow-lg z-50",
              { "max-w-[1000px] overflow-auto": variant === "max" },
              className
            )}
          >
            <ModalHeader
              title={title}
              icon={icon}
              size={size}
              className={headerClassName}
              onClose={() => {
                if (!isLoading) {
                  onModalClose?.();
                }
              }}
            >
              {headerChildren}
            </ModalHeader>
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn({ "p-5": !!children }, childrenClassName)}
            >
              {children}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
