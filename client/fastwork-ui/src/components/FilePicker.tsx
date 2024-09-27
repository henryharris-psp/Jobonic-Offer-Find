import { memo, useRef } from "react";
import Button, { ButtonProps } from "./Button";
import { v4 as uuid } from "uuid";
import { Attachment } from "@/types/general";
import StringParser from "@/functions/stringParser";

type FilePickErrorTypes = "type" | "size";

interface FilePickerProps extends Omit<ButtonProps, 'onClick'> {
    onPick: (pickedFile: Attachment) => void;
    onError: (filePickErrorMessages: string[]) => void;
}

const filePickErrorMessageMap = {
    type: "Only image files (JPEG, JPG, PNG, GIF) or ZIP files, or PDF files are allowed.",
    size: "The file size must not exceed 10MB."
};

const allowedFileTypes = [
    "image/jpeg", 
    "image/jpg", 
    "image/png", 
    "image/gif",
    "application/zip",
    "application/pdf"
];

const FilePicker = ({
    onPick,
    onError,
    ...buttonProps
}: FilePickerProps) => {
    const stringParser = new StringParser();
    const inputRef = useRef<HTMLInputElement>(null);

    //methods
        const handleClick = () => {
            if (inputRef.current) {
                inputRef.current.click();
            }
        };

        const handleOnPickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.currentTarget.files?.[0];

            if(!selectedFile) return;

            //error handling
                const errorTypes: FilePickErrorTypes[] = [];

                if (!allowedFileTypes.includes(selectedFile.type)) {
                    errorTypes.push("type");
                }
                if (selectedFile.size > 10000000) {
                    errorTypes.push("size");
                }

                if (errorTypes.length > 0) {
                    const filePickErrorMessages: string[] = errorTypes.map( errorType => filePickErrorMessageMap[errorType]);
                    onError(filePickErrorMessages);
                    return;
                }

            //pick on error
            const pickedFile: Attachment = {
                id: uuid(),
                name: selectedFile.name,
                fileSize: stringParser.convertBytesToMB(selectedFile.size) + ' MB',
                source: selectedFile,
                status: 'pending'
            };

            onPick(pickedFile);
        };

    return (
        <>
            <Button 
                {...buttonProps}
                onClick={handleClick}
            />
            <input
                ref={inputRef}
                type="file"
                onChange={handleOnPickFile}
                hidden
            />
        </>
    );
};

export default memo(FilePicker);
