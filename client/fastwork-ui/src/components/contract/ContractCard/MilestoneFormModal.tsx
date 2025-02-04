import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { Milestone } from "@/types/general";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/contexts/chat";
import SafeInput, { SafeInputChangeEvent } from "@/components/SafeInput";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

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
    const { activeChatRoom } = useChat();

    const newTask = {
        id: uuid(),
        name: '',
    }

    const [inputs, setInputs] = useState({
        title: isEdit ? milestone.title : '',
        price: isEdit ? milestone.price : '',
        dueDate: isEdit ? milestone.dueDate : ''
    });

    const [tasks, setTasks] = useState(isEdit ? milestone.tasks : [newTask]);

    //error handlers
        const [errorCheckable, setErrorCheckable] = useState(false);
        
        const inputErrors = useMemo( () => {
            const errors = [];
            
            if(!inputs.title){
                errors.push('title');
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
        const handleInputChange = (e: SafeInputChangeEvent) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const handleTaskInputChange = (e: SafeInputChangeEvent) => {
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
                    tasks: tasks,
                    status: "not_started",

                    //not_required
                    serviceId: activeChatRoom?.service_id,
                    matchId: activeChatRoom?.match_id,
                    numberOfHoursCompleted: 0,
                    description: 'not_required'
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
            <div className="flex flex-col max-h-screen w-full min-w-80 bg-white rounded-xl overflow-hidden px-5 py-3">
                <div className="flex border-b border-b-gray-300 pb-2">
                    <span className="font-bold text-lg">
                        Create / Edit Milestone
                    </span>
                </div>

                {/* content */}
                <div className="flex flex-col flex-1 my-3 space-y-5 overflow-hidden">
                    <div className="flex flex-col space-y-3">                        

                        <SafeInput
                            title="Milestone Name"
                            placeholder="eg. Milestone 1"
                            type="text"
                            name="title"
                            value={inputs.title}
                            onChange={handleInputChange}
                            errors={[
                                {
                                    show: errorCheckable && inputErrors.includes('title'),
                                    msg: 'Required'
                                }
                            ]}
                        />

                        <SafeInput
                            title="Price"
                            placeholder="eg. 50.25"
                            type="decimal"
                            name="price"
                            value={inputs.price}
                            onChange={handleInputChange}
                            errors={[
                                {
                                    show: errorCheckable && inputErrors.includes('price'),
                                    msg: 'Required'
                                }
                            ]}
                        />
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
                                        <SafeInput
                                            id={task.id.toString()}
                                            type="text"
                                            name="name"
                                            placeholder="Write Task"
                                            value={task.name}
                                            onChange={handleTaskInputChange}
                                            errors={[
                                                {
                                                    show: errorCheckable && inputErrors.includes('name'),
                                                    msg: 'Required'
                                                }
                                            ]}
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
