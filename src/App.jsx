import { useEffect, useState, useRef, useMemo } from "react"
import Note from "./components/Note"

export default function App() {

  //Express Backend URL
  const url = "http://localhost:3000/"

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [notes, setNotes] = useState([])

  const [click, setClick] = useState(false)

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
      fetchData() //adds the newly added notes in the task section
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

  const handleClick = async (e) => {
    setClick(!click)

  }

  return (
    <>
      <div className="wrapper w-screen min-h-screen p-4 bg-[#191919] border-white flex gap-4 relative">
        <form
          onSubmit={handleSubmit}
          className="form text-white bg-[#242424] rounded-[8px] p-4 w-1/2 flex flex-col gap-2">
          <input
            className="outline-none text-5xl font-bold p-2 placeholder:text-gray-500"
            onChange={(e) => setTitle(e.target.value)}
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
            name="description"
            id=""
            placeholder="Description"></textarea>
          <input
            type="submit"
            className="w-max px-4 py-2 border" />
        </form>
        <div className="tasks text-white flex flex-col w-full gap-4 p-4">
          <h1 className="w-max text-3xl font-bold">NOTES</h1>
          <div className="task flex flex-wrap gap-4">
            {
              notes.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="list-none">
                    <div
                      data-note_id={e._id}
                      onClick={handleClick}
                      className="task min-w-[300px] p-4 rounded-[8px] bg-[#242424] hover:bg-[#292929]">
                      <h1 className=" text-2xl leading-[24px] overflow-ellipsis overflow-hidden text-nowrap font-bold p-2">{e.title}</h1>
                      <p className="p-2 leading-[18px] w-full h-[250px] overflow-ellipsis overflow-hidden my-2 ">{e.description}</p>
                      <button className="px-3 py-2 border rounded-[50px]">read more</button>
                    </div>
                  </li>
                )
              })
            }
            {click && <Note />}

          </div>
        </div>
      </div>
    </>
  )
}