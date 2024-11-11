import React, { useState, useEffect } from 'react';
import './SpeedTyping.css';
import TypingArea from './TypingArea';

const SpeedTypingGame = () => {
    const paragraphs = [
        "int******** func(int (*arr[10])(char**, double***), std::vector<std::unique_ptr<long****>>& ref, void(*callback)(std::map<std::string, std::tuple<int*, long*, char*>>)) { static int******* val = nullptr; for (size_t i = 0; i < sizeof(arr) / sizeof(arr[0]); ++i) { arr[i] = [](char** p1, double*** p2) -> int { return static_cast<int>(**p1[0] + ***p2[0]); }; } ref.push_back(std::make_unique<long****>(new long***{nullptr})); callback({{\"key\", {new int{5}, new long{10}, new char{'x'}}}}); return &val; }",
        "template<typename T, typename... Args> class MultiLayeredTemplate { using NestedType = typename std::conditional<sizeof...(Args) == 1, std::tuple<T, Args...>, std::map<std::string, std::vector<std::pair<T, std::shared_ptr<Args>>>>>; static_assert(std::is_integral<T>::value, \"T must be integral\"); public: NestedType operator()(Args... args) { return NestedType{{\"Key\", std::make_pair(T{}, std::make_shared<Args>(args))...}}; } };",
        "#define JOIN(a, b) a##b #define RECURSIVE_MACRO(x, y) JOIN(x, y) #define EXTREME_MACRO(a, b, c, d) RECURSIVE_MACRO(JOIN(a * b, c | d), RECURSIVE_MACRO(a & d, b + c)) #define NESTED_LOGIC(x, y, z) (EXTREME_MACRO(x, y, z, x^z) & ((x << y) | (z >> y))) const int result = NESTED_LOGIC(10, 20, 30);",
        "std::map<std::string, std::vector<std::array<std::tuple<std::unique_ptr<int>, std::shared_ptr<char>, std::function<void(std::vector<int>&)>>, 5>>> container = { {\"example\", {{{std::make_unique<int>(5), std::make_shared<char>('a'), [](std::vector<int>& vec) { for (auto& v : vec) { v *= 2; } }}}}} };",
        "template<typename T, typename U> struct ComplexStruct { T operator+(const U& u) { return T(); } auto operator()(std::function<void(std::array<T, 10>)> func) { return [func](std::array<U, 5> arr) { func(std::array<T, 10>{}); }; } }; ComplexStruct<std::vector<int>, std::map<std::string, std::set<double>>> obj; auto lambda = obj + std::map<std::string, std::set<double>>{{\"pi\", {3.14}}}; lambda([](std::array<int, 10> arr) { for (auto x : arr) std::cout << x; });",
        "auto superComplexLambda = [&, a = 5, b = std::make_unique<int>(10), c = std::shared_ptr<char>(new char('z'))] <typename T>(std::vector<std::pair<T, T>> vec, std::map<std::string, T> map) -> decltype(vec[0].first + map.begin()->second) { auto res = vec[0].first + map.begin()->second; std::for_each(vec.begin(), vec.end(), [&](auto& pair) { res += pair.first; }); return res; };",
        "namespace Outer { namespace Middle { namespace Inner { class AbstractBase { public: virtual void execute(const std::string&, const std::map<int, std::vector<double>>&) = 0; }; using NestedAlias = std::unique_ptr<std::map<std::string, std::array<int, 5>>>; } using BasePtr = std::shared_ptr<Inner::AbstractBase>; } } Outer::Middle::BasePtr base = std::make_shared<Outer::Middle::Inner::AbstractBase>();",

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
        const words = paragraphs[ranIndex].split(' ');
        const content = words.map((word, wordIndex) => (
            <span className="word-wrapper" key={wordIndex}>
                {Array.from(word).map((letter, letterIndex) => (
                    <span key={letterIndex} style={{ color: letter !== ' ' ? 'black' : 'transparent' }}
                        className={`char ${wordIndex === 0 && letterIndex === 0 ? 'active' : ''}`}>
                        {letter !== ' ' ? letter : '_'}
                    </span>
                ))}
                <span className="char" style={{ color: 'transparent' }}>_</span>
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
