"use client";

import * as Slider from "@radix-ui/react-slider";

interface SliderInputProps {
    value: number;
    onChange: (value: number) => void;
    leftLabel: string;
    rightLabel: string;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * Radix Slider wrapper with left/right labels.
 * Keyboard accessible via Radix's built-in WAI-ARIA patterns.
 */
export default function SliderInput({
    value,
    onChange,
    leftLabel,
    rightLabel,
    min = 0,
    max = 100,
    step = 1
}: SliderInputProps) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-xs font-medium text-[#99aabb] uppercase tracking-wider">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                min={min}
                max={max}
                step={step}
            >
                <Slider.Track className="bg-[#1b2228] relative grow rounded-full h-2 border border-white/10">
                    <Slider.Range className="absolute bg-brand rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-full shadow-lg border-2 border-brand 
                               hover:bg-brand/10 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 
                               focus:ring-offset-[#14181c] transition-colors cursor-grab active:cursor-grabbing"
                    aria-label={`${leftLabel} to ${rightLabel}`}
                />
            </Slider.Root>
        </div>
    );
}
