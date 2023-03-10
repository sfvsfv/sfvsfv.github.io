<?php
if (isset($_GET["filename"])) {
    $filename = $_GET["filename"];
    $filepath = "files/" . $filename;
    if (file_exists($filepath)) {
        header("Content-Type: application/octet-stream");
        header("Content-Transfer-Encoding: Binary");
        header("Content-disposition: attachment; filename=\"" . basename($filepath) . "\"");
        readfile($filepath);
    } else {
        echo "文件不存在！";
    }
} else {
    echo "文件下载失败！";
}
?>
