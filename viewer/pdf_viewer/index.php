<!DOCTYPE html>
<html dir="ltr" mozdisallowselectionprint>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="google" content="notranslate">
		<title>PDF.js viewer</title>
		<link rel="stylesheet" href="pdf_main.css?<?=filemtime(dirname(__FILE__) . '/pdf_main.css');?>">
		<link rel="resource" type="application/l10n" href="pdf.js/web/locale/locale.properties">
	</head>
	<body class="viewerEmbeded" tabindex="1">
		<!-- outerContainer-->
		<div id="outerContainer">
			<!-- sidebarContainer-->
			<div id="sidebarContainer">
				<div id="toolbarSidebar">
					<div id="toolbarSidebarLeft">
						<div class="splitToolbarButton toggled" id="sidebarViewButtons" role="radiogroup">
							<button class="toolbarButton toggled" id="viewThumbnail" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs" role="radio" aria-checked="true" aria-controls="thumbnailView"><span data-l10n-id="thumbs_label">Thumbnails</span></button>
							<button class="hidden toolbarButton" id="viewOutline" title="Show Document Outline (double-click to expand/collapse all items)" tabindex="3" data-l10n-id="document_outline" role="radio" aria-checked="false" aria-controls="outlineView"><span data-l10n-id="document_outline_label">Document Outline</span></button>
							<button class="hidden toolbarButton" id="viewAttachments" title="Show Attachments" tabindex="4" data-l10n-id="attachments" role="radio" aria-checked="false" aria-controls="attachmentsView"><span data-l10n-id="attachments_label">Attachments</span></button>
							<button class="hidden toolbarButton" id="viewLayers" title="Show Layers (double-click to reset all layers to the default state)" tabindex="5" data-l10n-id="layers" role="radio" aria-checked="false" aria-controls="layersView"><span data-l10n-id="layers_label">Layers</span></button>
						</div>
					</div>
					<div id="toolbarSidebarRight">
						<div class="hidden" id="outlineOptionsContainer">
							<div class="verticalToolbarSeparator"></div>
							<button class="toolbarButton" id="currentOutlineItem" disabled="disabled" title="Find Current Outline Item" tabindex="6" data-l10n-id="current_outline_item"><span data-l10n-id="current_outline_item_label">Current Outline Item</span></button>
						</div>
					</div>
				</div>
				<div id="sidebarContent">
					<div id="thumbnailView"></div>
					<div class="hidden" id="outlineView"></div>
					<div class="hidden" id="attachmentsView"></div>
					<div class="hidden" id="layersView"></div>
				</div>
				<div id="sidebarResizer"></div>
			</div>
			<!-- End sidebarContainer-->
			<!-- mainContainer-->
			<div id="mainContainer">
				<!-- findbar-->
				<div class="findbar hidden doorHanger" id="findbar">
					<div id="findbarInputContainer">
						<input class="toolbarField" id="findInput" title="Find" placeholder="Find in document…" tabindex="91" data-l10n-id="find_input" aria-invalid="false">
						<div class="splitToolbarButton">
							<button class="toolbarButton" id="findPrevious" title="Find the previous occurrence of the phrase" tabindex="92" data-l10n-id="find_previous"><span data-l10n-id="find_previous_label">Previous</span></button>
							<div class="splitToolbarButtonSeparator"></div>
							<button class="toolbarButton" id="findNext" title="Find the next occurrence of the phrase" tabindex="93" data-l10n-id="find_next"><span data-l10n-id="find_next_label">Next</span></button>
						</div>
					</div>
					<div id="findbarOptionsOneContainer">
						<input class="toolbarField" id="findHighlightAll" type="checkbox" tabindex="94">
						<label class="toolbarLabel" for="findHighlightAll" data-l10n-id="find_highlight">Highlight All</label>
						<input class="toolbarField" id="findMatchCase" type="checkbox" tabindex="95">
						<label class="toolbarLabel" for="findMatchCase" data-l10n-id="find_match_case_label">Match Case</label>
					</div>
					<div id="findbarOptionsTwoContainer">
						<input class="toolbarField" id="findMatchDiacritics" type="checkbox" tabindex="96">
						<label class="toolbarLabel" for="findMatchDiacritics" data-l10n-id="find_match_diacritics_label">Match Diacritics</label>
						<input class="toolbarField" id="findEntireWord" type="checkbox" tabindex="97">
						<label class="toolbarLabel" for="findEntireWord" data-l10n-id="find_entire_word_label">Whole Words</label>
					</div>
					<div id="findbarMessageContainer" aria-live="polite"><span class="toolbarLabel" id="findResultsCount"></span><span class="toolbarLabel" id="findMsg"></span></div>
				</div>
				<!-- End findbar-->
				<div class="editorParamsToolbar hidden doorHangerRight" id="editorFreeTextParamsToolbar">
					<div class="editorParamsToolbarContainer">
						<div class="editorParamsSetter">
							<label class="editorParamsLabel" for="editorFreeTextColor" data-l10n-id="editor_free_text_color">Color</label>
							<input class="editorParamsColor" id="editorFreeTextColor" type="color" tabindex="100">
						</div>
						<div class="editorParamsSetter">
							<label class="editorParamsLabel" for="editorFreeTextFontSize" data-l10n-id="editor_free_text_size">Size</label>
							<input class="editorParamsSlider" id="editorFreeTextFontSize" type="range" value="10" min="5" max="100" step="1" tabindex="101">
						</div>
					</div>
				</div>
				<div class="editorParamsToolbar hidden doorHangerRight" id="editorInkParamsToolbar">
					<div class="editorParamsToolbarContainer">
						<div class="editorParamsSetter">
							<label class="editorParamsLabel" for="editorInkColor" data-l10n-id="editor_ink_color">Color</label>
							<input class="editorParamsColor" id="editorInkColor" type="color" tabindex="102">
						</div>
						<div class="editorParamsSetter">
							<label class="editorParamsLabel" for="editorInkThickness" data-l10n-id="editor_ink_thickness">Thickness</label>
							<input class="editorParamsSlider" id="editorInkThickness" type="range" value="1" min="1" max="20" step="1" tabindex="103">
						</div>
						<div class="editorParamsSetter">
							<label class="editorParamsLabel" for="editorInkOpacity" data-l10n-id="editor_ink_opacity">Opacity</label>
							<input class="editorParamsSlider" id="editorInkOpacity" type="range" value="100" min="1" max="100" step="1" tabindex="104">
						</div>
					</div>
				</div>
				<!-- secondaryToolbar-->
				<div class="secondaryToolbar hidden doorHangerRight" id="secondaryToolbar">
					<div id="secondaryToolbarButtonContainer">
						<button class="secondaryToolbarButton visibleLargeView" id="secondaryOpenFile" title="Open File" tabindex="51" data-l10n-id="open_file"><span data-l10n-id="open_file_label">Open</span></button>
						<button class="secondaryToolbarButton visibleMediumView" id="secondaryPrint" title="Print" tabindex="52" data-l10n-id="print"><span data-l10n-id="print_label">Print</span></button>
						<button class="secondaryToolbarButton visibleMediumView hidden" id="secondaryDownload" title="Save" tabindex="53" data-l10n-id="save"><span data-l10n-id="save_label">Save</span></button>

						<div class="horizontalToolbarSeparator visibleLargeView hidden"></div>

						<button class="secondaryToolbarButton hidden" id="presentationMode" title="Switch to Presentation Mode" tabindex="54" data-l10n-id="presentation_mode"><span data-l10n-id="presentation_mode_label">Presentation Mode</span></button>
						<a class="secondaryToolbarButton hidden" id="viewBookmark" href="#" title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark"><span data-l10n-id="bookmark_label">Current View</span></a>

						<div class="horizontalToolbarSeparator hidden" id="viewBookmarkSeparator"></div>

						<button class="secondaryToolbarButton hidden" id="firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page"><span data-l10n-id="first_page_label">Go to First Page</span></button>
						<button class="secondaryToolbarButton hidden" id="lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page"><span data-l10n-id="last_page_label">Go to Last Page</span></button>

						<div class="horizontalToolbarSeparator hidden"></div>

						<button class="secondaryToolbarButton" id="pageRotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw"><span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span></button>
						<button class="secondaryToolbarButton" id="pageRotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw"><span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span></button>

						<div class="horizontalToolbarSeparator hidden"></div>

						<div id="cursorToolButtons" role="radiogroup" class="hidden">
							<button class="secondaryToolbarButton toggled" id="cursorSelectTool" title="Enable Text Selection Tool" tabindex="60" data-l10n-id="cursor_text_select_tool" role="radio" aria-checked="true"><span data-l10n-id="cursor_text_select_tool_label">Text Selection Tool</span></button>
							<button class="secondaryToolbarButton" id="cursorHandTool" title="Enable Hand Tool" tabindex="61" data-l10n-id="cursor_hand_tool" role="radio" aria-checked="false"><span data-l10n-id="cursor_hand_tool_label">Hand Tool</span></button>
						</div>

						<div class="horizontalToolbarSeparator hidden"></div>

						<div id="scrollModeButtons" role="radiogroup">
							<button class="secondaryToolbarButton hidden" id="scrollPage" title="Use Page Scrolling" tabindex="62" data-l10n-id="scroll_page" role="radio" aria-checked="false"><span data-l10n-id="scroll_page_label">Page Scrolling</span></button>
							<button class="secondaryToolbarButton toggled hidden" id="scrollVertical" title="Use Vertical Scrolling" tabindex="63" data-l10n-id="scroll_vertical" role="radio" aria-checked="true"><span data-l10n-id="scroll_vertical_label">Vertical Scrolling</span></button>
							<button class="secondaryToolbarButton hidden" id="scrollHorizontal" title="Use Horizontal Scrolling" tabindex="64" data-l10n-id="scroll_horizontal" role="radio" aria-checked="false"><span data-l10n-id="scroll_horizontal_label">Horizontal Scrolling</span></button>
							<button class="secondaryToolbarButton hidden" id="scrollWrapped" title="Use Wrapped Scrolling" tabindex="65" data-l10n-id="scroll_wrapped" role="radio" aria-checked="false"><span data-l10n-id="scroll_wrapped_label">Wrapped Scrolling</span></button>
						</div>

						<div class="horizontalToolbarSeparator hidden"></div>

						<div id="spreadModeButtons" role="radiogroup">
							<button class="secondaryToolbarButton toggled hidden" id="spreadNone" title="Do not join page spreads" tabindex="66" data-l10n-id="spread_none" role="radio" aria-checked="true"><span data-l10n-id="spread_none_label">No Spreads</span></button>
							<button class="secondaryToolbarButton hidden" id="spreadOdd" title="Join page spreads starting with odd-numbered pages" tabindex="67" data-l10n-id="spread_odd" role="radio" aria-checked="false"><span data-l10n-id="spread_odd_label">Odd Spreads</span></button>
							<button class="secondaryToolbarButton hidden" id="spreadEven" title="Join page spreads starting with even-numbered pages" tabindex="68" data-l10n-id="spread_even" role="radio" aria-checked="false"><span data-l10n-id="spread_even_label">Even Spreads</span></button>
						</div>

						<div class="horizontalToolbarSeparator"></div>

						<button class="secondaryToolbarButton" id="documentProperties" title="Document Properties…" tabindex="69" data-l10n-id="document_properties" aria-controls="documentPropertiesDialog"><span data-l10n-id="document_properties_label">Document Properties&mldr;</span></button>
					</div>
				</div>
				<!-- End secondaryToolbar-->
				<div class="toolbar">
					<!-- toolbarTitle-->
					<div class="toolbarTitle">
						<div id="docTitle"></div><a id="downloadTag" data-l10n-id="save_label" aria-expanded="false">Save</a>
					</div>
					<!-- End toolbarTitle-->
					<!-- toolbarContainer-->
					<div id="toolbarContainer">
						<div id="toolbarViewer">
							<div id="toolbarViewerLeft">
								<button class="toolbarButton" id="sidebarToggle" title="Toggle Sidebar" tabindex="11" data-l10n-id="toggle_sidebar" aria-expanded="false" aria-controls="sidebarContainer"><span data-l10n-id="toggle_sidebar_label">Toggle Sidebar</span></button>
								<div class="toolbarButtonSpacer"></div>
								<button class="toolbarButton" id="viewFind" title="Find in Document" tabindex="12" data-l10n-id="findbar" aria-expanded="false" aria-controls="findbar"><span data-l10n-id="findbar_label">Find</span></button>
								<div class="splitToolbarButton hiddenSmallView">
									<button class="toolbarButton" id="previous" title="Previous Page" tabindex="13" data-l10n-id="previous"><span data-l10n-id="previous_label">Previous</span></button>
									<div class="splitToolbarButtonSeparator"></div>
									<button class="toolbarButton" id="next" title="Next Page" tabindex="14" data-l10n-id="next"><span data-l10n-id="next_label">Next</span></button>
								</div>
								<input class="toolbarField" id="pageNumber" type="number" title="Page" value="1" min="1" tabindex="15" data-l10n-id="page" autocomplete="off"><span class="toolbarLabel" id="numPages"></span>
							</div>
							<div id="toolbarViewerRight">
								<button class="toolbarButton hidden hiddenLargeView" id="openFile" title="Open File" tabindex="31" data-l10n-id="open_file"><span data-l10n-id="open_file_label">Open</span></button>
								<button class="toolbarButton hiddenMediumView" id="print" title="Print" tabindex="32" data-l10n-id="print"><span data-l10n-id="print_label">Print</span></button>
								<button class="toolbarButton hidden hiddenMediumView" id="download" title="Save" tabindex="33" data-l10n-id="save"><span data-l10n-id="save_label">Save</span></button>

								<div class="verticalToolbarSeparator hidden hiddenMediumView"></div>

								<div class="hidden splitToolbarButton toggled" id="editorModeButtons" role="radiogroup">
									<button class="toolbarButton" id="editorFreeText" disabled="disabled" title="Text" role="radio" aria-checked="false" tabindex="34" data-l10n-id="editor_free_text2"><span data-l10n-id="editor_free_text2_label">Text</span></button>
									<button class="toolbarButton" id="editorInk" disabled="disabled" title="Draw" role="radio" aria-checked="false" tabindex="35" data-l10n-id="editor_ink2"><span data-l10n-id="editor_ink2_label">Draw</span></button>
								</div>

								<div class="verticalToolbarSeparator" id="editorModeSeparator"></div>

								<button class="toolbarButton" id="secondaryToolbarToggle" title="Tools" tabindex="48" data-l10n-id="tools" aria-expanded="false" aria-controls="secondaryToolbar"><span data-l10n-id="tools_label">Tools</span></button>
							</div>
							<div id="toolbarViewerMiddle">
								<div class="splitToolbarButton">
									<button class="toolbarButton" id="zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out"><span data-l10n-id="zoom_out_label">Zoom Out</span></button>
									<div class="splitToolbarButtonSeparator"></div>
									<button class="toolbarButton" id="zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in"><span data-l10n-id="zoom_in_label">Zoom In</span></button>
								</div><span class="dropdownToolbarButton" id="scaleSelectContainer">
									<select id="scaleSelect" title="Zoom" tabindex="23" data-l10n-id="zoom">
										<option id="pageAutoOption" title="" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option>
										<option id="pageActualOption" title="" value="page-actual" data-l10n-id="page_scale_actual">Actual Size</option>
										<option id="pageFitOption" title="" value="page-fit" data-l10n-id="page_scale_fit">Page Fit</option>
										<option id="pageWidthOption" title="" value="page-width" data-l10n-id="page_scale_width">Page Width</option>
										<option id="customScaleOption" title="" value="custom" disabled="disabled" hidden="true"></option>
										<option title="" value="0.5" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 50 }">50%</option>
										<option title="" value="0.75" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 75 }">75%</option>
										<option title="" value="1" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 100 }">100%</option>
										<option title="" value="1.25" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 125 }">125%</option>
										<option title="" value="1.5" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 150 }">150%</option>
										<option title="" value="2" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 200 }">200%</option>
										<option title="" value="3" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 300 }">300%</option>
										<option title="" value="4" data-l10n-id="page_scale_percent" data-l10n-args="{ &quot;scale&quot;: 400 }">400%</option>
									</select></span>
							</div>
						</div>
						<!-- loadingBar-->
						<div id="loadingBar">
							<div class="progress">
								<div class="glimmer"></div>
							</div>
						</div>
						<!-- End loadingBar-->
					</div>
					<!-- End toolbarContainer-->
				</div>
				<div id="viewerContainer" tabindex="0">
					<div class="pdfViewer" id="viewer"></div>
				</div>
			</div>
			<!-- End mainContainer-->
			<!-- dialogContainer-->
			<div id="dialogContainer">
				<!-- passwordDialog-->
				<dialog id="passwordDialog">
					<div class="row">
						<label id="passwordText" for="password" data-l10n-id="password_label">Enter the password to open this PDF file:</label>
					</div>
					<div class="row">
						<input class="toolbarField" id="password" type="password">
					</div>
					<div class="buttonRow">
						<button class="dialogButton" id="passwordCancel"><span data-l10n-id="password_cancel">Cancel</span></button>
						<button class="dialogButton" id="passwordSubmit"><span data-l10n-id="password_ok">OK</span></button>
					</div>
				</dialog>
				<!-- End passwordDialog-->
				<!-- documentPropertiesDialog-->
				<dialog id="documentPropertiesDialog">
					<div class="row"><span id="fileNameLabel" data-l10n-id="document_properties_file_name">File name:</span>
						<p id="fileNameField" aria-labelledby="fileNameLabel">-</p>
					</div>
					<div class="row"><span id="fileSizeLabel" data-l10n-id="document_properties_file_size">File size:</span>
						<p id="fileSizeField" aria-labelledby="fileSizeLabel">-</p>
					</div>
					<div class="separator"></div>
					<div class="row"><span id="titleLabel" data-l10n-id="document_properties_title">Title:</span>
						<p id="titleField" aria-labelledby="titleLabel">-</p>
					</div>
					<div class="row"><span id="authorLabel" data-l10n-id="document_properties_author">Author:</span>
						<p id="authorField" aria-labelledby="authorLabel">-</p>
					</div>
					<div class="row"><span id="subjectLabel" data-l10n-id="document_properties_subject">Subject:</span>
						<p id="subjectField" aria-labelledby="subjectLabel">-</p>
					</div>
					<div class="row"><span id="keywordsLabel" data-l10n-id="document_properties_keywords">Keywords:</span>
						<p id="keywordsField" aria-labelledby="keywordsLabel">-</p>
					</div>
					<div class="row"><span id="creationDateLabel" data-l10n-id="document_properties_creation_date">Creation Date:</span>
						<p id="creationDateField" aria-labelledby="creationDateLabel">-</p>
					</div>
					<div class="row"><span id="modificationDateLabel" data-l10n-id="document_properties_modification_date">Modification Date:</span>
						<p id="modificationDateField" aria-labelledby="modificationDateLabel">-</p>
					</div>
					<div class="row"><span id="creatorLabel" data-l10n-id="document_properties_creator">Creator:</span>
						<p id="creatorField" aria-labelledby="creatorLabel">-</p>
					</div>
					<div class="separator"></div>
					<div class="row"><span id="producerLabel" data-l10n-id="document_properties_producer">PDF Producer:</span>
						<p id="producerField" aria-labelledby="producerLabel">-</p>
					</div>
					<div class="row"><span id="versionLabel" data-l10n-id="document_properties_version">PDF Version:</span>
						<p id="versionField" aria-labelledby="versionLabel">-</p>
					</div>
					<div class="row"><span id="pageCountLabel" data-l10n-id="document_properties_page_count">Page Count:</span>
						<p id="pageCountField" aria-labelledby="pageCountLabel">-</p>
					</div>
					<div class="row"><span id="pageSizeLabel" data-l10n-id="document_properties_page_size">Page Size:</span>
						<p id="pageSizeField" aria-labelledby="pageSizeLabel">-</p>
					</div>
					<div class="separator"></div>
					<div class="row"><span id="linearizedLabel" data-l10n-id="document_properties_linearized">Fast Web View:</span>
						<p id="linearizedField" aria-labelledby="linearizedLabel">-</p>
					</div>
					<div class="buttonRow">
						<button class="dialogButton" id="documentPropertiesClose"><span data-l10n-id="document_properties_close">Close</span></button>
					</div>
				</dialog>
				<!-- End documentPropertiesDialog-->
				<!-- printServiceDialog-->
				<dialog id="printServiceDialog" style="min-width: 200px;">
					<div class="row"><span data-l10n-id="print_progress_message">Preparing document for printing&mldr;</span></div>
					<div class="row">
						<progress value="0" max="100"></progress><span class="relative-progress" data-l10n-id="print_progress_percent" data-l10n-args="{ &quot;progress&quot;: 0 }">0%</span>
					</div>
					<div class="buttonRow">
						<button class="dialogButton" id="printCancel"><span data-l10n-id="print_progress_close">Cancel</span></button>
					</div>
				</dialog>
				<!-- End printServiceDialog-->
			</div>
			<!-- End dialogContainer-->
		</div>
		<!-- End outerContainer-->
		<!-- printContainer-->
		<div id="printContainer"></div>
		<!-- End printContainer-->
		<input class="hidden" id="fileInput" type="file">
		<script src="pdf.js/build/pdf.js?<?=filemtime(dirname(__FILE__) . '/pdf.js/build/pdf.js');?>"></script>
		<script src="pdf_viewer.js?<?=filemtime(dirname(__FILE__) . '/pdf_viewer.js');?>"></script>
	</body>
</html>