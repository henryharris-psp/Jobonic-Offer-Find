import Button from "@/components/Button";
import { Category as BaseCategory } from "@/types/general";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Category extends BaseCategory {
    isNew: boolean;
}

interface CategoryItemProps extends Category {
    isDeleting: boolean;
    onEdit: (category: string | number) => void;
    onDelete: (categoryId: string | number) => void;
}

const CategoryItem = ({
    id,
    name,
    isNew,
    onEdit,
    onDelete,
    isDeleting
}: CategoryItemProps) => {
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

export default CategoryItem;
