import { DiaryEntry } from "../types"
import  { Diary } from "./Diary"

interface DiariesProps {
    flights: DiaryEntry[];
}

export const Diaries = ({ flights }: DiariesProps) => {
    return (
        <div>
            {flights.map((flight) => (
                <Diary key={flight.id} flight={flight} />
            ))}
        </div>
    )
}
