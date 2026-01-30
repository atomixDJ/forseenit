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
 * Premium Radix Slider wrapper with gradient styling and glow effects.
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
        <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-white/60 uppercase tracking-widest">
                <span className="hover:text-white/80 transition-colors">{leftLabel}</span>
                <span className="hover:text-white/80 transition-colors">{rightLabel}</span>
            </div>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-6 group"
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                min={min}
                max={max}
                step={step}
            >
                <Slider.Track className="bg-white/10 relative grow rounded-full h-3 border border-white/5 overflow-hidden">
                    <Slider.Range className="absolute bg-gradient-to-r from-amber-500 to-orange-500 rounded-full h-full shadow-inner" />
                    {/* Glow effect under the filled range */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 blur-sm rounded-full"
                        style={{ width: `${value}%` }}
                    />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full 
                               shadow-lg shadow-amber-500/40 border-2 border-white/30
                               hover:scale-110 hover:shadow-xl hover:shadow-amber-500/50
                               focus:outline-none focus:ring-4 focus:ring-amber-400/30 
                               transition-all duration-200 cursor-grab active:cursor-grabbing active:scale-95
                               group-hover:shadow-xl"
                    aria-label={`${leftLabel} to ${rightLabel}`}
                />
            </Slider.Root>
        </div>
    );
}
