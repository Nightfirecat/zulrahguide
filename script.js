const CLICKABLE_IMAGES_SELECTOR = '.phase-options img',
	CLICKABLE_PHASES_SELECTOR = '.phases-completed img',
	GUIDE_ELEMENTS_SELECTOR = '.guide > div',
	GEAR_MENU_ITEMS_SELECTOR = '.gear-menu li',
	GEAR_ELEMENTS_SELECTOR = '.gear-content-background section',
	HIDDEN_ELEMENT_STYLE = 'display: none;',
	VISIBLE_ELEMENT_STYLE = 'display: block;';

// Add click handlers to intro hider, clickable images, reset button
document.addEventListener('DOMContentLoaded', function() {
	// Rotation Guide click handlers
	const introHider = document.getElementsByClassName('hide-intro'),
		resetButton = document.getElementsByClassName('reset'),
		clickableImages = document.querySelectorAll(CLICKABLE_IMAGES_SELECTOR),
		clickablePhaseImages = document.querySelectorAll(CLICKABLE_PHASES_SELECTOR),
		gearGuideMenuItems = document.querySelectorAll(GEAR_MENU_ITEMS_SELECTOR);
	for (const node of introHider) {
		node.addEventListener('click', hideLinkedClasses, false);
	}
	for (const node of resetButton) {
		node.addEventListener('click', showLinkedClassNodes, false);
	}
	for (const img of clickableImages) {
		img.addEventListener('click', showLinkedClassNodes, false);
	}
	for (const img of clickablePhaseImages) {
		img.addEventListener('click', toggleCompleted, false);
	}

	// Gear Guide click handlers
	for (const node of gearGuideMenuItems) {
		node.addEventListener('click', showLinkedClassNodes, false);
	}
}, false);

function hideLinkedClasses() {
	const classesToHide = this.dataset['closes'].split(' ') || [];
	for (const className of classesToHide) {
		hideElementsOfClassName(className);
	}
}

function showLinkedClassNodes() {
	const classesToShow = this.dataset['opens'].split(' ');
	hideAllGuideNodes();
	hideAllGearNodes();
	resetToggleCompleted();
	showGuideElementsOfClassNames(classesToShow);
}

function showGuideElementsOfClassNames(classNames) {
	for (const className of classNames) {
		showGuideElementsOfClassName(className);
	}
}

function showGuideElementsOfClassName(className) {
	for (const node of document.getElementsByClassName(className)) {
		showNode(node);
	}
}

function hideAllGuideNodes() {
	hideNodesOfSelector(GUIDE_ELEMENTS_SELECTOR);
}

function hideAllGearNodes() {
	hideNodesOfSelector(GEAR_ELEMENTS_SELECTOR);
}

function hideElementsOfClassName(className) {
	for (const node of document.getElementsByClassName(className)) {
		hideNode(node);
	}
}

function hideNodesOfSelector(selector) {
	for (const node of document.querySelectorAll(selector)) {
		hideNode(node);
	}
}

function hideNode(node) {
	if (node.getAttribute('style') !== HIDDEN_ELEMENT_STYLE) {
		node.setAttribute('style', HIDDEN_ELEMENT_STYLE);
	}
}

function showNode(node) {
	if (node.getAttribute('style') !== VISIBLE_ELEMENT_STYLE) {
		node.setAttribute('style', VISIBLE_ELEMENT_STYLE);
	}
}

function toggleCompleted(event) {
	if (event.srcElement.className !== "completed") {
		event.srcElement.className = (event.srcElement.className == "toggle-completed") ? "" : "toggle-completed";
	}
}

function resetToggleCompleted() {
	for (const node of document.querySelectorAll(CLICKABLE_PHASES_SELECTOR)) {
		node.classList.remove('toggle-completed');
	}
}