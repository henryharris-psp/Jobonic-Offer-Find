"use client";
import httpClient from "@/client/httpClient";
import Button from "@/components/Button";
import SkillFormModal from "@/components/admin/skill/SkillFormModal";
import SkillItem from "@/components/admin/skill/SkillItem";
import { Skill as BaseSkill } from "@/types/general";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

interface Skill extends BaseSkill {
    isNew: boolean;
}

const AdminSkillManagementPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Skill[]>([]);
    const [showSkillFormModal, setShowSkillFormModal] = useState(false);

    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [deletingSkillId, setDeletingSkillId] = useState<string | number | null>(null);

    // Fetch all categories on mount
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);
    
        (async () => {
            try {
                const res = await httpClient.get('skill/all', { signal });
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
            setShowSkillFormModal(() => {
                setEditingSkill(null);
                return true;
            });
        }

        const handleOnClickDelete = async (skillId: string | number) => {
            setDeletingSkillId(skillId);
            try {
                await httpClient.delete(`skill?id=${skillId}`)
                handleOnSkillDeleted(skillId);
            } catch (error) {
                console.log('Error on delete', error);
            } finally {
                setDeletingSkillId(null);
            }
        }

        const handleOnClickEdit = (skillId: string | number) => {
            setShowSkillFormModal( () => {
                setEditingSkill( () => {
                    const targetSkill = categories.find( skill => skill.id === skillId); 
                    return targetSkill ?? null;
                });
                return true;
            });
        }

        //CRUD methods for local state update
            const handleOnSkillAdded = (newSkill: Skill) => {
                setCategories( prev => {
                    const newSkillWithNewStatus = {
                        ...newSkill,
                        isNew: true
                    }
                    return [
                        newSkillWithNewStatus,
                        ...prev
                    ]
                })
                setShowSkillFormModal(false);
            }

            const handleOnSkillUpdated = (updatedSkill: Skill) => {
                setCategories( prev => {
                    return prev.map( skill => skill.id === updatedSkill.id ? updatedSkill : skill );
                });
                setShowSkillFormModal(false);
            }

            const handleOnSkillDeleted = (skillId: string | number) => {
                setCategories( prev => prev.filter(skill => skill.id !== skillId));
            }
        
    return (
        <>
            <div className="flex-1 flex flex-col">

                {/* header */}
                <div className="h-14 flex flex-row items-center shadow justify-between bg-white">
                    <span className="font-semibold text-lg ml-5 text-sky-800">
                        Skill Management
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
                                { categories.map( (skill) => 
                                    <SkillItem
                                        key={skill.id}
                                        isDeleting={skill.id === deletingSkillId }
                                        onEdit={handleOnClickEdit}
                                        onDelete={handleOnClickDelete}
                                        {...skill}
                                    />
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>

            <SkillFormModal
                key={editingSkill?.id}
                isOpen={showSkillFormModal}
                skill={editingSkill}
                onClose={() => setShowSkillFormModal(false)}
                onAdded={handleOnSkillAdded}
                onUpdated={handleOnSkillUpdated}
            />
        </>
        
    );
};

export default AdminSkillManagementPage;
