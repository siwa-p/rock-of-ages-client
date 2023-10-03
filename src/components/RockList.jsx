import { useEffect } from "react"

export const RockList = ({ rocks, fetchRocks, showAll }) => {
    useEffect(() => {
        fetchRocks(showAll)
    }, [showAll])

    const deleteRock = async (id) => {
        const request = await fetch(`http://localhost:8000/rocks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        const success = await request.status

        if (success) {
            fetchRocks(showAll)
        }
    }

    const showActions = (id) => {
        if (!showAll) {
            return <div>
                <button className="rounded-sm text-xs border-red-700
                                   border-solid border pt-1 pb-1 pl-3
                                   hover:bg-rose-600 pr-4 mt-4 bg-rose-900
                                   text-white"
                    onClick={() => deleteRock(id)}
                >Delete</button>
            </div>
        }
    }

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`}
                className="border p-5 border-solid
                           rounded-md border-violet-900 mt-5 bg-slate-50">
                <div>{rock.name} ({rock.type.label})</div>
                <div>In the collection of {rock.user.first_name} {rock.user.last_name}</div>
                {showActions(rock.id)}
            </div>)
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
