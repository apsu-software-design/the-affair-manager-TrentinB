"use strict";
exports.__esModule = true;
exports.AffairManager = void 0;
var Member = /** @class */ (function () {
    function Member(name, email) {
        this.name = name;
        this.email = email;
    }
    Member.prototype.toString = function () {
        return this.name + ' ' + this.email;
    };
    return Member;
}());
var Affair = /** @class */ (function () {
    function Affair(name, location, time) {
        this.name = name;
        this.location = location;
        this.time = time;
        this.members = new List();
    }
    Affair.prototype.printMembers = function () {
        return this.members;
    };
    return Affair;
}());
var Organization = /** @class */ (function () {
    function Organization(name) {
        this.name = name;
        this.affairs = new List();
    }
    return Organization;
}());
//I know this class is incredibly unneccessary
//By the time I realised I didn't need it I was already in too deep
//Let it stand, sloppily implemented, as a monument to my shame
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (object) {
        this.items.push(object);
    };
    List.prototype.searchItem = function (name) {
        for (var i = 0; i < this.size(); i++) {
            if (this[i].name == name) {
                return this.items[i];
            }
        }
    };
    List.prototype.searchIndex = function (name) {
        for (var i = 0; i < this.size(); i++) {
            if (this[i].name == name) {
                return i;
            }
        }
    };
    //this only works properly for members since its the only class I made a custom toString() for
    //the other classes just didnt need it
    //I know that's bad practice. I just don't care right now.
    List.prototype.join = function (spacer) {
        var tempString;
        for (var i = 0; i < this.size(); i++) {
            tempString += this[i].toString() + spacer;
        }
        return tempString;
    };
    return List;
}());
var AffairManager = /** @class */ (function () {
    function AffairManager() {
        this.members = new List();
        this.affairs = new List();
        this.organizations = new List();
    }
    AffairManager.prototype.addMember = function (name, email) {
        this.members.add(new Member(name, email));
    };
    AffairManager.prototype.addAffair = function (name, time, location) {
        this.affairs.add(new Affair(name, time, location));
    };
    AffairManager.prototype.addOrganization = function (name) {
        this.organizations.add(new Organization(name));
    };
    AffairManager.prototype.addMemberToAffair = function (memberName, affairName) {
        var affairIndex = this.affairs.searchIndex(affairName);
        var tempMember = this.members.searchItem(memberName);
        this.affairs[affairIndex].members.add(tempMember);
    };
    //I understand there is some serious code duplication going on here but I couldn't
    //figure out how to not do it this way so here you go. Sorry. :(
    //insult to injury I cannot get this to work and I do not know why. 
    AffairManager.prototype.findMemberNames = function (name) {
        for (var i = 0; i < this.members.size(); i++) {
            if (this.members[i].name == name) {
                return this.members[i];
            }
        }
    };
    AffairManager.prototype.findAffairNames = function (name) {
        for (var i = 0; i < this.affairs.size(); i++) {
            if (this.affairs[i].name == name) {
                return this.affairs[i];
            }
        }
    };
    AffairManager.prototype.findOrganizationNames = function (name) {
        for (var i = 0; i < this.organizations.size(); i++) {
            if (this.organizations[i].name == name) {
                return this.organizations[i];
            }
        }
    };
    AffairManager.prototype.modifyAffair = function (title, newTitle, newDate) {
        var affairIndex = this.affairs.searchIndex(title);
        if (newDate != '') {
            this.affairs[affairIndex].time = newDate;
        }
        else {
            this.affairs[affairIndex].name = newTitle;
        }
    };
    AffairManager.prototype.addAffairToOrganization = function (affairName, organizationName) {
        var orgIndex = this.organizations.searchIndex(organizationName);
        var tempAffair = this.affairs.searchItem(affairName);
        this.organizations[orgIndex].affairs.add(tempAffair);
    };
    AffairManager.prototype.getMembers = function (affairName) {
        var affairIndex = this.affairs.searchIndex(affairName);
        return this.affairs[affairIndex].printMembers();
    };
    return AffairManager;
}());
exports.AffairManager = AffairManager;
