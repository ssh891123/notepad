import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from './compontents/Card';
import Edit from './compontents/Edit';
import Memo from './interfaces/Memo';
import Cookies from 'js-cookie';

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
  const [memoList, setMemoList] = useState<Memo[]>([]);
  // useState<Memo[]>(() => {
  // const memo = JSON.parse((Cookies.get('memo') ?? null)!);
  // const memoList: Memo[] = memo ?? [];
  // return memoList;
  // })

  // view가 변경될때마다 확인
  // useState를 통해서도 memoList에 저장 가능하지만, [저장]하고 나서 렌더링되지 않음
  // 새로고침을 해야 반영됨 => useState은 사용할 수 없음
  useEffect(() => {
    const memo = JSON.parse((Cookies.get('memo') ?? null)!);
    const memoList: Memo[] = memo ?? [];
    setMemoList(memoList);
  }, [mode]);
  
  return (
    <>
      {
        mode === "view" &&
        <CardContainer>
          {
            memoList.map(memo => <Card title={memo.title}/>)
          }
          <PlusCard onClick={() => setMode("edit")}>+</PlusCard>
        </CardContainer>
      }
      {
        mode === "edit" && <Edit setMode={setMode}/>
      }
    </>
  );
}

export default App;
