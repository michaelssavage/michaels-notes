import {
  ClockContainer,
  Digits,
  Label,
  TimeUnit,
} from "@/components/Countdown/Countdown.styled";
import { Separator } from "@/components/Footer/Footer.styled";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownClockProps {
  targetDate: string | Date;
}

export const CountdownClock = ({ targetDate }: CountdownClockProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <ClockContainer>
      <TimeUnit>
        <Digits>{addLeadingZero(timeLeft.days)}</Digits>
        <Label>Days</Label>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <Digits>{addLeadingZero(timeLeft.hours)}</Digits>
        <Label>Hours</Label>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <Digits>{addLeadingZero(timeLeft.minutes)}</Digits>
        <Label>Minutes</Label>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <Digits>{addLeadingZero(timeLeft.seconds)}</Digits>
        <Label>Seconds</Label>
      </TimeUnit>
    </ClockContainer>
  );
};
