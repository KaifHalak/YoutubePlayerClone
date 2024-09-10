import { ButtonHTMLAttributes } from "react"
import { cn } from "../libs/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  img: `/NavBar${string}`
  alt: string
}

export default function NavbarButton({
  img,
  alt,
  className,
  ...props
}: ButtonProps) {
  const defaultClass =
    "item-center flex w-10 justify-center rounded-full bg-transparent p-2 hover:bg-[#2A2A2A]"

  return (
    <button {...props} className={cn(defaultClass, className)}>
      <img src={img} alt={alt} />
    </button>
  )
}
