import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

const   RangePicker = ({
  className,
  min = 18,
  max = 100,
  step = 1,
  defaultValue = [18, 28],
  value,
  onValueChange,
  label = "Age",
}) => {
  const [range, setRange] = React.useState(defaultValue)

  const handleValueChange = (newValue) => {
    const newRange = [newValue[0], newValue[1]]
    setRange(newRange)
    onValueChange?.(newRange)
  }

  return (
    <div className={cn("w-full max-w-sm space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {label}: {value?.[0] || range[0]}yr - {value?.[1] || range[1]}yr
        </label>
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value || range}
        onValueChange={handleValueChange}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-primary/50 bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-primary/50 bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderPrimitive.Root>
    </div>
  )
}

export default RangePicker