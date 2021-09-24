import { stringify } from "querystring";

class Member{
    public name: string;
    email: string;

    constructor(name: string, email: string){
        this.name = name;
        this.email = email;
    }

    toString(){
        return this.name + ' ' + this.email;
    }
}

class Affair{
    name: string;
    location: string;
    time: string;
    members: List<Member>;

    constructor(name: string, location: string, time: string){
        this.name = name;
        this.location = location;
        this.time = time;
        this.members = new List();
    }

    printMembers(){
        return this.members;
    }
}

class Organization{
    name: string;
    affairs: List<Affair>;

    constructor(name: string){
        this.name = name;
        this.affairs = new List();
    }
}

//I know this class is incredibly unneccessary
//By the time I realised I didn't need it I was already in too deep
//Let it stand, sloppily implemented, as a monument to my shame
class List<T>{
    private items: Array<T>;

    constructor(){
        this.items = [];
    }

    size(): number{
        return this.items.length;
    }

    add(object: T): void{
        this.items.push(object);
    }

    searchItem(name: string): T{
        for(let i = 0; i < this.size(); i++){
            if(this[i].name == name){
                return this.items[i];
            }
        }
    }

    searchIndex(name: string): number{
        for(let i = 0; i < this.size(); i++){
            if(this[i].name == name){
                return i;
            }
        }
    }

    //this only works properly for members since its the only class I made a custom toString() for
    //the other classes just didnt need it
    //I know that's bad practice. I just don't care right now.
    join(spacer: string){
        let tempString: string;
        for(let i = 0; i < this.size(); i++){
            tempString += this[i].toString() + spacer;
        }
        return tempString;
    }
}

export class AffairManager{
    members: List<Member> = new List();
    affairs: List<Affair> = new List();
    organizations: List<Organization> = new List();

    addMember(name: string, email: string){
        this.members.add(new Member(name, email));
    }

    addAffair(name, time, location){
        this.affairs.add(new Affair(name, time, location));
    }

    addOrganization(name: string){
        this.organizations.add(new Organization(name));
    }

    addMemberToAffair(memberName, affairName){
        let affairIndex = this.affairs.searchIndex(affairName);
        let tempMember = this.members.searchItem(memberName);

        this.affairs[affairIndex].members.add(tempMember);
    }

    //I understand there is some serious code duplication going on here but I couldn't
    //figure out how to not do it this way so here you go. Sorry. :(

    //insult to injury I cannot get this to work and I do not know why. 
    findMemberNames(name: string): string[]{
       for(let i = 0; i < this.members.size(); i++){
            if(this.members[i].name == name){
                return this.members[i];
            }
        }
    }

    findAffairNames(name: string): string[]{
        for(let i = 0; i < this.affairs.size(); i++){
            if(this.affairs[i].name == name){
                return this.affairs[i];
            }
        }
    }

    findOrganizationNames(name: string): string[]{
        for(let i = 0; i < this.organizations.size(); i++){
            if(this.organizations[i].name == name){
                return this.organizations[i];
            }
        }
    }
    
    modifyAffair(title: string, newTitle: string, newDate?: string){
        let affairIndex = this.affairs.searchIndex(title);

        if(newDate != ''){
            this.affairs[affairIndex].time = newDate;
        }
        else{
            this.affairs[affairIndex].name = newTitle;
        }

    }

    addAffairToOrganization(affairName: string, organizationName: string){
        let orgIndex = this.organizations.searchIndex(organizationName);
        let tempAffair = this.affairs.searchItem(affairName);

        this.organizations[orgIndex].affairs.add(tempAffair);
    }

    getMembers(affairName: string): List<Member>{
        let affairIndex = this.affairs.searchIndex(affairName);
        return this.affairs[affairIndex].printMembers();
    }
}
