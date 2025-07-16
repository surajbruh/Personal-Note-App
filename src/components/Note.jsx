import { useRef, useState } from "react"

export default function Note({ note }) {

    const url = "http://localhost:3000/"

    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)

    const [edit, setEdit] = useState(false)

    const inputRef = useRef(null)
    const descriptionRef = useRef(null)

    const handleClick = (e) => {
        // e.preventDefault()
        setEdit(!edit)
        console.log(e)
        console.log(note._id)
        inputRef.current.removeAttribute('disabled')
        descriptionRef.current.removeAttribute('disabled')
    }

    const handleSubmit = async (e) => {
        const newForm = {
            id: note._id,
            title: title,
            description: description
        }
        console.log(newForm)

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: note._id,
                    title: title,
                    description: description
                })
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const removeItem = async (e) => {
        console.log(note._id)

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: note._id,
                })
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            action=""
            className="note-details fixed top-4 right-4 w-[400px] p-4 bg-white text-black rounded-lg shadow-xl">
            <input
                ref={inputRef}
                disabled
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold mb-2"
                value={title}
                type="text" />
            <textarea
                ref={descriptionRef}
                disabled
                onChange={(e) => setDescription(e.target.value)}
                className="text-md"
                name=""
                value={description}
                id=""></textarea>
            <input
                className="w-max px-4 py-2 border"
                value="edit"
                type="button"
                onClick={handleClick} />
            {
                edit &&
                <input
                    type="submit"
                    className="w-max px-4 py-2 border" />
            }
            {
                <button
                    onClick={removeItem}
                    className="w-max px-4 py-2 border">Delete</button>
            }
        </form>
    )
}
