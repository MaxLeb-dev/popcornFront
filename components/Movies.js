import styles from '../styles/Movies.module.css'
import { FaStar, FaEye, FaHeart } from 'react-icons/fa'
import { useState } from 'react';

const Movies = (props) => {

    const [personalNote, setPersonalNote] = useState(0)
    const [watched, setWatched] = useState(false)

    // Average stars vote
    const stars = []

    for (let i = 0; i < 10; i++) {
        let style = {}
        if (i < props.voteAverage - 1) {
            style = { 'color': '#f1c40f' }
        }
        stars.push(<FaStar key={i} style={style} />)
    }

    // Personal stars vote
    const myStars = []

    for (let i = 0; i < 10; i++) {
        let styleStars = { 'cursor': 'pointer' }
        if (i < personalNote) {
            styleStars = { 'color': '#b73d3d', 'cursor': 'pointer' }
        }
        myStars.push(<FaStar key={i} style={styleStars} onClick={() => setPersonalNote(i + 1)} />)
    }

    // Watched movie icon
    let styleWatched = { 'cursor': 'pointer' }
    let watchedComment = ""
    if (watched) {
        styleWatched = { 'color': '#b73d3d', 'cursor': 'pointer' }
        watchedComment = "watched"
    } else {
        watchedComment = "not watched"
    }

    // Liked movie icon
    let styleLiked = { 'cursor': 'pointer' }
    let likedComment = ""
    if (props.isLiked) {
        styleLiked = { 'color': '#b73d3d', 'cursor': 'pointer' }
        likedComment = "liked"
    } else {
        likedComment = "not liked"
    }

    return (
        <div className={styles.card} >
            <img src={props.poster} alt={props.title} className={styles.poster} onClick={() => props.openModal()} />
            <span className={styles.title} onClick={() => props.openModal()}>{props.title}</span>
            <span className={styles.vote}>{stars} {props.voteCount}</span>
            <span>{myStars} {personalNote}</span>
            <span><FaEye onClick={() => setWatched(!watched)} style={styleWatched} /> {watchedComment}</span>
            <span><FaHeart onClick={() => props.updateLikedMovies(props.title)} style={styleLiked} /> {likedComment}</span>
        </div>
    );
};

export default Movies;