import { useEffect, useState } from "react"
import Note from "./components/Note"
import { ToastContainer } from "react-toastify"
import { notifyNew, notifyErr } from "./utilities/toast"

export default function App() {

  //Express Backend URL
  const url = "http://localhost:3000/"

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [notes, setNotes] = useState([])

  const [click, setClick] = useState(false)

  const [selectedNote, setSelectedNote] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = {
      title,
      description
    }

    //sending post request from frontend using fetch API
    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const res = await data.json()
      console.log(res)
      res.message === "success" ? notifyNew() : notifyErr()
      fetchData() //adds the newly added notes in the task section
      e.target.querySelector('input').value = ""
      e.target.querySelector('textarea').value = ""

    } catch (err) {
      console.error(err)
    }
  }

  const fetchData = async () => {
    try {
      const data = await fetch(url)
      const res = await data.json()
      console.log(res)
      setNotes(res)
      return res

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()

  }, [])

  const handleClick = async (note) => {
    setSelectedNote(note)
    setClick(!click)
  }

  return (
    <>
      <div className="wrapper w-screen min-h-screen h-screen bg-[var(--bg-color)] relative border-white p-4 flex">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <form
          onSubmit={handleSubmit}
          className="border p-4 form text-[var(--text)] bg-[var(--color-1)] flex flex-col gap-2 w-1/3 h-full relative">
          <input
            className="outline-none text-(length:--text-size1) font-bold p-2 placeholder:text-gray-500"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            placeholder="Title" />
          <textarea
            className="h-full outline-none p-2 placeholder:text-gray-500 resize-none overflow-y-hidden text-(length:--text-size4)"
            onChange={(e) => {
              setDescription(e.target.value)
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            name="description"
            id=""
            placeholder="Description"></textarea>
          <input
            type="submit"
            className="w-max px-4 py-2 border absolute right-0 top-0 m-4" />
        </form>
        <div className="tasks mx-4 text-[var(--text)] flex flex-col w-full gap-4 p-4">
          <h1 className="w-max text-(length:--text-size2) font-bold">NOTES</h1>
          <div className="task flex flex-col gap-2 p-2 min-w-[300px] w-1/3">
            {
              notes.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="list-none">
                    <div
                      data-note_id={e._id}
                      onClick={() => handleClick(e)}
                      className="task bg-[var(--color-1)] p-4 flex justify-between items-center">
                      <span className=" text-(length:--text-size3) leading-[24px] overflow-ellipsis overflow-hidden text-nowrap font-bold">{e.title}</span>
                      <span>date</span>
                    </div>
                  </li>
                )
              })
            }
            {click && <Note note={selectedNote} />}

          </div>
        </div>
      </div>
    </>
  )
}