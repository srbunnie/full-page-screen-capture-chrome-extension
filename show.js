document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('key');

    if (!key) {
        showError('No screenshot key provided in URL.');
        return;
    }

    chrome.storage.local.get(key, function(result) {
        var item = result ? result[key] : null;
        if (!item || !item.dataUrl) {
            showError('Screenshot data not found or expired.');
            return;
        }

        var img = document.getElementById('screenshot');
        img.src = item.dataUrl;

        var downloadBtn = document.getElementById('download-btn');
        downloadBtn.href = item.dataUrl;
        downloadBtn.download = item.filename || 'screenshot.png';

        var titleEl = document.getElementById('filename-title');
        if (titleEl && item.filename) {
            titleEl.textContent = item.filename;
        }
    });

    function showError(msg) {
        var errEl = document.getElementById('error-msg');
        var container = document.getElementById('img-container');
        if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
        }
        if (container) {
            container.style.display = 'none';
        }
    }
});
