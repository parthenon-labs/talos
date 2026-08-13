import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EditModeType = 'blockly' | 'python';

interface EditState {
  chapterListState: boolean; // 是否展开章节列表
  chapterClickDisable: boolean; // 章节点击是否禁用

  editMode: EditModeType; // 编辑模式

  running: boolean; // 代码是否运行中

  pythonCode: string; // python代码
  pythonRuntimeReady: boolean; // python运行环境是否初始化完成

  blocklyCodeChanged: boolean; // blockly代码是否被改变
  blocklyCode: string; // blockly代码

  wallet: number; // 积分
  totalWallet: number; // 总积分

  positionTip: PositionTip;
}

interface PositionTip {
  display: boolean;
  tipPosition: {
    x: number;
    y: number;
  };
  value: {
    x: number;
    z: number;
  };
}

const positionTipDefault = {
  display: false,
  tipPosition: {
    x: 0,
    y: 0,
  },
  value: {
    x: 0,
    z: 0,
  },
};

const initialState: EditState = {
  chapterListState: true,
  chapterClickDisable: false,
  editMode: 'python',
  running: false,
  pythonCode: '',
  pythonRuntimeReady: false,
  blocklyCode: '',
  blocklyCodeChanged: false,
  wallet: 0,
  totalWallet: 0,
  positionTip: positionTipDefault,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    toggleChapter(state, action: PayloadAction<boolean | undefined>) {
      state.chapterListState = action.payload ?? !state.chapterListState;
    },
    toggleChapterClickDisable(
      state,
      action: PayloadAction<boolean | undefined>,
    ) {
      state.chapterClickDisable = action.payload ?? !state.chapterClickDisable;
    },

    switchMode(state, action: PayloadAction<EditModeType>) {
      state.editMode = action.payload;
    },

    setBlocklyCode(state, action: PayloadAction<string>) {
      state.blocklyCode = action.payload;
    },
    setPythonCode(state, action: PayloadAction<string>) {
      state.pythonCode = action.payload;
    },

    setBlocklyCodeChanged(state, action: PayloadAction<boolean>) {
      state.blocklyCodeChanged = action.payload;
    },

    setPythonRuntime(state, action: PayloadAction<boolean | undefined>) {
      state.pythonRuntimeReady = action.payload ?? true;
    },
    setRunning(state, action: PayloadAction<boolean | undefined>) {
      state.running = action.payload ?? true;
    },

    setTotalWallet(state, action: PayloadAction<number>) {
      state.totalWallet = action.payload;
    },

    incrementWallet(state, action: PayloadAction<number | undefined>) {
      state.wallet += action.payload ?? 0;
    },
    clearWallet(state) {
      state.wallet = 0;
    },

    setPositionTip(state, action: PayloadAction<PositionTip>) {
      state.positionTip = action.payload;
    },
    clearPositionTip(state) {
      state.positionTip = positionTipDefault;
    },
  },
});

export const {
  toggleChapter,
  toggleChapterClickDisable,
  switchMode,
  setRunning,
  setBlocklyCode,
  setPythonCode,
  setPythonRuntime,
  setTotalWallet,
  incrementWallet,
  clearWallet,
  setBlocklyCodeChanged,
  setPositionTip,
  clearPositionTip,
} = editSlice.actions;

export default editSlice.reducer;
