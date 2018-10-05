import React from "react";
import CallApi from "../../api/api";

export default (Component) => class GenresHOC extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            genreList: []
        };
    }

    getGenres = () => {
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
        return <Component genreList={genreList} genres={genres} onChangeGenres={onChangeGenres}/>;
    }
}