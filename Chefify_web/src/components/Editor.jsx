import React from 'react'
import EditorDetails from './EditorDetails'
const Editor = ({ editors }) => {
    return (
        <div className='dishes-container'>
            <div className='dishes-title'>
                <h3>Editor's pick</h3>
                <p>Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
            </div>
            <div className='dishes'>
                {editors.map((editor) => (
                    <EditorDetails
                        key={editor.id}
                        editor={editor}
                    // onDelete={() => onDeleteContact(contact.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Editor