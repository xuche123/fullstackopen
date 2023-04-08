import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const navigate = useNavigate()

    const contentField = useField('text')
    const authorField = useField('text')
    const infoField = useField('text')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        props.addNew({
            content: contentField.value,
            author: authorField.value,
            info: infoField.value,
            votes: 0
        })
        navigate('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...contentField} />
                </div>
                <div>
                    author
                    <input {...authorField} />
                </div>
                <div>
                    url for more info
                    <input {...infoField} />
                </div>
                <button>create</button>
            </form>
        </div>
    )

}

export default CreateNew