import Language from "./Language"

const Languages = ({ languages }) => {
    return (
        Object.keys(languages).map(key => {
            // console.log(typeof key)
            return <Language language={languages[key]} key={key} />
        })
    )
}

export default Languages