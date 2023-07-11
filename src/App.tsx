import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from './compontents/Card';
import Edit from './compontents/Edit';
import EditUsingZustand from './compontents/EditUsingZustand';
import Memo from './interfaces/Memo';
import Cookies from 'js-cookie';
import useMemo from './store/memoStore';

const CardContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: center;
`;

const PlusCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  border: 1px solid #707070;
  width: 80px;
  height: 80px;
  line-height: 44px;
  padding-bottom: 8px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 80px;
`;

function App() {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  // [1] Cookies를 이용한 메모장 구현
  // const [memoList, setMemoList] = useState<Memo[]>([]);
  // const [selectedMemoIdx, setSelectedMemoIdx] = useState<number | null>(null); 

  // // view가 변경될때마다 확인
  // // useState를 통해서도 memoList에 저장 가능하지만, [저장]하고 나서 렌더링되지 않음
  // // 새로고침을 해야 반영됨 => useState은 사용할 수 없음
  // useEffect(() => {
  //   const memo = JSON.parse((Cookies.get('memo') ?? null)!);
  //   const memoList: Memo[] = memo ?? [];
  //   setMemoList(memoList);
  // }, [mode]);

  // [2] localStorage와 zustand를 이용하여 메모장 구현
  //zustand를 이용하여 전역으로 state을 관리
  const { setSelectedIndex, memoList, clear } = useMemo();
  
  return (
    <>
      {
        mode === "view" &&
        <CardContainer>
          {
            memoList.map((memo, idx) => <Card 
              key={idx}
              onClick={() => {
                // setSelectedMemoIdx(idx);
                setSelectedIndex(idx);
                setMode('edit');
              }}
              title={memo.title} />)
          }
          <PlusCard onClick={() => {
            // [1] Cookies를 이용한 메모장 구현
            //+ 눌렀을 때, selectedMemoIdx가 null이 되어야 함
            // setSelectedMemoIdx(null); 

            // [2] localStorage와 zustand를 이용하여 메모장 구현
            setSelectedIndex(null);
            setMode("edit");
          }}>+</PlusCard>
          <PlusCard onClick={() => {
            // [1] Cookies를 이용한 메모 구현
            // setSelectedMemoIdx(null);
            // setMemoList([]); 
            // Cookies.remove('memo');

            // [2] localStorage와 zustand를 이용하여 메모장 구현
            setSelectedIndex(null);
            clear();
          }}>Clear</PlusCard>
        </CardContainer>
      }
      {
        // [1] Cookies를 이용한 메모 구현
        // mode === "edit" && <Edit setMode={setMode} memoIdx={selectedMemoIdx}/>

        // [2] localStorage와 zustand를 이용하여 메모장 구현
        mode === "edit" && <EditUsingZustand setMode={setMode}/>
      }
    </>
  );
}

export default App;
