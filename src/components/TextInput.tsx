import { setUserInput } from '../redux/slices/typingSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import styled from 'styled-components';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const StyledInput = styled.input`
  opacity: 0;
`;
const TextInput = forwardRef((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const userInput = useAppSelector((state) => state.typing.userInput);
  const isFinished = useAppSelector((state) => state.typing.isFinished);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        if (inputRef.current) {
          console.log(inputRef.current);

          inputRef.current.focus();
        }
      },
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserInput(e.target.value));
  };

  return (
    <StyledInput
      ref={inputRef}
      type="text"
      value={userInput}
      onChange={handleChange}
      disabled={isFinished}
    />
  );
});

export default TextInput;
