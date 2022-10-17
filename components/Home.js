import "antd/dist/antd.css";
import styles from '../styles/Home.module.css'
import Movies from "./Movies";
import ModalContainer from "./ModalContainer";
import Player from "./Player";
import { IoClose } from 'react-icons/io5'
import { Popover, Button, Modal } from 'antd';
import { useEffect, useState } from 'react'

const Home = () => {

    const [likedMovies, setLikedMovies] = useState([])
    const [moviesData, setMoviesData] = useState([]) // Add data needs
    const [isModalOpen, setIsModalOpen] = useState(false) // Open modal
    const [selectedMovie, setSelectedMovie] = useState([]) // Open selected movie in modal

    // Movies list
    useEffect(() => {
        fetch(`http://localhost:3000/movies`)
            .then(response => response.json())
            .then(data => {
                const cleanData = data.movies.map(movie => {
                    const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // Path for poster
                    return { title: movie.title, poster, voteAverage: movie.vote_average, voteCount: movie.vote_count, overview: movie.overview }
                })
                setMoviesData(cleanData)
            })
    }, [])

    // Inverse data flow of likedMovies
    const updateLikedMovies = (movieTitle) => {
        if (likedMovies.find((movie) => movie === movieTitle)) {
            setLikedMovies(likedMovies.filter(movie => movie !== movieTitle))
        } else {
            setLikedMovies([...likedMovies, movieTitle])
        }
    }

    // Add likedMovies to Popover by Map
    const likedMoviesPopover = likedMovies.map((data, i) => {
        return (
            <div key={i} className={styles.likedMoviesContainer}>
                <span>{data}</span>
                <IoClose onClick={() => updateLikedMovies(data)} className={styles.popoverCross} />
            </div>
        )
    })

    const popover = (
        <div className={styles.popoverContent}>
            {likedMoviesPopover}
        </div>
    )

    const openModal = (data) => {
        setIsModalOpen(!isModalOpen)
        setSelectedMovie(data)
    }
    const isLikedModal = likedMovies.some(movie => movie === selectedMovie.title) // Check if movie is like for heart color in modal


    // Movies card Map
    const movies = moviesData.map((data, i) => {
        const isLiked = likedMovies.some(movie => movie === data.title) // Check if movie is like for heart color 
        return <Movies
            key={i}
            updateLikedMovies={updateLikedMovies}
            openModal={() => openModal(data)}
            isLiked={isLiked}
            title={data.title}
            poster={data.poster}
            overview={data.overview}
            voteAverage={data.voteAverage}
            voteCount={data.voteCount} />
    })

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    PopCorn
                </div>
                <Popover content={popover} title="Liked movies :" trigger="click" placement="bottom" className={styles.popover}>
                    <Button>♥ {likedMovies.length} movie(s)</Button>
                </Popover>
            </div>
            <div className={styles.title}>Last releases</div>
            <div className={styles.moviesContainer}>
                {movies}
            </div>
            <Modal title={selectedMovie && selectedMovie.title} footer={[]} width={687} open={isModalOpen} onCancel={() => setIsModalOpen(false)} >
                <Player />
                <ModalContainer
                    updateLikedMovies={updateLikedMovies}
                    isLiked={isLikedModal}
                    title={selectedMovie && selectedMovie.title}
                    poster={selectedMovie && selectedMovie.poster}
                    overview={selectedMovie && selectedMovie.overview} />
            </Modal>
        </div>
    );
};

export default Home;