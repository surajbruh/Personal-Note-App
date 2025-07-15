import { useState } from "react"

const Note = ({ noteTitle, noteDescription }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return (
        <form
            // onSubmit={handleSubmit}
            className="note form text-white bg-[#242424] rounded-[8px] p-4 w-1/2 flex flex-col gap-2">
            <input
                className="outline-none text-3xl font-bold p-2 placeholder:text-gray-500"
                onChange={(e) => setTitle(e.target.value)}
                value={noteTitle}
                name="title"
                type="text"
                placeholder="Title" />
            <textarea
                className="outline-none p-2 placeholder:text-gray-500 resize-none overflow-y-hidden"
                onChange={(e) => {
                    setDescription(e.target.value)
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                }}
                value={noteDescription}
                name="description"
                id=""
                placeholder="Description"></textarea>
            {/* <input
                type="submit"
                className="w-max px-4 py-2 border" /> */}
        </form>
    )
}

export default Note
