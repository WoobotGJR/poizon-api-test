import React from 'react';
import { useAppSelector } from '../redux/hooks';
import styled from 'styled-components';

interface TextDisplayProps {
  handleClick: () => void;
}

interface CharSpanProps {
  isCorrect: boolean | null;
}

const CharSpan = styled.span.attrs<CharSpanProps>((props) => ({
  style: {
    color:
      props.isCorrect === null ? '#666' : props.isCorrect ? '#fff' : '#FF4500',
    textDecoration: props.isCorrect === false ? 'underline' : 'none',
  },
}))<CharSpanProps>``;

const TextContainer = styled.div`
  font-size: 24px;
  text-align: left;
  margin: 20px 0;
  max-width: 800px;
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 1.5;
`;

const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 24px;
  background-color: #ffd700;
  margin-left: -2px;
  animation: blink 1s step-start infinite;
  vertical-align: text-bottom;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const TextDisplay: React.FC<TextDisplayProps> = ({ handleClick }) => {
  const text = useAppSelector((state) => state.typing.text);
  const userInput = useAppSelector((state) => state.typing.userInput);

  const renderText = () => {
    return text.split('').map((char, index) => {
      const isCorrect =
        index < userInput.length ? char === userInput[index] : null;

      return (
        <React.Fragment key={index}>
          <CharSpan isCorrect={isCorrect}>{char}</CharSpan>
          {index === userInput.length - 1 && <Caret />}
        </React.Fragment>
      );
    });
  };

  return <TextContainer onClick={handleClick}>{renderText()}</TextContainer>;
};

export default TextDisplay;
