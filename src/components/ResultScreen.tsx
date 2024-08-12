import { useAppSelector } from '../redux/hooks';
import styled from 'styled-components';
import { calculateWPM } from '../utils/calculateWPM';

const ResultsContainer = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #a0a0a0;
`;

const ResultScreen: React.FC = () => {
  const { startTime, userInput, errors, isFinished } = useAppSelector(
    (state) => state.typing
  );

  if (!isFinished) return null;

  const wpm = calculateWPM(startTime ?? 0, Date.now(), userInput.length);

  return (
    <ResultsContainer>
      <h3>Results:</h3>
      <p>WPM: {wpm}</p>
      <p>Errors: {errors}</p>
    </ResultsContainer>
  );
};

export default ResultScreen;
