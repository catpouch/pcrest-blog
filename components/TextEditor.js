import {Editor, EditorState, RichUtils} from 'draft-js'
import {useState, useRef, useCallback} from 'react'
import styles from './TextEditor.module.scss'
import 'draft-js/dist/Draft.css'

export default function TextEditor(props) {
    //const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const styleMap = {
        /*'FUNNY': {
            color: 'blue'
        }*/
        //FILL WITH CUSTOM STYLES
    }

    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            props.setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    function onStyleClick(event) {
        event.preventDefault()
        props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, event.currentTarget.dataset.style))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>
                <button onClick={onStyleClick} data-style='BOLD' type='button'>
                    <img src={'/format_bold.svg'}/>
                </button>

                <button onClick={onStyleClick} data-style='ITALIC' type='button'>
                    <img src={'/format_italic.svg'}/>
                </button>

                <button onClick={onStyleClick} data-style='UNDERLINE' type='button'>
                    <img src={'/format_underlined.svg'}/>
                </button>

                <button onClick={onStyleClick} data-style='STRIKETHROUGH' type='button'>
                    <img src={'/format_strikethrough.svg'}/>
                </button>
            </div>
            <Editor editorState={props.editorState} onChange={props.setEditorState} handleKeyCommand={handleKeyCommand} customStyleMap={styleMap} className={styles.editor}/>
        </div>
    )
}

//with react-quill (as a backup)
/*import dynamic from 'next/dynamic'
import { useState } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})
import 'react-quill/dist/quill.snow.css'

export default function TextEditor() {
    const [value, setValue] = useState('')
    
    return (
        <div>
            <ReactQuill value={value} onChange={setValue}/>
            <div>{value}</div>
        </div>
    )
}*/
