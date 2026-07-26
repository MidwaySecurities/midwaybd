'use client'
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Dynamically import the editor with SSR disabled
const EditorComponent = dynamic(() => import('../../../components/EditBlog'), { ssr: false });

export default function EditBlog() {
  const params = useParams()
  return (
    <main>
      <EditorComponent slug = {params.slug} placeholder="Edit your blog here..." />
    </main>
  );
}


