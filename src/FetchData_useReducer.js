import { useReducer, useEffect } from "react";

const FetchData_useReducer = () => {

    const [state, dispatch] = useReducer(
        (state, action) => ({
            ...state,
            ...action
        })
        , {
            loading: true,
            data: {
                listName: '',
                movies: []
            },
            error: false
        });

    async function fetchData() {
        await fetch('http://localhost:3003/movies')
            .then(res => res.json())
            .then(data => {
                dispatch({ data: data });
                dispatch({ loading: false });
                dispatch({ error: false });
                console.log(state)
            })
            .catch(err => {
                console.log('Error: ', err);
                dispatch({ error: true });
            })
    }

    useEffect(() => {
        setTimeout(() => fetchData(), 2000);
    }, []);

    return (
        <div>
            {state.loading
                ? 'loading ...'
                :
                <div className="card">
                    <h1>{state.data.listName}</h1>
                    <div>{state.data.movies.map((el) =>
                        <div id="card-el" key={el.id}>
                            <h4>{el.title}</h4>
                            <div>id: {el.id}</div>
                        </div>)
                    }</div>
                </div>
            }
            {state.error ? 'Łoj! Coś się zepsuło.' : ''}
        </div>
    )

};

export default FetchData_useReducer;