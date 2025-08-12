import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation active:scale-95 select-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-slate-600 bg-slate-900 hover:bg-slate-800 hover:text-white",
        secondary:
          "bg-slate-600 text-white hover:bg-slate-700",
        ghost: "hover:bg-slate-800 hover:text-white active:bg-slate-700",
        link: "text-blue-400 underline-offset-4 hover:underline active:opacity-80",
        glass: "bg-slate-800/80 border border-white/10 text-white hover:bg-slate-700/80 hover:border-white/20 active:bg-slate-700/90 active:border-white/25",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30",
        success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-lg shadow-green-500/25",
        warning: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow-lg shadow-orange-500/25",
      },
      size: {
        default: "h-10 px-4 py-2 min-w-[40px]",
        sm: "h-9 rounded-md px-3 min-w-[36px]",
        lg: "h-11 rounded-md px-8 min-w-[44px]",
        xl: "h-12 rounded-lg px-10 text-base min-w-[48px]",
        icon: "h-10 w-10 min-w-[40px] min-h-[40px]",
        "icon-sm": "h-8 w-8 min-w-[32px] min-h-[32px]",
        "icon-lg": "h-12 w-12 min-w-[48px] min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        // Enhanced accessibility for touch devices
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
          ...props.style
        }}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
export { buttonVariants }