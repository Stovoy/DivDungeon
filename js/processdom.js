function getAllObjects() {
    var result = [];
    $("div").each(function (index) {
        var box;
        try {
            box = $(this)[0].getBoundingClientRect();
        } catch (e) {}

        var docElem = document.documentElement,
            body = document.body,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop = window.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
            left = box.left + scrollLeft - clientLeft,
            top = box.top + scrollTop - clientTop;
        var width = $(this).width();
        var height = $(this).height();
        var element;
        element = new htmlElement(left, top, 2, height);
        result.push(element);
        element = new htmlElement(left, top, width, 2);
        result.push(element);
        element = new htmlElement(left + width, top, 2, height);
        result.push(element);
        element = new htmlElement(left, top + height, width, 2);
        result.push(element);
    });
    result = _cleanUp(result);
    return result;
}

function htmlElement(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function _cleanUp(elements) {
    var remove = [];
    for (var i = 0; i < elements.length; i++) {
		if (_length(elements[i]) < 100) {
			remove.push(i);
		}
    }
	var count = 0;
	for (var i = 0; i < remove.length; i++) {
		elements.splice(remove[i] - count++, 1);
    }
    return elements;
}

function _length(element) {
	return Math.max(element.width, element.height);
}