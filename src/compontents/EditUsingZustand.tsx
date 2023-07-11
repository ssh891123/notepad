import styled from "@emotion/styled";
import Button from "./Button";
import { useState } from "react";
import Cookies from "js-cookie";
import Memo from "../interfaces/Memo";
import useMemo from "../store/memoStore";

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
}


const EditUsingZustand = ({ setMode }: EditProps) => {
    const { selectedIndex, editMemo, addMemoList, memoList } = useMemo();

    const [title, setTitle] = useState(() => {
        if (Number.isInteger(selectedIndex))  {
            return memoList[selectedIndex as number].title;
        }
        return '';
    });
    const [contents, setContents] = useState(() => {
        if (Number.isInteger(selectedIndex))  {;
            return memoList[selectedIndex as number].contents;
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

                const memo = {
                    title,
                    contents
                }

                if(Number.isInteger(selectedIndex))
                    editMemo(selectedIndex as number, memo)
                else 
                    addMemoList(memo);

                alert('저장되었습니다');
                setMode("view");
                }
                }>저장</Button>
        </ButtonContainer>
    </EditContainer>
}

export default EditUsingZustand;