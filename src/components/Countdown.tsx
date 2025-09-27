"use client";
import { useEffect, useState } from "react";

export function Countdown() {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const startCountdown = () => {
            let endTime = localStorage.getItem("countdownEndTime");

            if (!endTime) {
                endTime = (Date.now() + 20 * 60 * 1000).toString(); // 20 minutes from now
                localStorage.setItem("countdownEndTime", endTime);
            }

            return parseInt(endTime);
        };

        let endTime = startCountdown();

        const interval = setInterval(() => {
            const remaining = endTime - Date.now();

            if (remaining <= 0) {
                // Countdown finished → restart
                endTime = Date.now() + 20 * 60 * 1000; // 20 minutes again
                localStorage.setItem("countdownEndTime", endTime.toString());
                setTimeLeft(20 * 60);
            } else {
                setTimeLeft(Math.floor(remaining / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <span>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
        </span>
    );
}
