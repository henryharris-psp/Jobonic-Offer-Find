"use client"
import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import { Category as BaseCategory } from "@/types/general";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Category extends BaseCategory {
    isNew: boolean;
}

interface CategoryFormModalProps {
    category: Category | null;
    isOpen: boolean;
    onClose: () => void;
    onAdded: (category: Category) => void;
    onUpdated: (updatedCategory: Category) => void;
}

const CategoryFormModal = ({
    category,
    isOpen,
    onClose,
    onAdded,
    onUpdated
}: CategoryFormModalProps) => {
    const isEdit = category !== null;
    const [name, setName] = useState(isEdit ? category.name : '');

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: SafeInputChangeEvent) => {
        const { value } = event.target;
        setName(value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try{
            const apiCall = isEdit 
                ? httpClient.put(`category?id=${category.id}`, { name: name })
                : httpClient.post('category', { name: name });
            
            const res = await apiCall;

            isEdit ? onUpdated(res.data) : onAdded(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="bg-white rounded-lg">
                <div className="flex flex-col p-5 space-y-3">
                    <div className="">
                        <span className="text-lg font-bold">
                            Create New Category
                        </span>
                    </div>
                    <div className="w-96 space-y-2">
                        <SafeInput
                            size=""
                            type="text"
                            value={name}
                            placeholder="English"
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        color="success"
                        size="lg"
                        icon={isLoading ? '' : ( isEdit ? '' : <PlusIcon className="size-5 text-white"/>)}
                        title={isLoading ? 'Saving...' : ( isEdit ? 'Update' : 'Add' )}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CategoryFormModal;
