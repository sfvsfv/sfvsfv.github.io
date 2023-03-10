<?php
if (isset($_FILES["file"]) && isset($_POST["filename"])) {
    $filename = $_POST["filename"];
    $file = $_FILES["file"];
    $targetDir = "files/";
    $targetFile = $targetDir . basename($file["name"]);
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // 检查文件是否已存在
    if (file_exists($targetFile)) {
        echo "文件已存在！";
        $uploadOk = 0;
    }
    // 检查文件大小
    if ($file["size"] > 1000000) {
        echo "文件过大！";
        $uploadOk = 0;
    }
    // 允许上传的文件类型
    if ($fileType != "md" && $fileType != "doc" && $fileType != "docx" && $fileType != "pdf"&& $fileType != "zip") {
        echo "只允许上传MD、DOC和DOCX、PDF格式的文件！";
        $uploadOk = 0;
    }
    if ($uploadOk == 0) {
        echo "文件上传失败！";
    } else {
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            echo "文件上传成功！";
        } else {
            echo "文件上传失败！";
        }
    }
} else {
    echo "文件上传失败！";
}
?>
