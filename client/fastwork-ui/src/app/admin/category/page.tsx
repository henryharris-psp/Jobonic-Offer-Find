"use client";
import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import CategoryFormModal from "@/components/admin/category/CategoryFormModal";
import CategoryItem from "@/components/admin/category/CategoryItem";
import { Category as BaseCategory } from "@/types/general";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

interface Category extends BaseCategory {
    isNew: boolean;
}

const AdminCategoryManagementPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategoryFormModal, setShowCategoryFormModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<string | number | null>(null);

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
            } catch (error: any) {
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

    //methods
        const handleOnClickAdd = () => {
            setShowCategoryFormModal(() => {
                setEditingCategory(null);
                return true;
            });
        }

        const handleOnClickDelete = async (categoryId: string | number) => {
            setDeletingCategoryId(categoryId);
            try {
                await httpClient.delete(`category?id=${categoryId}`)
                handleOnCategoryDeleted(categoryId);
            } catch (error) {
                console.log('Error on delete', error);
            } finally {
                setDeletingCategoryId(null);
            }
        }

        const handleOnClickEdit = (categoryId: string | number) => {
            setShowCategoryFormModal( () => {
                setEditingCategory( () => {
                    const targetCategory = categories.find( category => category.id === categoryId); 
                    return targetCategory ?? null;
                });
                return true;
            });
        }

        //CRUD methods for local state update
            const handleOnCategoryAdded = (newCategory: Category) => {
                setCategories( prev => {
                    const newCategoryWithNewStatus = {
                        ...newCategory,
                        isNew: true
                    }
                    return [
                        newCategoryWithNewStatus,
                        ...prev
                    ]
                })
                setShowCategoryFormModal(false);
            }

            const handleOnCategoryUpdated = (updatedCategory: Category) => {
                setCategories( prev => {
                    return prev.map( category => category.id === updatedCategory.id ? updatedCategory : category );
                });
                setShowCategoryFormModal(false);
            }

            const handleOnCategoryDeleted = (categoryId: string | number) => {
                setCategories( prev => prev.filter(category => category.id !== categoryId));
            }
        
    return (
        <>
            <div className="flex-1 flex flex-col">

                {/* header */}
                <div className="h-14 flex flex-row items-center shadow justify-between bg-white">
                    <span className="font-semibold text-xl ml-5 text-sky-800">
                        Category Management
                    </span>
                    <div className="mr-5">
                        <Button
                            title="Add New"
                            color="success"
                            size="sm"
                            icon={<PlusIcon className="size-5 text-white"/>}
                            onClick={handleOnClickAdd}
                        />
                    </div>
                </div>

                { isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <span>
                            Loading...
                        </span>
                    </div>
                ) : (
                    categories.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <span>
                                No Categories Found
                            </span>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-auto">
                            <div className="flex flex-col">
                                { categories.map( (category) => 
                                    <CategoryItem
                                        key={category.id}
                                        isDeleting={category.id === deletingCategoryId }
                                        onEdit={handleOnClickEdit}
                                        onDelete={handleOnClickDelete}
                                        {...category}
                                    />
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>

            <CategoryFormModal
                key={editingCategory?.id}
                isOpen={showCategoryFormModal}
                category={editingCategory}
                onClose={() => setShowCategoryFormModal(false)}
                onAdded={handleOnCategoryAdded}
                onUpdated={handleOnCategoryUpdated}
            />
        </>
        
    );
};

export default AdminCategoryManagementPage;
