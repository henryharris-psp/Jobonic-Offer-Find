"use client";
import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import CategoryFormModal from "@/components/admin/category/CategoryFormModal";
import { Category } from "@/types/general";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const AdminCategoryManagementPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategoryFormModal, setShowCategoryFormModal] = useState(false);

    // Fetch all categories on mount
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);
    
        (async () => {
            try {
                const res = await httpClient.get('category/all', { signal });
                if (res.status === 200) {
                    const allCategories = res.data;
                    setCategories(allCategories);
                } else {
                    console.log('Failed to fetch categories', res.status);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.log('Error fetching categories', error);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    
        return () => controller.abort();
    }, []);
    

    return (
        <>
            <div className="flex-1 flex flex-col">

                {/* header */}
                <div className="h-14 flex flex-row items-center shadow bg-white justify-between">
                    <span className="font-semibold text-lg ml-5">
                        Category Management
                    </span>
                    <div className="mr-5">
                        <Button
                            title="Add New"
                            color="success"
                            size="sm"
                            icon={<PlusIcon className="size-5 text-white"/>}
                            onClick={() => setShowCategoryFormModal(true)}
                        />
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 overflow-auto">
                    { isLoading ? (
                        <div className="bg-red-400">
                            Loading...
                        </div>
                    ) : (
                        categories.length === 0 ? (
                            <div className="h-14 flex items-center justify-center">
                                No Categories Found
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                { categories.map( (category) => 
                                    <div 
                                        key={category.id} 
                                        className="flex flex-row items-center justify-between bg-gray-50 border-y border-y-gray-100 px-5 py-4"
                                    >
                                        <span className="text-gray-800">
                                            { category.name }
                                        </span>

                                        <div className="flex flex-row items-center space-x-2">
                                            <Button
                                                title="Edit"
                                                color="info"
                                                size="xs"
                                                icon={<PencilSquareIcon className="size-4 text-white"/>}
                                                onClick={() => console.log('edit')}
                                            />

                                            <Button
                                                title="Delete"
                                                color="danger"
                                                size="xs"
                                                icon={<TrashIcon className="size-4 text-white"/>}
                                                onClick={() => console.log('delete')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>

            <CategoryFormModal
                isOpen={showCategoryFormModal}
                onClose={() => setShowCategoryFormModal(false)}
                onAdded={(newCategroy) => console.log(newCategroy)}
            />
        </>
        
    );
};

export default AdminCategoryManagementPage;
