import React, { useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"

interface DiaryFormProps {
    handleSubmit: (object: NewDiaryEntry) => void;
}

const DiaryForm = ({ handleSubmit }: DiaryFormProps) => {
    
    const [diary, setDiary] = useState<NewDiaryEntry>({
        date: "",
        visibility: Visibility.Great,
        weather: Weather.Sunny,
        comment: ""
    })

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiary({ ...diary, date: event.target.value })
    }

    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiary({ ...diary, visibility: event.target.value as Visibility })
    }

    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiary({ ...diary, weather: event.target.value as Weather})
    }

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiary({ ...diary, comment: event.target.value })
    }

    const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        handleSubmit({
            date: diary.date,
            visibility: diary.visibility as Visibility,
            weather: diary.weather as Weather,
            comment: diary.comment
        })
        setDiary({
            date: "",
            visibility: Visibility.Great,
            weather: Weather.Sunny,
            comment:""
        })
    }

    return (
        <form onSubmit={addDiary}>
            <input type="date" value={diary.date} onChange={handleDateChange} />
            <div>
                <input name="visibility" type="radio" value={Visibility.Great} onChange={handleVisibilityChange} /> great
                <input name="visibility" type="radio" value={Visibility.Good} onChange={handleVisibilityChange} /> good
                <input name="visibility" type="radio" value={Visibility.Ok} onChange={handleVisibilityChange} /> ok
                <input name="visibility" type="radio" value={Visibility.Poor} onChange={handleVisibilityChange} /> poor
            </div>
            
            <div>
                <input name="weather" type="radio" value={Weather.Sunny} onChange={handleWeatherChange} /> sunny
                <input name="weather" type="radio" value={Weather.Rainy} onChange={handleWeatherChange} /> rainy
                <input name="weather" type="radio" value={Weather.Cloudy} onChange={handleWeatherChange} /> cloudy
                <input name="weather" type="radio" value={Weather.Stormy} onChange={handleWeatherChange} /> stormy
                <input name="weather" type="radio" value={Weather.Windy} onChange={handleWeatherChange} /> windy
            </div>
            <div>
                comment: <input value={diary.comment} onChange={handleCommentChange} />
            </div>

            <button type="submit">add</button>
        </form>
    )
}


export default DiaryForm