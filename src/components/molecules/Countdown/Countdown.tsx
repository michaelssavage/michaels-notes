import { useEffect, useState } from "react";
import { ClockContainer, Separator, TimeUnit } from "./Countdown.styled";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface CountdownClockProps {
	targetDate: string | Date;
}

export const Countdown = ({ targetDate }: CountdownClockProps) => {
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
				<h3>{addLeadingZero(timeLeft.days)}</h3>
				<p>Days</p>
			</TimeUnit>
			<Separator>:</Separator>
			<TimeUnit>
				<h3>{addLeadingZero(timeLeft.hours)}</h3>
				<p>Hours</p>
			</TimeUnit>
			<Separator>:</Separator>
			<TimeUnit>
				<h3>{addLeadingZero(timeLeft.minutes)}</h3>
				<p>Minutes</p>
			</TimeUnit>
			<Separator>:</Separator>
			<TimeUnit>
				<h3>{addLeadingZero(timeLeft.seconds)}</h3>
				<p>Seconds</p>
			</TimeUnit>
		</ClockContainer>
	);
};
