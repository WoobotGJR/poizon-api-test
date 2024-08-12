import { useDispatch } from 'react-redux';
import { restart } from '../redux/slices/typingSlice';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #ffd700;
  color: #121212;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffc107;
  }
`;

const RestartButton = () => {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(restart())}>Restart</Button>;
};

export default RestartButton;
