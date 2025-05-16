import { useEffect } from "react"

export const RockList = ({ rocks, fetchRocks, showAll }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(() => {
    fetchRocks(showAll)
  }, [showAll])

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid
                           rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <div>
            {rock.name} ({rock.type.label})
          </div>
          <div>
            In the collection of {rock.user.first_name} {rock.user.last_name}
          </div>
          {showAll ? (
            ""
          ) : (
            <div>
              <button
                onClick={async () => {
                  const response = await fetch(`${apiUrl}/rocks/${rock.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Token ${
                        JSON.parse(localStorage.getItem("rock_token")).token
                      }`,
                    },
                  })

                  if (response.status === 204) {
                    fetchRocks(showAll)
                  }
                }}
                className="border border-solid bg-red-700 text-white p-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))
    }

    return <h3>Loading Rocks...</h3>
  }

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  )
}
