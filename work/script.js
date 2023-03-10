function submitFile() {
    var filename = document.getElementById("filename").value;
    var file = document.getElementById("file").files[0];
    var formData = new FormData();
    formData.append("filename", filename);
    formData.append("file", file);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("status").innerHTML = "上传成功！";
                document.getElementById("filename").value = "";
                document.getElementById("file").value = "";
                updateFileList();
            } else {
                document.getElementById("status").innerHTML = "上传失败，请重新上传！";
            }
        }
    };
    xhr.open("POST", "submit.php");
    xhr.send(formData);
}

function updateFileList() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var fileList = JSON.parse(xhr.responseText);
                var fileListHTML = "";
                for (var i = 0; i < fileList.length; i++) {
                    var filename = fileList[i].filename;
                    var filesize = fileList[i].filesize;
                    fileListHTML += '<div class="file">';
                    fileListHTML += '<div class="filename">' + filename + '</div>';
                    fileListHTML += '<div class="filesize">' + filesize + ' bytes</div>';
                    fileListHTML += '<div class="download" onclick="downloadFile(\'' + filename + '\')">下载</div>';
                    fileListHTML += '<div class="delete" onclick="deleteFile(\'' + filename + '\')">删除</div>';
                    fileListHTML += '</div>';
                }
                document.getElementById("fileList").innerHTML = fileListHTML;
            }
        }
    };
    xhr.open("GET", "fileList.php");
    xhr.send();
}

function downloadFile(filename) {
    window.open("download.php?filename=" + encodeURIComponent(filename), "_blank");
}

function deleteFile(filename) {
    var confirmDelete = confirm("确定删除文件 " + filename + " 吗？");
    if (confirmDelete) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    updateFileList();
                } else {
                    alert("删除失败，请稍后再试！");
                }
            }
        };
        xhr.open("POST", "delete.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("filename=" + encodeURIComponent(filename));
    }
}




updateFileList();
