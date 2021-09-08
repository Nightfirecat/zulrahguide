const SELECTORS = {
	phaseOptionImages: '.phase-options img',
	clickablePhases: '.pattern img',
	guideElements: '.guide > div',
	gearMenuItems: '.gear-menu li',
	gearElements: '.gear-content-background section',
};

// Add click handlers to intro hider, clickable images, reset button
document.addEventListener('DOMContentLoaded', function() {
	// Rotation Guide click handlers
	const introHider = document.getElementsByClassName('hide-intro'),
		resetButton = document.getElementsByClassName('reset'),
		phaseOptionImages = document.querySelectorAll(SELECTORS.phaseOptionImages),
		clickablePhaseImages = document.querySelectorAll(SELECTORS.clickablePhases),
		gearGuideMenuItems = document.querySelectorAll(SELECTORS.gearMenuItems);

	for (const node of introHider) {
		node.addEventListener('click', hideLinkedClasses, false);
	}
	for (const node of resetButton) {
		node.addEventListener('click', showLinkedClassNodes, false);
	}
	for (const img of phaseOptionImages) {
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
	hideNodesOfSelector(SELECTORS.guideElements);
}

function hideAllGearNodes() {
	hideNodesOfSelector(SELECTORS.gearElements);
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
	node.classList.add('toggle-hidden');
	node.classList.remove('toggle-visible');
}

function showNode(node) {
	node.classList.remove('toggle-hidden');
	node.classList.add('toggle-visible');
}

function toggleCompleted(event) {
	if (!event.srcElement.classList.contains('completed')) {
		event.srcElement.classList.toggle('toggle-completed');
	}
}

function resetToggleCompleted() {
	for (const node of document.querySelectorAll(SELECTORS.clickablePhases)) {
		node.classList.remove('toggle-completed');
	}
}
