import styled from "@emotion/styled";
import Button from "./Button";
import { useState } from "react";
import Cookies from "js-cookie";
import Memo from "../interfaces/Memo";

const TitleInp = styled.input`


`;

const ContentInp = styled.textarea`
    height: 360px;
`;

const EditContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex; 
    gap: 16px;
`;

interface EditProps {
    setMode: (mode: 'edit' | 'view') => void;
    memoIdx: number | null;
}


const Edit = ({ setMode, memoIdx }: EditProps) => {
    const [title, setTitle] = useState(() => {
        if (Number.isInteger(memoIdx))  {
            const memo = JSON.parse((Cookies.get('memo') ?? null)!);
            const memoList: Memo[] = memo ?? [];
            return memoList[memoIdx as number].title;
        }
        return '';
    });
    const [contents, setContents] = useState(() => {
        if (Number.isInteger(memoIdx))  {
            const memo = JSON.parse((Cookies.get('memo') ?? null)!);
            const memoList: Memo[] = memo ?? [];
            return memoList[memoIdx as number].contents;
        }
        return '';
    });
    return <EditContainer>
        
        <TitleInp value={title} onChange={event => setTitle(event.target.value)}/>
        <ContentInp value={contents} onChange={event => setContents(event.target.value)}/>
        <ButtonContainer>
            <Button onClick={() => setMode("view")}>뒤로가기</Button>
            <Button onClick={() => {
                // title, content가 비워있으면 
                if(!(title.length && contents.length)) {
                    alert('제목과 내용을 적어주세요.');
                    return;
                }

                //json.parse은 undefined을 받을 수 없음
                //memo가 undefined 이면 null로 반환
                const memo = JSON.parse((Cookies.get('memo') ?? null)!);
                const memoList:Memo[] = memo ?? [];
                if(Number.isInteger(memoIdx))
                    memoList[memoIdx as number] = {
                        title,
                        contents
                    }
                else 
                    memoList.push({
                        title,
                        contents
                    })

                Cookies.set('memo', JSON.stringify(memoList)); //Coocie에 저장
                alert('저장되었습니다');
                setMode("view");

                //쿠키에 저장되었는지 확인
                console.log(Cookies.get('memo'));
                }
                }>저장</Button>
        </ButtonContainer>
    </EditContainer>
}

export default Edit;