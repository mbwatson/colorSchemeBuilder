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
		colorBlock.children('.color-hex').text(rgbToHexString(r, g, b));
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
			$(this).children('.color-hex').text(rgbToHexString(r, g, b)).fadeIn(250);
			$(this).children('.faders').slideDown(250);
			$(this).children('.color-menu').fadeIn(250);
		}, function() {
			$(this).children('.color-hex').fadeOut(250);
			$(this).children('.faders').slideUp(250);
			$(this).children('.color-menu').fadeOut(250);
	});
	$('.color-block').last().children('.color-hex').on('click', function() {
		copyToClipboard($(this).text());
		alert(`Copied ${$(this).text()} to clipboard.`)
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

function copyToClipboard(text) {
  let el = $(`<input value="${text}">`);
  el.appendTo('body').select();
  document.execCommand("copy");
  el.remove();
}

// stuff to convert rgb color to hexadecimal
var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function rgbStringToHexString(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function rgbToHexString(r, g, b) {
	return `#${hex(r)}${hex(g)}${hex(b)}`;
}
function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }