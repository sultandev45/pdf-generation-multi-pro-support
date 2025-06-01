/**
 * Technical Drawing Sheet Generator
 * 
 * This module generates professional technical drawing sheets for custom jerseys
 * based on order data from the Custimoo platform.
 * 
 * Features:
 * - Multi-product order support
 * - Dynamic page generation
 * - Responsive layout
 * - PDF logo handling
 * - Print optimization
 * - Error handling
 * - Performance optimizations
 */

// ========================
// Module Configuration
// ========================
const CONFIG = {
    MAX_LOGOS_PER_PAGE: 6,
    BASE_IMAGE_URL: "https://custimoo.s3.us-east-1.amazonaws.com/",
    PDF_VIEWER_SCALE: 2.0,
    DEFAULT_PRODUCT_NAME: "BURLINGTON SOCCER",
    DEFAULT_SAMPLING_YEAR: new Date().getFullYear().toString()
};
// ========================
// Utility Functions
// ========================

/**
 * Converts centimeters to inches
 * @param {number} cm - Measurement in centimeters
 * @returns {string} - Formatted inches value
 */
function cmToInches(cm) {
    if (!cm || isNaN(cm)) return "0.00";
    return (cm / 2.54).toFixed(2);
}

/**
 * Determines optimal text color for a background color
 * @param {string} hexColor - Background color in hex format
 * @returns {string} - '#000000' for light backgrounds, '#ffffff' for dark
 */
function getContrastTextColor(hexColor) {
    if (!hexColor || !hexColor.startsWith('#')) return '#000000';

    try {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
    } catch (e) {
        console.error("Error calculating contrast color:", e);
        return '#000000';
    }
}

/**
 * Cleans and formats Pantone color strings
 * @param {string} pantone - Raw Pantone string
 * @returns {string} - Formatted Pantone value
 */
function cleanAndFormatPantone(pantone) {
    if (!pantone) return "N/A";
    return pantone.replace(/PANTONE\s*/i, '').trim();
}

/**
 * Generates HTML for color samples
 * @param {Array} colors - Array of color objects
 * @returns {string} - HTML string of color samples
 */
function generateColorSamples(colors) {
    if (!colors || !Array.isArray(colors)) return '';

    return colors.map(color => {
        if (!color || !color.colorHex) return '';

        const textColor = getContrastTextColor(color.colorHex);
        return `<span class="color-sample" 
                style="background-color: ${color.colorHex}; 
                       color: ${textColor};
                       display: inline;">${color.colorPantone || color.colorHex}</span>`;
    }).join('');
}

// ========================
// PDF Handling Utilities
// ========================

/**
 * Fetches PDF file from URL
 * @param {string} url - PDF URL
 * @returns {Promise<Blob>} - PDF blob
 */
async function fetchPDF(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.blob();
    } catch (error) {
        console.error("Failed to fetch PDF:", error);
        throw error;
    }
}

/**
 * Converts PDF page to PNG image
 * @param {Blob} pdfBlob - PDF file blob
 * @param {number} [pageNum=1] - Page number to convert
 * @returns {Promise<string>} - Data URL of PNG image
 */
async function pdfToPNG(pdfBlob, pageNum = 1) {
    try {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfBlob)).promise;
        const page = await pdf.getPage(Math.min(pageNum, pdf.numPages));
        const viewport = page.getViewport({ scale: CONFIG.PDF_VIEWER_SCALE });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: ctx,
            viewport: viewport
        }).promise;

        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error("PDF to PNG conversion failed:", error);
        throw error;
    }
}

/**
 * Loads PDF and converts to image
 * @param {string} url - PDF URL
 * @returns {Promise<string>} - Image URL
 */
async function loadPDF(url) {
    try {
        const pdfBlob = await fetchPDF(url);
        return await pdfToPNG(pdfBlob);
    } catch (error) {
        console.error("Failed to load PDF:", error);
        throw error;
    }
}

// ========================
// Data Processing Functions
// ========================

/**
 * Extracts and processes jersey data from order JSON
 * @param {Array} orderData - The order JSON data
 * @param {number} productIndex - Index of product to process
 * @returns {Object|null} - Processed jersey data or null if invalid input
 */
/**
 * Extracts and processes jersey data from order JSON
 * @param {Object} item - The order item object
 * @param {number} productIndex - Index of product to process
 * @returns {Object|null} - Processed jersey data or null if invalid input
 */
function extractJerseyData(items, productIndex = 0) {
    // Enhanced validation with debug information
    if (!items || !Array.isArray(items.factory_products)) {
        console.warn('Invalid items structure or missing factory_products array:', {
            itemsExists: !!items,
            isArray: Array.isArray(items?.factory_products),
            factoryProducts: items?.factory_products
        });
        return null;
    }

    if (items.factory_products.length <= productIndex) {
        console.warn('Product index out of bounds:', {
            availableProducts: items.factory_products.length,
            requestedIndex: productIndex,
            availableIds: items.factory_products.map(p => p?.id)
        });
        return null;
    }

    const product = items.factory_products[productIndex];
    console.debug('Processing product:', {
        id: product?.id,
        name: product?.product_name,
        index: productIndex
    });

    // Comprehensive product validation
    if (!product) {
        console.error('Product is null or undefined at index', productIndex);
        return null;
    }

    if (!product.product_id) {
        console.error('Product missing required product_id:', {
            productId: product.product_id,
            availableFields: Object.keys(product)
        });
        return null;
    }

    // Safely process data with fallbacks
    try {
     
        return{
            logoInfo: processLogoData(product.custom_logos || []),
            playerNameInfo: processNameData(product.product_custom_texts || []),
            playerNumberInfo: processNumberData(product.product_custom_texts || []),
            designColors: processDesignColors(product.svg_groups || []),
            productName: product.product_name || CONFIG.DEFAULT_PRODUCT_NAME,
            frontImage: product.front_image || CONFIG.DEFAULT_IMAGE,
            backImage: product.back_image || CONFIG.DEFAULT_IMAGE,
            productId: product.id || 'unknown-id',
            styleName: product.style_name || 'unknown-style',
            // Add debug information in development
            _debug: window.DEBUG_MODE ? {
                allCustomTexts: product.product_custom_texts,
                allLogos: product.custom_logos,
                allSvgGroups: product.svg_groups
            } : undefined
        };

       

        
    } catch (error) {
        console.error('Error processing jersey data:', {
            error: error.message,
            productId: product.id,
            stack: error.stack
        });
        return null;
    }
}
/**
 * Processes logo data into standardized format
 * @param {Array} logos - Raw logo data
 * @returns {Array} - Processed logo data
 */
function processLogoData(logos) {
    if (!logos || !Array.isArray(logos)) return [];

    return logos.map(logo => ({
        logoType: logo.name_of_placement || "Team Logo",
        logoImageUrl: logo.original_logo_url,
        logoWidthCm: parseFloat(logo.originalWidth) || 0,
        logoHeightCm: parseFloat(logo.originalHeight) || 0,
        logoWidthInche: cmToInches(parseFloat(logo.originalWidth)),
        logoHeightInche: cmToInches(parseFloat(logo.originalHeight)),
        logoColors: (logo.logo_colors || []).map(color => ({
            colorHex: color.hex || "#000000",
            colorPantone: color.pantone || "N/A"
        }))
    }));
}

/**
 * Processes player name data
 * @param {Array} texts - Raw text data
 * @returns {Object} - Processed name data
 */
function processNameData(texts) {
    const nameText = (texts || []).find(text => text.type === 'name')?.items?.[0] || {};
    const outlineWidth = parseFloat(nameText.outlineConvertedWidth) || 0;
    const heightCm = parseFloat(nameText.originalHeight) || 0;
    const widthCm = parseFloat(nameText.width_px) || 0;

    const totalHeight = heightCm + (outlineWidth > 0 ? outlineWidth : 0);
    const totalWidth = widthCm > 0 ? widthCm + (outlineWidth > 0 ? outlineWidth : 0) : 0;

    return {
        namePlayer: nameText.label || "Name",
        nameFontStyle: nameText.font_family || "Default",
        nameHeightCm: parseFloat(totalHeight.toFixed(1)),
        nameWidthCm: totalWidth,
        nameHeightInche: cmToInches(parseFloat(totalHeight.toFixed(1))),
        nameWidthInche: widthCm > 0 ? cmToInches(totalWidth) : 0,
        nameColorHex: nameText.color || "#000000",
        nameColorPantone: nameText.color_pantone || "N/A",
        nameColorOutline: nameText.outline_color || "N/A",
        nameColorOutlinePantone: nameText.outline_color_pantone || "N/A",
        nameOutlineWidthCm: outlineWidth,
        nameOutlineWidthInche: cmToInches(outlineWidth),
        namePlacement: nameText.placement || "Back",
        hasOutline: outlineWidth > 0
    };
}

/**
 * Processes player number data
 * @param {Array} texts - Raw text data
 * @returns {Object} - Processed number data
 */
function processNumberData(texts) {
    const numberTexts = (texts || []).filter(text => text.type === 'number').flatMap(text => text.items) || [];
    const backNumber = numberTexts.find(item => item.placement === 'Back') || {};
    const frontNumber = numberTexts.find(item => item.placement === 'Front');

    const outlineWidth = parseFloat(backNumber.outlineConvertedWidth) || 0;
    const heightCm = parseFloat(backNumber.originalHeight) || 0;
    const widthCm = parseFloat(backNumber.width_px) || 0;

    const totalHeight = heightCm + (outlineWidth > 0 ? outlineWidth : 0);
    const totalWidth = widthCm > 0 ? widthCm + (outlineWidth > 0 ? outlineWidth : 0) : 0;

    return {
        numberPlayer: backNumber.label || "Number",
        numberFontStyle: backNumber.font_family || "Default",
        numberHeightCm: parseFloat(totalHeight.toFixed(1)),
        numberWidthCm: totalWidth,
        numberHeightInche: cmToInches(parseFloat(totalHeight.toFixed(1))),
        numberWidthInche: widthCm > 0 ? cmToInches(totalWidth) : 0,
        numberColorHex: backNumber.color || "#000000",
        numberColorPantone: backNumber.color_pantone || "N/A",
        numberColorOutline: backNumber.outline_color || "N/A",
        numberColorOutlinePantone: backNumber.outline_color_pantone || "N/A",
        numberOutlineWidthCm: outlineWidth,
        numberOutlineWidthInche: cmToInches(outlineWidth),
        numberPlacement: backNumber.placement || "Back",
        hasOutline: outlineWidth > 0,
        frontNumber: frontNumber ? processFrontNumberData(frontNumber) : null
    };
}

/**
 * Processes front number data
 * @param {Object} frontNumber - Raw front number data
 * @returns {Object} - Processed front number data
 */
function processFrontNumberData(frontNumber) {
    return {
        numberPlayer: frontNumber.label || "Number",
        numberFontStyle: frontNumber.font_family || "Default",
        numberHeightCm: parseFloat(frontNumber.originalHeight) || 0,
        numberWidthCm: parseFloat(frontNumber.width_px) || 0,
        numberHeightInche: cmToInches(parseFloat(frontNumber.originalHeight) || 0),
        numberColorHex: frontNumber.color || "#000000",
        numberColorPantone: frontNumber.color_pantone || "N/A",
        numberColorOutline: frontNumber.outline_color || "N/A",
        numberColorOutlinePantone: frontNumber.outline_color_pantone || "N/A",
        numberOutlineWidthCm: parseFloat(frontNumber.outlineConvertedWidth) || 0,
        hasOutline: parseFloat(frontNumber.outlineConvertedWidth) > 0
    };
}

/**
 * Processes design colors
 * @param {Array} svgGroups - Raw SVG group data
 * @returns {Object} - Processed color data
 */
function processDesignColors(svgGroups) {
    return (svgGroups || []).reduce((acc, group) => {
        const groupId = group.id || "unnamed";
        acc[groupId] = {
            elementName: group.name || "Unnamed color",
            elementId: groupId,
            colorHex: group.color || "#000000",
            colorPantone: group.pantone || "N/A"
        };
        return acc;
    }, {});
}

// ========================
// Page Generation Functions
// ========================

/**
 * Generates page header
 * @param {Object} orderData - Order data
 * @param {number} pageNumber - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {string} productName - Name of the product
 * @returns {string} - HTML string of header
 */
function generateHeader(jerseyData, orderData, pageNumber, totalPages, productName = CONFIG.DEFAULT_PRODUCT_NAME) {
   
    return `
    <div id="header" class="row header">
        <div id="headerRow" class="col-md-12 d-flex justify-content-between align-items-center p-2">
            <div id="customerBox" class="border px-3 py-2 col-auto">
                <p id="customerText" class="font-weight-bold py-1 m-0">&nbsp</p>
            </div>

            <div id="titleBox" class="border px-3 py-2 mx-2 flex-grow-1 text-center">
                <h1 id="title" class="h4 font-weight-bold m-0">Technical Drawing Sheet</h1>
            </div>

            <div id="companyBox" class="border px-3 py-2 col-auto">
                <h2 id="companyName" class="h4 font-weight-bold m-0 text-center">${orderData.company_name || ''}</h2>
            </div>
        </div>

        <div id="customerDetails" class="col-md-12 d-flex align-items-center p-2 w-100 flex-nowrap">
            <div id="customerNameBox" class="border py-2 px-2 flex-grow-1">
                <p class="m-0"><strong class="pe-1">Customer:</strong><span class="customerName">${orderData.customer_name || ''}</span></p>
            </div>
            <div id="artNumberBox" class="border py-2 px-2 mx-2 flex-grow-1">
                <p style="margin-bottom: 0px;" class="artnumber m-0"><strong class="pe-1">Art #:</strong>${orderData.order_no || '&nbsp;'} ${orderData.art_number || ''}</p>
            </div>
            <div id="artDetails" class="d-flex align-items-center art-1 ps-2" style="flex: 0 0 60.5%;">
                <div id="artNameBox" class="border py-2 art-2 px-2" style="flex: 0 0 64.5%;">
                    <p id="artName" class="m-0"><strong class="pe-1">Art Name:</strong> ${productName}</p>
                </div>
                <div id="samplingBox" class="border py-2 px-2 w-100 flex-grow-1">
                    <p id="sampling" class="m-0"><strong>Sampling:</strong> ${orderData.sampling_year || CONFIG.DEFAULT_SAMPLING_YEAR}</p>
                </div>
            </div>
        </div>

        <div id="colorSection" class="col-md-12 d-flex justify-content-between align-items-center p-2 flex-wrap">
            <div id="customerArtBox" class="border py-2 px-3 flex-grow-1">
                <p id="customerArt" class="m-0"><strong>Customer Art #:</strong> ${orderData.customer_art_number || 'UNIFORM FALL 25'}</p>
            </div>
            <div id="colorBox" class="border py-2 px-3 mx-2 text-center">
                <p id="color" class="color-display m-0"><strong>Color: </strong>
                    ${generateUniqueColorSpans(jerseyData)}
                </p>
            </div>
            <div id="pageBox" class="border py-2 px-3">
                <p id="pageNumber" class="m-0 page-number">Page: ${pageNumber} of ${totalPages}</p>
            </div>
        </div>
    </div>`;
}

/**
 * Generates unique color spans for display
 * @param {Object} orderData - Order data
 * @returns {string} - HTML string of color spans
 */
function generateUniqueColorSpans(jerseyData) {
  
   
    
    if (!jerseyData?.designColors) {
        console.warn('generateUniqueColorSpans: No design colors available', {
            jerseyData: jerseyData,
            
        });
        return '';
    }

    // Process unique colors
    const uniqueColors = [];
        const seenHex = new Set();
        const seenNames = new Set();
   Object.values(jerseyData.designColors).forEach(design => {
    const colorName = design.elementName || "Unnamed color";
    const isUnnamed = colorName.includes("Unnamed color");
    
    if (isUnnamed) {
        // For unnamed colors, only check hex to prevent exact duplicates
        if (!seenHex.has(design.colorHex)) {
            seenHex.add(design.colorHex);
            uniqueColors.push({
                ...design,
                elementName: colorName // Ensure consistent naming
            });
        }
    } else {
        // For named colors, check both name and hex
        if (!seenHex.has(design.colorHex) && !seenNames.has(colorName)) {
            seenHex.add(design.colorHex);
            seenNames.add(colorName);
            uniqueColors.push(design);
        }
    }
});
    console.debug('[generateUniqueColorSpans] Unique colors:', uniqueColors);
    
    return uniqueColors.length > 0 
        ? uniqueColors.map(design => `
            <span class="color-sample" 
                  style="background-color: ${design.colorHex}; 
                         color: ${getContrastTextColor(design.colorHex)};">
                ${design.elementName}
            </span>
          `).join('')
        : '<span class="no-colors">No colors specified</span>';
}
/**
 * Generates page footer
 * @returns {string} - HTML string of footer
 */
function generateFooter() {
    return `
    <footer style="padding: 4px;" id="footer" class="container">
        <p><strong>Designed By: <a
                    style="font-size: 14px; font-weight: 600; color: rgb(53, 3, 12); text-decoration: none;" 
                    id="designedBy" href="https://sultandev45.github.io/portfolio/" target="_blank">Mubasher Sultan</a></strong></p>
    </footer>`;
}

/**
 * Generates first page content
 * @param {Object} orderData - Order data
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of first page content
 */

function generateFirstPage(orderData, jerseyData) {
    const frontImage = jerseyData.frontImage || `${CONFIG.BASE_IMAGE_URL}placeholder_front.png`;
    const backImage = jerseyData.backImage || `${CONFIG.BASE_IMAGE_URL}placeholder_back.png`;

    return `
    <div id="content">
        <div id="titleSection" class="d-flex justify-content-between align-items-center mb-4">
            <div id="sublimationBox">
                <h2 id="sublimationTitle" class="h4 section-title">FULL SUBLIMATION</h2>
            </div>
            <div id="artWorkBox" class="flex-grow-1 art-work">
                <h3 id="artWorkTitle" class="art-work-title h5">Art Work</h3>
            </div>
        </div>

        <div id="imagecontainer multi-hide" data-section-name="Front View Container">
            <div class="containerimage multi-hide">
                <!-- Front Image -->
                <div id="imageFrontContainer" class="text-center mb-4 image-container">
                    <img id="imageFront" src="${frontImage}" 
                         alt="Front view of the jersey with various labels">
                </div>

                ${generateFrontElements(jerseyData)}
            </div>

            <div class="containerimage multi-hide">
                <!-- Back Image -->
                <div id="imageBackContainer" class="text-center mb-4 image-container">
                    <img id="imageBack" src="${backImage}" 
                         alt="Back view of the jersey with various labels">
                </div>

                ${generateBackElements(jerseyData)}
            </div>
        </div>

        ${generateFabricDescription()}
    </div>`;
}
/**
 * Generates front elements section
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of front elements
 */
function generateFrontElements(jerseyData) {
    return `
    <!-- Front Left Elements -->
    <div class="label neck-tape">
        NECK TAPE<br>Color: <span class="neck-color">BLACK/WHITE</span>
        <br>Size: <span class="height neck-height">H-1.1CM</span>
    </div>
    <div class="arrow arrow-neck"></div>

    <div class="label hummel-logo">
        "HUMMEL" LOGO <br><span class="sublimation">SUBLIMATION</span>
        <br>Size: <span class="height">H-4CM </span> X <span class="width">W-4.5CM</span>
        <p id="color" class="hummel-logo-color">Color:${jerseyData.designColors['hummel-logo'] ?
            `<span class="color-sample" style="background-color: ${jerseyData.designColors['hummel-logo'].colorHex}; 
             color: ${getContrastTextColor(jerseyData.designColors['hummel-logo'].colorHex)};">
             ${cleanAndFormatPantone(jerseyData.designColors['hummel-logo'].colorPantone)}
             </span>` : ''}
        </p>
    </div>
    <div class="arrow arrow-hummel"></div>

    ${jerseyData.playerNumberInfo.frontNumber ? `
    <div id="front-number" class="label front-number">
        FRONT NUMBER<br>Size: <span class="height">H-${jerseyData.playerNumberInfo.frontNumber.numberHeightCm} CM</span>
        <p id="color">COLOR:
            <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.frontNumber.numberColorHex};color:${getContrastTextColor(jerseyData.playerNumberInfo.frontNumber.numberColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNumberInfo.frontNumber.numberColorPantone)}
            </span>
            ${jerseyData.playerNumberInfo.frontNumber.hasOutline ? `
            <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.frontNumber.numberColorOutline};color:${getContrastTextColor(jerseyData.playerNumberInfo.frontNumber.numberColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNumberInfo.frontNumber.numberColorOutlinePantone)}
            </span>
            ` : ''}
        </p>
    </div>
    <div id="arrow-front-number" class="arrow arrow-front-number"></div>
    ` : ''}

    <div class="label front-back-fabric">
        FRONT & BACK IN MAIN FABRIC<br> <span class="sublimation">SUBLIMATION</span>
    </div>
    <div class="arrow arrow-fabric"></div>

    <!-- Front Right Elements -->
    <div class="label neck-tape-1">
        SUBLIMATED SIZE LABEL <br>INSIDE HALF MOON
        <p class="color">PANTONE COOL GRAY 7 C</p>
        SIZE: <span class="height">H=2.6CM</span> X <span class="width">W=3.5CM</span>
    </div>
    <div class="arrow arrow-neck-1"></div>

    <div class="label burlington-logo">
        "BURLINGTON" LOGO <br> <span class="sublimation">SUBLIMATION</span> <br>
        <span class="burlington-logo-size">Size:
            <span class="height">H-${jerseyData.logoInfo[0].logoHeightCm}CM </span> X 
            <span class="width">W-${jerseyData.logoInfo[0].logoWidthCm}CM</span>
        </span> <br>
        <p id="color" class="logoColors">COLOR: ${generateColorSamples(jerseyData.logoInfo[0].logoColors)}</p>
    </div>
    <div class="arrow arrow-burlington"></div>

    <div class="label front-inside">INSIDE CARE LABEL</div>
    <div class="arrow arrow-inside"></div>`;
}

/**
 * Generates back elements section
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of back elements
 */
function generateBackElements(jerseyData) {
    return `
    <!-- Back Left Elements -->
    <div class="label chevrons-logo">
        "CHEVRONS" LOGO<br> <span class="sublimation">SUBLIMATION</span><br>
        SIZE: <span class="height"> H-20CM</span>X <span class="width">W-5CM</span>
        <p id="color" class="chervons-color">Color: 
            <span class="color-sample" style="background-color: ${jerseyData.designColors.chevrons.colorHex}; 
             color: ${getContrastTextColor(jerseyData.designColors.chevrons.colorHex)};">
             ${jerseyData.designColors.chevrons.elementName}
            </span>
        </p>
    </div>
    <div class="arrow arrow-chevrons"></div>

    <div class="label bottom-stich">BOTTOM HEM WITH<br>2NDL TOP STICH</div>
    <div class="arrow arrow-bottom-stich"></div>

    <!-- Back Right Elements -->
    <div class="label back-logo-fabric">HALF MOON IN MAIN FABRIC</div>
    <div class="arrow arrow-back-logo-fabric"></div>

    <div class="label name">
        <span class="shirt_name"><span class="player-name">"${jerseyData.playerNameInfo.namePlayer}"</span></span>
        <span class="playernameheight height">H-${jerseyData.playerNameInfo.nameHeightCm} CM</span> <br>
        <span class="sublimation">SUBLIMATION</span><br>
        <span class="font_name player-font-name">FONT: ${jerseyData.playerNameInfo.nameFontStyle}</span>
        <p id="color" class="player-name-color">Color: 
            <span class="color-sample" style="background-color: ${jerseyData.playerNameInfo.nameColorHex};color:${getContrastTextColor(jerseyData.playerNameInfo.nameColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorPantone)}
            </span>
            <span class="color-sample" style="background-color: ${jerseyData.playerNameInfo.nameColorOutline};color:${getContrastTextColor(jerseyData.playerNameInfo.nameColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorOutlinePantone)}
            </span>
        </p>
    </div>
    <div class="arrow arrow-name"></div>

    <div id="sleeves-color" class="label arms">
        SLEEVES IN MAIN FABRIC<br> <span class="sublimation">SUBLIMATION</span>
        <br>COLOR: <span class="color-sample" style="background-color: ${jerseyData.designColors.sleeves.colorHex}">
        ${jerseyData.designColors.sleeves.elementName}</span>
    </div>
    <div class="arrow arrow-arms"></div>

    <div class="label number">
        <span class="player-number shirt_number">"${jerseyData.playerNumberInfo.numberPlayer}"</span>
        <span class="playernumberheight height"> H-${jerseyData.playerNumberInfo.numberHeightCm} CM</span><br>
        <span class="sublimation">SUBLIMATION</span> <br>
        <span class="player-font-number font_name_number">FONT: ${jerseyData.playerNumberInfo.numberFontStyle}</span>
        <p id="color" class="player-number-color">Color: 
            <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.numberColorHex};color:${getContrastTextColor(jerseyData.playerNumberInfo.numberColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorPantone)}
            </span>
            <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.numberColorOutline};color:${getContrastTextColor(jerseyData.playerNumberInfo.numberColorHex)};">
                ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorOutlinePantone)}
            </span>
        </p>
    </div>
    <div class="arrow arrow-number"></div>`;
}

/**
 * Generates fabric description section
 * @returns {string} - HTML string of fabric description
 */
function generateFabricDescription() {
    return `
    <div id="fabricDescription" class="fabri-description container w-100 py-0">
        <div id="fabricTitleBox" class="border border-black p-2 w-100 no-gutters">
            <h1 id="fabricTitle" class="h4 font-weight-bold">Fabric Description:-</h1>
        </div>
        <div id="fabricDetails" class="row mt-2 no-gutters">
            <div id="fabricShellBox" class="col-md-6 border border-black p-2">
                <p id="shellFabric1"><strong>Shell Fabric # 1:</strong> <span class="text-danger font-weight-bold">INTERLOCK 140</span></p>
                <p id="shellFabric2"><strong>Shell Fabric # 2:</strong></p>
                <p id="shellFabric3"><strong>Shell Fabric # 3:</strong></p>
            </div>
            <div id="fabricMeshBox" class="col-md-6 border border-black p-2">
                <p id="liningFabric1"><strong>Mesh Fabric # 1:</strong></p>
                <p id="liningFabric2"><strong>Mesh Fabric # 2:</strong></p>
                <p id="liningFabric3"><strong>Mesh Fabric # 3:</strong></p>
            </div>
        </div>
    </div>`;
}

/**
 * Generates logo pages
 * @param {Array} logos - Array of logo data
 * @returns {string} - HTML string of logo pages
 */
/**


// ========================
// Main Functions
// ========================

/**
 * Main function to generate technical drawing sheets for all products
 * @param {Object} orderData - The order JSON data
 * @returns {Promise<void>}
 */
/**
 * Main function to generate technical drawing sheets for all products
 * @param {Object} orderData - The order JSON data
 * @returns {Promise<void>}
 */

async function generateTechnicalDrawing(orderData) {
    try {
        
        // Clear previous content
        allContent.innerHTML = '';
        errorDiv.textContent = '';

        if (!orderData || !orderData.items || !orderData.items.length) {
            throw new Error('Invalid order data format');
        }

        // Calculate total pages
        let totalPages = 0;
        const items = orderData.items;

        items.forEach(item => {
            if (item.factory_products && item.factory_products.length) {
                // 3 base pages per product + logo pages
                totalPages += item.factory_products.length * 3;
                item.factory_products.forEach(product => {
                    if (product.custom_logos && product.custom_logos.length) {
                        totalPages += Math.ceil(product.custom_logos.length / CONFIG.MAX_LOGOS_PER_PAGE);
                    }
                });
            }
        });

        // Generate pages for each product
        let currentPage = 1;

        for (const item of items) {
            if (!item.factory_products || !item.factory_products.length) continue;

            for (let productIndex = 0; productIndex < item.factory_products.length; productIndex++) {
                const pagesPerProduct = 3 +
                    (item.factory_products[productIndex].custom_logos?.length ?
                        Math.ceil(item.factory_products[productIndex].custom_logos.length / CONFIG.MAX_LOGOS_PER_PAGE) : 0);

                const productPages = await generateProductPages(
                    orderData,
                    item,
                    productIndex,
                    currentPage,
                    totalPages
                );

                allContent.innerHTML += productPages;
                currentPage += pagesPerProduct;
            }
        } 
    } catch (error) {
        console.error('Error generating technical drawing:', error);
        errorDiv.textContent = `Error: ${error.message}`;
    }
}
// ========================
// Product Page Generation
// ========================

/**
 * Generates all pages for a single product
 * @param {Object} orderData - Full order data
 * @param {Object} item - Order item
 * @param {number} productIndex - Product index
 * @param {number} basePageNumber - Starting page number
 * @param {number} totalPages - Total pages in document
 * @returns {Promise<string>} - HTML for all product pages
 */
async function generateProductPages(orderData, item, productIndex, basePageNumber, totalPages) {
    const jerseyData = extractJerseyData(item, productIndex);
    //console.log("ProductPageJersey",jerseyData);
    if (!jerseyData) return '';

    let html = '';
    const productName = jerseyData.productName;
    const productIdentifier = `${productName} (${jerseyData.styleName || 'No Style'})`;

    // Technical Drawing Page
const logoGridHtml = await initializeLogoGrid(jerseyData);
    html += `<div id="container" class="container border-container my-4 w-75 page first-page data-product-id="${jerseyData.productId}">
    
        ${generateHeader(jerseyData,orderData, basePageNumber, totalPages, productIdentifier)}
        ${generateFirstPage(orderData, jerseyData)}
        ${generateFooter()}
    </div>`;

    // Labels And Logo Information Page
    html += `<div id="container" class="container border-container my-4 w-75 page second-page data-product-id="${jerseyData.productId}">
        ${generateHeader(jerseyData,orderData, basePageNumber + 1, totalPages, productIdentifier)}
        ${logoGridHtml}
        ${generateFooter()}
    </div>`;
    
//AdditionalPage if logo exceed 7
    let totalLogos = jerseyData.logoInfo.length;
   
    if (totalLogos >= 7) {



      
      html += `<div id="container" class="container border-container my-4 w-75 page third-page addition-page">                
        ${generateHeader(jerseyData,orderData, basePageNumber + 2, totalPages, productIdentifier)}
            
      <div id="content"> 
       ${additionalPage(jerseyData)}
            </div>
        ${generateFooter()}
            </div> `

    }
    // Size Chart Page
    html += `<div id="container" class="container border-container my-4 w-75 page third-page data-product-id="${jerseyData.productId}">

        ${generateHeader(jerseyData,orderData, basePageNumber + 2, totalPages, productIdentifier)}
        ${generateSizeChartPage()}
        ${generateFooter()}
    </div>`;

    

    return html;
}

// ========================
// Main Generator Function
// ========================

/**
 * Main function to generate technical drawing sheets for all products
 * @param {Object} orderData - The order JSON data
 * @returns {Promise<void>}
 */
async function generateTechnicalDrawing(orderData) {
    try {
        // Clear previous content
        allContent.innerHTML = '';
        errorDiv.textContent = '';

        if (!orderData || !orderData.items || !orderData.items.length) {
            throw new Error('Invalid order data format');
        }

        // Calculate total pages
        let totalPages = 0;
        const items = orderData.items;

        items.forEach(item => {
            if (item.factory_products && item.factory_products.length) {
                // 3 base pages per product + logo pages
                totalPages += item.factory_products.length * 3;
                item.factory_products.forEach(product => {
                    if (product.custom_logos && product.custom_logos.length) {
                        totalPages += Math.ceil(product.custom_logos.length / CONFIG.MAX_LOGOS_PER_PAGE);
                    }
                });
            }
        });

        // Generate pages for each product
        let currentPage = 1;

        for (const item of items) {
            if (!item.factory_products || !item.factory_products.length) continue;

            for (let productIndex = 0; productIndex < item.factory_products.length; productIndex++) {
                const pagesPerProduct = 3 +
                    (item.factory_products[productIndex].custom_logos?.length ?
                        Math.ceil(item.factory_products[productIndex].custom_logos.length / CONFIG.MAX_LOGOS_PER_PAGE) : 0);

                const productPages = await generateProductPages(
                    orderData,
                    item,
                    productIndex,
                    currentPage,
                    totalPages
                );

                allContent.innerHTML += productPages;
                currentPage += pagesPerProduct;
            }
        }

    } catch (error) {
        console.error('Error generating technical drawing:', error);
        errorDiv.textContent = `Error: ${error.message}`;
    }
}

// ========================
// Supporting Functions
// ========================

/**
 * Generates labels information page
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of labels page
 */


/**
 * Generates logo rows for the labels information page
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of logo rows
 */



/**
 * Generates size chart page
 * @returns {string} - HTML string of size chart page
 */
function generateSizeChartPage() {
    return `
    <div id="content">
        <div id="titleSection" class="d-flex justify-content-center align-items-center">
            <div id="artWorkBox" class="mb-2">
                <h3 id="artWorkTitle" class="art-work-title text-danger h3">SIZE CHART</h3>
            </div>
        </div>
        ${generateSizeChartTables()}
    </div>`;
}
/**
 * Generates logo rows for the labels information page
 * @param {Object} jerseyData - Processed jersey data
 * @returns {string} - HTML string of logo rows
 */
// function generateLogoRows(jerseyData) {
//     if (!jerseyData.logoInfo || !jerseyData.logoInfo.length) {
//         return '<div class="alert alert-info">No logo information available</div>';
//     }

//     return `
//     <div class="container">
//         <div class="row">
//             <div class="col-12">
//                 <div class="table-responsive">
//                     <table class="table table-bordered table-striped">
//                         <thead class="thead-dark">
//                             <tr>
//                                 <th>Logo Type</th>
//                                 <th>Placement</th>
//                                 <th>Dimensions (cm)</th>
//                                 <th>Dimensions (inches)</th>
//                                 <th>Colors</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${jerseyData.logoInfo.map(logo => `
//                                 <tr>
//                                     <td>${logo.logoType || 'N/A'}</td>
//                                     <td>${logo.logoPlacement || 'Front'}</td>
//                                     <td>${logo.logoWidthCm} × ${logo.logoHeightCm}</td>
//                                     <td>${logo.logoWidthInche} × ${logo.logoHeightInche}</td>
//                                     <td>${generateColorSamples(logo.logoColors)}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     </div>`;
// }
/**
 * Generates size chart page
 * @returns {string} - HTML string of size chart page
 */
function generateSizeChartPage() {
    return `
    <div id="content">
        <div id="titleSection" class="d-flex justify-content-center align-items-center">
            <div id="artWorkBox" class="mb-2">
                <h3 id="artWorkTitle" class="art-work-title text-danger h3">SIZE CHART</h3>
            </div>
        </div>
        ${generateSizeChartTables()}
    </div>`;
}
function generateSizeChartTables() {
    return `<div class="container">
                    <div class="row">
                        <div class="col col-12">
                            <h4 class="h5 mb-2">Measurement Chart (ALL UNITS IN CM)</h4>
                            <div class="table">
                                <!-- Size Chart Tables -->
                                <table class="table table-bordered ">
                                    <thead style="background-color: #f9f9f9;">
                                        <tr>
                                            <th>Description US Sizes</th>
                                            <th>+/-</th>
                                            <th>XXS</th>
                                            <th>XS</th>
                                            <th>S</th>
                                            <th>M</th>
                                            <th>L</th>
                                            <th>XL</th>
                                            <th>2XL</th>
                                            <th>3XL</th>
                                            <th>4XL</th>
                                            <th>5XL</th>
                                        </tr>
                                        <tr>
                                            <th>Description EU Sizes</th>
                                            <th>+/-</th>
                                            <th>XS</th>
                                            <th>S</th>
                                            <th>M</th>
                                            <th>L</th>
                                            <th>XL</th>
                                            <th>2XL</th>
                                            <th>3XL</th>
                                            <th>4XL</th>
                                            <th>5XL</th>
                                            <th>6XL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>001: 1/2 CHEST WIDTH - MS. 2 CM BELOW ARMHOLE</td>
                                            <td>1</td>
                                            <td>46</td>
                                            <td>49</td>
                                            <td>52</td>
                                            <td>55</td>
                                            <td>58</td>
                                            <td>61</td>
                                            <td>65</td>
                                            <td>71</td>
                                            <td>76</td>
                                            <td>81</td>
                                        </tr>
                                        <tr>
                                            <td>004: 1/2 BOTTOM WIDTH</td>
                                            <td>1</td>
                                            <td>45</td>
                                            <td>48</td>
                                            <td>51</td>
                                            <td>54</td>
                                            <td>57</td>
                                            <td>60</td>
                                            <td>64</td>
                                            <td>70</td>
                                            <td>75</td>
                                            <td>80</td>
                                        </tr>
                                        <tr>
                                            <td>046: BOTTOM HEM STITCH HEIGHT</td>
                                            <td>0.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                        </tr>
                                        <tr>
                                            <td>021: BACK LENGTH - MS. FROM HPS</td>
                                            <td>1</td>
                                            <td>70</td>
                                            <td>71.5</td>
                                            <td>73</td>
                                            <td>74.5</td>
                                            <td>76</td>
                                            <td>77.5</td>
                                            <td>78.5</td>
                                            <td>85</td>
                                            <td>86</td>
                                            <td>87</td>
                                        </tr>
                                        <tr>
                                            <td>020: Front LENGTH - MS. FROM HPS</td>
                                            <td>1</td>
                                            <td>70</td>
                                            <td>71.5</td>
                                            <td>73</td>
                                            <td>74.5</td>
                                            <td>76</td>
                                            <td>77.5</td>
                                            <td>78.5</td>
                                            <td>85</td>
                                            <td>86</td>
                                            <td>87</td>
                                        </tr>
                                        <tr>
                                            <td>155: BOTTOM DETAIL HEIGHT</td>
                                            <td>0</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                            <td>0.6</td>
                                        </tr>
                                        <tr>
                                            <td>007: NECK WIDTH - MS. FROM HPS TO HPS</td>
                                            <td>0.5</td>
                                            <td>18.5</td>
                                            <td>19</td>
                                            <td>19.5</td>
                                            <td>20</td>
                                            <td>20.5</td>
                                            <td>21</td>
                                            <td>21.5</td>
                                            <td>22</td>
                                            <td>22</td>
                                            <td>22</td>
                                        </tr>
                                        <tr>
                                            <td>009: NECK DROP BACK</td>
                                            <td>0.5</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>010: SLEEVE LENGTH - MS. FROM CB TO END SLEEVE</td>
                                            <td>1</td>
                                            <td>41</td>
                                            <td>42.5</td>
                                            <td>44</td>
                                            <td>45.5</td>
                                            <td>47</td>
                                            <td>48</td>
                                            <td>49</td>
                                            <td>50.00</td>
                                            <td>51.00</td>
                                            <td>52.00</td>
                                        </tr>
                                        <tr>
                                            <td>012: ARMHOLE DEPTH - RAGLAN - MS. FROM HPS</td>
                                            <td>0.5</td>
                                            <td>25.6</td>
                                            <td>26.8</td>
                                            <td>28</td>
                                            <td>29.15</td>
                                            <td>30.3</td>
                                            <td>31.45</td>
                                            <td>32.8</td>
                                            <td>33.95</td>
                                            <td>35.1</td>
                                            <td>36.25</td>
                                        </tr>
                                        <tr>
                                            <td>013: 1/2 UPPER SLEEVE WIDTH</td>
                                            <td>0.5</td>
                                            <td>19</td>
                                            <td>21</td>
                                            <td>22</td>
                                            <td>23</td>
                                            <td>24</td>
                                            <td>25</td>
                                            <td>26.2</td>
                                            <td>27</td>
                                            <td>28</td>
                                            <td>29</td>
                                        </tr>
                                        <tr>
                                            <td>016: 1/2 BOTTOM SLEEVE WIDTH</td>
                                            <td>0.5</td>
                                            <td>15.5</td>
                                            <td>16.25</td>
                                            <td>17</td>
                                            <td>17.75</td>
                                            <td>18.5</td>
                                            <td>19.25</td>
                                            <td>20.25</td>
                                            <td>21</td>
                                            <td>21.75</td>
                                            <td>22.5</td>
                                        </tr>
                                        <tr>
                                            <td>045: SLEEVE HEM STITCH HEIGHT</td>
                                            <td>0.2</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                            <td>1.5</td>
                                        </tr>
                                        <thead>
                                            <tr>
                                                <th style="font-size: 10px">007: NECK WIDTH - MS FROM HPS TO HPS, 1/2
                                                    MIN
                                                    STRETCH WIDTH</th>
                                                <th>0.5</th>
                                                <th>30.5</th>
                                                <th>31</th>
                                                <th>31.5</th>
                                                <th>32</th>
                                                <th>32.5</th>
                                                <th>33</th>
                                                <th>33.5</th>
                                                <th>34</th>
                                                <th>34</th>
                                                <th>34</th>
                                            </tr>
                                        </thead>
                                    </tbody>
                                </table>

                                <!-- Second Table -->

                                <table class="table table-bordered ">
                                    <thead style="background-color: #41ed38;">
                                        <tr>
                                            <th>HANSEN NECKLINE</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>0</th>
                                            <th>0</th>
                                            <th>0</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>007: NECK WIDTH - MS. FROM HPS TO HPS - HANSEN</td>
                                            <td>0.5</td>
                                            <td>19</td>
                                            <td>19.5</td>
                                            <td>20</td>
                                            <td>20.5</td>
                                            <td>21</td>
                                            <td>21.5</td>
                                            <td>22</td>
                                            <td>22</td>
                                            <td>22</td>
                                            <td>22</td>
                                        </tr>
                                        <tr>
                                            <td>008: NECK DROP FRONT - HANSEN</td>
                                            <td>0.5</td>
                                            <td>9.4</td>
                                            <td>9.7</td>
                                            <td>10</td>
                                            <td>10.3</td>
                                            <td>10.6</td>
                                            <td>10.9</td>
                                            <td>11.2</td>
                                            <td>11.2</td>
                                            <td>11.2</td>
                                            <td>11.2</td>
                                        </tr>
                                        <tr>
                                            <td>049: COLLAR HEIGHT - CB - HANSEN</td>
                                            <td>0.2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>2</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-12">
                            <h4 class="h5 text-danger m-0">NOTE: FOLLOW US SIZES</h4>
                            <div class="image-container"><img src="./source/img/note_size.png" alt=""></div>
                        </div>
                    </div>
                </div>`;
}
// ========================
// Event Listeners
// ========================
async function handleFetchOrder() {
    const orderNumber = document.getElementById('orderNumber').value.trim();

    if (!orderNumber) {
        errorDiv.textContent = '⚠ Please enter an order number.';
        return;
    }

    try {
        errorDiv.textContent = "🔄 Fetching order details...";

        // Call the reusable dataProcess function//
        const orderData = await dataProcess(orderNumber);

        // ✅ Display success message
        errorDiv.textContent = "✅ Order Loaded Successfully!";

        // ✅ Populate the HTML with the fetched data
        changeTitle(orderData.order_no);
        await generateTechnicalDrawing(orderData);

        setTimeout(() => {
            updatePageNumbers();
           setTimeout(() => {
            updateFabricDescription();
        }, 1000);
        }, 1000);

        // Hide form with fade-out effect
        hideForm();

        // Show all-content with fade-in effect
        showContent();
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = ` ${error.message}`;
    }
}


// ========================
// Print Functionality
// ========================


// ========================
// Responsive Adjustments
// ========================

window.addEventListener('resize', () => {
    // Adjust layout elements on resize
    const containers = document.querySelectorAll('.containerimage');
    containers.forEach(container => {
        const width = container.offsetWidth;
        container.style.fontSize = `${Math.max(10, width * 0.02)}px`;
    });
});

// Initial resize adjustment
window.dispatchEvent(new Event('resize'));