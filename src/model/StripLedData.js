// Класс данных светодиодов
class StripLedData {
    constructor(id, index, redColor, greenColor, blueColor) {
        this.id = id??0;
        this.index = index??0;
        this.redColor = redColor??0;
        this.greenColor = greenColor??0;
        this.blueColor = blueColor??0;
    }
}
export default StripLedData;