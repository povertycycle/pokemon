import React from "react";

export const PokeDollars: React.FC<{ color?: string, size?: number }> = ({ color, size }) => {
    return (
        <svg width={size ?? 16} height={(size ?? 16) * 5 / 4} viewBox="0 0 40 50"><path fill={color ?? "#000000"} d="M0 33v-5h10V0h14l7 1 6 3c2 2 3 4 3 7 1 4-2 8-6 10l-6 2-4 1h-6v4h12v5H18v5h12v4H18v8h-8v-7H0v-5h10v-5H0Zm25-15h4l3-2 1-4c0-2-1-4-3-5l-5-2h-7v13h7Z" /></svg>
    )
}