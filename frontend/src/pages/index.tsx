import { Conversation } from "@/components/Conversation";
import { KeyStrokes } from "@/components/KeyStrokes";
import { Topics } from "@/components/Topics";
import { useState } from "react";
import styles from './index.module.css'

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <KeyStrokes />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.topicContainer}>
          <Topics updateSelectedTopic={(topic) => setSelectedTopic(topic)} />
        </div>
        <div className={styles.conversationsContainer}>
          <Conversation selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
}
