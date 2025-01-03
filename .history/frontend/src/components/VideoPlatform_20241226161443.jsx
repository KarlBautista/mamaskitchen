import React, { useRef, useEffect } from 'react';
import Jollibee1 from "../videos/jollibee-1.mp4";

function VideoPlatform() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = true; // Ensures autoplay works
            video.play().catch(err => console.error("Autoplay failed:", err));
        }
    }, []);

    return (
        <div className="video-platform-container">
            <div className="video-platform">
                <video
                    ref={videoRef}
                    className="videos"
                    loop
                    playsInline // Ensures autoplay on mobile
                    muted // Required for autoplay
                >
                    <source src={Jollibee1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>  
    );
}

export default VideoPlatform;
