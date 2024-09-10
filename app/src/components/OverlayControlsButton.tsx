import { ButtonHTMLAttributes } from "react"
import { cn } from "../libs/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  img: `/VideoPlayer${string}`,
  alt: string
}

const ICON_SIZE = "size-12"

export default function OverlayControlsButton({
  img,
  alt,
  className,
  ...props
}: ButtonProps) {
  return <button {...props} className={cn(ICON_SIZE, className)}>
    <img src={img} alt={alt} />
  </button>
}
