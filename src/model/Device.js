class Device {
    constructor(id,name, description , location , dataValues , ledValues ) {
        this.id = id??0;
        this.name = name??'';
        this.description = description??'';
        this.location = location??'';
        this.dataValues = dataValues??[];
        this.ledValues = ledValues??[];
    }
}
export default Device;