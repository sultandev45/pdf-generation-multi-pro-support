// Adjust styles for responsive layout
function additionalPage(jerseyData) {
    return `<div id="neck" style="margin-top: -10px;" class="row row-3">
                    <div class="col  col-12 d-flex flex-column align-items-center justify-content-center p-0">
                        <div class="txt">
                            <p class="text-center h2">NECK TAPE</p>
                            <p id="color">COLOR: BLACK/WHITE</p>
                            <p class="text-center">SIZE: <span class="height">H-1.1CM</span></p>
                        </div>
                        <div style="margin-top: -4px;" class="image-container">
                            <img style="height: 12px;" src="./source/img/Neck Tape.svg" alt="Neck Tape"
                                class="neck-tape">
                            <div class="double-arrow arrow-vertical"></div>
                            <div class="arrow-label label-height">H</div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 10px;" class="row row-4 d-flex justify-content-center">
                    <!-- Instruction Label -->
                    <div class="col col-6">
                        <div class="txt">
                            <h1 class="h3 text-danger"
                                style="text-decoration: underline; margin-bottom: 4px !important;">
                                Instruction Label
                            </h1>
                            <h2 class="h6 mb-4"><strong>Position: 8cm Above Hem At Left Side Seam</strong></h2>
                        </div>
                        <div class="image-container">
                            <img style="height: 120px ;" src="./source/img/CareLabel.svg" alt="Care Label" class="logo">
                            <div class="double-arrow bg-danger horizontal arrow-horizontal"></div>
                            <div class="arrow-label label-width">2.5 cm</div>
                            <div class="double-arrow bg-danger vertical arrow-vertical"></div>
                            <div class="arrow-label label-height">4 cm</div>
                        </div>
                    </div>

                    <!-- Size Label -->
                    <div style="text-align: center;" class="col col-4">
                        <div class="txt">
                            <p style="text-align: center;">
                                SUBLIMATED SIZE LABEL <br>
                                INSIDE HALF MOON <br>
                                COLOR: PANTONE COOL GRAY 7 C <br>
                                POSITION: INSIDE C.B NECK LINE <br>
                                SIZE: <span class="height">H=2.6CM</span> X <span class="width">W=3.5CM</span>
                            </p>
                        </div>
                        <div class="image-container">
                            <img src="./source/img/SizeLabel.svg" alt="Size Label" class="logo">
                            <div class="double-arrow arrow-horizontal"></div>
                            <div class="arrow-label label-width">W</div>
                            <div class="double-arrow arrow-vertical"></div>
                            <div class="arrow-label label-height">H</div>
                        </div>
                    </div>
                </div>`;
}
async function initializeLogoGrid(jerseyData) {
    let totalLogos = jerseyData.logoInfo.length;
    let colWidth = 4;
    let additionData = '';
    totalLogos >= 3 ? colWidth = 4 : colWidth = Math.floor(12 / totalLogos);

    if (totalLogos < 7) {
        additionData = additionalPage(jerseyData);
    } else {
        additionData = '';
    }

    // Create the row HTML string
    let rowHtml = '<div class="row row-1 logo-row">';

    // Process logos sequentially
    for (const logo of jerseyData.logoInfo) {
        const col = await createLogoColumn(logo, colWidth);
        // Get the outerHTML of the column
        rowHtml += col.outerHTML;
    }

    rowHtml += '</div>';

    addResponsiveStyles();

    return `                       
        <div id="content"> 
            <div id="titleSection" class="d-flex justify-content-center align-items-center mb-2">
                <div id="artWorkBox">
                    <h3 id="artWorkTitle" class="art-work-title text-danger h3">LABEL'S INFORMATION</h3>
                </div>
            </div>
            <!-- Logo Rows -->
            <div class="container">
                ${rowHtml}
                ${staticLogo(jerseyData)}
                <div id="original-content">
                    <!-- Row 3: Neck Tape -->
                    ${additionData}                        
                </div>
            </div>
        </div>
    `;
}
function staticLogo(jerseyData) {
    return ` <!-- Row 2 -->
                    <div style="margin: 6px 0px;" class="row d-flex justify-content-between row-2">
                        <!-- HUMMEL Logo -->
                        <div class="col col-md-3">
                            <div class="txt">
                                <p>"HUMMEL" LOGO</p>
                                <p class="sublimation">SUBLIMATION</p>
                                <p>SIZE: <span class="height">H-4CM</span> X <span class="width"> W-4.5CM</span></p>
                                <p id="color" class="hummel-logo-color">COLOR:${jerseyData.designColors['hummel-logo'] ?
            `<span class="color-sample" style="background-color: ${jerseyData.designColors['hummel-logo'].colorHex}; 
             color: ${getContrastTextColor(jerseyData.designColors['hummel-logo'].colorHex)};">
             ${cleanAndFormatPantone(jerseyData.designColors['hummel-logo'].colorPantone)}
             </span>` : '<span class="color-sample">WHITE</span>'} 
                                </p>
                            </div>
                            <div class="image-container">
                                <img src="./source/img/hummel.png" alt="HUMMEL Logo" class="logo">
                                <div class="double-arrow arrow-horizontal"></div>
                                <div class="arrow-label label-width">W</div>
                                <div class="double-arrow arrow-vertical"></div>
                                <div class="arrow-label label-height">H</div>
                            </div>
                        </div>
                        <!-- CHEVRONS Logo -->
                        <div class="col col-md-2">
                            <div class="txt">
                                <p>"CHEVRONS" LOGO</p>
                                <p class="sublimation">SUBLIMATION</p>
                                <p>SIZE: <span class="height">H-20CM </span> X <span class="width">W-5CM</span></p>
                                <p id="color" class="chervons-color">COLOR:${jerseyData.designColors['hummel-logo'] ?`<span class="color-sample" style="background-color: ${jerseyData.designColors.chevrons.colorHex}; 
             color: ${getContrastTextColor(jerseyData.designColors.chevrons.colorHex)};">
             ${jerseyData.designColors.chevrons.elementName}`:'</span> <span class="color-sample">WHITE</span></p>'}
            
                            </div>
                            <div class="image-container">
                                <img src="./source/img/chervons.png" alt="CHEVRONS Logo" class="logo">
                                <div class="double-arrow arrow-horizontal"></div>
                                <div class="arrow-label label-width">W</div>
                                <div class="double-arrow arrow-vertical"></div>
                                <div class="arrow-label label-height">H</div>
                            </div>
                        </div>

                        <!-- Name -->
                        <div class="col col-md-2">
                            <div class="txt">
                                <p><span class="player-name">"${jerseyData.playerNameInfo.namePlayer}"</span> <span class="playernameheight height">H-${jerseyData.playerNameInfo.nameHeightCm} CM</span></p>
                                <p class="sublimation">SUBLIMATION</p>
                                <p class="player-font-name">FONT: ${jerseyData.playerNameInfo.nameFontStyle}</p>
                                <p id="color" class="player-name-color">COLOR:
                                    <span class="color-sample" style="background-color: ${jerseyData.playerNameInfo.nameColorHex};color:${getContrastTextColor(jerseyData.playerNameInfo.nameColorHex)}; ">${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorPantone)}</span>
                                    <span class="color-sample" style="background-color:${jerseyData.playerNameInfo.nameColorOutline}; color: ${getContrastTextColor(jerseyData.playerNameInfo.nameColorOutline)}; ">${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorOutlinePantone)}</span>
                                </p>
                            </div>
                            <div class="image-container name-container">
                                <img class="name-logo" src="./source/img/name.png" alt="Name Graphic" class="logo">
                                <div class="double-arrow arrow-vertical"></div>
                                <div class="arrow-label label-height">H</div>
                            </div>
                        </div>

                        <!-- Front Number -->
                        <div id="front_number" class="col col-md-2 p-0">
                            <div class="txt">
    ${jerseyData.playerNumberInfo.frontNumber ? `
        <p>"${jerseyData.playerNumberInfo.frontNumber.numberPlayer}"</p>
        <p class="sublimation">SUBLIMATION</p>
        <p>FONT: ${jerseyData.playerNumberInfo.frontNumber.numberFontStyle}</p>
        <p>SIZE: <span class="height">H-${jerseyData.playerNumberInfo.frontNumber.numberHeightCm} CM</span></p>
        <p id="color">COLOR:
            <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.frontNumber.numberColorHex}">
                ${cleanAndFormatPantone(jerseyData.playerNumberInfo.frontNumber.numberColorPantone)}
            </span>
            ${jerseyData.playerNumberInfo.frontNumber.hasOutline ? `
                <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.frontNumber.numberColorHex}; color:${getContrastTextColor(jerseyData.playerNumberInfo.frontNumber.numberColorHex)};">
                    ${cleanAndFormatPantone(jerseyData.playerNumberInfo.frontNumber.numberColorOutlinePantone)}
                </span>
            ` : `
                <span class="color-sample" style="background-color: blue; color: #fff;">True blue</span>
            `}
        </p>
    ` : `
        <p>"FRONT NUMBER"</p>
        <p class="sublimation">SUBLIMATION</p>
        <p>FONT: PROHIBITION</p>
        <p>SIZE: <span class="height">H-10.1 CM</span></p>
        <p id="color">COLOR:
            <span class="color-sample">WHITE</span>
            <span class="color-sample" style="background-color: blue; color: #fff;">True blue</span>
        </p>
    `}
</div>
                            <div class="image-container number-container">
                                <img style="height: 70px!important;" class="number-logo"
                                    src="./source/img/front_number.png" alt="Number Graphic" class="logo">
                                <div class="double-arrow arrow-vertical"></div>
                                <div class="arrow-label label-height">H</div>
                            </div>
                        </div>

                        <!-- Back Number -->
                        <div id="back_number" class="col col-md-2 p-0">
                            <div class="txt">
                                <p><span class="player-number">"${jerseyData.playerNumberInfo.numberPlayer}"</span> <span
                                        class="playernumberheight height">H-${jerseyData.playerNumberInfo.numberHeightCm} CM</span></p>
                                <p class="sublimation">SUBLIMATION</p>
                                <p class="player-font-number">FONT: ${jerseyData.playerNumberInfo.numberFontStyle}</p>
                                <p id="color" class="player-number-color">COLOR:
                                    
                                    <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.numberColorHex};
                                    color: ${getContrastTextColor(jerseyData.playerNumberInfo.numberColorHex)};">
                                    ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorPantone)}</span>
                                    <span class="color-sample" 
              style="background-color: ${jerseyData.playerNumberInfo.numberColorOutline};
                     color: ${getContrastTextColor(jerseyData.playerNumberInfo.numberColorOutline)};
                     display: inline;">
            ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorOutlinePantone)}
        </span>
                                </p>
                            </div>
                            <div class="image-container number-container">
                                <img style="height: 70px!important;" class="number-logo"
                                    src="./source/img/front_number.png" alt="Number Graphic" class="logo">
                                <div class="double-arrow arrow-vertical"></div>
                                <div class="arrow-label label-height">H</div>
                            </div>
                        </div>
                    </div>`;
}

async function createLogoColumn(logo, colWidth) {
    const col = document.createElement('div');
    col.className = `col col-logo multi-hide col-md-${colWidth}`;

    col.innerHTML = `
        <div class="txt">
            <p>"${logo.logoType.toUpperCase()}" LOGO</p>
            <p class="sublimation">SUBLIMATION</p>
            <p>SIZE: <span class="height">H-${logo.logoHeightCm.toFixed(1)}CM</span> X 
                      <span class="width">W-${logo.logoWidthCm.toFixed(1)}CM</span></p>
            <p id="color" class="logo-colors">COLOR: ${generateColorSamples(logo.logoColors)}</p>
        </div>
        <div class="image-container">
            <img src="" alt="${logo.logoType} Logo" class="logo loading">
            <div class="double-arrow arrow-horizontal"></div>
            <div class="arrow-label label-width">W</div>
            <div class="double-arrow arrow-vertical"></div>
            <div class="arrow-label label-height">H</div>
        </div>
    `;

    const img = col.querySelector('.logo');

    try {
        if (isPdfUrl(logo.logoImageUrl)) {
            //console.log("Processing PDF logo:", logo.logoImageUrl);
            img.src = await convertPdfToImage(logo.logoImageUrl);
        } else {
            img.src = logo.logoImageUrl;
        }
        img.classList.remove('loading');
    } catch (error) {
        console.error("Error loading logo image:", error);
        img.src = '/path/to/fallback-image.png'; // Better fallback
        img.alt = "Failed to load logo";
        img.classList.remove('loading');
    }

    return col;
}

async function convertPdfToImage(pdfUrl) {
    try {
        // 1. Load PDF.js if not already loaded
        if (typeof pdfjsLib === 'undefined') {
            await loadPdfJsLibrary();
        }

        // 2. Fetch the PDF with CORS handling
        const pdfBlob = await fetchPDFWithRetry(pdfUrl);

        // 3. Convert to image
        const pngData = await pdfToPNG(pdfBlob);
        return pngData;
    } catch (error) {
        console.error("PDF conversion failed:", error);
        throw error;
    }
}

async function loadPdfJsLibrary() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js';
        script.onload = () => {
            // Set worker path after library is loaded
            pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';
            resolve();
        };
        script.onerror = (e) => reject(new Error("Failed to load PDF.js library"));
        document.head.appendChild(script);
    });
}


async function fetchPDFWithRetry(url, retries = 3) {
    try {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'same-origin'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.blob();
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying PDF fetch (${retries} left)...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchPDFWithRetry(url, retries - 1);
        }
        throw error;
    }
}

async function pdfToPNG(pdfBlob, pageNum = 1, scale = 2.0) {
    try {
        const loadingTask = pdfjsLib.getDocument({
            url: URL.createObjectURL(pdfBlob),
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/cmaps/',
            cMapPacked: true
        });

        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNum);

        // Calculate viewport to maintain aspect ratio
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        return canvas.toDataURL("image/png", 0.8); // 80% quality
    } finally {
        // Clean up object URL
        URL.revokeObjectURL(pdfBlob);
    }
}

function isPdfUrl(url) {
    return url && /\.pdf($|\?)/i.test(url);
}

function addResponsiveStyles() {
    document.head.insertAdjacentHTML('beforeend', `
                <style>
                  .logo-row {
                    display: flex;
                    padding: 8px !important;
                    margin-bottom: 12px;
                    margin: 0 -10px;        
                  }
                  .row-1::-webkit-scrollbar {
                    height: 6px;
                  }
                  .row-1::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .row-1::-webkit-scrollbar-thumb {
                    background-color: #ddd;
                    border-radius: 3px;
                  }
                  .col-logo {
                    
                    flex: 0 0 auto;
                    
                  }
                 
                  .arrow-vertical {
                    height: 100%;
                  }
                  .label-height {
                    transform: translateY(-50%);
                  }
                  .logo.loading {
                    background: #f5f5f5;
                    min-height: 100px;
                  }
                </style>
            `);
}