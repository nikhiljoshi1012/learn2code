import React, { useState, useEffect } from 'react';
import './SpeedTyping.css';
import TypingArea from './TypingArea';

const SpeedTypingGame = () => {
    const paragraphs = [
        "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on. Parts of Plants: The part of the plant that developed beneath the soil is referred to as root and the part that grows outside of the soil is known as shoot. The shoot consists of stems, branches, leaves, fruits, and flowers. Plants are made up of six main parts: roots, stems, leaves, flowers, fruits, and seeds.",
        "The root is the part of the plant that grows in the soil. Its primary function is to provide the plant stability in the earth and make other mineral salts from the earth available to the plant for various metabolic processes. There are three types of roots i.e. Tap Root, Adventitious Roots, and Lateral Root. The roots arise from the parts of the plant and not from the rhizomes roots.",
        "Stem is the posterior part that remains above the ground and grows negatively geotropic. Internodes and nodes are found on the stem. Branch, bud, leaf, petiole, flower, and inflorescence on a node are all parts of the plant that remain above the ground and undergo negative subsoil development. The trees have brown bark, and the young and newly developed stems are green.",
        "A flower is the part of a plant that produces seeds, which eventually become other flowers. They are the reproductive system of a plant. Most flowers consist of four main parts: sepals, petals, stamens, and carpels. The female portion of the flower is the carpel. The majority of flowers are hermaphrodites, meaning they have both male and female components, while others may consist of one or the other.",
        "An aunt is a bassoon from the right perspective. Some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids."
    ];

    const [typingText, setTypingText] = useState([]);
    const [inpFieldValue, setInpFieldValue] = useState('');
    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);

    const loadParagraph = () => {
        const ranIndex = Math.floor(Math.random() * paragraphs.length);
        const content = Array.from(paragraphs[ranIndex]).map((letter, index) => (
            <span key={index} style={{ color: letter !== ' ' ? 'black' : 'transparent' }}
                className={`char ${index === 0 ? 'active' : ''}`}>
                {letter !== ' ' ? letter : '_'}
            </span>
        ));
        setTypingText(content);
    };

    const handleKeyDown = (event) => {
        const characters = document.querySelectorAll('.char');
        if (event.key === 'Backspace' && charIndex > 0 && timeLeft > 0) {
            const prevChar = characters[charIndex - 1];
            if (prevChar.classList.contains('correct')) {
                prevChar.classList.remove('correct');
            }
            if (prevChar.classList.contains('wrong')) {
                prevChar.classList.remove('wrong');
                setMistakes(mistakes - 1);
            }
            characters[charIndex].classList.remove('active');
            prevChar.classList.add('active');
            setCharIndex(charIndex - 1);
        }
    };

    const initTyping = (event) => {
        const characters = document.querySelectorAll('.char');
        let typedChar = event.target.value.slice(-1);
        if (charIndex < characters.length && timeLeft > 0) {
            let currentChar = characters[charIndex].innerText;
            if (currentChar === '_') currentChar = ' ';
            if (!isTyping) setIsTyping(true);

            if (typedChar === currentChar) {
                characters[charIndex].classList.add('correct');
            } else {
                characters[charIndex].classList.add('wrong');
                setMistakes(mistakes + 1);
            }
            characters[charIndex].classList.remove('active');
            if (charIndex + 1 < characters.length) characters[charIndex + 1].classList.add('active');
            setCharIndex(charIndex + 1);

            // Calculate WPM and CPM
            const timeSpent = maxTime - timeLeft;
            const wpm = Math.round(((charIndex - mistakes) / 5) / (timeSpent / 60));
            const cpm = (charIndex - mistakes) * (60 / timeSpent);
            setWPM(wpm > 0 ? wpm : 0);
            setCPM(cpm > 0 ? Math.round(cpm) : 0);
        } else {
            setIsTyping(false);
        }
    };

    const resetGame = () => {
        setInpFieldValue('');
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
        setTimeLeft(maxTime);
        setTypingText([]);
        setCPM(0);
        setWPM(0);
        loadParagraph();
    };

    useEffect(() => {
        loadParagraph();
        document.querySelector('.input-field').focus(); // Ensure input field is focused
    }, []);

    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTyping(false);
        }
        return () => clearInterval(interval);
    }, [isTyping, timeLeft]);

    return (
        <div className="container">
            <input type="text" className="input-field"
                value={inpFieldValue}
                onChange={initTyping}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                data-ms-editor="true" />
            <TypingArea typingText={typingText}
                timeLeft={timeLeft}
                mistakes={mistakes}
                WPM={WPM}
                CPM={CPM}
                resetGame={resetGame}
            />
        </div>
    );
};

export default SpeedTypingGame;
