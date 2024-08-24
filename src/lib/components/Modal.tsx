"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

import { cn } from "$/lib/functions/cn";

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
  );

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  title,
  isOpen,
  icon,
  children,
  className,
  headerChildren,
  headerClassName,
  childrenClassName,
  variant = "regular",
  isLoading,
  onModalClose,
  onModalChange,
}) => {
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

type ModalHeaderProps = {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  onClose: () => void;
};
function ModalHeader({
  title,
  icon,
  children,
  className,
  onClose,
}: PropsWithChildren<ModalHeaderProps>) {
  return (
    <div className="flex items-center justify-between py-6 px-4 border-b border-b-white-active relative">
      <div className="flex flex-row items-center gap-2">
        {icon && (
          <div className="flex items-center justify-center p-2 bg-green-200 rounded">
            <div className="absolute flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}

        <div className={cn("flex flex-row items-center gap-2", className)}>
          <p className="text-center text-lg font-semibold text-primary-dark">
            {title}
          </p>
          {children}
        </div>
      </div>

      <button
        aria-label="Close"
        className={
          "p-1 h-10 w-10 hover:bg-green-300 bg-green-200 rounded-full transition-colors duration-200 ease-in-out font-extrabold text-green-800 hover:text-white"
        }
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
}

export default Modal;
