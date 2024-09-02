import { ChangeEvent, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { Milestone, Task } from "@/types/general";
import Button from "../Button";
import Modal from "../Modal";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface MilestoneFormModalProps {
    milestone: Milestone | null,
    isOpen: boolean,
    onClose: () => void,
    onAdded: (milestone: Milestone) => void,
    onUpdated: (milestone: Milestone) => void
}

const MilestoneFormModal = ({ 
    milestone,
    isOpen,
    onClose,
    onAdded,
    onUpdated
}: MilestoneFormModalProps) => {
    const isEdit = milestone !== null;

    const newTask: Task = {
        id: uuid(),
        name: '',
    }

    const [inputs, setInputs] = useState({
        name: isEdit ? milestone.name : '',
        price: isEdit ? milestone.price : '',
        dueDate: isEdit ? milestone.dueDate : ''
    });

    const [tasks, setTasks] = useState(isEdit ? milestone.tasks : [newTask]);

    //error handlers
        const [errorCheckable, setErrorCheckable] = useState(false);
        
        const inputErrors = useMemo( () => {
            const errors = [];
            
            if(!inputs.name){
                errors.push('name');
            }

            if(!inputs.price){
                errors.push('price');
            }

            tasks.forEach( task => {
                if(!task.name){
                    errors.push(task.id);
                }
            });
            return errors;
        }, [inputs, tasks]);

    //methods
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const handleTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const taskId = e.target.id;
            const taskKey = e.target.name;
            const newValue = e.target.value;
        
            setTasks( prev => prev.map( task => 
                task.id === taskId
                ? { ...task, [taskKey]: newValue }
                : task
            ));
        }
        
        const handleAddNewTask = () => {
            setTasks( prev => ([
                ...prev,
                newTask
            ]));
        }

        const handleRemoveTask = (taskId: string | number) => {
            setTasks( prev => prev.filter( e => e.id !== taskId));
        }

        const handleSubmit = () => {
            setErrorCheckable(true);
            if(inputErrors.length === 0){
                const submitData: Milestone = {
                    ...inputs,
                    id: isEdit ? milestone.id : uuid(),
                    price: Number(inputs.price),
                    tasks
                }

                isEdit ? onUpdated(submitData) : onAdded(submitData);
                setErrorCheckable(false);
            }
        }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col max-h-screen bg-white rounded-xl overflow-hidden px-5 py-3">
                <div className="flex border-b border-b-gray-300 pb-2">
                    <span className="font-bold text-lg">
                        Create / Edit Milestone
                    </span>
                </div>

                {/* content */}
                <div className="flex flex-col flex-1 my-3 space-y-5 overflow-hidden">
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-1">
                            <input
                                type="text"
                                placeholder="Milestone name"
                                name="name"
                                value={inputs.name}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg h-12 w-96"
                            />
                            { errorCheckable && inputErrors.includes('name') ? (
                                <span className="text-xs text-red-500">
                                    * Required
                                </span>
                            ) : ''}
                        </div>

                        <div className="flex flex-col space-y-1">
                            <input
                                type="number"
                                step={2}
                                placeholder="Price"
                                name="price"
                                value={inputs.price}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg h-12 w-96"
                            />
                            { errorCheckable && inputErrors.includes('price') ? (
                                <span className="text-xs text-red-500">
                                    * Required
                                </span>
                            ) : ''}
                        </div>

                        <div className="flex flex-col space-y-1">
                            <input
                                type="date"
                                placeholder="Due Date"
                                value={inputs.dueDate}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg h-12 w-96"
                            />
                        </div>
                    </div>

                    {/* tasks section*/}
                    <div className="flex flex-col space-y-3 overflow-hidden">
                        <div className="flex">
                            <span className="font-bold text-gray-500">
                                Tasks
                            </span>
                        </div>

                        {/* tasks list */}
                        <div className="flex-1 overflow-auto">
                            <div className="flex flex-col space-y-2">
                                { tasks.map( task => 
                                    <div
                                        key={task.id}
                                        className="flex flex-row space-x-2"
                                    >
                                        <input
                                            id={task.id.toString()}
                                            type="text"
                                            name="name"
                                            placeholder="Write Task"
                                            value={task.name}
                                            onChange={handleTaskInputChange}
                                            className="border border-gray-300 rounded-lg h-12 w-full"
                                        />
                                        { tasks.length > 1 ? (
                                            <button onClick={() => handleRemoveTask(task.id)}>
                                                <XMarkIcon className="size-4 text-red-500"/>
                                            </button>
                                        ) : ''}
                                    </div>
                                )}

                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <button 
                                        className="rounded-full text-white p-1 bg-[#D0693B] text-sm font-bold"
                                        onClick={handleAddNewTask}
                                    >
                                        <PlusIcon className="size-5"/>
                                    </button>
                                    <span className="text-xs">
                                        Add New Task
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="flex flex-row justify-end border-t border-t-gray-300 space-x-1 pt-2">
                    <Button
                        size="sm"
                        title="Cancel"
                        onClick={onClose}
                    />
                    <Button
                        size="sm"
                        title={ isEdit ? 'Update' : 'Add' }
                        icon={ isEdit ? '' : <PlusIcon className="size-4 "/> }
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default MilestoneFormModal;
