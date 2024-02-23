document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('input[type="file"]');
    const urlInput = document.querySelector('input[type="url"]');
    const pdfViewer = document.getElementById('pdf-viewer');

    // Gérer le chargement de PDF par URL
    urlInput.addEventListener('change', function() {
        const url = urlInput.value;
        if (url) {
            // Ici, vous pouvez utiliser PDF.js pour charger et afficher le PDF
            console.log('Chargement du PDF depuis l\'URL:', url);
            loadPdf(url);
        }
    });

    // Gérer le chargement de PDF par sélection de fichier
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Ici, vous pouvez utiliser PDF.js pour charger et afficher le PDF
            console.log('Chargement du PDF depuis un fichier:', file.name);
            loadPdfFromFile(file);
        }
    });

    // Gérer le glisser-déposer
    const dropZone = document.body; // Utilisez `document.body` ou un élément spécifique comme zone de dépôt
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut
    });
    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            // Ici, vous pouvez utiliser PDF.js pour charger et afficher le PDF
            console.log('Chargement du PDF depuis le glisser-déposer:', file.name);
            loadPdfFromFile(file);
        }
    });

    // Exemple de fonction pour charger un PDF (à implémenter avec PDF.js ou autre)
    function loadPdf(url) {
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
        console.log("Le PDF est chargé");

        // Affichez la première page pour l'exemple
        pdfDoc.getPage(1).then(function(page) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var viewport = page.getViewport({scale: 1.5});

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Préparer l'affichage du rendu de la page
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);

            // Ajouter le canvas au PDF viewer
            pdfViewer.innerHTML = ''; // Nettoyer le viewer
            pdfViewer.appendChild(canvas);
        });
    }).catch(function(error) {
        console.log("Erreur lors du chargement du PDF :", error);
    });
}


    function loadPdfFromFile(file) {
    const url = URL.createObjectURL(file);
    loadPdf(url);
    // N'oubliez pas de libérer l'URL de l'objet quand elle n'est plus nécessaire
    URL.revokeObjectURL(url);
}

});
