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
		if (_length(elements[i]) < 20) {
			remove.push(i);
		}
    }
	var count = 0;
	for (var i = 0; i < remove.length; i++) {
		elements.splice(remove[i] - count++, 1);
    }
    return elements;
}

function _size(element) {
    var size = element.width * element.height;
}

function _collides(e1, e2) {
    if (e1.x > e2.x + e2.width) {
        return false;
    }
    if (e1.x + e1.width < e2.x) {
        return false;
    }
    if (e1.y > e2.y + e2.height) {
        return false;
    }
    if (e1.y + e1.height < e2.y) {
        return false;
    }

    return true;
}

function _collisionSize(e1, e2) {
    if (_collides(e1, e2)) {
        var width = e2.x + e2.width - e1.x;
        var height = e2.y + e2.height - e1.y;
        return width * height;
    } else {
        return 0;
    }
}

function _distance(e1, e2) {
	var x = Math.abs(e1.x + e1.width/2 - e2.x + e2.width/2);
	var y = Math.abs(e1.y + e1.height/2 - e2.y + e2.height/2);
	
	return Math.sqrt(x*x + y*y);
}

function _length(element) {
	return Math.max(element.width, element.height);
}