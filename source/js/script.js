const BASE_IMAGE_URL = "https://custimoo.s3.us-east-1.amazonaws.com/"
//DOM ELEMENT
let form = document.getElementById('dynamicForm');
const errorDiv = document.getElementById('error');
// ========================
// Utility Functions
// ========================



/**
 * Convert centimeters to inches 
 * @param {number} inchValue - Value in inche
 * @returns {string} Value in inches (rounded to 2 decimal places)
 */

function cmToInches(cm) {
    if (typeof cm !== 'number' || isNaN(cm)) return null;
    const inches = cm / 2.54; // 1 cm = 0.393701 inches
    return inches.toFixed(2);
}

// Comprehensive Pantone to HEX mapping
const pantoneToHex = {
    // Reds
    '185 C': '#E4002B',
    '186 C': '#C8102E',
    '187 C': '#A6192E',
    '199 C': '#D50032',
    '202 C': '#862633',
    '209 C': '#6F263D',
    '485 C': '#DA291C',
    '172 C': '#FA4616',
    '165 C': '#FF6720',
    '1655 C': '#FC4C02',
    '152 C': '#E57200',

    // Blues
    '2747 C': '#001A72',
    '2758 C': '#001E62',
    '281 C': '#00205B',
    '282 C': '#041E42',
    '286 C': '#0032A0',
    '287 C': '#003087',
    '296 C': '#051C2C',
    '647 C': '#236192',
    '549 C': '#6BA4B8',
    '324 C': '#9CDBD9',
    '3155 C': '#006271',
    '2215 C': '#2E5665',
    '2768 C': '#071D49',

    // Yellows/Golds
    '109 C': '#FFD100',
    '115 C': '#FDDA24',
    '1235 C': '#FFB81C',
    '124 C': '#EAAA00',
    '131 C': '#CC8A00',
    '465 C': '#B9975B',
    '4535 C': '#CFC493',
    '468 C': '#DDCBA4',

    // Greens
    '348 C': '#00843D',
    '3435 C': '#154734',

    // Grays/Neutrals
    '429 C': '#A2AAAD',
    '656 C': '#DDE5ED',
    'Black': '#050505',
    'White': '#FFFFFF',

    // Special Team Colors
    // Minnesota
    '124 C': '#EAAA00',  // Yellow
    '202 C': '#862633',  // Red
    '3435 C': '#154734', // Green

    // Chicago
    '109 C': '#FFD100',  // Yellow
    '186 C': '#C8102E',  // Red
    '2747 C': '#001A72', // Blue

    // Detroit
    '186 C': '#C8102E',  // Red
    'White': '#FFFFFF',

    // Additional Common Colors
    'Process Blue C': '#0085CA',
    'Reflex Blue C': '#001489',
    'Purple C': '#6600FF',
    'Green C': '#00AB84',
    'Orange 021 C': '#FE5000',
    'Warm Red C': '#F9423A',
    'Rubine Red C': '#CE0058',
    'Rhodamine Red C': '#E10098',
    'Violet C': '#660099',
    'Blue 072 C': '#10069F',
    'Cool Gray 1 C': '#D9D9D6',
    'Cool Gray 5 C': '#B1B3B3',
    'Cool Gray 11 C': '#53565A',
    'Fiery Red': '#D01C1F'
};

/**
 * Get HEX color by Pantone code
 * @param {string} pantoneCode - Pantone color code (e.g., '186 C')
 * @returns {string|null} HEX color code or null if not found
 */
function getHexByPantone(pantoneCode) {
    return pantoneToHex[pantoneCode] || null;
}

/**
 * Filter colors by Pantone codes
 * @param {Array} colors - Array of color objects
 * @param {Array} pantoneCodes - Array of Pantone codes to filter by
 * @returns {Array} Filtered colors with HEX values
 */
function filterColorsByPantone(colors, pantoneCodes) {
    return colors.filter(color =>
        pantoneCodes.some(code =>
            color.pantone === code ||
            (color.pantone && color.pantone.includes(code))
        )
    ).map(color => ({
        ...color,
        hex: getHexByPantone(color.pantone) || color.hex
    }));
}

// ========================
// Main Data Extraction
// ========================

/**
 * Extract and process jersey data from order JSON
 * @param {Array} orderData - The order JSON data
 * @returns {Object|null} Processed jersey data or null if invalid input
 */



function extractJerseyData(orderData) {
    if (!orderData || !orderData.length || !orderData[0].factory_products) {
        console.error('Invalid order data format');
        return null;
    }

    const product = orderData[0].factory_products[0];

    // Process logo information
    const logoInfo = processLogoData(product.custom_logos);

    // Process player name information
    const playerNameInfo = processNameData(product.product_custom_texts);

    // Process player number information
    const playerNumberInfo = processNumberData(product.product_custom_texts);

    // Process design colors
    const designColors = processDesignColors(product.svg_groups);

    return { logoInfo, playerNameInfo, playerNumberInfo, designColors };
}

function processLogoData(logos) {
    return logos.map(logo => ({
        logoType: logo.name_of_placement || "Team Logo",
        logoImageUrl: logo.original_logo_url,
        logoWidthCm: parseFloat(logo.originalWidth) || 0,
        logoHeightCm: parseFloat(logo.originalHeight) || 0,
        logoWidthInche: cmToInches(parseFloat(logo.originalWidth)),
        logoHeightInche: cmToInches(parseFloat(logo.originalHeight)),
        logoColors: logo.logo_colors.map(color => ({
            colorHex: color.hex,
            colorPantone: color.pantone
        }))
    }));
}

function processNameData(texts) {
    const nameText = texts.find(text => text.type === 'name')?.items?.[0] || {};
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

function processNumberData(texts) {
    const numberTexts = texts.filter(text => text.type === 'number').flatMap(text => text.items) || [];
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

function processFrontNumberData(frontNumber) {
    return {
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

function processDesignColors(svgGroups) {
    return svgGroups.reduce((acc, group) => {
        acc[group.id || "unnamed"] = {
            elementName: group.name || "Unnamed Element",
            elementId: group.id || "N/A",
            colorHex: group.color || "#000000",
            colorPantone: group.pantone || "N/A"
        };
        return acc;
    }, {});
}



// @@@@@ Image Handling  @@@@@@@@@
// Function to handle image upload and display preview
// Handle number graphics upload
function handleNumberImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        // Update all number logos
        document.querySelectorAll('.number-logo').forEach(img => {
            img.src = e.target.result;

        });

        // Show measurement arrows for number containers

    };

    reader.readAsDataURL(file);
}

// Handle name graphics upload
function handleNameImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        // Update all name logos
        document.querySelectorAll('.name-logo').forEach(img => {
            img.src = e.target.result;

        });


    };

    reader.readAsDataURL(file);
}

// Common styling function


// Updated validation function
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    return validTypes.includes(file.type) ||
        ['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(fileExtension);
}

// Form Submission Handler
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopPropagation();
    // @@@ IMAGE FUNCTION CALL @@@@@
    const formData = new FormData(this);
    const numberImage = formData.get('numberGraphics');
    const nameImage = formData.get('nameGraphics');

    // Handle number image
    if (numberImage && numberImage.size > 0) {
        if (!validateImageFile(numberImage)) {
            alert('Please upload a valid image file for number graphics');
            return;
        }
        handleNumberImageUpload(numberImage);
    }

    // Handle name image
    if (nameImage && nameImage.size > 0) {
        if (!validateImageFile(nameImage)) {
            alert('Please upload a valid image file for name graphics');
            return;
        }
        handleNameImageUpload(nameImage);
    }
    const submitBtn = document.getElementById('fetchOrder');
    submitBtn.classList.add('loading');

    form.classList.add('was-validated');

    if (form.checkValidity()) {
        try {
            await handleFetchOrder();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
        }
    } else {
        submitBtn.classList.remove('loading');
    }
}, false);
async function handleFetchOrder() {
    const orderNumber = document.getElementById('orderNumber').value.trim();

    if (!orderNumber) {
        errorDiv.textContent = '⚠ Please enter an order number.';
        return;
    }

    try {
        errorDiv.textContent = "🔄 Fetching order details...";

        // Call the reusable dataProcess function
        const orderData = await dataProcess(orderNumber);
        console.log('Fetched Order Data:', orderData);

        // ✅ Display success message
        errorDiv.textContent = "✅ Order Loaded Successfully!";

        // ✅ Populate the HTML with the fetched data
        changeTitle(orderData.order_no);

        const jerseyData = extractJerseyData(orderData.items);
        populateOrderDetails(orderData, jerseyData);
        // Process the data
        updateFabricDescription();
        // Call the function to update page numbers
        updatePageNumbers();

        // Hide form with fade-out effect
        hideForm();

        // Show all-content with fade-in effect
        showContent();
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = `❌ ${error.message}`;
    }
}




// Function to fetch image URLs from order data
function fetchImageUrls(orderData) {
    const imageUrls = [];

    if (orderData.items && orderData.items.length > 0) {
        orderData.items.forEach(item => {
            if (item.factory_products && item.factory_products.length > 0) {
                item.factory_products.forEach(product => {
                    if (product.front_image) {
                        imageUrls.push(product.front_image);
                    }
                    if (product.back_image) {
                        imageUrls.push(product.back_image);
                    }
                });
            }
        });
    }

    return imageUrls;
}

// Function to populate order details in the UI
function populateOrderDetails(orderData, jerseyData) {
    if (orderData) {
        const imageUrls = fetchImageUrls(orderData);
        console.log('Image URLs:', imageUrls);

        // Update customer and company names
        document.querySelectorAll('.customerName').forEach(element => {
            element.innerHTML = orderData.customer_name || 'N/A';
        });

        document.querySelectorAll('#companyName').forEach(element => {
            element.innerHTML = orderData.company_name || 'N/A';
        });
        document.querySelectorAll(".artnumber").forEach(element => {
            element.innerHTML = `<strong class="pe-1" >Art#:</strong>${orderData.order_no}`
        })
        // Update image sources
        if (imageUrls[0]) {
            document.getElementById("imageFront").src = imageUrls[0];
        }
        if (imageUrls[1]) {
            document.getElementById("imageBack").src = imageUrls[1];
        }
    }
    if (jerseyData) {
        console.log(jerseyData);

        // Get truly unique colors (no duplicates by either hex or name)
        const uniqueColors = [];
        const seenHex = new Set();
        const seenNames = new Set();

        Object.values(jerseyData.designColors).forEach(design => {
            // Check if we've seen either this exact hex OR this color name before
            if (!seenHex.has(design.colorHex) && !seenNames.has(design.elementName)) {
                seenHex.add(design.colorHex);
                seenNames.add(design.elementName);
                uniqueColors.push(design);
            }
        });

        // Generate spans for unique colors only
        const colorSpans = uniqueColors.map(design => `<span class="color-sample" style="background-color: ${design.colorHex}; 
                color: ${getContrastTextColor(design.colorHex)};
               display: inline;
              ">  ${design.elementName}</span>`).join('');




        // Update all .color-display elements
        document.querySelectorAll('.color-display').forEach(element => {
            element.innerHTML = `<strong>Colors: </strong>${colorSpans}`;
        });
        document.querySelectorAll(".chervons-color").forEach(element => {
            element.innerHTML = `COLOR: <span class="color-sample" 
        style="background-color: ${jerseyData.designColors.chevrons.colorHex}; 
               color: ${getContrastTextColor(jerseyData.designColors.chevrons.colorHex)};
               display: inline;
              ">${jerseyData.designColors.chevrons.elementName}</span>`;


        });
        if (jerseyData.designColors.sleeves) {
            document.getElementById("sleeves-color").innerHTML = `SLEEVES IN MAIN FABRIC<br> <span class="sublimation">SUBLIMATION</span>
                            <br>COLOR: <span class="color-sample" 
        style="background-color: ${jerseyData.designColors.sleeves.colorHex}; 
               color: ${getContrastTextColor(jerseyData.designColors.sleeves.colorHex)};
               display: inline;
              ">${jerseyData.designColors.sleeves.elementName}</span>`;
        }
        // If Front Number Not Exist Remove it
        if (jerseyData.hasFrontNumber) {
            const frontHeight = jerseyData.playerNumberInfo.frontNumber.numberHeightCm;
            const frontColor = jerseyData.playerNumberInfo.frontNumber.numberColorHex;

            // Create front number display
            document.getElementById('front-number').innerHTML = `
                <div class="label front-number">
                    FRONT NUMBER<br>
                    Size: <span class="height">H-${frontHeight}CM</span>
                    <p id="color">COLOR:
                        <span class="color-sample" style="background-color: ${frontColor}">
                            ${frontColor}
                        </span>
                        ${jerseyData.playerNumberInfo.frontNumber.hasOutline ? `
                        <span class="color-sample" style="background-color: ${jerseyData.playerNumberInfo.frontNumber.numberColorOutline}">
                            Outline
                        </span>
                        ` : ''}
                    </p>
                </div>
            `;
        } else {
            document.getElementById('front-number').style.display = 'none';
            document.getElementById('arrow-front-number').style.display = 'none';
        }
        // Get the specific logo colors
        if ((jerseyData.designColors['hummel-logo-outline']) && (jerseyData.designColors['hummel-logo'])) {
            const hummelOutline = jerseyData.designColors['hummel-logo-outline'];
            const hummelLogo = jerseyData.designColors['hummel-logo'];
            document.querySelectorAll(".hummel-logo-color").forEach(element => {
                element.innerHTML = `COLOR: <span class="color-sample" 
        style="background-color: ${hummelLogo.colorHex}; 
               color: ${getContrastTextColor(hummelLogo.colorHex)};
               display: inline;
              "> ${hummelLogo.elementName} </span><span class="color-sample" style="background-color: ${hummelOutline.colorHex}; color: ${getContrastTextColor(hummelOutline.colorHex)};
               display: inline;
              ">${hummelOutline.elementName}</span>`;


            });
        }
        // LOGODATA
        document.querySelectorAll(".burlington-logo-size").forEach(element => {
            element.innerHTML = `SIZE: <span class="height"  >H-${jerseyData.logoInfo[0].logoHeightCm}CM</span> X <span class="width">W-${jerseyData.logoInfo[0].logoWidthCm}CM</span>`
        });

        document.getElementById("burlington-logo").src = jerseyData.logoInfo[0].logoImageUrl;
        function getContrastTextColor(hexColor) {
            if (!hexColor || typeof hexColor !== 'string') return '#000000';

            // Remove # if present
            const hex = hexColor.replace('#', '');

            // Convert to RGB values
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            // Calculate brightness (perceived luminance)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Return black for light colors, white for dark colors
            return brightness > 128 ? '#000000' : '#ffffff';
        }
        // Get ALL elements with class 'logoColors'
        const logoColorsContainers = document.getElementsByClassName('logoColors');

        // Convert HTMLCollection to Array and process each container
        Array.from(logoColorsContainers).forEach(container => {
            // Get the colors array from your data (using first logo as example)
            const colors = jerseyData.logoInfo[0].logoColors;

            // Generate HTML for each color
            let colorsHTML = 'COLOR:';
            colors.forEach(color => {
                if (color.colorHex && color.colorPantone) {
                    // Determine text color (white for dark backgrounds, black for light)
                    const textColor = getContrastTextColor(color.colorHex);

                    colorsHTML += `
        <span class="color-sample" 
              style="background-color: ${color.colorHex}; 
                     color: ${textColor};
                     display: inline;">
          ${color.colorPantone}
        </span>
      `;
                }
            });

            // Update the current container
            container.innerHTML = colorsHTML;
        });

        // NAME DATA
        document.querySelectorAll(".playernameheight").forEach(element => {
            element.innerHTML = `H-${jerseyData.playerNameInfo.nameHeightCm} CM`;
        });

        document.querySelectorAll(".player-name").forEach(element => {
            element.innerHTML = `"${jerseyData.playerNameInfo.namePlayer}"`;
        });

        document.querySelectorAll(".player-font-name").forEach(element => {
            element.innerHTML = `FONT: ${jerseyData.playerNameInfo.nameFontStyle}`;
        });
        document.querySelectorAll(".player-name-color").forEach(element => {
            element.innerHTML = `COLOR:
                                    <span class="color-sample" style="background-color: ${jerseyData.playerNameInfo.nameColorHex};color:${getContrastTextColor(jerseyData.playerNameInfo.nameColorHex)}; ">${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorPantone)}</span>
                                    <span class="color-sample" style="background-color:${jerseyData.playerNameInfo.nameColorOutline}; color: ${getContrastTextColor(jerseyData.playerNameInfo.nameColorOutline)}; ">${cleanAndFormatPantone(jerseyData.playerNameInfo.nameColorOutlinePantone)}</span>`;
        });
        //  NUMBER DATA
        // Player Number Info - Same pattern as player name
        function cleanAndFormatPantone(pantoneValue) {
            if (!pantoneValue) return "N/A";

            // First remove special characters and normalize spaces
            const cleanedValue = pantoneValue
                .replace(/[\/|\\]/g, ' ')  // Replace special chars with space
                .replace(/\s+/g, ' ')      // Collapse multiple spaces
                .trim();                   // Trim whitespace

            // Then split into words and keep first two if multiple exist
            const words = cleanedValue.split(/\s+/);
            return words.length > 2
                ? `${words[0]} ${words[1]}`  // First two words
                : cleanedValue;              // Original cleaned value if 2 words or less
        }
        document.querySelectorAll(".playernumberheight").forEach(element => {
            element.innerHTML = `H-${jerseyData.playerNumberInfo.numberHeightCm} CM`;
        });

        document.querySelectorAll(".player-number").forEach(element => {
            element.innerHTML = `"${jerseyData.playerNumberInfo.numberPlayer}"`;
        });

        document.querySelectorAll(".player-font-number").forEach(element => {
            element.innerHTML = `FONT: ${jerseyData.playerNumberInfo.numberFontStyle}`;
        });

        document.querySelectorAll(".player-number-color").forEach(element => {
            element.innerHTML = `COLOR:
        <span class="color-sample" 
              style="background-color: ${jerseyData.playerNumberInfo.numberColorHex};
                     color: ${getContrastTextColor(jerseyData.playerNumberInfo.numberColorHex)};
                     display: inline;">
            ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorPantone)}
        </span>
        <span class="color-sample" 
              style="background-color: ${jerseyData.playerNumberInfo.numberColorOutline};
                     color: ${getContrastTextColor(jerseyData.playerNumberInfo.numberColorOutline)};
                     display: inline;">
            ${cleanAndFormatPantone(jerseyData.playerNumberInfo.numberColorOutlinePantone)}
        </span>`;
        });

        // @@@@@@ Loade Logo Dynamically
        // Function to generate color samples
        // Function to generate color samples with inline font sizing
        function generateColorSamples(colors) {
            const validColors = colors.filter(color => color.colorHex);
            const baseFontSize = 10; // Base font size in pixels
            const minFontSize = 8;   // Minimum font size
            const maxColorsPerLine = 4; // Maximum colors before reducing font size

            // Calculate dynamic font size based on number of colors
            let fontSize = baseFontSize;
            if (validColors.length > maxColorsPerLine) {
                fontSize = Math.max(minFontSize, baseFontSize - (validColors.length - maxColorsPerLine));
            }

            return validColors.map(color => {
                const textColor = getContrastTextColor(color.colorHex);
                return `
        <span class="color-sample" 
              style="background-color: ${color.colorHex}; 
                     color: ${textColor};
                     font-size: ${fontSize}px;
                     white-space: nowrap;">
          ${color.colorPantone || 'N/A'}
        </span>
      `;
            }).join(' ');
        }

        // Adjust styles for responsive layout
        async function initializeLogoGrid() {
            const row = document.querySelector('.logo-row');
            const totalLogos = jerseyData.logoInfo.length;
            let colWidth = 4;
            totalLogos >= 3? colWidth = 4 : colWidth = Math.floor(12 / totalLogos);
            console.log("Col-md-" + colWidth);
            // Update first (static HUMMEL) column width
            const firstCol = row.querySelector('.col-md-4');
            firstCol.className = `col col-md-${colWidth}`;

            // Clear all columns except first
            while (row.children.length > 0) {
                row.removeChild(row.lastChild);
            }

            // Process logos sequentially for better loading control
            for (const logo of jerseyData.logoInfo) {
                const col = await createLogoColumn(logo, colWidth);
                row.appendChild(col);
            }

            addResponsiveStyles();
        }

        async function createLogoColumn(logo, colWidth) {
            const col = document.createElement('div');
            col.className = `col col-logo col-md-${colWidth}`;

            // Create initial structure with placeholder
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
                // Set src based on file type
                img.src = isPdfUrl(logo.logoImageUrl)
                    ? await loadPDF(logo.logoImageUrl)
                    : logo.logoImageUrl;

                img.classList.remove('loading');
            } catch (error) {
                console.error("Error loading logo image:", error);
                img.src = logo.logoImageUrl; // Fallback to original URL
                img.classList.remove('loading');
            }

            return col;
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
                    padding: 0 10px;
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

        // Your existing PDF functions
        async function loadPDF(url) {
            try {
                const pdfBlob = await fetchPDF(url);
                const pngData = await pdfToPNG(pdfBlob);
                return pngData;
            } catch (err) {
                console.error("Failed to load PDF:", err);
                throw err;
            }
        }

        async function fetchPDF(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch PDF");
            return await response.blob();
        }

        async function pdfToPNG(pdfBlob, pageNum = 1) {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfBlob)).promise;
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;
            return canvas.toDataURL("image/png");
        }

        function isPdfUrl(url) {
            return /\.pdf$/i.test(url);
        }

        // Initialize the grid
        initializeLogoGrid().catch(console.error);

    }
}

// Function to update page numbers
function updatePageNumbers() {
    const pages = document.querySelectorAll('.page');
    const pageNumberElements = document.querySelectorAll('.page-number');
    const totalPages = pages.length;

    pages.forEach((page, index) => {
        const pageNumber = index + 1;

        if (pageNumberElements[index]) {
            pageNumberElements[index].innerHTML = `Page: ${pageNumber} of ${totalPages}`;
        }
    });
}

// Function to hide the form with a fade-out effect
function hideForm() {
    const form = document.getElementById('form');
    form.style.opacity = "0";
    form.style.transform = "translateY(-20px)";

    setTimeout(() => {
        form.style.cssText = "display:none!important; opacity:0; transform:translateY(-20px);";
    }, 800); // Match the duration of the CSS transition
}

// Function to show the content with a fade-in effect
function showContent() {
    const content = document.getElementById('all-content');
    content.style.display = "block";

    setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
    }, 100);
}
function changeTitle(newTitle) {
    document.title = ` ${newTitle}_Custimoo`;
}


//   Function to updata fabric Description
function updateFabricDescription() {
    // Get values from form inputs
    const shell1 = document.getElementById('shellFabric1val').value;
    const shell2 = document.getElementById('shellFabric2val').value;
    const shell3 = document.getElementById('shellFabric3val').value;
    const lining1 = document.getElementById('liningFabric1val').value;
    const lining2 = document.getElementById('liningFabric2val').value;
    const lining3 = document.getElementById('liningFabric3val').value;

    // Update shell fabrics display
    document.getElementById('shellFabric1').innerHTML =
        `<strong>Shell Fabric # 2:</strong> ` +
        (shell1 ? `<span class="text-danger font-weight-bold">${shell1}</span>` :
            `<span class="text-muted">Not specified</span>`);
    document.getElementById('shellFabric2').innerHTML =
        `<strong>Shell Fabric # 2:</strong> ` +
        (shell2 ? `<span class="text-danger font-weight-bold">${shell2}</span>` :
            `<span class="text-muted">Not specified</span>`);

    document.getElementById('shellFabric3').innerHTML =
        `<strong>Shell Fabric # 3:</strong> ` +
        (shell3 ? `<span class="text-danger font-weight-bold">${shell3}</span>` :
            `<span class="text-muted">Not specified</span>`);

    // Update lining fabrics display
    document.getElementById('liningFabric1').innerHTML =
        `<strong>Lining Fabric # 1:</strong> ` +
        (lining1 ? `<span class="text-danger font-weight-bold">${lining1}</span>` :
            `<span class="text-muted">Not specified</span>`);

    document.getElementById('liningFabric2').innerHTML =
        `<strong>Lining Fabric # 2:</strong> ` +
        (lining2 ? `<span class="text-danger font-weight-bold">${lining2}</span>` :
            `<span class="text-muted">Not specified</span>`);

    document.getElementById('liningFabric3').innerHTML =
        `<strong>Lining Fabric # 3:</strong> ` +
        (lining3 ? `<span class="text-danger font-weight-bold">${lining3}</span>` :
            `<span class="text-muted">Not specified</span>`);
}

// Function to print the document
function printDocument() {
    window.print();
}
