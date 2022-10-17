import styles from '../styles/ModalContainer.module.css'
import { FaHeart } from 'react-icons/fa'

const ModalContainer = (props) => {

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
            <img src={props.poster} alt={props.title} className={styles.poster} />
            <div className={styles.textContainer}>
                <p className={styles.overview}>{props.overview}</p>
                <span><FaHeart onClick={() => props.updateLikedMovies(props.title)} style={styleLiked} /> {likedComment}</span>
            </div>
        </div>
    );
};

export default ModalContainer;