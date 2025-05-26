
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
// Helper function to convert RGB to HEX
function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return '#ffffff';
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.?\d*)?\)$/);
    if (!match) return rgb.startsWith('#') ? rgb : '#ffffff';
    return '#' + [match[1], match[2], match[3]].map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
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
// Function to add Header detail
function addheaderDetail(orderData) {
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
    const btnpdf=document.getElementById('printBtnWrapper');
    const editPdf=document.getElementById("editControl");
    btnpdf.style.display = "block";
    editPdf.style.display = "block";
    content.style.display = "block";

    setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
    }, 100);
}
function changeTitle(newTitle) {
    document.title = ` ${newTitle}_Custimoo`;
    title = ` ${newTitle}_Custimoo`;

}
// Function to update page numbers
function updatePageNumbers() {
    const pages = document.querySelectorAll('.page');
    const pageNumberElements = document.querySelectorAll('.page-number');
    const totalPages = pages.length;
    console.log("PageNumber: "+ totalPages);

    pages.forEach((page, index) => {
        const pageNumber = index + 1;

        if (pageNumberElements[index]) {
            pageNumberElements[index].innerHTML = `Page: ${pageNumber} of ${totalPages}`;
        }
    });
}
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
//   Function to updata fabric Description
function updateFabricDescription() {
    // Get all values at once
    const shell1 = document.getElementById('shellFabric1val').value;
    const shell2 = document.getElementById('shellFabric2val').value;
    const shell3 = document.getElementById('shellFabric3val').value;
    const lining1 = document.getElementById('liningFabric1val').value;
    const lining2 = document.getElementById('liningFabric2val').value;
    const lining3 = document.getElementById('liningFabric3val').value;

    // Update shell fabrics using querySelectorAll
    document.querySelectorAll('#shellFabric1').forEach(e => {
        e.innerHTML = `<strong>Shell Fabric # 1:</strong> ` +
            (shell1 ? `<span class="text-danger font-weight-bold">${shell1}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });

    document.querySelectorAll('#shellFabric2').forEach(e => {
        e.innerHTML = `<strong>Shell Fabric # 2:</strong> ` +
            (shell2 ? `<span class="text-danger font-weight-bold">${shell2}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });

    document.querySelectorAll('#shellFabric3').forEach(e => {
        e.innerHTML = `<strong>Shell Fabric # 3:</strong> ` +
            (shell3 ? `<span class="text-danger font-weight-bold">${shell3}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });

    // Update lining fabrics using querySelectorAll
    document.querySelectorAll('#liningFabric1').forEach(e => {
        e.innerHTML = `<strong>Lining Fabric # 1:</strong> ` +
            (lining1 ? `<span class="text-danger font-weight-bold">${lining1}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });

    document.querySelectorAll('#liningFabric2').forEach(e => {
        e.innerHTML = `<strong>Lining Fabric # 2:</strong> ` +
            (lining2 ? `<span class="text-danger font-weight-bold">${lining2}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });

    document.querySelectorAll('#liningFabric3').forEach(e => {
        e.innerHTML = `<strong>Lining Fabric # 3:</strong> ` +
            (lining3 ? `<span class="text-danger font-weight-bold">${lining3}</span>` :
                `<span class="text-muted">Not specified</span>`);
    });
}

function safePrint() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
          
    <!-- Custom CSS -->
    <link rel="stylesheet" media="screen" href="./source/css/uniform.css">
    <link rel="stylesheet" media="print" href="./source/css/print.css">

    <style>
        /* General Styles */

        .page {

            position: relative;
            page-break-after: always;
            /* For printing */
        }
@media print {
  
  .no-break {
    page-break-inside: avoid;
  }
  /* Hide non-printable elements */
  .no-print {
    display: none !important;
  }
}

        /* Footer styling - stays at bottom of each page */
        #footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: white;
            border-top: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            margin-top: 4px;
        }

        /* Ensure content doesn't hide behind footer */
        #content {
            margin-bottom: 40px;
        }

        /* Fix for Bootstrap conflicts */



        .third-page .table table {
            font-size: 12px;
        }

        * {
            line-height: 1.2 !important;
        }

        .table>:not(caption)>*>* {
            padding: 4px 4px !important;
        }

        .py-2 {
            padding-top: 0.2rem !important;
            padding-bottom: .2rem !important;
        }

        /* Logo Specific */
        /* .container .logo-row .col:nth-child(3) .logo {
            height: auto !important;
            max-height: none !important;
            width: auto;
            object-fit: contain;
        } */

        /* Color Styling */
        #footer p {
            padding: 0% !important;
        }

        .sublimation,
        .height,
        .width {
            color: rgb(227, 45, 45);
        }



       
    </style>
        </head>
        <body style="margin-top: 14px;">
          ${document.getElementById('all-content').innerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();

    // Delay print to ensure content loads
    setTimeout(() => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe); // Clean up
    }, 500);
}
// Function to print the document
function isPrintModified() {
    const originalPrint = window.print;
    window.print = () => console.log('Intercepted!');
    const wasModified = window.print.toString() !== originalPrint.toString();
    window.print = originalPrint; // Restore
    return wasModified;
}
// Usage: Call safePrint() instead of window.print()
function printDocument() {
    if (isPrintModified()) {
        //  console.log(isPrintModified());
        console.warn("A browser extension is modifying window.print()");
        safePrint(); // Fallback to iframe method
    } else {// console.log(isPrintModified());
        window.print();
    }
}



