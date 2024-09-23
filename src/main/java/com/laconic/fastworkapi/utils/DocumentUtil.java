package com.laconic.fastworkapi.utils;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.exception.DocumentException;
import lombok.experimental.UtilityClass;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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

    public static String getDocumentDestination(String filePath, String id, String documentType, boolean isDeleted) {
        Calendar calendar = Calendar.getInstance();

        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1; // Months are zero-based
        int day = calendar.get(Calendar.DAY_OF_MONTH);

        String fileDirectory = year + "/" + month + "/" + day + "/";

        if (isDeleted) {
            return Paths.get(filePath, fileDirectory, "deleted", documentType, id, "document").toString();
        }

        return Paths.get(filePath, fileDirectory, documentType, id, "document").toString();
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

//    public static void createFile(String path, String fileName, MultipartFile multipartFile) throws Exception {
//        File f = new File(path);
//        if (!f.exists()) {
//            f.mkdirs();
//        }
//        f = new File(path + fileName);
//        try (FileOutputStream fileOutputStream = new FileOutputStream(f);) {
//            fileOutputStream.write(multipartFile.getBytes());
//        } catch (FileNotFoundException e) {
//            throw new FileNotFoundException(AppMessage.DOCUMENT_NOT_FOUND);
//        }
//    }

    public static void createFile(String path, String fileName, MultipartFile multipartFile) throws Exception {
        Path filePath = Paths.get(path, fileName);
//        try {
            Files.createDirectories(filePath.getParent()); // Create parent directories if they don't exist
            Files.write(filePath, multipartFile.getBytes()); // Write the file
//        } catch (IOException e) {
//            throw new IOException(AppMessage.DOCUMENT_NOT_FOUND, e);
//        }
    }


    public static void moveFile(String source, String destination) throws Exception {
        File destinationFolder = new File(destination);

        if (!destinationFolder.exists()) {
            destinationFolder.mkdirs();
        }

        Path sourcePath = Paths.get(source);
        String fileName = sourcePath.getFileName().toString();

        Path destinationPath = Paths.get(destination, fileName);

        Files.move(sourcePath, destinationPath);
    }
}
