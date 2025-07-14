import { useEffect, useState, useRef, useMemo } from "react"

export default function App() {

  //Express Backend URL
  const url = "http://localhost:3000/"

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [notes, setNotes] = useState([])

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

  return (
    <>
      <div className="wrapper w-screen h-screen bg-zinc-800 border-white">
        <form
          onSubmit={handleSubmit}
          className="text-white p-4 flex flex-col border">
          <input
            className="outline-none"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            placeholder="Title" />
          <textarea
            className="outline-none resize-none"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id=""
            placeholder="Description"></textarea>
          <input
            type="submit"
            className="w-max border px-4 py-2" />
        </form>
        <div className="tasks text-white p-4 flex flex-wrap gap-4">
          {
            notes.map((e, i) => {
              return (
                <li
                  key={i}
                  className="list-none">
                  <div className="task border min-w-[300px] p-2">
                    <h1 className="text-xl">{e.title}</h1>
                    <p>{e.description}</p>
                  </div>
                </li>
              )
            })
          }
        </div>
      </div>
    </>
  )
}