package com.laconic.fastworkapi.utils;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.exception.DocumentException;
import lombok.experimental.UtilityClass;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@UtilityClass
public class DocumentUtil {
    public static void validateDocumentSize(MultipartFile document) {
        int fileSizeLimit = AppMessage.DEFAULT_FILE_SIZE_IN_MB;    // size in MB
        float fileSize = document.getSize() / (1000f * 1000); // size in MB
        if (fileSize > fileSizeLimit) {
            throw new DocumentException(document.getName() + "is greater than " + fileSize + "MB");
        }
    }

    public static String getDocumentDestination(String filePath, UUID id, String documentType,
                                                boolean isDeleted) {
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1; // Months are zero-based
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String fileDirectory = year + "\\" + month + "\\" + day + "\\";
        if(isDeleted) return String.format("/%s/%s/deleted/%s/%s/document/", filePath, fileDirectory, documentType, id);
        return String.format("%s/%s/%s/%s/document/", filePath, fileDirectory, documentType, id);
    }

    public static String getFileExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName != null) {
            int dotIndex = fileName.lastIndexOf(".");
            if (dotIndex > 0) {
                return fileName.substring(dotIndex + 1);
            }
        }
        return null;
    }

    public static void createFile(String path, String fileName, MultipartFile multipartFile) throws Exception {
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
        f = new File(path + fileName);
        try (FileOutputStream fileOutputStream = new FileOutputStream(f);) {
            fileOutputStream.write(multipartFile.getBytes());
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException(AppMessage.DOCUMENT_NOT_FOUND);
        }
    }

    public static void moveFile(String source, String destination) throws Exception {
        // creating deleted folder to store all deleted files
        File f = new File(destination);
        if (!f.exists()) {
            f.mkdirs();
        }
        Files.move(Paths.get(source), Paths.get(destination));
    }
}
