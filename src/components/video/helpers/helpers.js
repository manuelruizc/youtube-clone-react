import React, { useEffect, useState } from 'react';

const timestampIdenitifier = '___ortj2013rimp103wem08ae___';

export const getURLAndTimestamps = (text) => {
    const timeRegex = /([0-5][0-9]|[0-9]):[0-5][0-9]/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let text_ = text.split(/(\n)/g);
    for (let i = 0; i < text_.length; i++) {
        const currentText = text_[i];
        if (urlRegex.test(currentText)) {
            text_[i] = getURLs(text_[i]);
            continue;
        } else if (timeRegex.test(currentText)) {
            text_[i] = getTimestamps(text_[i]);
            continue;
        } else {
            text_[i] = <span key={i}>{text_[i]}</span>;
        }
    }
    return text_;
};

const getURLs = (_text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const regex = _text.split(urlRegex);
    for (let i = 0; i < regex.length; i++) {
        const url = regex[i];
        if (urlRegex.test(url)) {
            regex[i] = (
                <a
                    key={i}
                    rel="noopener noreferrer"
                    className="description-link"
                    target="_blank"
                    href={url}
                >
                    {url}
                </a>
            );
        } else {
            regex[i] = <span key={i}>{url}</span>;
        }
    }
    return regex;
};

const getTimestamps = (_text) => {
    const regexMinutes = /(([0-9][0-9]:[0-5][0-9]:|[0-9]:[0-5][0-9]:|[0-5][0-9]:|[0-9]:)[0-5][0-9])/g;
    let textMaleable = _text;
    let returnThis = _text;
    if (regexMinutes.test(_text)) {
        returnThis = (
            <TimestampComponent
                key={textMaleable}
                time={textMaleable.replace(regexMinutes, function (time) {
                    return `${timestampIdenitifier}${time}${timestampIdenitifier}`;
                })}
            />
        );
    }
    return returnThis;
};

const TimestampComponent = ({ time }) => {
    const [components, setComponents] = useState([]);
    const timestampFormat = (text) => {
        const splitText = text.split(
            /___ortj2013rimp103wem08ae___(.*)___ortj2013rimp103wem08ae___/g
        );
        return splitText;
    };
    const goToTimestamp = (time) => {
        const video = document.getElementById('video');
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let totalSeconds = 0;
        if (time.length === 4) {
            minutes = Number(time[0]);
            seconds = Number(time.substr(2));
            totalSeconds = seconds + minutes * 60;
        } else if (time.length === 5) {
            minutes = Number(time.substr(0, 2));
            seconds = Number(time.substr(3));
            totalSeconds = seconds + minutes * 60;
        } else if (time.length === 7) {
            hours = Number(time[0]);
            minutes = Number(time.substr(2, 2));
            seconds = Number(time.substr(5));
            totalSeconds = seconds + minutes * 60 + hours * 60 * 60;
        } else if (time.length === 8) {
            hours = Number(time.substr(0, 2));
            minutes = Number(time.substr(3, 2));
            seconds = Number(time.substr(6));
            totalSeconds = seconds + minutes * 60 + hours * 60 * 60;
        }
        window.scrollTo(0, 0);
        video.currentTime = totalSeconds;
    };
    useEffect(() => {
        const regexMinutes = /(([0-9][0-9]:[0-5][0-9]:|[0-9]:[0-5][0-9]:|[0-5][0-9]:|[0-9]:)[0-5][0-9])/g;
        const comps = timestampFormat(time).map((desc_text, index) => {
            if (regexMinutes.test(desc_text)) {
                return (
                    <a
                        key={desc_text + index}
                        className="description-link"
                        onClick={(e) => {
                            e.preventDefault();
                            goToTimestamp(desc_text);
                        }}
                        href="/"
                    >
                        {desc_text}
                    </a>
                );
            }
            return <span key={desc_text}>{desc_text}</span>;
        });
        setComponents(comps);
    }, [time]);
    return (
        <span>
            {components.map((component, index) => {
                return <span key={component.key + index}>{component}</span>;
            })}
        </span>
    );
};
