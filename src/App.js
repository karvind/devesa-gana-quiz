import React, { useState } from "react";
import "./App.css";

// Song details
const songDetails = {
  name: "Devesa GaNa (Thotaka Mangalam)",
  composer: "Sant Vijayagopala Swami",
  ragam: "Saaveri",
  talam: "Roopakam (3 beats)",
  lyrics: [
    {
      charanam: 1,
      lines: [
        "Devesa-GaNa Aaradhita",
        "Divyaambuja Paadha",
        "Sri-Venkata Giri-Naayaka",
        "Srisha Hecharikaa",
        "Venkateshaa Hecharikaa",
      ],
    },
    {
      charanam: 2,
      lines: [
        "Kalimaanusha Kalushaapaha",
        "Kamaneeya Sukeerthe",
        "Alamelu Mangaa-Mohana",
        "Moorte Hecharikaa",
        "Mohana-Moorte Hecharikaa",
      ],
    },
    {
      charanam: 3,
      lines: [
        "Jalajaasana Paripaalana",
        "Jagadeka Nidaana",
        "Kalasaambudhi Thadashobhita",
        "CharaNaa Hecharikaa",
        "Mrudhu-CharaNaa Hecharikaa",
      ],
    },
    {
      charanam: 4,
      lines: [
        "VakuLaasana Harichandana",
        "Vanamadhya Vihaara",
        "Sakalaagama Paripaalana",
        "Chaturaa Hecharikaa",
        "Athi-Chaturaa Hecharikaa",
      ],
    },
    {
      charanam: 5,
      lines: [
        "NaraayaNa NaraposhaNa",
        "Narakaadi SamharaNa",
        "He-RaavaNa MadaBhanjana",
        "Dheera Hecharikaa",
        "Raghuveera Hecharikaa",
      ],
    },
    {
      charanam: 6,
      lines: [
        "Sri-Keshava NaraayaNa",
        "Govindha Muraare",
        "Raaja-Gopala Muraare",
        "Sri-Maadhava Madhusoodana",
        "Dhaamodhara Soure",
        "Murahara-Dhamodhara Soure",
      ],
    },
    {
      charanam: 7,
      lines: [
        "Seshaachala Nilayaa",
        "Varabhusha MaNivalayaa",
        "Roshadi Vijayi",
        "Mouni-Vidheya Hecharikaa",
        "Mouni-Vidheya Hecharikaa",
      ],
    },
    {
      charanam: 8,
      lines: [
        "Rajaneechara Vara-Naayaka",
        "Kaala Vanamaala",
        "Vrajapaalana Vara-Vijaya",
        "Gopaala Hecharikaa",
        "Govindha Hecharikaa",
      ],
    },
  ],
};

// Function to extract all words from the lyrics
const getAllWords = () => {
  const allWords = [];
  songDetails.lyrics.forEach((charanam) => {
    charanam.lines.forEach((line) => {
      const words = line.split(" ");
      allWords.push(...words);
    });
  });
  return allWords;
};

// Function to extract all first lines from the lyrics
const getAllFirstLines = () => {
  const firstLines = [];
  songDetails.lyrics.forEach((charanam) => {
    firstLines.push(charanam.lines[0]);
  });
  return firstLines;
};

// Function to generate questions dynamically
const generateQuestions = () => {
  const questions = [];
  const allWords = getAllWords();
  const allFirstLines = getAllFirstLines();
  const usedQuestions = new Set(); // Track used questions to ensure uniqueness

  // Randomly choose one of Ragam, Talam, or Composer questions
  const metadataQuestions = [
    {
      question: "Who is the composer of the song?",
      options: [
        "Tyagaraja",
        "Sant Vijayagopala Swami",
        "Muthuswami Dikshitar",
        "Purandara Dasa",
      ],
      answer: songDetails.composer,
    },
    {
      question: "What is the ragam of the song?",
      options: ["Kalyani", "Saaveri", "Bhairavi", "Mohanam"],
      answer: songDetails.ragam,
    },
    {
      question: "What is the talam of the song?",
      options: ["Adi", "Roopakam", "Misra Chapu", "Khanda Chapu"],
      answer: songDetails.talam,
    },
  ];
  const metadataQuestion =
    metadataQuestions[Math.floor(Math.random() * metadataQuestions.length)];
  questions.push(metadataQuestion);
  usedQuestions.add(metadataQuestion.question);

  // Add 4 "What is the first line of Charanam X?" questions
  while (questions.length < 5) {
    const randomCharanam =
      songDetails.lyrics[Math.floor(Math.random() * songDetails.lyrics.length)];
    const questionText = `What is the first line of Charanam ${randomCharanam.charanam}?`;
    if (!usedQuestions.has(questionText)) {
      const correctAnswer = randomCharanam.lines[0];
      const options = [correctAnswer];
      while (options.length < 4) {
        const randomFirstLine =
          allFirstLines[Math.floor(Math.random() * allFirstLines.length)];
        if (!options.includes(randomFirstLine)) {
          options.push(randomFirstLine);
        }
      }
      // Shuffle options
      questions.push({
        question: questionText,
        options: options.sort(() => Math.random() - 0.5),
        answer: correctAnswer,
      });
      usedQuestions.add(questionText);
    }
  }

  // Add 5 "What word follows X?" questions
  while (questions.length < 10) {
    const randomCharanam =
      songDetails.lyrics[Math.floor(Math.random() * songDetails.lyrics.length)];
    const randomLine =
      randomCharanam.lines[
        Math.floor(Math.random() * randomCharanam.lines.length)
      ];
    const words = randomLine.split(" ");
    if (words.length > 1) {
      const correctNextWord = words[1];
      const questionText = `What word follows "${words[0]}"?`;
      if (!usedQuestions.has(questionText)) {
        const options = [correctNextWord];
        while (options.length < 4) {
          const randomWord =
            allWords[Math.floor(Math.random() * allWords.length)];
          if (!options.includes(randomWord)) {
            options.push(randomWord);
          }
        }
        // Shuffle options
        questions.push({
          question: questionText,
          options: options.sort(() => Math.random() - 0.5),
          answer: correctNextWord,
        });
        usedQuestions.add(questionText);
      }
    }
  }

  return questions;
};

const App = () => {
  // State to manage the current quiz
  const [currentQuiz, setCurrentQuiz] = useState(generateQuestions());
  // State to track user's selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // State to track whether the quiz is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State to track whether to show the song details
  const [showSong, setShowSong] = useState(true);
  // State to track whether to show the quiz
  const [showQuiz, setShowQuiz] = useState(true);

  // Function to regenerate the quiz
  const regenerateQuiz = () => {
    setCurrentQuiz(generateQuestions());
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Function to handle answer selection
  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  // Function to calculate the score
  const calculateScore = () => {
    let score = 0;
    currentQuiz.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.answer) {
        score++;
      }
    });
    return score;
  };

  // Function to submit the quiz
  const submitQuiz = () => {
    setIsSubmitted(true);
  };

  // Function to toggle the song details
  const toggleSongDetails = () => {
    setShowSong((prev) => !prev);
  };

  // Function to toggle the quiz
  const toggleQuiz = () => {
    setShowQuiz((prev) => !prev);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Devesa GaNa (Thotaka Mangalam) Quiz</h1>
        <img
          src="/venkateswara.jpg" // Path to the image in the public folder
          alt="Lord Venkateswara"
          className="venkateswara-image"
        />
        <div className="buttons">
          <button onClick={toggleSongDetails} className="show-song-button">
            {showSong ? "Hide Song" : "Show Song"}
          </button>
          <button onClick={toggleQuiz} className="show-quiz-button">
            {showQuiz ? "Hide Quiz" : "Show Quiz"}
          </button>
        </div>
      </div>
      <div className="main-content">
        {showSong && (
          <div className="column song-details-column">
            <div className="song-details">
              <h2>Song Details</h2>
              <p><strong>Name:</strong> {songDetails.name}</p>
              <p><strong>Composer:</strong> {songDetails.composer}</p>
              <p><strong>Ragam:</strong> {songDetails.ragam}</p>
              <p><strong>Talam:</strong> {songDetails.talam}</p>
              <h3>Audio Player</h3>
              <audio controls>
                <source src="/devesa-gana.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <h3>Lyrics</h3>
              {songDetails.lyrics.map((charanam, index) => (
                <div key={index} className="charanam">
                  <h4>Charanam {charanam.charanam}</h4>
                  <ul>
                    {charanam.lines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {showQuiz && (
          <div className="column quiz-column">
            <div className="quiz-container">
              <button onClick={regenerateQuiz} className="regenerate-button">
                Regenerate Quiz
              </button>
              {currentQuiz.map((quiz, index) => (
                <div key={index} className="quiz-item">
                  <h3>{quiz.question}</h3>
                  <ul>
                    {quiz.options.map((option, i) => {
                      const isSelected = selectedAnswers[index] === option;
                      const isCorrect = quiz.answer === option;
                      const isWrong = isSubmitted && isSelected && !isCorrect;
                      return (
                        <li
                          key={i}
                          onClick={() => !isSubmitted && handleAnswerSelect(index, option)}
                          className={`
                            ${isSelected ? "selected" : ""}
                            ${isSubmitted && isCorrect ? "correct" : ""}
                            ${isWrong ? "wrong" : ""}
                          `}
                        >
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <button onClick={submitQuiz} className="submit-button">
                Submit Quiz
              </button>
            </div>
          </div>
        )}
        {showQuiz && isSubmitted && (
          <div className="column answer-key-column">
            <div className="results">
              <h2>Your Score: {calculateScore()} / {currentQuiz.length}</h2>
              <h3>Answer Key:</h3>
              <ul>
                {currentQuiz.map((quiz, index) => (
                  <li key={index}>
                    <strong>Question:</strong> {quiz.question}<br />
                    <strong>Your Answer:</strong> {selectedAnswers[index] || "Not answered"}<br />
                    <strong>Correct Answer:</strong> {quiz.answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;