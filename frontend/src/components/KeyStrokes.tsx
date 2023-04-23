import Image from 'next/image'

import KeyStrokesImage from './../../public/images/Key Strokes.jpeg';
import YTImage from './../../public/images/yt-white.png';

import styles from './KeyStrokes.module.css'

export const KeyStrokes = () => {
    return (
        <div className={styles.container}>
            <Image
                src={KeyStrokesImage}
                alt="KeyStrokes"
                className={styles.keystrokesImage}
            />
            <div className={styles.createdByContainer}>
                <div style={{
                    fontSize: '0.75em',
                }}>
                    Created by:
                </div>
                <div style={{
                    fontSize: '1.25em',
                }}>
                    KeyStrokes
                </div>
                <div style={{
                    minHeight: '20px',
                    maxHeight: '5vh',
                }}>
                    <a href={"https://www.youtube.com/@Key_Strokes"} target="_blank">
                        <Image
                            src={YTImage}
                            alt="YTImage"
                            className={styles.youtubeImage}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}