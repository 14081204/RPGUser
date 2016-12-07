enum WeaponsType {
    katana = 1.5,
    sword = 1.5,
    halberd = 2,
    gun = 2.5
}

enum ArmorsType{
    lightarmor = 1.4,
    armour = 2,
    heavyarmor = 2.4,
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

    get heroesInTeam(){
        return this.heroes.filter(hero => hero.isInTeam);
    }

     get TotalExp(){
         this.totalExp = (this.level + 60) * this.level;
         return this.totalExp;
     }

    public addHero(hero : Hero){
        this.heroes.push(hero);
    }

    get fightPower(){
        var result = 0;
        //
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
    
    get MaxHp(){
        var result = 0;
        //
        return result;
    }

    get Attack(){
        var result = 0;
        //
        return result;
    }

    get Defence(){
        var result = 0;
        //
        return result;
    }

    get Speed(){
        var result = 0;
        //
        return result;
    }

    get fightPower(){
        var result = 0;
        //
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

    /*constructor(quality : number, currentExp : number, equipmentName : string){
        this.quality = quality;
        this.currentExp = currentExp;
        this.equipmentName = equipmentName;
    }*/

    get attackBoost(){
        return 0;
    }

    get FightPower(){
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

     constructor(currentExp : number, equipmentName : string, weaponType : WeaponType){
         super();
         this.currentExp = currentExp;
         this.equipmentName = equipmentName;
         this.weaponType = weaponType;
     }

     get Attack(){
         var result = 0;
         //
         return result;
     }

     get Speed(){
         var result = 0;
         //
         return result;
     }

     get attackBoost(){

        var result = 0;
        //
        return result;//
    }

     get FightPower(){
         var result = 0;
         //
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

     constructor(currentExp : number, equipmentName : string, weaponType : WeaponType){
         super();
         this.currentExp = currentExp;
         this.equipmentName = equipmentName;
         this.armorType = weaponType;
     }

     get Attack(){
         var result = 0;
         //
         return result;
     }

     get Speed(){
         var result = 0;
         //
         return result;
     }

     get attackBoost(){

        var result = 0;
        //
        return result;//
    }

     get FightPower(){
         var result = 0;
         //
         return result;
     }

     public addJewel(jewel : Jewel){
        this.jewelsEquipment.push(jewel);
    }
}

class Jewel{
    quality  = 0;
    level : jewelLevel;
    hpBoost = 0;
    attackBoost = 0;
    //promotionType = 0;

    constructor(quality : number, level : jewelLevel, hpBoost : number, attackBoost : number){
        this.level = level;
        this.hpBoost = hpBoost;
        this.attackBoost = attackBoost;
    }

    get FightPower(){
        var result = 0;
        //
        return result;
    }
}

