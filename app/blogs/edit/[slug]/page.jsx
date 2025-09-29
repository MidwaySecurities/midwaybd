'use client'
import dynamic from 'next/dynamic';

// Dynamically import the editor with SSR disabled
const EditorComponent = dynamic(() => import('../../../components/EditBlog'), { ssr: false });

export default function EditBlog() {
  return (
    <main>
      <EditorComponent placeholder="Edit your blog here..." />
    </main>
  );
}


