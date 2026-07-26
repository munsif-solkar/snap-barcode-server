import * as React from "react"
import { cn } from "@/lib/utils"

export interface PillToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const PillToggle = React.forwardRef<HTMLInputElement, PillToggleProps>(
  (
    {
      className,
      label,
      checked,
      onCheckedChange,
      title,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <label
        title={title}
        className={cn(
          "flex items-center gap-2 cursor-pointer px-3 py-2 rounded-full border transition-colors select-none",
          checked
            ? "border-[#4E8D9C] bg-[#4E8D9C]/10"
            : "border-gray-400 bg-white hover:bg-gray-50 text-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          className="hidden"
          ref={ref}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange(e.target.checked)}
          {...props}
        />

        {/* Status Dot */}
        <span
          className={cn(
            "w-3 h-3 rounded-full border transition-colors inline-block shrink-0",
            checked
              ? "bg-[#4E8D9C] border-[#4E8D9C]"
              : "bg-white border-gray-400"
          )}
        />

        <span className="text-sm font-medium">
          {label}
        </span>
      </label>
    )
  }
)

PillToggle.displayName = "PillToggle"