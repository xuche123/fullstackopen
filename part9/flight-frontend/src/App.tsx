import { useState, useEffect } from "react"
import { type DiaryEntry } from "./types"
import diaryService from "./services/diaries"
import { Diaries } from "./components/Diaries"

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        diaryService.getAll().then((entries) => {
            setDiaryEntries(entries)
        })
    }, [])

    return (
        <div className="App">
            <h2>Diary entries</h2>
            <Diaries flights={diaryEntries} />
        </div>
    )

}

export default App
