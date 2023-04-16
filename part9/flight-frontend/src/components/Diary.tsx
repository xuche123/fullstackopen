import { DiaryEntry } from "../types"

interface DiaryProps {
    flight: DiaryEntry;
}

export const Diary = ({ flight }: DiaryProps) => {
    return (
        <div>
            <h3>{flight.date}</h3>
            <p>visibility: {flight.visibility}</p>
            <p>weather: {flight.weather}</p>
        </div>
    )
}