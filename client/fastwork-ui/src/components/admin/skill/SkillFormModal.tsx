import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import { Skill as BaseSkill } from "@/types/general";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface Skill extends BaseSkill {
    isNew: boolean;
}

interface SkillFormModalProps {
    skill: Skill | null;
    isOpen: boolean;
    onClose: () => void;
    onAdded: (skill: Skill) => void;
    onUpdated: (updatedSkill: Skill) => void;
}

const SkillFormModal = ({
    skill,
    isOpen,
    onClose,
    onAdded,
    onUpdated
}: SkillFormModalProps) => {
    const isEdit = skill !== null;
    const [name, setName] = useState(isEdit ? skill.name : '');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: SafeInputChangeEvent) => {
        const { value } = event.target;
        setName(value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try{
            const apiCall = isEdit 
                ? httpClient.put(`skill?id=${skill.id}`, { name: name })
                : httpClient.post('skill', { name: name });
            
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
                            Create New Skill
                        </span>
                    </div>
                    <div className="w-96">
                        <SafeInput
                            size=""
                            type="text"
                            value={name}
                            placeholder="Type skill..."
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

export default SkillFormModal;
