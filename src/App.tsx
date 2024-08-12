import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import TextDisplay from './components/TextDisplay';
import TextInput from './components/TextInput';
import ResultScreen from './components/ResultScreen';
import RestartButton from './components/RestartButton';
import TimeSelector from './components/TimeSelector';
import styled from 'styled-components';
import { decrementTime, restart, startTimer } from './redux/slices/typingSlice';

interface InputFocusHandler {
  focus: () => void;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #121212; /* Тёмный фон */
  color: #e0e0e0; /* Светлый текст */
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #ffd700; /* Золотистый цвет для заголовка */
`;

const Timer = styled.div`
  font-size: 24px;
  margin-top: 10px;
  color: #ff4500; /* Красный цвет для таймера */
`;

const StartButton = styled.button`
  background-color: #32cd32;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  margin-right: 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;

  &:hover {
    background-color: #28a828;
  }
`;

const App: React.FC = () => {
  const inputRef = useRef<InputFocusHandler>(null);
  const dispatch = useAppDispatch();
  const isFinished = useAppSelector((state) => state.typing.isFinished);
  const timeLeft = useAppSelector((state) => state.typing.timeLeft);
  const isStarted = useAppSelector((state) => state.typing.isStarted);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleStart = () => {
    dispatch(startTimer());
    handleFocus();
  };

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [dispatch, isStarted, isFinished, timeLeft]);

  useEffect(() => {
    dispatch(restart());
  }, [dispatch]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <Container className="container">
      <Title>Typing Speed Trainer</Title>
      <TimeSelector />
      <TextDisplay handleClick={handleFocus} />
      <TextInput ref={inputRef} />
      <Timer>Remaining time: {timeLeft}s</Timer>
      {!isStarted && <StartButton onClick={handleStart}>Start</StartButton>}
      {isFinished && <ResultScreen />}
      <RestartButton />
    </Container>
  );
};

export default App;
