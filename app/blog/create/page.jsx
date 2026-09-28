'use client'
import dynamic from 'next/dynamic';

// Dynamically import the editor with SSR disabled
const EditorComponent = dynamic(() => import('../../components/EditorComponent'), { ssr: false });

export default function CreateBlogPage() {
  return (
    <main>
      <EditorComponent placeholder="Write your blog here..." />
    </main>
  );
}


