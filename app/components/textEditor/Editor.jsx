// import { EditorContent, useEditor } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"

// export default function TiptapEditor() {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<b>Hello World!</b>",
//     immediatelyRender: false,   // 👈 THIS FIXES THE ERROR
//   })

//   if (!editor) return null

//   return <EditorContent editor={editor} />
// }


'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlock from '@tiptap/extension-code-block'

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlock.configure({
                languageClassPrefix: 'language-',
            }),

        ],
        immediatelyRender: false,   // 👈 THIS FIXES THE ERROR
        content: `<p>Hello <strong>World!</strong></p>`,
    })

    return (
        <div>
            <EditorContent editor={editor} />
            <button
                onClick={() => {
                    alert(editor.getHTML())
                }}
            >
                Show Code
            </button>
        </div>
    )
}
