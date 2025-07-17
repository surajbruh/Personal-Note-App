import { useRef, useState } from "react"

export default function Note({ note }) {

    const url = "http://localhost:3000/"

    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)

    const [edit, setEdit] = useState(false)

    const inputRef = useRef(null)
    const descriptionRef = useRef(null)

    const handleClick = (e) => {
        setEdit(!edit)
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
        <>
            <form
                onSubmit={handleSubmit}
                action=""
                className="border px-4 py-2 form text-[var(--text)] bg-[var(--color-1)] flex flex-col gap-2 w-1/4 min-h-[60%] m-4 absolute top-0 right-0">
                <input
                    ref={inputRef}
                    disabled
                    onChange={(e) => setTitle(e.target.value)}
                    className="outline-none text-(length:--text-size2) font-bold p-2"
                    value={title}
                    type="text" />
                <textarea
                    ref={descriptionRef}
                    disabled
                    onChange={(e) => {
                        setDescription(e.target.value)
                        e.target.style.height = "auto";
                        if (e.target.scrollHeight <= 500) {
                            e.target.style.height = e.target.scrollHeight + "px";

                        }
                    }}
                    className="min-h-[500px] outline-none p-2 placeholder:text-gray-500 resize-none text-(length:--text-size4)"
                    name=""
                    value={description}
                    id=""></textarea>
                <div className="flex text-(length:--text-size4) gap-2 absolute top-0 right-0 m-2">
                    <input
                        className="uppercase text-[12px] font-bold w-max px-4 py-2 border"
                        value="edit"
                        type="button"
                        onClick={handleClick} />
                    {
                        edit &&
                        <input
                            type="submit"
                            className="uppercase text-[12px] font-bold w-max px-4 py-2 border" />
                    }
                    {
                        <button
                            onClick={removeItem}
                            className="uppercase text-[12px] font-bold w-max px-4 py-2 border">Delete</button>
                    }

                </div>
            </form>
        </>
    )
}
