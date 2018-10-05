import React from "react";
import Genres from "./Genres";
import CallApi from "../../api/api";
// import { API_URL, API_KEY_3 } from "../../api/api";

export default class GenresContainer extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            genreList: []
        };
    }

    getGenres = () => {
        // const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        // fetch(link)
        //     .then(response => {
        //         return response.json();
        //     })

        CallApi.get('/genre/movie/list', {
            params: {
                language: 'ru-RU'
            }
        })
            .then(data => {
                this.setState({
                    genreList: data.genres
                })
            })
    };

    componentDidMount() {
        this.getGenres()
    }

    render() {
        const { genreList } = this.state;
        const {genres, onChangeGenres} = this.props;
        return <Genres genreList={genreList} genres={genres} onChangeGenres={onChangeGenres}/>;
    }
}