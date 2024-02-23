import * as pdfjsLib from './lib/pdfjs/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './lib/pdfjs/build/pdf.worker.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const pdfViewer = document.getElementById('pdf-viewer');
    const versionNumber = '1.0.5';
    const versionElement = document.getElementById('version');

    versionElement.innerText += versionNumber;

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            loadPdfFromFile(file);
        }
    });

    const dropZone = document.body;
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            loadPdfFromFile(file);
        }
    });

    function loadPdfFromFile(file) {
        const url = URL.createObjectURL(file);
        pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
            console.log("Le PDF est chargé");
            pdfDoc.getPage(1).then(function(page) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var viewport = page.getViewport({ scale: 1.5 });

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);

                pdfViewer.innerHTML = '';
                pdfViewer.appendChild(canvas);
            });
        }).catch(function(error) {
            console.log("Erreur lors du chargement du PDF :", error);
        });
        URL.revokeObjectURL(url);
    }
});
