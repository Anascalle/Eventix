import { useCallback } from 'react';

const useEditComponent = (editComponent: () => void) => {
    const handleEdit = useCallback(() => {
        editComponent();
    }, [editComponent]);

    return handleEdit;
}

export default useEditComponent