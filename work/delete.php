<?php
if (isset($_POST["filename"])) {
    $filename = $_POST["filename"];
    $filepath = "files/" . $filename;
    if (file_exists($filepath)) {
        if (unlink($filepath)) {
            echo "文件删除成功！";
        } else {
            echo "文件删除失败！";
        }
    } else {
        echo "文件不存在！";
    }
} else {
    echo "文件删除失败！";
}
?>
