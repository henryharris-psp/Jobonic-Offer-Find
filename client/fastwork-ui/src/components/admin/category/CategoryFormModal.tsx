import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import { Category } from "@/types/general";
import React, { useState } from "react";

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdded: (category: Category) => void;
}

const CategoryFormModal = ({
    isOpen,
    onClose,
    onAdded,
}: CategoryFormModalProps) => {
    const [name, setName] = useState('');

    const handleInputChange = (event: SafeInputChangeEvent) => {
        const { value } = event.target;
        setName(value);
    }

    const handleSubmit = async () => {
        try{
            const res = await httpClient.post('category', {
                name: name
            });
            const newCategroy = res.data;
            onAdded(newCategroy);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="bg-white rounded-lg">
                <div className="flex flex-col p-3 space-y-2">
                    <div className="">
                        <span className="text-lg font-bold">
                            Create New Category
                        </span>
                    </div>
                    <SafeInput
                        size="lg"
                        type="text"
                        value={name}
                        placeholder="type category name..."
                        onChange={handleInputChange}
                    />
                    <Button
                        size="sm"
                        color="success"
                        title="Submit"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CategoryFormModal;
