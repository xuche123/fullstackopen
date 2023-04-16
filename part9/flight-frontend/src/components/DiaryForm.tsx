import React, { useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"

interface DiaryFormProps {
    handleSubmit: (object: NewDiaryEntry) => void;
}

const DiaryForm = ({ handleSubmit }: DiaryFormProps) => {

    const [visibility, setVisibility] = useState<Visibility | null>(null)
    const [weather, setWeather] = useState<Weather | null>(null)
    const [comment, setComment] = useState<string>("")
    const [date, setDate] = useState<string>("")

    const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (visibility === null || weather === null || date === "" || comment === "") {
            alert("Please select all the options")
            return
        }

        handleSubmit({
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        })

        setVisibility(null)
        setWeather(null)
        setComment("")
        setDate("")
    }

    return (
        <form onSubmit={addDiary}>
            <input type="date" value={date} onChange={({target})=> setDate(target.value)} />
            <div>
                {Object.values(Visibility).map((v) => (
                    <span key={v}>
                        <input checked={visibility === v} name="visibility" type="radio" value={v} onChange={()=> setVisibility(v)} />
                        {v}
                    </span>
                ))}
            </div>
            
            <div>
                {Object.values(Weather).map((w) => (
                    <span key={w}>
                        <input checked={weather === w} name="weather" type="radio" value={w} onChange={()=>setWeather(w)} />
                        {w}
                    </span>
                ))}
            </div>
            <div>
                comment: <input value={comment} onChange={({target})=>setComment(target.value)} />
            </div>

            <button type="submit">add</button>
        </form>
    )
}


export default DiaryForm