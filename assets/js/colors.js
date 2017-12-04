$(function() {
	newColorBlock();
})

function bindMousewheel() {
	$('.fader').bind('mousewheel', function(e) {
  	let r, g, b;
		let colorBlock = $(this).parents('.color-block');
		let currentColor = colorBlock.css("background-color");
    [,r,g,b] = currentColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).map( x => parseInt(x));
		let delta = (e.originalEvent.deltaY > 0 ? -1 : 1); // scroll up or down?
		let classname = $(this).attr('class').split(' ')[1];
		switch (classname) {
			case 'red':
				r = minMax(r + delta, 0, 255);
				$(this).find('.red-value').text(r);
				break;
			case 'green':
				g = minMax(g + delta, 0, 255);
				$(this).find('.green-value').text(g);
				break;
			case 'blue':
				b = minMax(b + delta, 0, 255);
				$(this).find('.blue-value').text(b);
				break;
		}
		let newRGB = `rgb(${r},${g},${b})`;
		colorBlock.css('background-color', newRGB);
	});
}

function newColorBlock() {
	let r = randomInteger(0, 255);
	let g = randomInteger(0, 255);
	let b = randomInteger(0, 255);
	$('.color-block-template').clone()
		.attr('class', 'color-block')
		.appendTo('#scheme-container')
		.css('background-color', `rgb(${r},${g},${b})`)
		.hover(function() {
			$(this).children('.faders').slideDown(250);
			$(this).children('.color-menu').fadeIn(250);
		}, function() {
			$(this).children('.faders').slideUp(250);
			$(this).children('.color-menu').fadeOut(250);
	});
	$('.color-block').last().find('.red-value').text(r);
	$('.color-block').last().find('.green-value').text(g);
	$('.color-block').last().find('.blue-value').text(b);
	bindMousewheel($('.color-block'));
}

function minMax(value, low, high) {
	return (Math.min(Math.max(value, low), high));
}

function randomInteger(min, max) {
	return Math.floor((max - min + 1)*Math.random() + min);
}

function colorMenu() {
	alert('Color options! \n\n      (Soon)');
}