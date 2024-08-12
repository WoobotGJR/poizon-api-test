import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setDuration, stopTimer } from '../redux/slices/typingSlice';
import styled from 'styled-components';

const TimeOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const TimeButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#ffd700' : '#444')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#ffdf00' : '#555')};
  }
`;

const TimeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const duration = useAppSelector((state) => state.typing.duration);

  const handleTimeSelect = (time: number) => {
    dispatch(stopTimer());
    dispatch(setDuration(time));
  };

  return (
    <TimeOptions>
      {[15, 30, 45, 60].map((time) => (
        <TimeButton
          key={time}
          onClick={() => handleTimeSelect(time)}
          selected={time === duration}
        >
          {time}s
        </TimeButton>
      ))}
    </TimeOptions>
  );
};

export default TimeSelector;
