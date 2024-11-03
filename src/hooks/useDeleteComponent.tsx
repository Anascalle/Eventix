import { useCallback } from 'react';

const useDeleteComponent = (deleteComponent: () => void) => {
    const handleDelete = useCallback(() => {
        deleteComponent();
    }, [deleteComponent]);

    return handleDelete;
}

export default useDeleteComponent