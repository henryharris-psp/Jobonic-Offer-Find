import Button from "@/components/Button";
import { Skill as BaseSkill } from "@/types/general";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Skill extends BaseSkill {
    isNew: boolean;
}

interface SkillItemProps extends Skill {
    isDeleting: boolean;
    onEdit: (skill: string | number) => void;
    onDelete: (skillId: string | number) => void;
}

const SkillItem = ({
    id,
    name,
    isNew,
    onEdit,
    onDelete,
    isDeleting
}: SkillItemProps) => {
    return (
        <div
            key={id}
            className={`flex flex-row items-center bg-opacity-20 backdrop-blur justify-between border-y border-y-gray-100 px-5 py-4
                ${ isNew ? 'bg-yellow-100' : '' }
            `}
        >
            <div className="flex flex-row space-x-2 items-center">
                { isNew ? (
                    <span className="text-red-500 text-2xs">New</span>
                ) : ''}
                <span className="text-gray-700">{name}</span>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <Button
                    title="Edit"
                    color="info"
                    size="xs"
                    icon={<PencilSquareIcon className="size-4 text-white" />}
                    onClick={() => onEdit(id)}
                />
                <Button
                    title={isDeleting ? 'Deleting...' : 'Delete'}
                    disabled={isDeleting}
                    color="danger"
                    size="xs"
                    icon={<TrashIcon className="size-4 text-white" />}
                    onClick={() => onDelete(id)}
                />
            </div>
        </div>
    );
};

export default SkillItem;
