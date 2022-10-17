import ReactPlayer from 'react-player'

const Player = () => {
    return (
        <div>
            <ReactPlayer
                url='https://youtu.be/mCRY5FEZnIU'
                controls
            />
        </div>
    );
};

export default Player;