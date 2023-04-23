import { useEffect, useState } from "react";

export const Thinking = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count + 1) % 5);
        }, 200);
        return () => clearInterval(interval);
    })

    return (
        <div>
            🤖 Thinking {".".repeat(count)}
        </div>
    )
}