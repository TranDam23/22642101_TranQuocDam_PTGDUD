import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
const EditorDetails = ({ editor }) => {
    const { id, Name = "N/A", img = "N/A", userName = "N/A", avatar = "N/A", content = "N/A", minutes = "N/A", state = "N/A" } = editor;
    return (
        <div className="editor-card">
            <div className='editor-content'>
                <div className='editor-content-left'>
                    <img src={img} alt="" />
                </div>
                <div className='editor-content-right'>
                    <p>{Name}</p>
                    <p>{minutes}</p>
                    <div className='editor-info'>
                        <img src={avatar} alt="" />
                        <p>{userName}</p>
                    </div>
                    <p>{content}</p>
                    <div>{state}</div>
                </div>
            </div>

        </div>
    );
}

export default EditorDetails