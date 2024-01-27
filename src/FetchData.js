import { useEffect, useState } from "react";
import './FetchData.css';

const FetchData = () => {

    const [initialState, setInitialState] = useState({
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
                setInitialState({ ...initialState }, initialState.data = data);
                setInitialState({ ...initialState }, initialState.loading = false);
                setInitialState({ ...initialState }, initialState.error = false);
                console.log(initialState)
            })
            .catch(err => {
                console.log('Error: ', err);
                setInitialState({ ...initialState }, initialState.error = true);
            })
    }

    useEffect(() => {
        setTimeout(() => fetchData(), 3000)

    }, []);


    return (
        <div>
            {initialState.loading
                ? 'loading ...'
                :
                <div className="card">
                    <h1>{initialState.data.listName}</h1>
                    <div>{initialState.data.movies.map((el) =>
                        <div id="card-el" key={el.id}>
                            <h4>{el.title}</h4>
                            <div>id: {el.id}</div>
                        </div>)
                    }</div>
                </div>
            }
            {initialState.error ? 'Łoj! Coś się zepsuło.' : ''}
        </div>
    )
}

export default FetchData;