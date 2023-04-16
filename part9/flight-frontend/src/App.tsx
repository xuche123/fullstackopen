import { useState, useEffect } from "react"
import { type NewDiaryEntry, type DiaryEntry } from "./types"
import diaryService from "./services/diaries"
import { Diaries } from "./components/Diaries"
import DiaryForm from "./components/DiaryForm"

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        diaryService.getAll().then((entries) => {
            setDiaryEntries(entries)
        })
    }, [])

    const handleSubmit = (object: NewDiaryEntry) => {
        try {
            diaryService.create(object).then((returnedDiaryEntry) => {
                setDiaryEntries(diaryEntries.concat(returnedDiaryEntry))
            })
        } catch (e) {
            console.log(e)
        } 
    }

    return (
        <div className="App">
            <DiaryForm handleSubmit={handleSubmit} />
            <h2>Diary entries</h2>
            <Diaries flights={diaryEntries} />
        </div>
    )

}

export default App
