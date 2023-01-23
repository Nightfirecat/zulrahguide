const SELECTORS = {
	phaseOptionImages: '.phase-options img',
	clickablePhases: '.pattern img',
	guideImages: '.guide img',
	guideElements: '.guide > div',
	gearMenuItems: '.gear-menu li',
	gearElements: '.gear-content-background section',
};
const clickablePhaseToggle = 'toggle-completed';

// Add click handlers to intro hider, clickable images, reset button
document.addEventListener('DOMContentLoaded', function() {
	// Rotation Guide click handlers
	const introHider = document.getElementsByClassName('hide-intro'),
		resetButton = document.getElementsByClassName('reset'),
		phaseOptionImages = document.querySelectorAll(SELECTORS.phaseOptionImages),
		clickablePhaseImages = document.querySelectorAll(SELECTORS.clickablePhases),
		gearGuideMenuItems = document.querySelectorAll(SELECTORS.gearMenuItems),
		guideImages = document.querySelectorAll(SELECTORS.guideImages);

	document.addEventListener('keydown', keyDownHandler, false);

	for (const node of introHider) {
		node.addEventListener('click', hideLinkedClasses, false);
	}
	for (const node of resetButton) {
		node.addEventListener('click', showLinkedClassNodes, false);
	}
	for (const img of phaseOptionImages) {
		img.addEventListener('mousedown', advanceGuidePhaseHandler, false);
	}
	for (const img of clickablePhaseImages) {
		img.addEventListener('mousedown', toggleCompletedHandler, false);
	}
	for (const img of guideImages) {
		img.addEventListener('dragstart', cancelDrag, false);
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
	showLinkedClassNodesOfElement(this);
}

function showLinkedClassNodesOfElement(el) {
	const classesToShow = el.dataset['opens'].split(' ');
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

function advanceGuidePhaseHandler() {
	advanceGuidePhase(this);
}

function advanceGuidePhase(el) {
	showLinkedClassNodesOfElement(el);
	window.scrollTo({
		left: 0,
		top: document.body.scrollHeight,
		behavior: 'smooth',
	});
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

function toggleCompletedHandler(event) {
	toggleCompleted(event.srcElement);
}

function toggleCompleted(targetElement) {
	if (!targetElement) {
		return;
	}

	setCompleted(targetElement, !targetElement.classList.contains(clickablePhaseToggle));

}

function setCompleted(targetElement, completed) {
	if (!targetElement || targetElement.classList.contains('completed')) {
		return;
	}

	const addedToggleClass = targetElement.classList.toggle(clickablePhaseToggle, completed);
	const nextElement = addedToggleClass
		? targetElement.previousElementSibling
		: targetElement.nextElementSibling;
	setCompleted(nextElement, addedToggleClass);
}

function resetToggleCompleted() {
	for (const node of document.querySelectorAll(SELECTORS.clickablePhases)) {
		node.classList.remove(clickablePhaseToggle);
	}
}

function cancelDrag(e) {
	e.preventDefault();
}

function keyDownHandler(e) {
	const guideElements = document.getElementsByClassName('guide');
	if (guideElements.length) {
		guideKeyDown(e, guideElements.item(0));
	}
}

function guideKeyDown(e, guideElement) {
	switch (e.key) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9': {
			const allPhases = guideElement.querySelectorAll(SELECTORS.phaseOptionImages);
			const visiblePhases = [];

			for (const phase of allPhases) {
				if (isRendered(phase)) {
					visiblePhases.push(phase);
				}
			}

			const numberPressed = parseInt(e.key, 10);

			if (numberPressed > visiblePhases.length) {
				break;
			}

			const indexPressed = numberPressed - 1;
			advanceGuidePhase(visiblePhases[indexPressed]);
			break;
		}
		case 'r':
		case 'R': {
			const resetButton = document.getElementsByClassName('reset');
			for (const button of resetButton) {
				showLinkedClassNodesOfElement(button);
			}
			break;
		}
	}
}

function isRendered(el) {
	return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
