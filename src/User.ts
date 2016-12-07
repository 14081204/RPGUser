var Cache: MethodDecorator = (target : any,propertyKey,descriptor : PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function(){
        var cacheKey = "__cache" + propertyKey;
        if(!target[cacheKey]){
            target[cacheKey] = method.apply(this);
        }
            return target[cacheKey];
    }
}

enum WeaponsType {
    katana = 1,
    sword = 1,
    halberd = 2,
    gun = 3
}

enum ArmorsType{
    lightarmor = 1,
    armour = 2,
    heavyarmor = 3,
}

enum equipmentQuality{
    green = 1,
    blue = 2,
    purple = 3,
    gold = 4
}

enum JewelPromote{
    attackpromote = 1,
    defencepromote = 2,
    speedpromot = 3,
}

enum jewelLevel{
    one = 1,
    two = 2,
    three = 3
}

class User{
    currentExp : number = 0;
    totalExp : number = 0;
    level : number = 1;
    gold : number = 0;
    heroes : Hero[] = [];
    //heroInTeam:Hero[] = [];
    userName : string = "";

    constructor(currentExp : number, totalExp : number, level : number, gold : number, userName : string){
        this.currentExp = currentExp;
        this.totalExp = totalExp;
        this.level = level;
        this.gold = gold;
        this.userName = userName;
    }

    //@Cache
    get heroesInTeam(){
        return this.heroes.filter(hero => hero.isInTeam);
    }
    @Cache
    getTotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

    public addHero(hero : Hero){
        this.heroes.push(hero);
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.heroesInTeam.forEach(hero => result += hero.getFightPower());
        return result;
    }
}

class Hero{
    isInTeam : boolean = false;
    heroName : string = "";
    maxHp = 0;
    currentHp = 0;
    attack = 0;    
    defence = 0;
    level = 1;
    speed = 0;
    currentExp = 0;
    totalExp = 0;
    weaponsEquipment : Weapon[] = [];
    armorEquipment : Armor[] = [];

    constructor(heroName : string, maxHp : number, currentHp : number,attack : number, defence : number, level : number, speed : number, currentExp : number, totalExp : number){
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

    @Cache
    getMaxHp(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getFightPower() * 0.3);
        this.armorEquipment.forEach(armor => result += armor.getFightPower() * 0.8);
        result += this.level * 100;
        return result;
    }

    @Cache
     getTotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

    @Cache
    getAttack(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getAttack() * 0.8);
        result += this.level * 10;
        return result;
    }

    @Cache
    getDefence(){
        var result = 0;
        this.armorEquipment.forEach(armor => result += armor.getDefence() * 0.8);
        result += this.level * 10;
        return result;
    }

    @Cache
    getSpeed(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getSpeed() * 0.4);
        this.armorEquipment.forEach(armor => result += armor.getSpeed() * 0.4);
        result += this.level * 5;
        return result;
    }

    @Cache
    getFightPower(){
        var result = 0;
        this.weaponsEquipment.forEach(weapon => result += weapon.getFightPower());
        this.armorEquipment.forEach(armor => result += armor.getFightPower());
        result += (this.getAttack() * 10 + this.getDefence() * 8 + this.getSpeed() * 6) * this.level;
        return result;
    }

    public addArmorEquipment(equipment : Armor){
        this.armorEquipment.push(equipment);
    }

    public addWeaponsEquipment(equipment : Weapon){
        this.weaponsEquipment.push(equipment);
    }
}

class Equipment{
    quality = equipmentQuality;
    currentExp = 0;
    isWeapon = false;
    equipmentName : string = "";
    jewelsEquipment : Jewel[] = [];

    constructor(currentExp : number, equipmentName : string){
        this.currentExp = currentExp;
        this.equipmentName = equipmentName;
    }

    //@Cache
    get attackBoost(){
        return 0;
    }

    @Cache
    getFightPower(){
        return 0;
    }

    public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
    }
}

class Weapon extends Equipment{
     //attack = 0;
     isWeapon = true;
     weaponType = 0;

     constructor(currentExp : number, equipmentName : string, weaponType : WeaponsType){
         super(currentExp, equipmentName);
         this.weaponType = weaponType;
     }

     @Cache
     getAttack(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.8 * jewel.level);
         result += 10 * this.weaponType; 
         return result;
     }

     @Cache
     getSpeed(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.8 * jewel.level / this.weaponType);
         return result;
     }

     //@Cache
     get attackBoost(){
        var result = 0;
        this.jewelsEquipment.forEach(e => result += e.attackBoost);
        return result;//
     }

     @Cache
     getFightPower(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower());
         result += this.getAttack() * 10 + this.getSpeed() * 5;
         return result;
     }

     public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
     }
}

class Armor extends Equipment{
     //attack = 0;
     isWeapon = false;
     armorType = 0;

     constructor(currentExp : number, equipmentName : string, armorType : ArmorsType){
         super(currentExp, equipmentName);
         this.armorType = armorType;
     }

     @Cache
     getDefence(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.4 * jewel.level);
         result += 4 * this.armorType; 
         return result;
     }

     @Cache
     getSpeed(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower() * 0.4 * jewel.level / this.armorType);
         return result;
     }

    @Cache
     getFightPower(){
         var result = 0;
         this.jewelsEquipment.forEach(jewel => result += jewel.getFightPower());
         result += this.getDefence() * 10 + this.getSpeed() * 5;
         return result;
     }

     public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
    }
}

class Jewel{
    //quality  = 0;
    level : jewelLevel;
    defencePromote = 0;
    speedPromote = 0
    attackBoost = 0;
    //promotionType = 0;

    constructor(level : jewelLevel, defencePromote : number, attackBoost : number, speedPromote : number){
        this.level = level;
        this.defencePromote = defencePromote;
        this.speedPromote = speedPromote;
        this.attackBoost = attackBoost;
    }

    get DefencePromote(){

        return this.defencePromote * this.level;
    }

    get SpeedPromote(){

        return this.speedPromote * this.level;
    }

    get AttackBoost(){

        return this.attackBoost * this.level;
    }

    @Cache
    getFightPower(){
        var result = 0;
        result = this.DefencePromote * 3 + this.AttackBoost * 5 + this.SpeedPromote * 2;
        return result;
    }
}