import { useEffect } from 'react';

const useDocumentTitle = (title: string | null | undefined) => {
  useEffect(() => {
    title ? (document.title = title) : 'Bittu Kumar';
  }, [title]);
};

export default useDocumentTitle;
