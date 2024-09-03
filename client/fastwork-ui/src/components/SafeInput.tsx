import { ChangeEvent, KeyboardEvent, memo, useMemo } from "react";

interface Error {
    show: boolean,
    msg: string
}

export type SafeInputChangeEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

type InputProps = {
    id?: string | undefined;
    name?: string;
    type?: 'text' | 'number' | 'password' | 'decimal' | 'textarea';
    title?: string;
    value: string | number;
    errors?: Error[];
    step?: string;
    warningMessages?: string[];
    onChange: (event: SafeInputChangeEvent) => void;
    placeholder?: string;
    onPressEnterKey?: () => void;
    disabled?: boolean;
};

const Input = ({
    id,
    name,
    type = 'text',
    title,
    value,
    errors = [],
    warningMessages = [],
    onChange,
    placeholder = '',
    onPressEnterKey = () => null,
    disabled,
}: InputProps) => {

    const showError = useMemo( () => {
        return errors.some( e => e ? e.show : false );
    }, [errors]);

    const isNumberInput = ['number', 'decimal'].includes(type);
    const inputMode = isNumberInput ? (type === 'number' ? 'numeric' : 'decimal') : undefined;

    //methods
        const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;

            if (isNumberInput) {
                const acceptCharRegex = /^[0-9.]*$/;
                const twoStepDecimalRegex = /^(\d+(\.\d{0,2})?)?$/;

                const isNumber = acceptCharRegex.test(value);
                const isNegativeValue = Number(value) < 0;
                const isTwoDecimal = twoStepDecimalRegex.test(value);

                if (!isNumber || isNegativeValue || !isTwoDecimal) return;
            }

            onChange({
                ...e,
                currentTarget: {
                    ...e.currentTarget,
                    value: value
                }
            });
        }

        const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter'){
                onPressEnterKey?.();
            }
        }

    return (
        <div className="flex flex-col space-y-2">

            { title ? (
                <span className="text-xs font-bold text-gray">{title}</span>
            ) : ''}

            { type === 'textarea' ? (
                <textarea 
                    className={`text-sm pl-3 pt-3 rounded-lg placeholder:text-xs placeholder:text-dim-gray focus:outline-none w-full h-11 border 
                        ${showError ? 'border-red' : 'border-dim-gray' }
                        ${disabled ? 'opacity-80' : 'bg-white'}
                    `}
                    value={ value ? value.toString() : ''}
                    onChange={onChange}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    inputMode={inputMode}
                    className={`text-sm pl-3 placeholder:text-xs w-full h-10 rounded-lg border 
                        ${showError ? 'border-red-500' : 'border-gray-300' }
                        ${disabled ? 'opacity-80' : 'bg-white'}
                    `}
                    placeholder={placeholder}
                    value={value}
                    onKeyUp={handleOnKeyUp}
                    onChange={handleOnInputChange}
                />
            )}
            
            { showError &&
                errors.map( (error, index) => 
                    error.show ? (
                        <div key={index} className="flex text-xs text-red-500 flex-row space-x-1">
                            <span>*</span>
                            <span>{ error.msg }</span>
                        </div>
                    ) : ''
                )
            }
            { warningMessages.map( (msg, index) => 
                <div key={index} className="flex text-xs text-gray-500 flex-row space-x-1">
                    <span>*</span>
                    <span>{ msg }</span>
                </div>
            )}
        </div>
    )
}

export default memo(Input);