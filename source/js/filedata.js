// Replace your loadOrderData function with this:



// ========================
// DOM Elements
// ========================

const allContent = document.getElementById('all-content');
let form = document.getElementById('dynamicForm');
const errorDiv = document.getElementById('error');
let title = '';
const dataProcess = async (orderNumber)=> {
    try {
        // Your JSON data embedded directly
        const jsonData = {
            
    "success": true,
    "message": "Tech Pack Data Retrieved",
    "result": {
        "order": {
            "id": 7004,
            "order_no": "16627",
            "customer_id": 3089,
            "customer_name": "anderslumbye2 anderslumbye2",
            "company_id": 45,
            "company_name": "Hummel US",
            "design_file": null,
            "general_comments": null,
            "customer_reference_no": "#16627 \/ test ignore",
            "address_id": 448,
            "ecommerce_order_id": null,
            "shipping_address": {
                "city": "K\u00f8benhavn SV",
                "email": "anderslumbye@gmail.com",
                "state": "Storstrom",
                "company": "",
                "country": "Denmark",
                "address1": "Monica Zetterlunds Vej 17 1.tv",
                "address2": null,
                "zip_code": "2450",
                "last_name": "Lumbye",
                "first_name": "Anders",
                "company_name": "Wide Angle Media \/v Anders Lumbye",
                "phone_number": "+4522118919"
            },
            "additional_fields": {
                "shipping": [
                    {
                        "method": ""
                    }
                ]
            },
            "techpack_version_urls": "[\"company_45\/45\/order\/3089\/7004\/shareable\/techpackpdf\/techpack_16627_v0_1746538307724.pdf\"]",
            "techpack_data": null,
            "sharepoint_path": null,
            "is_quote_order": 0,
            "quote_text": null,
            "admin_salesrep_id": null,
            "order_administrator_id": null,
            "auth_token": null,
            "created_at": "2025-05-06T13:30:45.000000Z",
            "updated_at": "2025-05-06T13:31:51.000000Z",
            "deleted_at": null,
            "company_settings": {
                "measurement_unit": {
                    "unit": "in",
                    "conversion_value": 2.54,
                    "conversion_operator": "divide"
                },
                "color_type": "product_color",
                "piping_text": "hummel hummel hummel",
                "necktag_logo": {
                    "url": "super_admin\/files\/product\/logo\/image (4)-663b75cc8a17b.png",
                    "file_id": 1535
                },
                "carelabel": {
                    "url": null,
                    "file_id": null
                }
            },
            "items": [
                {
                    "id": 7046,
                    "order_id": 7004,
                    "factory_id": null,
                    "factory_name": null,
                    "items_count": 2,
                    "status": "order_approve",
                    "status_updated_at": "2025-05-06T13:30:52.000000Z",
                    "tracking_link": null,
                    "tracking_no": null,
                    "shipping_company": null,
                    "factory_products": [
                        {
                            "id": "SNpi06052025032540947000mfJN",
                            "addons": [
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 309,
                                    "title": "3D hummel Badge - $2.00 ",
                                    "description": "<p>3D hummel Badge - $2.00&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 310,
                                    "title": "Dyed Rib Collar\/sleeve: $5 (min 200 pcs)",
                                    "description": "<p>Dyed Rib Collar\/sleeve: $5 (min 200 pcs)<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 311,
                                    "title": "Authentic Patch: $2.00 ",
                                    "description": "<p>Authentic Patch: $2.00&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 312,
                                    "title": "Pro Fabric: $8 ",
                                    "description": "<p>Pro Fabric: $8&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 322,
                                    "title": "Custom neck tape: $2.00 (min 200 pcs)",
                                    "description": "<p>Custom neck tape: $2.00 (min 200 pcs)<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 2
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                }
                            ],
                            "colors": [],
                            "prices": {
                                "sizes": [
                                    {
                                        "size": "Kids 104",
                                        "quantity": "9",
                                        "original_price": null,
                                        "final_net_price": 0,
                                        "final_net_price_with_quantity": 0
                                    }
                                ],
                                "addons": [],
                                "total_addons": 0,
                                "grouped_addons": [],
                                "total_quantity": 9,
                                "updated_by_info": {
                                    "id": "",
                                    "name": "",
                                    "updated_at": ""
                                },
                                "ungrouped_addons": [],
                                "logo_technologies": [],
                                "order_discount_info": {
                                    "value": 0,
                                    "is_fixed": false
                                },
                                "sizes_discount_info": {
                                    "is_fixed": false,
                                    "fixed_value": 0,
                                    "discount_applied": 0,
                                    "price_applied_of": "sku",
                                    "discount_applied_in_percent": 0
                                },
                                "factory_product_total_price": 0
                            },
                            "status": "order_approve",
                            "svg_url": "company_45\/45\/order\/3089\/7004\/shareable\/SNpi06052025032540947000mfJN.svg",
                            "sync_id": null,
                            "pdf_file": null,
                            "style_id": 415,
                            "design_id": 63244,
                            "svg_parts": [
                                "base",
                                "side-mesh",
                                "collar-detail",
                                "design-pattern",
                                "sleeves",
                                "cuffs",
                                "collar",
                                "chevrons-outline",
                                "chevrons",
                                "hummel-logo-outline",
                                "hummel-logo"
                            ],
                            "back_image": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/company_45\/45\/order\/3089\/7004\/shareable\/179558_06052025032723719000_06052025012724859372_681a0e3cd1cf3.png",
                            "product_id": 275,
                            "sku_number": 1221,
                            "style_name": "Jensen",
                            "svg_groups": [
                                {
                                    "id": "base",
                                    "name": null,
                                    "color": "#FFCD00",
                                    "count": 100000,
                                    "pantone": "116 C"
                                },
                                {
                                    "id": "side-mesh",
                                    "name": null,
                                    "color": "#C8102E",
                                    "count": 1,
                                    "pantone": "186 C"
                                },
                                {
                                    "id": "collar-detail",
                                    "name": null,
                                    "color": "#071D49",
                                    "count": 1,
                                    "pantone": "2768 C"
                                },
                                {
                                    "id": "design-pattern",
                                    "name": "White",
                                    "color": "#FFFFFF",
                                    "count": 1,
                                    "pantone": null
                                },
                                {
                                    "id": "sleeves",
                                    "name": null,
                                    "color": "#FFCD00",
                                    "count": 1,
                                    "pantone": "116 C"
                                },
                                {
                                    "id": "cuffs",
                                    "name": null,
                                    "color": "#C8102E",
                                    "count": 1,
                                    "pantone": "186 C"
                                },
                                {
                                    "id": "collar",
                                    "name": null,
                                    "color": "#071D49",
                                    "count": 1,
                                    "pantone": "2768 C"
                                },
                                {
                                    "id": "chevrons-outline",
                                    "name": "White",
                                    "color": "#FFFFFF",
                                    "count": 1,
                                    "pantone": null
                                },
                                {
                                    "id": "chevrons",
                                    "name": "White",
                                    "color": "#FFFFFF",
                                    "count": 1,
                                    "pantone": null
                                },
                                {
                                    "id": "hummel-logo-outline",
                                    "name": null,
                                    "color": "#C8102E",
                                    "count": 1,
                                    "pantone": "186 C"
                                },
                                {
                                    "id": "hummel-logo",
                                    "name": null,
                                    "color": "#071D49",
                                    "count": 1,
                                    "pantone": "2768 C"
                                }
                            ],
                            "front_image": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/company_45\/45\/order\/3089\/7004\/shareable\/107734_06052025032723712000_06052025012724860341_681a0e3cd20bd.png",
                            "groupcolors": [],
                            "logo_colors": [],
                            "custom_logos": [
                                {
                                    "id": 38824,
                                    "url": "45\/3089\/logos\/A9cfihbb811utg5lk16976349312IvZ8jtvUZ_png.png",
                                    "side": "front",
                                    "width": 0,
                                    "height": 53,
                                    "x_axis": 380,
                                    "y_axis": 155,
                                    "rotation": 0,
                                    "is_locked": 0,
                                    "is_vector": false,
                                    "logo_name": "A9cfihbb_811utg_5lk.png",
                                    "x_axis_3d": 0,
                                    "y_axis_3d": 0,
                                    "created_at": "2023-12-21T19:46:55.000000Z",
                                    "logo_index": 0,
                                    "product_id": 275,
                                    "updated_at": "2023-12-21T19:46:55.000000Z",
                                    "actualWidth": 543,
                                    "logo_colors": [
                                        {
                                            "hex": "#D50032",
                                            "name": "",
                                            "pantone": "199 C"
                                        },
                                        {
                                            "hex": "#DDE5ED",
                                            "name": "",
                                            "pantone": "656 C"
                                        },
                                        {
                                            "hex": "#FDDA24",
                                            "name": "",
                                            "pantone": "115 C"
                                        },
                                        {
                                            "hex": "#071D49",
                                            "name": "",
                                            "pantone": "2768 C"
                                        }
                                    ],
                                    "actualHeight": 542,
                                    "haveControls": true,
                                    "originalWidth": "3.0",
                                    "original_logo": "45\/3089\/logos\/A9cfihbb811utg5lk16976349312IvZ8jtvUZ.png",
                                    "originalHeight": "3.0",
                                    "product_style_id": null,
                                    "transparent_logo": "45\/3089\/logos\/A9cfihbb811utg5lk16976349312IvZ8jtvUZ_transparent.png",
                                    "logo_technologies": null,
                                    "name_of_placement": "Chest",
                                    "original_logo_url": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/45\/3089\/logos\/A9cfihbb811utg5lk16976349312IvZ8jtvUZ.png",
                                    "is_replace_success": false,
                                    "is_smart_transparent": false,
                                    "following_product_ids": null,
                                    "logos_follows_product": 0,
                                    "smart_transparent_logo": "45\/3089\/logos\/A9cfihbb811utg5lk16976349312IvZ8jtvUZ_smart_transparent.png"
                                }
                            ],
                            "product_name": "S\/S Raglan - France",
                            "product_type": "customized",
                            "reorder_data": null,
                            "defaultcolors": [
                                {
                                    "name": null,
                                    "color": "#C8102E",
                                    "pantone": "186 C"
                                },
                                {
                                    "name": null,
                                    "color": "#071D49",
                                    "pantone": "2768 C"
                                },
                                {
                                    "name": "White",
                                    "color": "#FFFFFF",
                                    "pantone": null
                                },
                                {
                                    "name": null,
                                    "color": "#FFCD00",
                                    "pantone": "116 C"
                                }
                            ],
                            "group_patterns": [],
                            "grouped_addons": [],
                            "production_url": "https:\/\/d2u0n1trk0r0nj.cloudfront.net\/super_admin\/files\/container\/436\/437\/France\/1744382005-Production.svg",
                            "back_image_short": "",
                            "custom_logo_svgs": [],
                            "fixed_logo_index": 0,
                            "ungrouped_addons": [],
                            "ecommerce_cart_id": null,
                            "ecommerce_post_id": null,
                            "front_image_short": "",
                            "is_custom_product": false,
                            "measurement_ratio": 0.145,
                            "sizechart_reference": null,
                            "ecommerce_variant_id": null,
                            "product_custom_texts": [
                                {
                                    "id": 1485,
                                    "type": "name",
                                    "items": [
                                        {
                                            "color": "#fd020e",
                                            "label": "Player name",
                                            "width": 143.07000000000002,
                                            "height": 50.4,
                                            "scaleX": 0.6944444444444444,
                                            "scaleY": 0.6944444444444444,
                                            "x_axis": "300",
                                            "y_axis": "115",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Back",
                                            "actualWidth": 123.44,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": "Fire Engine Red",
                                            "originalWidth": "4.9",
                                            "outline_color": "#FFFFFF",
                                            "outline_width": 3,
                                            "originalHeight": "2.0",
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.1"
                                        }
                                    ],
                                    "label": "Player name",
                                    "value": "NAME",
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "is_first_name": true,
                                    "manually_added": false,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                },
                                {
                                    "id": 1486,
                                    "type": "number",
                                    "items": [
                                        {
                                            "color": "#fd020e",
                                            "label": "Back number",
                                            "width": 57.67,
                                            "height": 50.4,
                                            "scaleX": 2.7777777777777777,
                                            "scaleY": 2.7777777777777777,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Back",
                                            "actualWidth": 52.25,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": "Fire Engine Red",
                                            "originalWidth": "8.3",
                                            "outline_color": "#FFFFFF",
                                            "outline_width": 3,
                                            "originalHeight": "8.1",
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.5"
                                        },
                                        {
                                            "color": "#fd020e",
                                            "label": "Front number",
                                            "width": 57.67,
                                            "height": 50.4,
                                            "scaleX": 1.3888888888888888,
                                            "scaleY": 1.3888888888888888,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Front",
                                            "actualWidth": 52.25,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": "Fire Engine Red",
                                            "originalWidth": "4.1",
                                            "outline_color": "#FFFFFF",
                                            "outline_width": 3,
                                            "originalHeight": "4.1",
                                            "color_tab_index": 1,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.2"
                                        }
                                    ],
                                    "label": "Player number",
                                    "value": "44",
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "manually_added": false,
                                    "is_first_number": true,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                },
                                {
                                    "id": 1487,
                                    "type": "team_name",
                                    "items": [
                                        {
                                            "color": "#fd020e",
                                            "label": "Team name (Same on all products)",
                                            "height": "35",
                                            "scaleX": 0,
                                            "scaleY": 0,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Front",
                                            "font_family": "Akrobat",
                                            "color_pantone": "Fire Engine Red",
                                            "outline_color": "#FFFFFF",
                                            "outline_width": 3,
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": 0
                                        }
                                    ],
                                    "label": "Team text (Same on all products)",
                                    "value": null,
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "manually_added": false,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                }
                            ],
                            "product_price_object": {
                                "quantity": 9,
                                "currency_code": null,
                                "product_price": 0,
                                "currency_symbol": null
                            },
                            "shuffle_color_number": 10,
                            "ecommerce_modifier_id": null,
                            "product_roster_detail": [
                                {
                                    "code": "Kids 104",
                                    "size": "Kids 104",
                                    "text": "NAME",
                                    "number": "44",
                                    "quantity": "9",
                                    "size_index": 0,
                                    "information": null
                                }
                            ],
                            "size_variants_mapping": null,
                            "minimum_order_quantity": 10,
                            "minimum_order_quantity_type": "by_cart",
                            "product_custom_text_objects": {
                                "common": [],
                                "roster": [
                                    {
                                        "name": {
                                            "items": [
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 133.43359375 64.2578125\"> \n<path d=\"M10.51 0L3.16 0L3.16-51.26L10.23-51.26L21.30-20.39L21.45-20.39L21.45-51.26L28.79-51.26L28.79 0L21.90 0L10.65-30.83L10.51-30.83L10.51 0ZM39.45 0L32.10 0L43.56-51.26L49.68-51.26L61.10 0L53.79 0L51.61-11.00L41.59-11.00L39.45 0ZM46.51-36.49L42.89-17.93L50.24-17.93L46.65-36.49L46.51-36.49ZM72.04 0L64.69 0L64.69-51.26L71.75-51.26L81.18-24.12L81.32-24.12L90.70-51.26L97.80-51.26L97.80 0L90.46 0L90.46-31.18L90.32-31.18L83.07-9.14L79.38-9.14L72.18-31.18L72.04-31.18L72.04 0ZM126.60 0L104.70 0L104.70-51.26L126.60-51.26L126.60-44.37L112.04-44.37L112.04-29.32L124.73-29.32L124.73-22.39L112.04-22.39L112.04-7.35L126.60-7.35L126.60 0Z\" fill=\"#fd020e\" stroke=\"#FFFFFF\" stroke-width=\"3\" transform=\"translate(1.8359375 57.7578125)\" width=\"133.43359375\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#fd020e",
                                                            "name": "Fire Engine Red",
                                                            "pantone": "Fire Engine Red"
                                                        }
                                                    ],
                                                    "label": "Player name",
                                                    "width": "5.0",
                                                    "height": "2.2",
                                                    "scaleX": 4.789272030651341,
                                                    "scaleY": 4.789272030651341,
                                                    "rotation": "0",
                                                    "width_px": 126.43359375,
                                                    "height_px": 54.2578125,
                                                    "placement": "Back",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#FFFFFF",
                                                    "outline_width": "0.1",
                                                    "original_width": 605.5248742816092,
                                                    "original_height": 259.8554238505747,
                                                    "outline_color_pantone": "White"
                                                }
                                            ],
                                            "label": "Player name",
                                            "value": "NAME",
                                            "font_family": "DIN-condensed"
                                        },
                                        "size": "Kids 104",
                                        "number": {
                                            "items": [
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 62.2421875 64.2578125\"> \n<path d=\"M15.26-7.63L0.63-7.63L0.63-14.55L11.21-51.26L19.02-51.26L7.98-14.55L15.26-14.55L15.26-29.14L22.61-29.14L22.61-14.55L26.12-14.55L26.12-7.63L22.61-7.63L22.61 0L15.26 0L15.26-7.63ZM42.01-7.63L27.39-7.63L27.39-14.55L37.97-51.26L45.77-51.26L34.73-14.55L42.01-14.55L42.01-29.14L49.36-29.14L49.36-14.55L52.88-14.55L52.88-7.63L49.36-7.63L49.36 0L42.01 0L42.01-7.63Z\" fill=\"#fd020e\" stroke=\"#FFFFFF\" stroke-width=\"3\" transform=\"translate(4.3671875 57.7578125)\" width=\"62.2421875\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#fd020e",
                                                            "name": "Fire Engine Red",
                                                            "pantone": "Fire Engine Red"
                                                        }
                                                    ],
                                                    "label": "Back number",
                                                    "width": "8.8",
                                                    "height": "8.6",
                                                    "scaleX": 19.15708812260537,
                                                    "scaleY": 19.15708812260537,
                                                    "rotation": "0",
                                                    "width_px": 55.2421875,
                                                    "height_px": 54.2578125,
                                                    "placement": "Back",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#FFFFFF",
                                                    "outline_width": "0.5",
                                                    "original_width": 1058.2794540229884,
                                                    "original_height": 1039.4216954022988,
                                                    "outline_color_pantone": "White"
                                                },
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 62.2421875 64.2578125\"> \n<path d=\"M15.26-7.63L0.63-7.63L0.63-14.55L11.21-51.26L19.02-51.26L7.98-14.55L15.26-14.55L15.26-29.14L22.61-29.14L22.61-14.55L26.12-14.55L26.12-7.63L22.61-7.63L22.61 0L15.26 0L15.26-7.63ZM42.01-7.63L27.39-7.63L27.39-14.55L37.97-51.26L45.77-51.26L34.73-14.55L42.01-14.55L42.01-29.14L49.36-29.14L49.36-14.55L52.88-14.55L52.88-7.63L49.36-7.63L49.36 0L42.01 0L42.01-7.63Z\" fill=\"#fd020e\" stroke=\"#FFFFFF\" stroke-width=\"3\" transform=\"translate(4.3671875 57.7578125)\" width=\"62.2421875\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#fd020e",
                                                            "name": "Fire Engine Red",
                                                            "pantone": "Fire Engine Red"
                                                        }
                                                    ],
                                                    "label": "Front number",
                                                    "width": "4.4",
                                                    "height": "4.3",
                                                    "scaleX": 9.578544061302685,
                                                    "scaleY": 9.578544061302685,
                                                    "rotation": "0",
                                                    "width_px": 55.2421875,
                                                    "height_px": 54.2578125,
                                                    "placement": "Front",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#FFFFFF",
                                                    "outline_width": "0.2",
                                                    "original_width": 529.1397270114942,
                                                    "original_height": 519.7108477011494,
                                                    "outline_color_pantone": "White"
                                                }
                                            ],
                                            "label": "Player number",
                                            "value": "44",
                                            "font_family": "DIN-condensed"
                                        },
                                        "quantity": "9"
                                    }
                                ]
                            },
                            "is_deleted": false,
                            "neck_tag_info": null,
                            "carelabel_info": null,
                            "neck_tape_info": null,
                            "sku_name": "Hummel Shortsleeve NA",
                            "neck_tape": "hummel hummel hummel",
                            "neck_tape_file": null,
                            "neck_tag_logo": null,
                            "neck_note": null,
                            "carelabel_logo": null,
                            "logo_technologies": [],
                            "front_image_info": null,
                            "back_image_info": null,
                            "is_neck_tape_file_pdf": false,
                            "is_neck_tag_logo_pdf": false,
                            "is_carelabel_pdf": false,
                            "show_name_and_numbers": true,
                            "show_fixed_texts": false,
                            "selected_style_obj": {
                                "id": 415,
                                "name": "Jensen",
                                "product_id": 275
                            },
                            "styles": [
                                {
                                    "id": 414,
                                    "product_id": 275,
                                    "name": "CoreXK",
                                    "container_id": 438,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 415,
                                    "product_id": 275,
                                    "name": "Jensen",
                                    "container_id": 436,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 416,
                                    "product_id": 275,
                                    "name": "Hansen",
                                    "container_id": 437,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 417,
                                    "product_id": 275,
                                    "name": "Simonsen",
                                    "container_id": 434,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 432,
                                    "product_id": 275,
                                    "name": "V-neck",
                                    "container_id": 450,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                }
                            ],
                            "product_colors": [
                                {
                                    "id": 1806,
                                    "json_data": [
                                        {
                                            "name": "White",
                                            "value": "#FFFFFF",
                                            "position": "0"
                                        },
                                        {
                                            "name": "Black (Rich Black)",
                                            "value": "#2A2A2D",
                                            "position": "10"
                                        },
                                        {
                                            "name": "Asphalt",
                                            "value": "#444447",
                                            "position": "20"
                                        },
                                        {
                                            "name": "Castlerock",
                                            "value": "#5F5E62",
                                            "position": "30"
                                        },
                                        {
                                            "name": "Opal Gray",
                                            "value": "#A49E9E",
                                            "position": "40"
                                        },
                                        {
                                            "name": "Marine\/Peacoat",
                                            "value": "#2B2E43",
                                            "position": "50"
                                        },
                                        {
                                            "name": "Blue coral",
                                            "value": "#0C425C",
                                            "position": "55"
                                        },
                                        {
                                            "name": "True Blue",
                                            "value": "#1F4477",
                                            "position": "60"
                                        },
                                        {
                                            "name": "Diva Blue",
                                            "value": "#007BB2",
                                            "position": "70"
                                        },
                                        {
                                            "name": "Blue Danube",
                                            "value": "#0087bf",
                                            "position": "75"
                                        },
                                        {
                                            "name": "Argentina Blue",
                                            "value": "#93B4D7",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Acai",
                                            "value": "#46295A",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Liberty",
                                            "value": "#4E4489",
                                            "position": "90"
                                        },
                                        {
                                            "name": "Pine Grove",
                                            "value": "#223631",
                                            "position": "100"
                                        },
                                        {
                                            "name": "Evergreen",
                                            "value": "#12574A",
                                            "position": "110"
                                        },
                                        {
                                            "name": "Jelly Bean",
                                            "value": "#008658",
                                            "position": "110"
                                        },
                                        {
                                            "name": "Atlantis",
                                            "value": "#00AF9F",
                                            "position": "130"
                                        },
                                        {
                                            "name": "DDP Volte",
                                            "value": "#C3D60B",
                                            "position": "135"
                                        },
                                        {
                                            "name": "Evening Primrose",
                                            "value": "#CDDC20",
                                            "position": "140"
                                        },
                                        {
                                            "name": "DDP Green",
                                            "value": "#82AE03",
                                            "position": "145"
                                        },
                                        {
                                            "name": "Sports Yellow",
                                            "value": "#FFC300",
                                            "position": "150"
                                        },
                                        {
                                            "name": "Blazing Yellow",
                                            "value": "#FEE715",
                                            "position": "160"
                                        },
                                        {
                                            "name": "DDP Old Gold",
                                            "value": "#B28E1C",
                                            "position": "162"
                                        },
                                        {
                                            "name": "DDP Vegas Gold",
                                            "value": "#DAC06B",
                                            "position": "163"
                                        },
                                        {
                                            "name": "Maroon",
                                            "value": "#77333B",
                                            "position": "170"
                                        },
                                        {
                                            "name": "SGMA Cardinal",
                                            "value": "#582134",
                                            "position": "175"
                                        },
                                        {
                                            "name": "DDP Cardinal",
                                            "value": "#50272B",
                                            "position": "178"
                                        },
                                        {
                                            "name": "True Red",
                                            "value": "#BE132D",
                                            "position": "180"
                                        },
                                        {
                                            "name": "Fiery Red",
                                            "value": "#D01C1F",
                                            "position": "190"
                                        },
                                        {
                                            "name": "Orange Tiger",
                                            "value": "#F96815",
                                            "position": "200"
                                        },
                                        {
                                            "name": "DDP Hot Pink",
                                            "value": "#ef2056",
                                            "position": "205"
                                        },
                                        {
                                            "name": "Fuchsia Purple",
                                            "value": "#D4367A",
                                            "position": "210"
                                        },
                                        {
                                            "name": "Bergonia Pink",
                                            "value": "#EC9ABE",
                                            "position": "220"
                                        }
                                    ],
                                    "file_name": "Hummel colors.csv",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1212,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                },
                                {
                                    "id": 1807,
                                    "json_data": [
                                        {
                                            "name": "White",
                                            "value": "#ffffff",
                                            "position": "0"
                                        },
                                        {
                                            "name": "Midnight Black",
                                            "value": "#2A2A2D",
                                            "position": "1"
                                        },
                                        {
                                            "name": "Navy",
                                            "value": "#292c3d",
                                            "position": "3"
                                        },
                                        {
                                            "name": "Sandalwood",
                                            "value": "#dbaf71",
                                            "position": "5"
                                        },
                                        {
                                            "name": "Hunter Green",
                                            "value": "#264526",
                                            "position": "10"
                                        },
                                        {
                                            "name": "Electric Pink",
                                            "value": "#f3135e",
                                            "position": "15"
                                        },
                                        {
                                            "name": "Fire Engine Red",
                                            "value": "#fd020e",
                                            "position": "20"
                                        },
                                        {
                                            "name": "Stone Beige",
                                            "value": "#c5b59b",
                                            "position": "25"
                                        },
                                        {
                                            "name": "Taupe Gray",
                                            "value": "#7c7266",
                                            "position": "30"
                                        },
                                        {
                                            "name": "Lavender Purple",
                                            "value": "#7a4aa0",
                                            "position": "35"
                                        },
                                        {
                                            "name": "Crimson",
                                            "value": "#851926",
                                            "position": "40"
                                        },
                                        {
                                            "name": "Jade Green",
                                            "value": "#08a747",
                                            "position": "45"
                                        },
                                        {
                                            "name": "Lemon Yellow",
                                            "value": "#e1e804",
                                            "position": "50"
                                        },
                                        {
                                            "name": "Mint Green",
                                            "value": "#3add95",
                                            "position": "55"
                                        },
                                        {
                                            "name": "Powder Blue",
                                            "value": "#a5c6e7",
                                            "position": "60"
                                        },
                                        {
                                            "name": "Royal Blue",
                                            "value": "#2c3d8f",
                                            "position": "65"
                                        },
                                        {
                                            "name": "Tangerine",
                                            "value": "#fb7f03",
                                            "position": "70"
                                        },
                                        {
                                            "name": "Cerulean Blue",
                                            "value": "#0796d4",
                                            "position": "75"
                                        },
                                        {
                                            "name": "Vermilion",
                                            "value": "#ff430a",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Sunflower Yellow",
                                            "value": "#ffb903",
                                            "position": "85"
                                        },
                                        {
                                            "name": "Saffron",
                                            "value": "#ffc501",
                                            "position": "90"
                                        },
                                        {
                                            "name": "Coral Pink",
                                            "value": "#f92a52",
                                            "position": "95"
                                        },
                                        {
                                            "name": "Salmon Pink",
                                            "value": "#fe8989",
                                            "position": "100"
                                        },
                                        {
                                            "name": "Lime Green",
                                            "value": "#90ed06",
                                            "position": "105"
                                        }
                                    ],
                                    "file_name": "Socks colors.csv",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1096,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                }
                            ],
                            "product_fonts": [
                                {
                                    "id": 2668,
                                    "json_data": [
                                        {
                                            "name": "Akrobat",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Akrobat.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "BebasNeue",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/BebasNeue.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "Block",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Block.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "DIN-condensed",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/DIN-condensed.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "Prohibition",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Prohibition.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "TeamSportia",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/TeamSportia.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "humml-euro",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/humml-euro.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "messmer",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/messmer.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "stadiumsans-numbers",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/stadiumsans-numbers.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "vogue",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/vogue.woff",
                                            "extension": "woff"
                                        }
                                    ],
                                    "file_name": "Hummel-official-fonts",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1121,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                }
                            ],
                            "product_sizes": [
                                {
                                    "name": "Kids 104"
                                },
                                {
                                    "name": "Kids 116"
                                },
                                {
                                    "name": "Kids 128"
                                },
                                {
                                    "name": "Kids 140"
                                },
                                {
                                    "name": "Kids 152"
                                },
                                {
                                    "name": "Kids 164"
                                },
                                {
                                    "name": "Women XS"
                                },
                                {
                                    "name": "Women S"
                                },
                                {
                                    "name": "Women M"
                                },
                                {
                                    "name": "Women L"
                                },
                                {
                                    "name": "Women XL"
                                },
                                {
                                    "name": "Women 2XL"
                                },
                                {
                                    "name": "Women 3XL"
                                },
                                {
                                    "name": "Women 4XL"
                                },
                                {
                                    "name": "Women 5XL"
                                },
                                {
                                    "name": "Unisex XS"
                                },
                                {
                                    "name": "Unisex S"
                                },
                                {
                                    "name": "Unisex M"
                                },
                                {
                                    "name": "Unisex L"
                                },
                                {
                                    "name": "Unisex XL"
                                },
                                {
                                    "name": "Unisex 2XL"
                                },
                                {
                                    "name": "Unisex 3XL"
                                },
                                {
                                    "name": "Unisex 4XL"
                                },
                                {
                                    "name": "Unisex 5XL"
                                }
                            ]
                        },
                        {
                            "id": "2N9x06052025032643395000olka",
                            "addons": [
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 309,
                                    "title": "3D hummel Badge - $2.00 ",
                                    "description": "<p>3D hummel Badge - $2.00&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 310,
                                    "title": "Dyed Rib Collar\/sleeve: $5 (min 200 pcs)",
                                    "description": "<p>Dyed Rib Collar\/sleeve: $5 (min 200 pcs)<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 311,
                                    "title": "Authentic Patch: $2.00 ",
                                    "description": "<p>Authentic Patch: $2.00&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 312,
                                    "title": "Pro Fabric: $8 ",
                                    "description": "<p>Pro Fabric: $8&nbsp;<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 0
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                },
                                {
                                    "addon_group_id": null,
                                    "data_container_id": null,
                                    "customized_sku_info": null,
                                    "addon_id": 322,
                                    "title": "Custom neck tape: $2.00 (min 200 pcs)",
                                    "description": "<p>Custom neck tape: $2.00 (min 200 pcs)<\/p>",
                                    "note": null,
                                    "currencies": [
                                        {
                                            "name": "United States Dollar",
                                            "code": "USD",
                                            "symbol": "$",
                                            "price": 2
                                        }
                                    ],
                                    "selected": false,
                                    "published": true,
                                    "addon_ecommerce_product_id": null,
                                    "addon_ecommerce_variant_id": null,
                                    "addon_ecommerce_modifier_id": null
                                }
                            ],
                            "assets": [],
                            "colors": [],
                            "prices": {
                                "sizes": [
                                    {
                                        "size": "Kids 104",
                                        "quantity": 1,
                                        "original_price": null,
                                        "final_net_price": 0,
                                        "final_net_price_with_quantity": 0
                                    }
                                ],
                                "addons": [],
                                "total_addons": 0,
                                "grouped_addons": [],
                                "total_quantity": 1,
                                "updated_by_info": {
                                    "id": "",
                                    "name": "",
                                    "updated_at": ""
                                },
                                "ungrouped_addons": [],
                                "logo_technologies": [],
                                "order_discount_info": {
                                    "value": 0,
                                    "is_fixed": false
                                },
                                "sizes_discount_info": {
                                    "is_fixed": false,
                                    "fixed_value": 0,
                                    "discount_applied": 0,
                                    "price_applied_of": "sku",
                                    "discount_applied_in_percent": 0
                                },
                                "factory_product_total_price": 0
                            },
                            "status": "order_approve",
                            "svg_url": "company_45\/45\/order\/3089\/7004\/shareable\/2N9x06052025032643395000olka.svg",
                            "sync_id": null,
                            "pdf_file": null,
                            "style_id": 415,
                            "design_id": 63251,
                            "svg_parts": [
                                "base",
                                "side-mesh",
                                "collar-detail",
                                "sleeves",
                                "non-custmizable-pattern",
                                "cuffs",
                                "collar",
                                "chevrons-outline",
                                "chevrons",
                                "hummel-logo-outline",
                                "hummel-logo"
                            ],
                            "back_image": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/company_45\/45\/order\/3089\/7004\/shareable\/140620_06052025032643420000_06052025012644386620_681a0e145e643.png",
                            "product_id": 275,
                            "sku_number": 1221,
                            "sort_order": 2,
                            "style_name": "Jensen",
                            "svg_groups": [
                                {
                                    "id": "base",
                                    "name": null,
                                    "color": "#FFCD00",
                                    "count": 100000,
                                    "pantone": "116 C"
                                },
                                {
                                    "id": "side-mesh",
                                    "name": null,
                                    "color": "#B4A91F",
                                    "count": 1,
                                    "pantone": "7766 C"
                                },
                                {
                                    "id": "collar-detail",
                                    "name": null,
                                    "color": "#00558C",
                                    "count": 1,
                                    "pantone": "7462 C"
                                },
                                {
                                    "id": "sleeves",
                                    "name": null,
                                    "color": "#34657F",
                                    "count": 1,
                                    "pantone": "7699 C"
                                },
                                {
                                    "id": "non-custmizable-pattern",
                                    "name": null,
                                    "color": "#FFCD00",
                                    "count": 1,
                                    "pantone": "116 C"
                                },
                                {
                                    "id": "cuffs",
                                    "name": null,
                                    "color": "#B4A91F",
                                    "count": 1,
                                    "pantone": "7766 C"
                                },
                                {
                                    "id": "collar",
                                    "name": null,
                                    "color": "#00558C",
                                    "count": 1,
                                    "pantone": "7462 C"
                                },
                                {
                                    "id": "chevrons-outline",
                                    "name": null,
                                    "color": "#34657F",
                                    "count": 1,
                                    "pantone": "7699 C"
                                },
                                {
                                    "id": "chevrons",
                                    "name": null,
                                    "color": "#FFCD00",
                                    "count": 1,
                                    "pantone": "116 C"
                                },
                                {
                                    "id": "hummel-logo-outline",
                                    "name": "White",
                                    "color": "#FFFFFF",
                                    "count": 1
                                },
                                {
                                    "id": "hummel-logo",
                                    "name": null,
                                    "color": "#34657F",
                                    "count": 1,
                                    "pantone": "7699 C"
                                }
                            ],
                            "front_image": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/company_45\/45\/order\/3089\/7004\/shareable\/126208_06052025032643414000_06052025012644582245_681a0e148e26d.png",
                            "groupcolors": {
                                "hummel-logo-outline": {
                                    "name": "White",
                                    "color": "#FFFFFF"
                                }
                            },
                            "logo_colors": [],
                            "custom_logos": [
                                {
                                    "id": 111219,
                                    "url": "45\/guest\/logos\/swedenflag1739440239sB9FAAMBL8_png.png",
                                    "side": "front",
                                    "width": 0,
                                    "height": 53,
                                    "x_axis": 380,
                                    "y_axis": 155,
                                    "rotation": 0,
                                    "is_locked": 0,
                                    "is_vector": false,
                                    "logo_name": "sweden flag.png",
                                    "x_axis_3d": 0,
                                    "y_axis_3d": 0,
                                    "created_at": "2023-12-21T19:46:55.000000Z",
                                    "logo_index": 0,
                                    "product_id": 275,
                                    "updated_at": "2023-12-21T19:46:55.000000Z",
                                    "actualWidth": 400,
                                    "logo_colors": [
                                        {
                                            "hex": "#00558C",
                                            "name": "",
                                            "pantone": "7462 C"
                                        },
                                        {
                                            "hex": "#FFCD00",
                                            "name": "",
                                            "pantone": "116 C"
                                        },
                                        {
                                            "hex": null,
                                            "name": null,
                                            "pantone": null
                                        },
                                        {
                                            "hex": null,
                                            "name": null,
                                            "pantone": null
                                        }
                                    ],
                                    "actualHeight": 248,
                                    "haveControls": true,
                                    "originalWidth": "3.0",
                                    "original_logo": "45\/guest\/logos\/swedenflag1739440239sB9FAAMBL8.png",
                                    "originalHeight": "1.9",
                                    "product_style_id": null,
                                    "transparent_logo": "45\/guest\/logos\/swedenflag1739440239sB9FAAMBL8_transparent.png",
                                    "logo_technologies": null,
                                    "name_of_placement": "Chest",
                                    "original_logo_url": "https:\/\/santa-backend.s3.eu-central-1.amazonaws.com\/45\/guest\/logos\/swedenflag1739440239sB9FAAMBL8.png",
                                    "is_replace_success": false,
                                    "is_smart_transparent": false,
                                    "following_product_ids": null,
                                    "logos_follows_product": 0,
                                    "smart_transparent_logo": "45\/guest\/logos\/swedenflag1739440239sB9FAAMBL8_smart_transparent.png"
                                }
                            ],
                            "product_name": "S\/S Raglan - S\/S Raglan - 1 - Argentina",
                            "product_type": "customized",
                            "reorder_data": null,
                            "defaultcolors": [
                                {
                                    "name": null,
                                    "color": "#FFCD00",
                                    "pantone": "116 C"
                                },
                                {
                                    "name": null,
                                    "color": "#34657F",
                                    "pantone": "7699 C"
                                },
                                {
                                    "name": null,
                                    "color": "#00558C",
                                    "pantone": "7462 C"
                                },
                                {
                                    "name": null,
                                    "color": "#B4A91F",
                                    "pantone": "7766 C"
                                }
                            ],
                            "group_patterns": [],
                            "grouped_addons": [],
                            "production_url": "https:\/\/d2u0n1trk0r0nj.cloudfront.net\/super_admin\/files\/container\/436\/437\/Argentina\/1744382008-Production.svg",
                            "back_image_short": "",
                            "custom_logo_svgs": [],
                            "fixed_logo_index": 0,
                            "ungrouped_addons": [],
                            "ecommerce_cart_id": null,
                            "ecommerce_post_id": null,
                            "front_image_short": "",
                            "is_custom_product": false,
                            "measurement_ratio": 0.145,
                            "sizechart_reference": null,
                            "ecommerce_variant_id": null,
                            "product_custom_texts": [
                                {
                                    "id": 1485,
                                    "type": "name",
                                    "items": [
                                        {
                                            "color": "#007BB2",
                                            "label": "Player name",
                                            "width": 143.07000000000002,
                                            "height": 50.4,
                                            "scaleX": 0.6944444444444444,
                                            "scaleY": 0.6944444444444444,
                                            "x_axis": "300",
                                            "y_axis": "115",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Back",
                                            "actualWidth": 123.44,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": null,
                                            "originalWidth": "4.9",
                                            "outline_color": "#ffffff",
                                            "outline_width": 3,
                                            "originalHeight": "2.0",
                                            "color_tab_index": 1,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.1"
                                        }
                                    ],
                                    "label": "Player name",
                                    "value": "NAME",
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "is_first_name": true,
                                    "manually_added": false,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                },
                                {
                                    "id": 1486,
                                    "type": "number",
                                    "items": [
                                        {
                                            "color": "#007BB2",
                                            "label": "Back number",
                                            "width": 57.67,
                                            "height": 50.4,
                                            "scaleX": 2.7777777777777777,
                                            "scaleY": 2.7777777777777777,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Back",
                                            "actualWidth": 52.25,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": null,
                                            "originalWidth": "8.3",
                                            "outline_color": "#ffffff",
                                            "outline_width": 3,
                                            "originalHeight": "8.1",
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.5"
                                        },
                                        {
                                            "color": "#007BB2",
                                            "label": "Front number",
                                            "width": 57.67,
                                            "height": 50.4,
                                            "scaleX": 1.3888888888888888,
                                            "scaleY": 1.3888888888888888,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Front",
                                            "actualWidth": 52.25,
                                            "font_family": "Akrobat",
                                            "actualHeight": 51.26,
                                            "color_pantone": null,
                                            "originalWidth": "4.1",
                                            "outline_color": "#ffffff",
                                            "outline_width": 3,
                                            "originalHeight": "4.1",
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": "0.2"
                                        }
                                    ],
                                    "label": "Player number",
                                    "value": "44",
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "manually_added": false,
                                    "is_first_number": true,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                },
                                {
                                    "id": 1487,
                                    "type": "team_name",
                                    "items": [
                                        {
                                            "color": "#007BB2",
                                            "label": "Team name (Same on all products)",
                                            "height": "35",
                                            "scaleX": 0,
                                            "scaleY": 0,
                                            "x_axis": "300",
                                            "y_axis": "240",
                                            "rotation": "0",
                                            "selected": true,
                                            "is_locked": false,
                                            "placement": "Front",
                                            "font_family": "Akrobat",
                                            "color_pantone": null,
                                            "outline_color": "#ffffff",
                                            "outline_width": 3,
                                            "color_tab_index": 0,
                                            "outline_enabled": true,
                                            "arc_text_allowed": false,
                                            "outline_color_pantone": "White",
                                            "outline_width_converted": 0
                                        }
                                    ],
                                    "label": "Team text (Same on all products)",
                                    "value": null,
                                    "created_at": null,
                                    "deleted_at": null,
                                    "product_id": 275,
                                    "updated_at": null,
                                    "font_family": "DIN-condensed",
                                    "manually_added": false,
                                    "active_item_index": 0,
                                    "following_products": [],
                                    "following_product_ids": [],
                                    "font_family_custom": ""
                                }
                            ],
                            "product_price_object": {
                                "quantity": 1,
                                "currency_code": null,
                                "product_price": 0,
                                "currency_symbol": null
                            },
                            "shuffle_color_number": "6",
                            "ecommerce_modifier_id": null,
                            "product_roster_detail": [
                                {
                                    "code": "Kids 104",
                                    "size": "Kids 104",
                                    "text": "NAME",
                                    "number": "44",
                                    "quantity": 1,
                                    "size_index": 0,
                                    "information": null
                                }
                            ],
                            "size_variants_mapping": null,
                            "minimum_order_quantity": 10,
                            "minimum_order_quantity_type": "by_cart",
                            "product_custom_text_objects": {
                                "common": [],
                                "roster": [
                                    {
                                        "name": {
                                            "items": [
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 133.43359375 64.2578125\"> \n<path d=\"M10.51 0L3.16 0L3.16-51.26L10.23-51.26L21.30-20.39L21.45-20.39L21.45-51.26L28.79-51.26L28.79 0L21.90 0L10.65-30.83L10.51-30.83L10.51 0ZM39.45 0L32.10 0L43.56-51.26L49.68-51.26L61.10 0L53.79 0L51.61-11.00L41.59-11.00L39.45 0ZM46.51-36.49L42.89-17.93L50.24-17.93L46.65-36.49L46.51-36.49ZM72.04 0L64.69 0L64.69-51.26L71.75-51.26L81.18-24.12L81.32-24.12L90.70-51.26L97.80-51.26L97.80 0L90.46 0L90.46-31.18L90.32-31.18L83.07-9.14L79.38-9.14L72.18-31.18L72.04-31.18L72.04 0ZM126.60 0L104.70 0L104.70-51.26L126.60-51.26L126.60-44.37L112.04-44.37L112.04-29.32L124.73-29.32L124.73-22.39L112.04-22.39L112.04-7.35L126.60-7.35L126.60 0Z\" fill=\"#007BB2\" stroke=\"#ffffff\" stroke-width=\"3\" transform=\"translate(1.8359375 57.7578125)\" width=\"133.43359375\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#007BB2",
                                                            "name": null,
                                                            "pantone": null
                                                        }
                                                    ],
                                                    "label": "Player name",
                                                    "width": "5.0",
                                                    "height": "2.2",
                                                    "scaleX": 4.789272030651341,
                                                    "scaleY": 4.789272030651341,
                                                    "rotation": "0",
                                                    "width_px": 126.43359375,
                                                    "height_px": 54.2578125,
                                                    "placement": "Back",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#ffffff",
                                                    "outline_width": "0.1",
                                                    "original_width": 605.5248742816092,
                                                    "original_height": 259.8554238505747,
                                                    "outline_color_pantone": "White"
                                                }
                                            ],
                                            "label": "Player name",
                                            "value": "NAME",
                                            "font_family": "DIN-condensed"
                                        },
                                        "size": "Kids 104",
                                        "number": {
                                            "items": [
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 62.2421875 64.2578125\"> \n<path d=\"M15.26-7.63L0.63-7.63L0.63-14.55L11.21-51.26L19.02-51.26L7.98-14.55L15.26-14.55L15.26-29.14L22.61-29.14L22.61-14.55L26.12-14.55L26.12-7.63L22.61-7.63L22.61 0L15.26 0L15.26-7.63ZM42.01-7.63L27.39-7.63L27.39-14.55L37.97-51.26L45.77-51.26L34.73-14.55L42.01-14.55L42.01-29.14L49.36-29.14L49.36-14.55L52.88-14.55L52.88-7.63L49.36-7.63L49.36 0L42.01 0L42.01-7.63Z\" fill=\"#007BB2\" stroke=\"#ffffff\" stroke-width=\"3\" transform=\"translate(4.3671875 57.7578125)\" width=\"62.2421875\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#007BB2",
                                                            "name": null,
                                                            "pantone": null
                                                        }
                                                    ],
                                                    "label": "Back number",
                                                    "width": "8.8",
                                                    "height": "8.6",
                                                    "scaleX": 19.15708812260537,
                                                    "scaleY": 19.15708812260537,
                                                    "rotation": "0",
                                                    "width_px": 55.2421875,
                                                    "height_px": 54.2578125,
                                                    "placement": "Back",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#ffffff",
                                                    "outline_width": "0.5",
                                                    "original_width": 1058.2794540229884,
                                                    "original_height": 1039.4216954022988,
                                                    "outline_color_pantone": "White"
                                                },
                                                {
                                                    "svg": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg stroke-location=\"outside\" paint-order=\"outside\" style=\"width:100%; height: auto;\" fill=\"#FFFFFF\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.1\" xml:space=\"preserve\" viewBox=\"0 0 62.2421875 64.2578125\"> \n<path d=\"M15.26-7.63L0.63-7.63L0.63-14.55L11.21-51.26L19.02-51.26L7.98-14.55L15.26-14.55L15.26-29.14L22.61-29.14L22.61-14.55L26.12-14.55L26.12-7.63L22.61-7.63L22.61 0L15.26 0L15.26-7.63ZM42.01-7.63L27.39-7.63L27.39-14.55L37.97-51.26L45.77-51.26L34.73-14.55L42.01-14.55L42.01-29.14L49.36-29.14L49.36-14.55L52.88-14.55L52.88-7.63L49.36-7.63L49.36 0L42.01 0L42.01-7.63Z\" fill=\"#007BB2\" stroke=\"#ffffff\" stroke-width=\"3\" transform=\"translate(4.3671875 57.7578125)\" width=\"62.2421875\" height=\"64.2578125\" paint-order=\"stroke\" stroke-location=\"outside\"><\/path>\n<\/svg>",
                                                    "unit": "in",
                                                    "color": [
                                                        {
                                                            "hex": "#007BB2",
                                                            "name": null,
                                                            "pantone": null
                                                        }
                                                    ],
                                                    "label": "Front number",
                                                    "width": "4.4",
                                                    "height": "4.3",
                                                    "scaleX": 9.578544061302685,
                                                    "scaleY": 9.578544061302685,
                                                    "rotation": "0",
                                                    "width_px": 55.2421875,
                                                    "height_px": 54.2578125,
                                                    "placement": "Front",
                                                    "svg_height": "54.2578125",
                                                    "outline_color": "#ffffff",
                                                    "outline_width": "0.2",
                                                    "original_width": 529.1397270114942,
                                                    "original_height": 519.7108477011494,
                                                    "outline_color_pantone": "White"
                                                }
                                            ],
                                            "label": "Player number",
                                            "value": "44",
                                            "font_family": "DIN-condensed"
                                        },
                                        "quantity": 1
                                    }
                                ]
                            },
                            "is_deleted": false,
                            "neck_tag_info": null,
                            "carelabel_info": null,
                            "neck_tape_info": null,
                            "sku_name": "Hummel Shortsleeve NA",
                            "neck_tape": "hummel hummel hummel",
                            "neck_tape_file": null,
                            "neck_tag_logo": null,
                            "neck_note": null,
                            "carelabel_logo": null,
                            "logo_technologies": [],
                            "front_image_info": null,
                            "back_image_info": null,
                            "is_neck_tape_file_pdf": false,
                            "is_neck_tag_logo_pdf": false,
                            "is_carelabel_pdf": false,
                            "show_name_and_numbers": true,
                            "show_fixed_texts": false,
                            "selected_style_obj": {
                                "id": 415,
                                "name": "Jensen",
                                "product_id": 275
                            },
                            "styles": [
                                {
                                    "id": 414,
                                    "product_id": 275,
                                    "name": "CoreXK",
                                    "container_id": 438,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 415,
                                    "product_id": 275,
                                    "name": "Jensen",
                                    "container_id": 436,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 416,
                                    "product_id": 275,
                                    "name": "Hansen",
                                    "container_id": 437,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 417,
                                    "product_id": 275,
                                    "name": "Simonsen",
                                    "container_id": 434,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                },
                                {
                                    "id": 432,
                                    "product_id": 275,
                                    "name": "V-neck",
                                    "container_id": 450,
                                    "customized_addons": {
                                        "grouped_addons": {},
                                        "ungrouped_addons": []
                                    }
                                }
                            ],
                            "product_colors": [
                                {
                                    "id": 1806,
                                    "json_data": [
                                        {
                                            "name": "White",
                                            "value": "#FFFFFF",
                                            "position": "0"
                                        },
                                        {
                                            "name": "Black (Rich Black)",
                                            "value": "#2A2A2D",
                                            "position": "10"
                                        },
                                        {
                                            "name": "Asphalt",
                                            "value": "#444447",
                                            "position": "20"
                                        },
                                        {
                                            "name": "Castlerock",
                                            "value": "#5F5E62",
                                            "position": "30"
                                        },
                                        {
                                            "name": "Opal Gray",
                                            "value": "#A49E9E",
                                            "position": "40"
                                        },
                                        {
                                            "name": "Marine\/Peacoat",
                                            "value": "#2B2E43",
                                            "position": "50"
                                        },
                                        {
                                            "name": "Blue coral",
                                            "value": "#0C425C",
                                            "position": "55"
                                        },
                                        {
                                            "name": "True Blue",
                                            "value": "#1F4477",
                                            "position": "60"
                                        },
                                        {
                                            "name": "Diva Blue",
                                            "value": "#007BB2",
                                            "position": "70"
                                        },
                                        {
                                            "name": "Blue Danube",
                                            "value": "#0087bf",
                                            "position": "75"
                                        },
                                        {
                                            "name": "Argentina Blue",
                                            "value": "#93B4D7",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Acai",
                                            "value": "#46295A",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Liberty",
                                            "value": "#4E4489",
                                            "position": "90"
                                        },
                                        {
                                            "name": "Pine Grove",
                                            "value": "#223631",
                                            "position": "100"
                                        },
                                        {
                                            "name": "Evergreen",
                                            "value": "#12574A",
                                            "position": "110"
                                        },
                                        {
                                            "name": "Jelly Bean",
                                            "value": "#008658",
                                            "position": "110"
                                        },
                                        {
                                            "name": "Atlantis",
                                            "value": "#00AF9F",
                                            "position": "130"
                                        },
                                        {
                                            "name": "DDP Volte",
                                            "value": "#C3D60B",
                                            "position": "135"
                                        },
                                        {
                                            "name": "Evening Primrose",
                                            "value": "#CDDC20",
                                            "position": "140"
                                        },
                                        {
                                            "name": "DDP Green",
                                            "value": "#82AE03",
                                            "position": "145"
                                        },
                                        {
                                            "name": "Sports Yellow",
                                            "value": "#FFC300",
                                            "position": "150"
                                        },
                                        {
                                            "name": "Blazing Yellow",
                                            "value": "#FEE715",
                                            "position": "160"
                                        },
                                        {
                                            "name": "DDP Old Gold",
                                            "value": "#B28E1C",
                                            "position": "162"
                                        },
                                        {
                                            "name": "DDP Vegas Gold",
                                            "value": "#DAC06B",
                                            "position": "163"
                                        },
                                        {
                                            "name": "Maroon",
                                            "value": "#77333B",
                                            "position": "170"
                                        },
                                        {
                                            "name": "SGMA Cardinal",
                                            "value": "#582134",
                                            "position": "175"
                                        },
                                        {
                                            "name": "DDP Cardinal",
                                            "value": "#50272B",
                                            "position": "178"
                                        },
                                        {
                                            "name": "True Red",
                                            "value": "#BE132D",
                                            "position": "180"
                                        },
                                        {
                                            "name": "Fiery Red",
                                            "value": "#D01C1F",
                                            "position": "190"
                                        },
                                        {
                                            "name": "Orange Tiger",
                                            "value": "#F96815",
                                            "position": "200"
                                        },
                                        {
                                            "name": "DDP Hot Pink",
                                            "value": "#ef2056",
                                            "position": "205"
                                        },
                                        {
                                            "name": "Fuchsia Purple",
                                            "value": "#D4367A",
                                            "position": "210"
                                        },
                                        {
                                            "name": "Bergonia Pink",
                                            "value": "#EC9ABE",
                                            "position": "220"
                                        }
                                    ],
                                    "file_name": "Hummel colors.csv",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1212,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                },
                                {
                                    "id": 1807,
                                    "json_data": [
                                        {
                                            "name": "White",
                                            "value": "#ffffff",
                                            "position": "0"
                                        },
                                        {
                                            "name": "Midnight Black",
                                            "value": "#2A2A2D",
                                            "position": "1"
                                        },
                                        {
                                            "name": "Navy",
                                            "value": "#292c3d",
                                            "position": "3"
                                        },
                                        {
                                            "name": "Sandalwood",
                                            "value": "#dbaf71",
                                            "position": "5"
                                        },
                                        {
                                            "name": "Hunter Green",
                                            "value": "#264526",
                                            "position": "10"
                                        },
                                        {
                                            "name": "Electric Pink",
                                            "value": "#f3135e",
                                            "position": "15"
                                        },
                                        {
                                            "name": "Fire Engine Red",
                                            "value": "#fd020e",
                                            "position": "20"
                                        },
                                        {
                                            "name": "Stone Beige",
                                            "value": "#c5b59b",
                                            "position": "25"
                                        },
                                        {
                                            "name": "Taupe Gray",
                                            "value": "#7c7266",
                                            "position": "30"
                                        },
                                        {
                                            "name": "Lavender Purple",
                                            "value": "#7a4aa0",
                                            "position": "35"
                                        },
                                        {
                                            "name": "Crimson",
                                            "value": "#851926",
                                            "position": "40"
                                        },
                                        {
                                            "name": "Jade Green",
                                            "value": "#08a747",
                                            "position": "45"
                                        },
                                        {
                                            "name": "Lemon Yellow",
                                            "value": "#e1e804",
                                            "position": "50"
                                        },
                                        {
                                            "name": "Mint Green",
                                            "value": "#3add95",
                                            "position": "55"
                                        },
                                        {
                                            "name": "Powder Blue",
                                            "value": "#a5c6e7",
                                            "position": "60"
                                        },
                                        {
                                            "name": "Royal Blue",
                                            "value": "#2c3d8f",
                                            "position": "65"
                                        },
                                        {
                                            "name": "Tangerine",
                                            "value": "#fb7f03",
                                            "position": "70"
                                        },
                                        {
                                            "name": "Cerulean Blue",
                                            "value": "#0796d4",
                                            "position": "75"
                                        },
                                        {
                                            "name": "Vermilion",
                                            "value": "#ff430a",
                                            "position": "80"
                                        },
                                        {
                                            "name": "Sunflower Yellow",
                                            "value": "#ffb903",
                                            "position": "85"
                                        },
                                        {
                                            "name": "Saffron",
                                            "value": "#ffc501",
                                            "position": "90"
                                        },
                                        {
                                            "name": "Coral Pink",
                                            "value": "#f92a52",
                                            "position": "95"
                                        },
                                        {
                                            "name": "Salmon Pink",
                                            "value": "#fe8989",
                                            "position": "100"
                                        },
                                        {
                                            "name": "Lime Green",
                                            "value": "#90ed06",
                                            "position": "105"
                                        }
                                    ],
                                    "file_name": "Socks colors.csv",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1096,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                }
                            ],
                            "product_fonts": [
                                {
                                    "id": 2668,
                                    "json_data": [
                                        {
                                            "name": "Akrobat",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Akrobat.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "BebasNeue",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/BebasNeue.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "Block",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Block.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "DIN-condensed",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/DIN-condensed.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "Prohibition",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/Prohibition.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "TeamSportia",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/TeamSportia.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "humml-euro",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/humml-euro.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "messmer",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/messmer.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "stadiumsans-numbers",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/stadiumsans-numbers.woff",
                                            "extension": "woff"
                                        },
                                        {
                                            "name": "vogue",
                                            "path": "super_admin\/files\/product\/font\/hummel-official-fonts\/66a760554090f\/vogue.woff",
                                            "extension": "woff"
                                        }
                                    ],
                                    "file_name": "Hummel-official-fonts",
                                    "pivot": {
                                        "product_id": 275,
                                        "file_id": 1121,
                                        "created_at": "2023-12-21T19:46:55.000000Z",
                                        "updated_at": "2023-12-21T19:46:55.000000Z"
                                    }
                                }
                            ],
                            "product_sizes": [
                                {
                                    "name": "Kids 104"
                                },
                                {
                                    "name": "Kids 116"
                                },
                                {
                                    "name": "Kids 128"
                                },
                                {
                                    "name": "Kids 140"
                                },
                                {
                                    "name": "Kids 152"
                                },
                                {
                                    "name": "Kids 164"
                                },
                                {
                                    "name": "Women XS"
                                },
                                {
                                    "name": "Women S"
                                },
                                {
                                    "name": "Women M"
                                },
                                {
                                    "name": "Women L"
                                },
                                {
                                    "name": "Women XL"
                                },
                                {
                                    "name": "Women 2XL"
                                },
                                {
                                    "name": "Women 3XL"
                                },
                                {
                                    "name": "Women 4XL"
                                },
                                {
                                    "name": "Women 5XL"
                                },
                                {
                                    "name": "Unisex XS"
                                },
                                {
                                    "name": "Unisex S"
                                },
                                {
                                    "name": "Unisex M"
                                },
                                {
                                    "name": "Unisex L"
                                },
                                {
                                    "name": "Unisex XL"
                                },
                                {
                                    "name": "Unisex 2XL"
                                },
                                {
                                    "name": "Unisex 3XL"
                                },
                                {
                                    "name": "Unisex 4XL"
                                },
                                {
                                    "name": "Unisex 5XL"
                                }
                            ]
                        }
                    ],
                    "price_info": {
                        "discount": 0,
                        "is_fixed": false,
                        "shipping": 0,
                        "fixed_value": 0,
                        "total_price": 0,
                        "total_quantity": 10,
                        "order_item_final_price": 0
                    },
                    "techpack_data": null,
                    "created_at": "2025-05-06T13:30:52.000000Z",
                    "updated_at": "2025-05-06T13:31:47.000000Z",
                    "deleted_at": null,
                    "est_shipping_date": null
                }
            ],
            "company": {
                "id": 45,
                "company_name": "Hummel US",
                "user_id": 84,
                "pricelist_id": null,
                "provider_id": "qXXcOJJudf",
                "vat_no": "364919265",
                "company_domains": [
                    "https:\/\/designhummelus.com"
                ],
                "subpage_url": null,
                "admin_domains": null,
                "login_code": {
                    "type": "url",
                    "action": "https:\/\/designhummelus.com\/my-account\/?redirect_to=https:\/\/designhummelus.com\/#\/",
                    "logout_type": "url",
                    "logout_action": "https:\/\/designhummelus.com\/?custimoo_logout_user=1"
                },
                "customizer_page_url": null,
                "address": "44 Mitchell Road",
                "city": "Ipswich",
                "phone": "8573474420",
                "post_code": "MA01938",
                "country_id": 232,
                "contact_person_name": null,
                "contact_person_email": null,
                "platform": "cdnExceptLogin",
                "inactive_message": null,
                "status": 1,
                "pending_payment": 0,
                "override_due_payment": 0,
                "enable_accessibe": 0,
                "created_at": "2023-10-06T06:59:50.000000Z",
                "updated_at": "2023-10-06T06:59:50.000000Z"
            },
            "customer": {
                "id": 3089,
                "ecommerce_customer_id": null,
                "first_name": "anderslumbye2",
                "last_name": "anderslumbye2",
                "company_id": 45,
                "email": "anderslumbye+2@gmail.com",
                "team_company_name": "",
                "browser_key": null,
                "country_id": null,
                "jwt_token": null,
                "role_id": null,
                "admin_salesrep_id": null,
                "created_at": "2023-10-17T07:24:59.000000Z",
                "updated_at": "2024-01-10T10:53:40.000000Z",
                "deleted_at": null
            }
        }
    },
    "errors": [],
    "status_code": 200

        };
        
        // Find the order with matching order number
        if (jsonData.success && jsonData.result.order.order_no === orderNumber) {
            return jsonData.result.order;
        }
        
        throw new Error('Order not found in JSON data');
    } catch (error) {
        console.error('Error loading JSON data:', error);
        throw error;
    }
}