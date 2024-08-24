import { cn } from "@/lib/functions/cn";
import { PropsWithChildren, ReactNode } from "react";

export type ModalHeaderSize = "small" | "large";

export interface ModalHeaderProps {
  title: string;
  icon?: ReactNode;
  size?: ModalHeaderSize;
  className?: string;

  onClose: () => void;
}

const ModalHeader: React.FC<PropsWithChildren<ModalHeaderProps>> = ({
  title,
  icon,
  size = "small",
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-6 px-4 border-b border-b-white-active relative",
        { "items-start justify-center p-10": size === "large" }
      )}
    >
      <div
        className={cn("flex flex-row items-center gap-2", {
          "flex-col justify-center items-center gap-10": size === "large",
        })}
      >
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center p-2 bg-green-200 rounded",
              {
                "p-4 rounded-3xl": size === "large",
              }
            )}
          >
            {size === "large" ? (
              <div className="absolute flex items-center justify-center">
                {icon}
              </div>
            ) : (
              icon
            )}
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
};

export default ModalHeader;
