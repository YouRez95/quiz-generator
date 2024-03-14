import React, { useState } from "react";
import { topics } from "../data";
export default function TopicSelectedInForm({
  topicSelected,
  setTopicSelected,
  prevTopic,
}) {
  const [enterTopic, setEnterTopic] = useState(false);

  function handleTopicSelected(topic) {
    if (topic.toLowerCase() !== "other") {
      setTopicSelected(topic);
      setEnterTopic(false);
    } else {
      setTopicSelected("");
      setEnterTopic(true);
    }
  }

  function handleBlurInput(e) {
    if (e.target.value.length === 0) {
      setEnterTopic(false);
    } else {
      setTopicSelected(e.target.value);
      setEnterTopic(true);
    }
  }

  return (
    <div className="grid gap-3">
      <p className="text-md font-bold font-secondary">
        Select the category of your Quiz :
      </p>
      <div className="grid grid-cols-3 w-fit gap-3">
        {topics.map((topic) => {
          const TopicIcon = topic.icon;
          return (
            <button
              onClick={() => handleTopicSelected(topic.topic)}
              type="button"
              key={topic.id}
              className={`flex px-3 py-1 rounded-full justify-center items-center gap-2 border border-dark text-center
                                    ${
                                      topicSelected === topic.topic
                                        ? "bg-dark text-light"
                                        : "hover:bg-light"
                                    }
                        `}
            >
              <TopicIcon />
              <span>{topic.topic}</span>
            </button>
          );
        })}

        {enterTopic && (
          <input
            autoFocus={enterTopic}
            type="text"
            className="border outline-none border-dark px-3 py-1 rounded-full max-w-[150px] bg-dark text-light text-center"
            placeholder="enter your topic"
            onBlur={handleBlurInput}
          />
        )}
      </div>
    </div>
  );
}
