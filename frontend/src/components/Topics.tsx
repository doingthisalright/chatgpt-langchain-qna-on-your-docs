import { useEffect, useState } from "react"
import styles from './Topics.module.css';

export const Topics = (props: {
    updateSelectedTopic: (topic: string) => void;
}) => {
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const rawResponse = await fetch("http://localhost:3000/api/topics");
            const response = await rawResponse.json();
            const topics = response.response as string[];
            setTopics(topics);
            if (selectedTopic === null || !topics.includes(selectedTopic)) {
                setSelectedTopic(topics[0]);
                props.updateSelectedTopic(topics[0]);
            }
        }
        let mounted = true;
        getData();
        return () => {
            mounted = false;
        }
    }, []);

    const topicClicked = (topic: string) => {
        setSelectedTopic(topic);
        props.updateSelectedTopic(topic);
    }

    return (
        <div className={styles.container}>
            <div className="heading">
                Available Topics
            </div>
            <div>
                {
                    topics.map(topic => {
                        return (
                            <div
                                onClick={() => topicClicked(topic)}
                                key={topic}
                                className={`${styles.topic} ${topic === selectedTopic && styles.selectedTopic}`}
                            >
                                {topic}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}