import { ChangeEvent, KeyboardEvent, memo, useMemo } from "react";

interface Error {
    show: boolean,
    msg: string
}

export type SafeInputChangeEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

type SafeInputProps = {
    id?: string | undefined;
    title?: string;
    name?: string;
    size?: '' | 'lg' | 'sm' | 'xs';
    type?: 'text' | 'number' | 'password' | 'decimal' | 'textarea';
    value: string | number;
    errors?: Error[];
    step?: string;
    warningMessages?: string[];
    min?: number;
    max?: number;
    onChange: (event: SafeInputChangeEvent) => void;
    placeholder?: string;
    onPressEnterKey?: () => void;
    disabled?: boolean;
};

const inputHeightMap = {
    'lg': 'h-16',
    '': 'h-14',
    'sm': 'h-12',
    'xs': 'h-10'
}

const SafeInput = ({
    id,
    title,
    name,
    size = 'xs',
    type = 'text',
    value,
    errors = [],
    warningMessages = [],
    min,
    max,
    onChange,
    placeholder = '',
    onPressEnterKey = () => null,
    disabled,
}: SafeInputProps) => {
    const showError = useMemo(() => {
        return errors.some(e => e ? e.show : false);
    }, [errors]);

    const isNumberInput = ['number', 'decimal'].includes(type);
    const inputMode = isNumberInput ? (type === 'number' ? 'numeric' : 'decimal') : undefined;

    // methods
    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        if (isNumberInput) {
            const acceptCharRegex = /^[0-9.]*$/;
            const twoStepDecimalRegex = /^(\d+(\.\d{0,2})?)?$/;

            const isNumber = acceptCharRegex.test(value);
            const isNegativeValue = Number(value) < 0;
            const isTwoDecimal = twoStepDecimalRegex.test(value);

            if (!isNumber || isNegativeValue || !isTwoDecimal) return;

            const numericValue = Number(value);
            if (typeof min === 'number' && numericValue < min) {
                return; // Exit if the value is less than the min value
            }
            if (typeof max === 'number' && numericValue > max) {
                return; // Exit if the value is greater than the max value
            }
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
        if (e.key === 'Enter') {
            onPressEnterKey?.();
        }
    }

    const minError = useMemo(() => {
        if (typeof min === 'number' && isNumberInput && Number(value) < min) {
            return { show: true, msg: `Value must be at least ${min}` };
        }
        return null;
    }, [min, value, isNumberInput]);

    const maxError = useMemo(() => {
        if (typeof max === 'number' && isNumberInput && Number(value) > max) {
            return { show: true, msg: `Value must be no more than ${max}` };
        }
        return null;
    }, [max, value, isNumberInput]);

    const combinedErrors = useMemo(() => {
        return [...errors, minError, maxError].filter((error) => error && error.show) as Error[];
    }, [errors, minError, maxError]);

    return (
        <div className="flex flex-col space-y-1 w-full">

            {title ? (
                <span className="text-xs font-bold text-gray-500">{title}</span>
            ) : ''}

            {type === 'textarea' ? (
                <textarea
                    className={`p-3 rounded-lg placeholder:text-dim-gray focus:outline-none w-full min-h-14 border 
                        text-${size}
                        placeholder:text-${size}
                        ${showError ? 'border-red-500' : 'border-gray-300'}
                        ${disabled ? 'border-none outline-none focus:ring-0 resize-none' : 'focus:outline ring:outline-blue-500'}
                    `}
                    name={name}
                    placeholder={placeholder}
                    value={value ? value.toString() : ''}
                    onChange={onChange}
                    readOnly={disabled}
                />
            ) : (
                <div className="overflow-hidden w-full rounded-lg">
                    <input
                        id={id}
                        name={name}
                        inputMode={inputMode}
                        className={`w-full border-gray-300 min-w-0 pl-3 rounded-lg border
                            text-${size}
                            placeholder:text-${size}
                            ${inputHeightMap[size]}
                            ${showError ? 'border-red-500' : 'border-gray-300'}
                            ${disabled ? 'border-none outline-none' : 'focus:outline focus:outline-blue-500'}
                        `}
                        readOnly={disabled}
                        placeholder={placeholder}
                        value={value}
                        onKeyUp={handleOnKeyUp}
                        onChange={handleOnInputChange}
                    />
                </div>
            )}

            {combinedErrors.map((error, index) =>
                error.show ? (
                    <div key={index} className="flex text-xs text-red-500 flex-row space-x-1">
                        <span>*</span>
                        <span>{error.msg}</span>
                    </div>
                ) : ''
            )}
            {warningMessages.map((msg, index) =>
                <div key={index} className="flex text-xs text-gray-500 flex-row space-x-1">
                    <span>*</span>
                    <span>{msg}</span>
                </div>
            )}
        </div>
    )
}

export default memo(SafeInput);
