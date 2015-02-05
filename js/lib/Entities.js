

window.Entities = function(sprite, name, data) {
    this.attributes = {
        'sprite': sprite,
        'name': name,
        'position': {
            'x': 0,
            'y': 0,
            'bx': 0,
            'by': 0
        },
        passo: 40,
        orientation: 0
    };
    this.block = $('<div>').attr({
        'Entities': name,
        'id': "Entities_" + name
    }).css({
        'left': this.getPositionX(),
        'top': this.getPositionY(),
        'background': 'url(' + sprite + ')',
        'height': 55,
        'margin-top': -15
    }).addClass('Entities');
};

Entities.prototype.getPassos = function() {
    return this.attributes.passo;
};
Entities.prototype.setPosition = function(position) {
    this.attributes.position.x = position.x;
    this.attributes.position.y = position.y;
};
Entities.prototype.getPositionX = function() {
    return this.attributes.position.x;
};
Entities.prototype.getPositionY = function() {
    return this.attributes.position.y;
};
Entities.prototype.getPositionBX = function() {
    return this.attributes.position.bx;
};
Entities.prototype.getPositionBY = function() {
    return this.attributes.position.by;
};
Entities.prototype.setPositionBX = function(bx) {
    this.attributes.position.bx = bx;
};
Entities.prototype.setPositionBY = function(by) {
    this.attributes.position.by = by;
};
Entities.prototype.show = function() {
    game.append(this.getBlock());
};
Entities.prototype.getBlock = function() {
    return this.block;
};

Entities.prototype.getOrientation = function() {
    return this.attributes.orientation;
};
Entities.prototype.gotItem = function(map) {
    map.getTrigger(this.getPositionBX(), this.getPositionBY(), this.getOrientation());
};
Entities.prototype.refreshPosition = function(orientation) {
    this.block.css({
        'left': this.getPositionX(),
        'top': this.getPositionY()
    });
    console.log(orientation);
    this.attributes.orientation = orientation;
    switch (orientation) {
        case 0:
            this.block.css({
                'background-position': '0px 0px'
            });
            break;
        case 1:
            this.block.css({
                'background-position': '0px 55px'
            });
            break;
        case 2:
            this.block.css({
                'background-position': '0px 110px'
            });
            break;
        case 3:
            this.block.css({
                'background-position': '0px 161px'
            });
            break;
    }
};
Entities.prototype.moveUp = function(map) {
    if (this.getPositionBY() > 0) {
        var by = parseInt(this.getPositionBY());
        if (map.allow(this.getPositionBX(), by - 1)) {
            var nextPosition = this.getPositionY() - this.getPassos();
            this.setPosition({
                'x': this.getPositionX(),
                'y': nextPosition
            });
            this.setPositionBY(by - 1);
        }
    }
    this.refreshPosition(1);
};
Entities.prototype.moveDown = function(map) {
    if (this.getPositionBY() < map.getDimensionV()) {
        var by = parseInt(this.getPositionBY());
        if (map.allow(this.getPositionBX(), by + 1)) {
            var nextPosition = this.getPositionY() + this.getPassos();
            this.setPosition({
                'x': this.getPositionX(),
                'y': nextPosition
            });
            this.setPositionBY(by + 1);
        }
    }
    this.refreshPosition(0);
};
Entities.prototype.moveLeft = function(map) {
    if (this.getPositionBX() > 0) {
        var bx = parseInt(this.getPositionBX());
        if (map.allow(bx - 1, this.getPositionBY())) {
            var nextPosition = this.getPositionX() - this.getPassos();
            this.setPosition({
                'x': nextPosition,
                'y': this.getPositionY()
            });
            this.setPositionBX(bx - 1);
        }
    }
    this.refreshPosition(3);
};
Entities.prototype.moveRight = function(map) {
    if (this.getPositionBX() < map.getDimensionH()) {
        var bx = parseInt(this.getPositionBX());
        if (map.allow(bx + 1, this.getPositionBY())) {
            var nextPosition = this.getPositionX() + this.getPassos();
            this.setPosition({
                'x': nextPosition,
                'y': this.getPositionY()
            });
            this.setPositionBX(bx + 1);
        }
    }
    this.refreshPosition(2);
};



