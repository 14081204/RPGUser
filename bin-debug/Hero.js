var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var WeaponsType;
(function (WeaponsType) {
    WeaponsType[WeaponsType["katana"] = 1] = "katana";
    WeaponsType[WeaponsType["sword"] = 1] = "sword";
    WeaponsType[WeaponsType["halberd"] = 2] = "halberd";
    WeaponsType[WeaponsType["gun"] = 3] = "gun";
})(WeaponsType || (WeaponsType = {}));
var ArmorsType;
(function (ArmorsType) {
    ArmorsType[ArmorsType["lightarmor"] = 1] = "lightarmor";
    ArmorsType[ArmorsType["armour"] = 2] = "armour";
    ArmorsType[ArmorsType["heavyarmor"] = 3] = "heavyarmor";
})(ArmorsType || (ArmorsType = {}));
var equipmentQuality;
(function (equipmentQuality) {
    equipmentQuality[equipmentQuality["green"] = 1] = "green";
    equipmentQuality[equipmentQuality["blue"] = 2] = "blue";
    equipmentQuality[equipmentQuality["purple"] = 3] = "purple";
    equipmentQuality[equipmentQuality["gold"] = 4] = "gold";
})(equipmentQuality || (equipmentQuality = {}));
var JewelPromote;
(function (JewelPromote) {
    JewelPromote[JewelPromote["attackpromote"] = 1] = "attackpromote";
    JewelPromote[JewelPromote["defencepromote"] = 2] = "defencepromote";
    JewelPromote[JewelPromote["speedpromot"] = 3] = "speedpromot";
})(JewelPromote || (JewelPromote = {}));
var jewelLevel;
(function (jewelLevel) {
    jewelLevel[jewelLevel["one"] = 1] = "one";
    jewelLevel[jewelLevel["two"] = 2] = "two";
    jewelLevel[jewelLevel["three"] = 3] = "three";
})(jewelLevel || (jewelLevel = {}));
var User = (function () {
    function User(currentExp, totalExp, level, gold, userName) {
        this.currentExp = 0;
        this.totalExp = 0;
        this.level = 1;
        this.gold = 0;
        this.heroes = [];
        //heroInTeam:Hero[] = [];
        this.userName = "";
        this.currentExp = currentExp;
        this.totalExp = totalExp;
        this.level = level;
        this.gold = gold;
        this.userName = userName;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        //@Cache
        ,function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; });
        }
    );
    p.getTotalExp = function () {
        this.totalExp = (this.level + 60) * this.level;
        return this.totalExp;
    };
    p.addHero = function (hero) {
        this.heroes.push(hero);
    };
    p.getFightPower = function () {
        var result = 0;
        this.heroesInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
        return result;
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(heroName, maxHp, currentHp, attack, defence, level, speed, currentExp, totalExp) {
        this.isInTeam = false;
        this.heroName = "";
        this.maxHp = 0;
        this.currentHp = 0;
        this.attack = 0;
        this.defence = 0;
        this.level = 1;
        this.speed = 0;
        this.currentExp = 0;
        this.totalExp = 0;
        this.weaponsEquipment = [];
        this.armorEquipment = [];
        this.heroName = heroName;
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.attack = attack;
        this.defence = defence;
        this.level = level;
        this.speed = speed;
        this.currentExp = currentExp;
        this.totalExp = totalExp;
    }
    var d = __define,c=Hero,p=c.prototype;
    p.getMaxHp = function () {
        var result = 0;
        this.weaponsEquipment.forEach(function (weapon) { return result += weapon.getFightPower() * 0.3; });
        this.armorEquipment.forEach(function (armor) { return result += armor.getFightPower() * 0.8; });
        result += this.level * 100;
        return result;
    };
    p.getTotalExp = function () {
        this.totalExp = (this.level + 60) * this.level;
        return this.totalExp;
    };
    p.getAttack = function () {
        var result = 0;
        this.weaponsEquipment.forEach(function (weapon) { return result += weapon.getAttack() * 0.8; });
        result += this.level * 10;
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.armorEquipment.forEach(function (armor) { return result += armor.getDefence() * 0.8; });
        result += this.level * 10;
        return result;
    };
    p.getSpeed = function () {
        var result = 0;
        this.weaponsEquipment.forEach(function (weapon) { return result += weapon.getSpeed() * 0.4; });
        this.armorEquipment.forEach(function (armor) { return result += armor.getSpeed() * 0.4; });
        result += this.level * 5;
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.weaponsEquipment.forEach(function (weapon) { return result += weapon.getFightPower(); });
        this.armorEquipment.forEach(function (armor) { return result += armor.getFightPower(); });
        result += (this.getAttack() * 10 + this.getDefence() * 8 + this.getSpeed() * 6) * this.level;
        return result;
    };
    p.addArmorEquipment = function (equipment) {
        this.armorEquipment.push(equipment);
    };
    p.addWeaponsEquipment = function (equipment) {
        this.weaponsEquipment.push(equipment);
    };
    __decorate([
        Cache
    ], p, "getMaxHp", null);
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getSpeed", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(currentExp, equipmentName) {
        this.quality = equipmentQuality;
        this.currentExp = 0;
        this.isWeapon = false;
        this.equipmentName = "";
        this.jewelsEquipment = [];
        this.currentExp = currentExp;
        this.equipmentName = equipmentName;
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "attackBoost"
        //@Cache
        ,function () {
            return 0;
        }
    );
    p.getFightPower = function () {
        return 0;
    };
    p.addJewel = function (jewel) {
        this.jewelsEquipment.push(jewel);
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(currentExp, equipmentName, weaponType) {
        _super.call(this, currentExp, equipmentName);
        //attack = 0;
        this.isWeapon = true;
        this.weaponType = 0;
        this.weaponType = weaponType;
    }
    var d = __define,c=Weapon,p=c.prototype;
    p.getAttack = function () {
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower() * 0.8 * jewel.level; });
        result += 10 * this.weaponType;
        return result;
    };
    p.getSpeed = function () {
        var _this = this;
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower() * 0.8 * jewel.level / _this.weaponType; });
        return result;
    };
    d(p, "attackBoost"
        //@Cache
        ,function () {
            var result = 0;
            this.jewelsEquipment.forEach(function (e) { return result += e.attackBoost; });
            return result; //
        }
    );
    p.getFightPower = function () {
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getAttack() * 10 + this.getSpeed() * 5;
        return result;
    };
    p.addJewel = function (jewel) {
        this.jewelsEquipment.push(jewel);
    };
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getSpeed", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Weapon;
}(Equipment));
egret.registerClass(Weapon,'Weapon');
var Armor = (function (_super) {
    __extends(Armor, _super);
    function Armor(currentExp, equipmentName, armorType) {
        _super.call(this, currentExp, equipmentName);
        //attack = 0;
        this.isWeapon = false;
        this.armorType = 0;
        this.armorType = armorType;
    }
    var d = __define,c=Armor,p=c.prototype;
    p.getDefence = function () {
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4 * jewel.level; });
        result += 4 * this.armorType;
        return result;
    };
    p.getSpeed = function () {
        var _this = this;
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4 * jewel.level / _this.armorType; });
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.jewelsEquipment.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getDefence() * 10 + this.getSpeed() * 5;
        return result;
    };
    p.addJewel = function (jewel) {
        this.jewelsEquipment.push(jewel);
    };
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getSpeed", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Armor;
}(Equipment));
egret.registerClass(Armor,'Armor');
var Jewel = (function () {
    //promotionType = 0;
    function Jewel(level, defencePromote, attackBoost, speedPromote) {
        this.defencePromote = 0;
        this.speedPromote = 0;
        this.attackBoost = 0;
        this.level = level;
        this.defencePromote = defencePromote;
        this.speedPromote = speedPromote;
        this.attackBoost = attackBoost;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "DefencePromote"
        ,function () {
            return this.defencePromote * this.level;
        }
    );
    d(p, "SpeedPromote"
        ,function () {
            return this.speedPromote * this.level;
        }
    );
    d(p, "AttackBoost"
        ,function () {
            return this.attackBoost * this.level;
        }
    );
    p.getFightPower = function () {
        var result = 0;
        result = this.DefencePromote * 3 + this.AttackBoost * 5 + this.SpeedPromote * 2;
        return result;
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Hero.js.map