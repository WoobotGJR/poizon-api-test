import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dummyTextData from '../../utils/dummyTextData';

interface TypingState {
  text: string;
  userInput: string;
  startTime: number | null;
  errors: number;
  isFinished: boolean;
  timeLeft: number;
  duration: number;
  isStarted: boolean;
}

const initialState: TypingState = {
  text: dummyTextData[Math.floor(Math.random() * dummyTextData.length)],
  userInput: '',
  startTime: null,
  errors: 0,
  isFinished: false,
  timeLeft: 60,
  duration: 60,
  isStarted: false,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
      if (!state.startTime) {
        state.startTime = Date.now();
      }
      const lastChar = action.payload[action.payload.length - 1];
      const correctChar = state.text[action.payload.length - 1];
      if (lastChar !== correctChar) {
        state.errors += 1;
      }
      if (state.userInput === state.text || state.timeLeft <= 0) {
        state.isFinished = true;
      }
    },
    restart: (state) => {
      state.text =
        dummyTextData[Math.floor(Math.random() * dummyTextData.length)];
      state.userInput = '';
      state.startTime = null;
      state.errors = 0;
      state.isFinished = false;
      state.timeLeft = state.duration;
      state.isStarted = false;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
      state.timeLeft = action.payload;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
      if (state.timeLeft <= 0) {
        state.isFinished = true;
        state.isStarted = false;
      }
    },
    startTimer: (state) => {
      state.isStarted = true;
    },
    stopTimer: (state) => {
      state.isStarted = false;
    },
  },
});

export const {
  setUserInput,
  restart,
  setDuration,
  decrementTime,
  startTimer,
  stopTimer,
} = typingSlice.actions;
export default typingSlice.reducer;
