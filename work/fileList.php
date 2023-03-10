<?php
$targetDir = "files/";
$fileList = array();
if ($handle = opendir($targetDir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            $filename = $entry;
            $filesize = filesize($targetDir . $entry);
            $fileList[] = array("filename" => $filename, "filesize" => $filesize);
        }
    }
    closedir($handle);
}
echo json_encode($fileList);
?>
