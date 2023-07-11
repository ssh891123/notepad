import create from 'zustand';
import Memo from '../interfaces/Memo';

interface MemoState {
    memoList: Memo[];
    selectedIndex: number | null;
    addMemoList: (memo: Memo) => void;
    clear: () => void;
    setSelectedIndex: (idx: number | null) => void;
    editMemo: (idx: number, memo: Memo) => void;
}

const useMemo = create<MemoState>(set => ({
    selectedIndex: null,
    memoList: JSON.parse((localStorage.getItem("memo.memoList") ?? null)!) ?? [],
    setSelectedIndex: (idx: number | null) => {
        set({
            selectedIndex: idx
        })
    },
    addMemoList: (memo: Memo) => {
        set(prev => {
            const memoList = [...prev.memoList, memo];
            localStorage.setItem("memo.memoList", JSON.stringify(memoList));
            return {
                ...prev,
                memoList
            };
        })
    },
    
    clear: () => {
        set({
            memoList: []
        })
        localStorage.setItem("memo.memoList", "[]");
    },
    editMemo: (idx: number, memo: Memo) => {
        set(({memoList}) => {
            memoList[idx] = memo;
            
            localStorage.setItem("memo.memoList", JSON.stringify(memoList));
            return {
                memoList
            }
        })
    }

}))

export default useMemo;